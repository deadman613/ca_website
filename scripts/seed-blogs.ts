import { loadEnvConfig } from "@next/env";
import { PrismaPg } from "@prisma/adapter-pg";
import { blogPosts } from "../src/lib/data/seed-blogs";
import { PrismaClient } from "../src/generated/prisma/client";

loadEnvConfig(process.cwd());

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("Set DATABASE_URL before importing the legacy blog posts.");
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

try {
  await prisma.$transaction(
    blogPosts.map((post) =>
      prisma.blogPost.upsert({
        where: { slug: post.slug },
        create: {
          id: post.id,
          slug: post.slug,
          title: post.title,
          excerpt: post.excerpt,
          previewContent: post.excerpt,
          category: post.category,
          authorName: post.author.name,
          authorDesignation: post.author.designation,
          authorPhoto: post.author.photo ?? null,
          publishedAt: new Date(post.publishedAt),
          publishAt: new Date(post.publishedAt),
          status: "published",
          access: "public",
          readingTime: post.readingTime,
          featuredImage: post.featuredImage ?? null,
          tags: post.tags,
          articleContent: { create: { content: post.content } },
        },
        update: {
          title: post.title,
          excerpt: post.excerpt,
          previewContent: post.excerpt,
          category: post.category,
          authorName: post.author.name,
          authorDesignation: post.author.designation,
          authorPhoto: post.author.photo ?? null,
          publishedAt: new Date(post.publishedAt),
          publishAt: new Date(post.publishedAt),
          status: "published",
          access: "public",
          readingTime: post.readingTime,
          featuredImage: post.featuredImage ?? null,
          tags: post.tags,
          articleContent: {
            upsert: {
              create: { content: post.content },
              update: { content: post.content },
            },
          },
        },
      })
    )
  );

  console.log(`Imported ${blogPosts.length} existing blog posts.`);
} finally {
  await prisma.$disconnect();
}
