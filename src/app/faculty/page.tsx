import type { Metadata } from "next";
import FacultyDirectory from "@/components/faculty/FacultyDirectory";

export const metadata: Metadata = {
  title: "CA Faculty | Delhi CA School",
  description:
    "Meet the educators supporting CA aspirants at Foundation, Intermediate, and Final levels with Delhi CA School.",
};

export default function FacultyPage() {
  return <FacultyDirectory />;
}
