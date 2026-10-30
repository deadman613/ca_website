"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import StreamSwitcher from "@/components/layout/StreamSwitcher";
import { useStream } from "@/components/layout/StreamProvider";

const courses = [
  {
    level: "Foundation",
    slug: "foundation",
    icon: "📚",
    number: "01",
    title: "CA Foundation",
    description:
      "Build strong fundamentals and develop the academic foundation required for the CA journey. Four structured papers covering accounting, law, mathematics and economics.",
    subjects: ["Accounts", "Business Laws", "Mathematics", "Economics"],
    duration: "4–5 Months",
    eligibility: "After Class XII",
    color: "from-blue-950 to-navy",
  },
  {
    level: "Intermediate",
    slug: "intermediate",
    icon: "⚖️",
    number: "02",
    title: "CA Intermediate",
    description:
      "Develop deeper subject knowledge with structured preparation and consistent practice. Group-wise preparation for six specialized papers.",
    subjects: ["Advanced Accounts", "Corporate Laws", "Taxation", "Auditing"],
    duration: "12–18 Months",
    eligibility: "After Foundation / Direct Entry",
    color: "from-slate-900 to-navy",
  },
  {
    level: "Final",
    slug: "final",
    icon: "🏆",
    number: "03",
    title: "CA Final",
    description:
      "Advanced preparation focused on exam readiness, strategic revision and peak performance. Eight papers covering the most advanced CA concepts.",
    subjects: ["Financial Reporting", "SFM", "Advanced Audit", "Direct Tax"],
    duration: "18–24 Months",
    eligibility: "After Intermediate + Articleship",
    color: "from-amber-950 to-navy",
  },
];

export default function CourseOverview() {
  const { stream } = useStream();
  const stages =
    stream === "CA"
      ? ["Foundation", "Intermediate", "Final"]
      : ["CSEET (Foundation)", "Executive", "Professional"];

  return (
    <section className="section-padding bg-off-white">
      <div className="container-wide">
        <SectionHeading
          label="Our Programs"
          title={`Choose Your ${stream} Journey`}
          subtitle={`Structured programs designed for every stage of your ${stream} preparation.`}
          align="center"
          className="mb-14"
        />

        <div className="mb-8 flex flex-col items-center gap-5">
          <StreamSwitcher />
          <p className="text-sm font-semibold text-navy">
            Where are you right now?
          </p>
          <div className="grid w-full gap-3 sm:grid-cols-3">
            {stages.map((stage) => (
              <Link
                key={stage}
                href={`/courses#${stage.toLowerCase().replace(/[()]/g, "").replace(/\s+/g, "-")}`}
                className="rounded-xl border border-gray-100 bg-white px-5 py-4 text-center font-semibold text-navy transition-colors hover:border-gold"
              >
                {stage}
                <span className="mt-1 block text-xs font-normal text-muted">
                  Explore {stream} courses
                </span>
              </Link>
            ))}
          </div>
        </div>

        {stream === "CA" ? (
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {courses.map((course) => (
            <div
              id={course.slug}
              key={course.slug}
              className="group relative bg-white border border-gray-100 rounded-xl overflow-hidden card-hover"
            >
              {/* Top colored band */}
              <div className={`h-1.5 bg-gradient-to-r ${course.color} w-full`} />

              <div className="p-7 lg:p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <span className="text-xs font-semibold text-gold tracking-widest uppercase mb-2 block">
                      {course.level}
                    </span>
                    <h3 className="font-playfair text-navy text-2xl font-bold">
                      {course.title}
                    </h3>
                  </div>
                  <div className="text-4xl ml-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    {course.icon}
                  </div>
                </div>

                {/* Description */}
                <p className="text-secondary text-sm leading-relaxed mb-6"
                  style={{ color: "var(--text-secondary)" }}>
                  {course.description}
                </p>

                {/* Meta */}
                <div className="flex gap-4 mb-6 pb-6 border-b border-gray-100">
                  <div>
                    <span className="text-muted text-xs block mb-0.5">Duration</span>
                    <span className="text-navy text-sm font-semibold">{course.duration}</span>
                  </div>
                  <div className="w-px bg-gray-100" />
                  <div>
                    <span className="text-muted text-xs block mb-0.5">Eligibility</span>
                    <span className="text-navy text-sm font-semibold">{course.eligibility}</span>
                  </div>
                </div>

                {/* Subjects */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {course.subjects.map((subject) => (
                    <span key={subject} className="tag">
                      {subject}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <Link
                  href={`/courses/${course.slug}`}
                  className="flex items-center justify-between w-full group/btn"
                >
                  <span className="text-navy text-sm font-semibold group-hover/btn:text-gold transition-colors">
                    View Details
                  </span>
                  <div className="w-8 h-8 rounded-full bg-navy group-hover/btn:bg-gold flex items-center justify-center transition-colors">
                    <ArrowRight size={14} className="text-white" />
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
        ) : (
          <p className="mx-auto max-w-2xl rounded-xl border border-gray-100 bg-white p-6 text-center text-sm text-secondary">
            CS course details are being prepared. Select a stage above to view
            course information or request a free demo.
          </p>
        )}

        {stream === "CA" && <div className="text-center mt-12">
          <Link href="/courses" className="btn-secondary">
            View All Courses
          </Link>
        </div>}
      </div>
    </section>
  );
}
