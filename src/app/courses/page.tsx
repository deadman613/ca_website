import type { Metadata } from "next";
import CoursesCatalog from "@/components/courses/CoursesCatalog";

export const metadata: Metadata = {
  title: "CA Courses in Delhi | Foundation, Intermediate & Final",
  description:
    "Explore CA Foundation, Intermediate, and Final course options with Delhi CA School.",
};

export default function CoursesPage() {
  return <CoursesCatalog />;
}
