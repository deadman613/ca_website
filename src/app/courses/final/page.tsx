import type { Metadata } from "next";
import { courses } from "@/lib/data/courses";
import CourseDetailTemplate from "@/components/courses/CourseDetailTemplate";

export const metadata: Metadata = {
  title: "CA Final Course | Advanced Preparation. Exam Readiness.",
  description:
    "Expert CA Final coaching with advanced subject faculty, intensive revision program, 10-year past paper analysis and placement support. Clear CA Final in your first attempt.",
};

export default function FinalPage() {
  const course = courses.find((c) => c.slug === "final")!;
  return <CourseDetailTemplate course={course} />;
}
