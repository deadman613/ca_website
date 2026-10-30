import type { Metadata } from "next";
import { courses } from "@/lib/data/courses";
import CourseDetailTemplate from "@/components/courses/CourseDetailTemplate";

export const metadata: Metadata = {
  title: "CA Intermediate Classes in Delhi | Delhi CA School",
  description:
    "Explore CA Intermediate preparation in Delhi, including course structure, subject coverage, and study guidance from Delhi CA School.",
};

export default function IntermediatePage() {
  const course = courses.find((c) => c.slug === "intermediate")!;
  return <CourseDetailTemplate course={course} />;
}
