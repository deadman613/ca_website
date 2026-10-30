import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import CourseOverview from "@/components/home/CourseOverview";
import HowWeTeach from "@/components/home/HowWeTeach";
import ResourcesTeaser from "@/components/home/ResourcesTeaser";
import FacultyHighlights from "@/components/home/FacultyHighlights";
import VideoTeaser from "@/components/home/VideoTeaser";
import FAQSection from "@/components/home/FAQSection";
import CTASection from "@/components/home/CTASection";
import DemoBookingSection from "@/components/home/DemoBookingSection";

export const metadata: Metadata = {
  title: "CA Coaching in Delhi | Delhi CA School",
  description:
    "Prepare for CA Foundation, Intermediate, and Final with Delhi CA School. Explore CA courses, faculty, study resources, and exam preparation guidance in Delhi.",
  openGraph: {
    title: "CA Coaching in Delhi | Delhi CA School",
    description:
      "Structured preparation guidance for CA Foundation, Intermediate, and Final in Delhi.",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <CourseOverview />
      <HowWeTeach />
      <ResourcesTeaser />
      <FacultyHighlights />
      <VideoTeaser />
      <FAQSection />
      <DemoBookingSection />
      <CTASection />
    </>
  );
}
