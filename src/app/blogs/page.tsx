import type { Metadata } from "next";
import BlogListing from "@/app/blog/BlogListing";
import { getVisibleBlogPosts } from "@/lib/blogs";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog | Exam Preparation, Study Strategy & Updates",
  description:
    "Study strategies, exam updates, and guidance for CA aspirants from Delhi CA School.",
  alternates: { canonical: "/blogs" },
};

export default async function BlogsPage() {
  const posts = await getVisibleBlogPosts();
  return <BlogListing posts={posts} />;
}
