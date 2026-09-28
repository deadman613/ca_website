import type { Metadata } from "next";
import { courses } from "@/lib/data/courses";
import CourseDetailTemplate from "@/components/courses/CourseDetailTemplate";

export const metadata: Metadata = {
  title: "CA Foundation Course | Build Your Strongest Start",
  description:
    "Join our CA Foundation program with expert faculty, comprehensive 4-paper coverage, weekly mocks and dedicated doubt sessions. Build a rock-solid foundation for your CA journey.",
};

export default function FoundationPage() {
  const course = courses.find((c) => c.slug === "foundation")!;
  return <CourseDetailTemplate course={course} />;
}
