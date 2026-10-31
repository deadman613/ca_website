import "server-only";

import type { BlogPost as PrismaBlogPost } from "@prisma/client";
import type { BlogPost, BlogCategory } from "@/lib/data/blogs";
import { blogPosts as legacyBlogPosts } from "@/lib/data/seed-blogs";
import { getAuthenticatedUser, isAdminUser, requireAdmin } from "@/lib/auth";
import { getPrismaClient } from "@/lib/prisma";
import { isPrismaDatabaseConfigured } from "@/lib/prisma-config";

function visibleBlogWhere(now: Date) {
  return {
    OR: [
      { status: "published" },
      { status: "scheduled", publishAt: { lte: now } },
    ],
  };
}

function toBlogPost(row: PrismaBlogPost, content?: string): BlogPost {
  const scheduledNowPublished =
    row.status === "scheduled" &&
    row.publishAt !== null &&
    row.publishAt <= new Date();

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    ...(row.seoTitle ? { seoTitle: row.seoTitle } : {}),
    ...(row.seoDescription ? { seoDescription: row.seoDescription } : {}),
    previewContent: row.previewContent,
    ...(content === undefined ? {} : { content }),
    category: row.category as BlogCategory,
    author: {
      name: row.authorName,
      designation: row.authorDesignation,
      ...(row.authorPhoto ? { photo: row.authorPhoto } : {}),
    },
    publishedAt: row.publishedAt.toISOString(),
    publishAt: row.publishAt?.toISOString() ?? null,
    status: scheduledNowPublished
      ? "published"
      : (row.status as BlogPost["status"]),
    access: row.access as BlogPost["access"],
    readingTime: row.readingTime,
    ...(row.featuredImage ? { featuredImage: row.featuredImage } : {}),
    ...(row.featuredLabel ? { featuredLabel: row.featuredLabel } : {}),
    tags: row.tags,
  };
}

function getLegacyPublicPosts(): BlogPost[] {
  return legacyBlogPosts.map((post) => ({
    ...post,
    previewContent: post.excerpt,
    status: "published",
    access: "public",
    publishAt: post.publishedAt,
  }));
}

export async function getVisibleBlogPosts() {
  if (!isPrismaDatabaseConfigured()) return getLegacyPublicPosts();

  const posts = await getPrismaClient().blogPost.findMany({
    where: visibleBlogWhere(new Date()),
    orderBy: { publishedAt: "desc" },
  });

  return posts.map((post) => toBlogPost(post));
}

export async function getIndexableBlogPosts() {
  if (!isPrismaDatabaseConfigured()) {
    return legacyBlogPosts.map((post) => ({
      slug: post.slug,
      published_at: post.publishedAt,
      publish_at: post.publishedAt,
    }));
  }

  const posts = await getPrismaClient().blogPost.findMany({
    where: { ...visibleBlogWhere(new Date()), access: "public" },
    select: { slug: true, publishedAt: true, publishAt: true },
    orderBy: { publishedAt: "desc" },
  });

  return posts.map((post) => ({
    slug: post.slug,
    published_at: post.publishedAt.toISOString(),
    publish_at: post.publishAt?.toISOString() ?? null,
  }));
}

export async function getBlogPostForViewer(slug: string) {
  if (!isPrismaDatabaseConfigured()) {
    const legacyPost = legacyBlogPosts.find((post) => post.slug === slug);
    return legacyPost
      ? {
          ...legacyPost,
          previewContent: legacyPost.excerpt,
          status: "published" as const,
          access: "public" as const,
          publishAt: legacyPost.publishedAt,
        }
      : null;
  }

  const prisma = getPrismaClient();
  const user = await getAuthenticatedUser();

  if (isAdminUser(user)) {
    const post = await prisma.blogPost.findUnique({
      where: { slug },
      include: { articleContent: true },
    });

    return post
      ? toBlogPost(post, post.articleContent?.content ?? "")
      : null;
  }

  const post = await prisma.blogPost.findFirst({
    where: { slug, ...visibleBlogWhere(new Date()) },
  });
  if (!post) return null;

  const preview = toBlogPost(post);
  if (preview.access === "login_required" && !user) return preview;

  const article = await prisma.blogArticleContent.findUnique({
    where: { postId: post.id },
    select: { content: true },
  });
  if (!article) {
    throw new Error(`Published blog article content is missing for "${slug}".`);
  }

  return toBlogPost(post, article.content);
}

export async function getAdminBlogPosts() {
  await requireAdmin();

  const posts = await getPrismaClient().blogPost.findMany({
    include: { articleContent: true },
    orderBy: { updatedAt: "desc" },
  });

  return posts.map((post) =>
    toBlogPost(post, post.articleContent?.content ?? "")
  );
}
