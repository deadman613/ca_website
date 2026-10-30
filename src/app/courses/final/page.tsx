import type { Metadata } from "next";
import { courses } from "@/lib/data/courses";
import CourseDetailTemplate from "@/components/courses/CourseDetailTemplate";

export const metadata: Metadata = {
  title: "CA Final Classes in Delhi | Delhi CA School",
  description:
    "Explore CA Final preparation in Delhi, including course structure, subject coverage, and exam preparation guidance from Delhi CA School.",
};

export default function FinalPage() {
  const course = courses.find((c) => c.slug === "final")!;
  return <CourseDetailTemplate course={course} />;
}
