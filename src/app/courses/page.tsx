import type { Metadata } from "next";
import CoursesCatalog from "@/components/courses/CoursesCatalog";

export const metadata: Metadata = {
  title: "CA Courses in Delhi | Foundation, Intermediate & Final",
  description:
    "Explore CA Foundation, Intermediate, and Final course options with Delhi CA School.",
};

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ stream?: string | string[] }>;
}) {
  const { stream } = await searchParams;
  const initialStream = stream === "CS" || stream === "CA" ? stream : undefined;

  return <CoursesCatalog initialStream={initialStream} />;
}
