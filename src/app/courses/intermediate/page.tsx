import type { Metadata } from "next";
import { courses } from "@/lib/data/courses";
import CourseDetailTemplate from "@/components/courses/CourseDetailTemplate";

export const metadata: Metadata = {
  title: "CA Intermediate Course | Develop Depth. Build Expertise.",
  description:
    "Comprehensive CA Intermediate coaching for both groups with subject-expert faculty, mock tests, articleship guidance and structured preparation for every paper.",
};

export default function IntermediatePage() {
  const course = courses.find((c) => c.slug === "intermediate")!;
  return <CourseDetailTemplate course={course} />;
}
