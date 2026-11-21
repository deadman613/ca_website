import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import CourseOverview from "@/components/home/CourseOverview";
import HowWeTeach from "@/components/home/HowWeTeach";
import ResourcesTeaser from "@/components/home/ResourcesTeaser";
import FacultyHighlights from "@/components/home/FacultyHighlights";
import StudentReviewsWithVideos from "@/components/home/StudentReviewsWithVideos";
import RecentBlogSection from "@/components/home/RecentBlogSection";
import CompetitorSection from "@/components/home/CompetitorSection";
import PodcastSection from "@/components/home/PodcastSection";
import FAQSection from "@/components/home/FAQSection";
import CTASection from "@/components/home/CTASection";
import DemoBookingSection from "@/components/home/DemoBookingSection";
import USPSection from "@/components/home/USPSection";
import ResultsSection from "@/components/home/ResultsSection";
import PreparationProcess from "@/components/home/PreparationProcess";
import Reveal from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "CA Coaching in Delhi | CA & CS Online Classes | Delhi CA School",
  description:
    "500+ CAs made. Join Delhi CA School for CA Foundation, Inter, Final and CS coaching with live lectures, test series and a free demo class.",
  openGraph: {
    title: "CA Coaching in Delhi | CA & CS Online Classes | Delhi CA School",
    description:
      "500+ CAs made. Join Delhi CA School for CA Foundation, Inter, Final and CS coaching with live lectures, test series and a free demo class.",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Reveal><CourseOverview /></Reveal>
      <Reveal><USPSection /></Reveal>
      <Reveal><HowWeTeach /></Reveal>
      <Reveal><ResourcesTeaser /></Reveal>
      <Reveal><FacultyHighlights /></Reveal>
      <Reveal><ResultsSection /></Reveal>
      {/* 1 — Student reviews with video testimonials */}
      <Reveal><StudentReviewsWithVideos /></Reveal>
      <Reveal><PreparationProcess /></Reveal>
      {/* 2 — Recent blog posts with author */}
      <RecentBlogSection />
      {/* 3 — Competitor comparison */}
      <Reveal><CompetitorSection /></Reveal>
      {/* 4 — Podcast with CA founder */}
      <Reveal><PodcastSection /></Reveal>
      <Reveal><FAQSection /></Reveal>
      <Reveal><DemoBookingSection /></Reveal>
      <Reveal><CTASection /></Reveal>
    </>
  );
}
