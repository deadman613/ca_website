import type { BlogAuthor, BlogCategory } from "@/lib/data/seed-blogs";

export type { BlogAuthor, BlogCategory };

export type BlogAccess = "public" | "login_required";
export type BlogPublicationStatus = "draft" | "scheduled" | "published";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  seoTitle?: string;
  seoDescription?: string;
  previewContent: string;
  content?: string;
  category: BlogCategory;
  author: BlogAuthor;
  publishedAt: string;
  publishAt: string | null;
  status: BlogPublicationStatus;
  access: BlogAccess;
  readingTime: string;
  featuredImage?: string;
  featuredLabel?: string;
  tags: string[];
}

export const blogCategories: BlogCategory[] = [
  "CA Foundation",
  "CA Inter",
  "CA Final",
  "CSEET",
  "CS Executive",
  "CS Professional",
  "Career guidance",
  "Exam update",
  "Study strategy",
];
