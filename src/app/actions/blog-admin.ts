"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { blogCategories } from "@/lib/data/blogs";
import { requireAdmin } from "@/lib/auth";
import { getPrismaClient } from "@/lib/prisma";
import { slugifyBlogTitle } from "@/lib/blog-slug";

const imageUrlSchema = z
  .string()
  .max(2048)
  .refine(
    (value) =>
      value === "" ||
      (/^https?:\/\/[^\s"'<>]+$/i.test(value)) ||
      (/^\/(?!\/)[A-Za-z0-9._~!$&'()*+,;=:@%/-]*$/.test(value) &&
        !value.split("/").includes(".."))
  );

const postSchema = z.object({
  id: z.string().optional(),
  slug: z
    .string()
    .trim()
    .min(1)
    .max(160)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().trim().min(1).max(200),
  excerpt: z.string().trim().min(1).max(1000),
  seoTitle: z.string().trim().max(200),
  seoDescription: z.string().trim().max(300),
  previewContent: z.string().trim().max(8000),
  content: z.string().trim().min(1).max(100000),
  category: z.enum(blogCategories),
  authorName: z.string().trim().min(1).max(120),
  authorPhoto: imageUrlSchema,
  access: z.enum(["public", "login_required"]),
  status: z.enum(["draft", "scheduled", "published"]),
  publishAt: z.string(),
  readingTime: z.string().trim().min(1).max(40),
  featuredImage: imageUrlSchema,
  featuredLabel: z.string().trim().max(80),
  tags: z.string().max(1000),
}).refine(
  (post) => post.access !== "login_required" || post.previewContent.length > 0,
  { message: "Add preview content to login-required posts.", path: ["previewContent"] }
);

function formString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function returnWithError(message: string): never {
  redirect(`/admin/blogpanel?error=${message}`);
}

async function uniqueSlug(
  candidate: string,
  currentPostId?: string
): Promise<string> {
  const prisma = getPrismaClient();
  let suffix = 1;
  let slug = candidate;

  while (true) {
    const conflictingPost = await prisma.blogPost.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (!conflictingPost || conflictingPost.id === currentPostId) return slug;

    suffix += 1;
    const suffixText = `-${suffix}`;
    slug = `${candidate.slice(0, 160 - suffixText.length).replace(/-+$/g, "")}${suffixText}`;
  }
}

export async function saveBlogPost(formData: FormData) {
  await requireAdmin();

  const title = formString(formData, "title");
  const parsed = postSchema.safeParse({
    id: formString(formData, "id") || undefined,
    slug: formString(formData, "slug") || slugifyBlogTitle(title),
    title,
    excerpt: formString(formData, "excerpt"),
    seoTitle: formString(formData, "seoTitle"),
    seoDescription: formString(formData, "seoDescription"),
    previewContent: formString(formData, "previewContent"),
    content: formString(formData, "content"),
    category: formString(formData, "category"),
    authorName: formString(formData, "authorName"),
    authorPhoto: formString(formData, "authorPhoto"),
    access: formString(formData, "access"),
    status: formString(formData, "status"),
    publishAt: formString(formData, "publishAt"),
    readingTime: formString(formData, "readingTime"),
    featuredImage: formString(formData, "featuredImage"),
    featuredLabel: formString(formData, "featuredLabel"),
    tags: formString(formData, "tags"),
  });

  if (!parsed.success) returnWithError("invalid");

  const input = parsed.data;
  input.slug = await uniqueSlug(input.slug, input.id);
  const requestedDate = input.publishAt
    ? new Date(`${input.publishAt}:00+05:30`)
    : null;
  if (requestedDate && Number.isNaN(requestedDate.getTime())) {
    returnWithError("invalid");
  }

  if (input.status === "scheduled" && (!requestedDate || requestedDate <= new Date())) {
    returnWithError("schedule");
  }

  if (
    input.status === "published" &&
    requestedDate &&
    requestedDate > new Date()
  ) {
    returnWithError("schedule");
  }

  const publishAt =
    input.status === "draft"
      ? null
      : (requestedDate ?? new Date()).toISOString();
  const prisma = getPrismaClient();
  const existing = input.id
    ? await prisma.blogPost.findUnique({
        where: { id: input.id },
        select: { slug: true },
      })
    : null;
  if (input.id && !existing) returnWithError("not-found");

  const postFields = {
    slug: input.slug,
    title: input.title,
    excerpt: input.excerpt,
    seoTitle: input.seoTitle || null,
    seoDescription: input.seoDescription || null,
    previewContent: input.previewContent,
    category: input.category,
    authorName: input.authorName,
    authorPhoto: input.authorPhoto || null,
    access: input.access,
    status: input.status,
    publishedAt: publishAt ? new Date(publishAt) : new Date(),
    publishAt: publishAt ? new Date(publishAt) : null,
    readingTime: input.readingTime,
    featuredImage: input.featuredImage || null,
    featuredLabel: input.featuredLabel || null,
    tags: input.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean),
  };

  await prisma.$transaction(async (transaction) => {
    const post = input.id
      ? await transaction.blogPost.update({
          where: { id: input.id },
          data: postFields,
        })
      : await transaction.blogPost.create({ data: postFields });

    await transaction.blogArticleContent.upsert({
      where: { postId: post.id },
      create: { postId: post.id, content: input.content },
      update: { content: input.content },
    });
  });

  revalidatePath("/blog");
  revalidatePath("/blogs");
  revalidatePath("/sitemap.xml");
  revalidatePath(`/blogs/${input.slug}`);
  revalidatePath(`/blog/${input.slug}`);
  if (existing && existing.slug !== input.slug) {
    revalidatePath(`/blogs/${existing.slug}`);
    revalidatePath(`/blog/${existing.slug}`);
  }
  redirect("/admin/blogpanel?saved=1");
}

export async function deleteBlogPost(formData: FormData) {
  await requireAdmin();
  const id = formString(formData, "id");
  if (!id || id.length > 100) returnWithError("invalid");

  const prisma = getPrismaClient();
  const post = await prisma.blogPost.findUnique({
    where: { id },
    select: { slug: true },
  });
  if (!post) returnWithError("not-found");

  await prisma.blogPost.delete({ where: { id } });

  revalidatePath("/blog");
  revalidatePath("/blogs");
  revalidatePath("/sitemap.xml");
  revalidatePath(`/blogs/${post.slug}`);
  revalidatePath(`/blog/${post.slug}`);
  redirect("/admin/blogpanel?deleted=1");
}

