import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/data/blogs";
import { courses } from "@/lib/data/courses";

const BASE_URL = "https://caexcellence.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: `${BASE_URL}/`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1 },
    { url: `${BASE_URL}/courses`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${BASE_URL}/faculty`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${BASE_URL}/resources`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
  ];

  const coursePages = courses.map((course) => ({
    url: `${BASE_URL}/courses/${course.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const blogPages = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...coursePages, ...blogPages];
}
