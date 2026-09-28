import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import CourseOverview from "@/components/home/CourseOverview";
import HowWeTeach from "@/components/home/HowWeTeach";
import ResourcesTeaser from "@/components/home/ResourcesTeaser";
import FacultyHighlights from "@/components/home/FacultyHighlights";
import VideoTeaser from "@/components/home/VideoTeaser";
import FAQSection from "@/components/home/FAQSection";
import CTASection from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "CA Excellence Institute | Premier CA Coaching in India",
  description:
    "Join CA Excellence Institute for expert CA Foundation, Intermediate and Final coaching. Structured programs, experienced faculty, comprehensive study material and dedicated doubt sessions.",
  openGraph: {
    title: "CA Excellence Institute | Premier CA Coaching",
    description:
      "Expert CA coaching for Foundation, Intermediate and Final. 5,000+ students guided with a 94% pass rate.",
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
      <CTASection />
    </>
  );
}
