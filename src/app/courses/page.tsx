import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { courses } from "@/lib/data/courses";
import CTASection from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "CA Courses | Foundation, Intermediate & Final",
  description:
    "Explore our structured CA courses for Foundation, Intermediate and Final levels. Expert faculty, comprehensive study material, and dedicated support.",
};

const levelColors = {
  Foundation: { bg: "bg-blue-50", border: "border-blue-100", badge: "text-blue-700 bg-blue-100" },
  Intermediate: { bg: "bg-emerald-50", border: "border-emerald-100", badge: "text-emerald-700 bg-emerald-100" },
  Final: { bg: "bg-amber-50", border: "border-amber-100", badge: "text-amber-700 bg-amber-100" },
};

export default function CoursesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy section-padding">
        <div className="container-wide">
          <div className="max-w-3xl">
            <span className="section-label mb-4 block">All Programs</span>
            <h1 className="font-playfair text-white text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Your CA Journey
              <br />
              <span className="text-gold-light italic">Starts Here.</span>
            </h1>
            <p className="text-white/60 text-lg leading-relaxed max-w-xl">
              Three structured programs — Foundation, Intermediate and Final — each designed
              to build on the previous stage and prepare you for the next.
            </p>
          </div>
        </div>
      </section>

      {/* Overview Stats */}
      <section className="bg-off-white py-10 border-b border-gray-100">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "3", label: "Structured Programs" },
              { value: "5,000+", label: "Students Guided" },
              { value: "94%", label: "Pass Rate" },
              { value: "10+", label: "Years of Excellence" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-playfair text-navy text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-secondary text-sm" style={{ color: "var(--text-secondary)" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Cards */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <SectionHeading
            label="Choose Your Level"
            title="Three Paths. One Destination."
            subtitle="Select the program that matches your current stage in the CA journey."
            align="center"
            className="mb-14"
          />

          <div className="space-y-8 lg:space-y-10">
            {courses.map((course, idx) => {
              const colors = levelColors[course.level];
              return (
                <div
                  key={course.id}
                  className={`grid lg:grid-cols-3 gap-0 rounded-2xl overflow-hidden border ${colors.border} shadow-sm hover:shadow-md transition-shadow duration-300`}
                >
                  {/* Left info */}
                  <div className={`${colors.bg} p-8 lg:p-10 flex flex-col justify-between`}>
                    <div>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded mb-4 inline-block ${colors.badge}`}>
                        {course.level}
                      </span>
                      <div className="text-5xl mb-4">{course.icon}</div>
                      <h2 className="font-playfair text-navy text-3xl font-bold mb-3">
                        {course.title}
                      </h2>
                      <p className="text-secondary text-sm leading-relaxed mb-6"
                        style={{ color: "var(--text-secondary)" }}>
                        {course.description}
                      </p>
                      <div className="space-y-2">
                        <div className="flex gap-2 text-sm">
                          <span className="text-muted font-medium w-24 flex-shrink-0">Eligibility:</span>
                          <span className="text-navy font-semibold">{course.eligibility}</span>
                        </div>
                        <div className="flex gap-2 text-sm">
                          <span className="text-muted font-medium w-24 flex-shrink-0">Duration:</span>
                          <span className="text-navy font-semibold">{course.duration}</span>
                        </div>
                      </div>
                    </div>
                    <Link
                      href={`/courses/${course.slug}`}
                      className="btn-primary mt-8 inline-flex items-center gap-2 self-start"
                    >
                      View Details <ArrowRight size={15} />
                    </Link>
                  </div>

                  {/* Middle — Subjects */}
                  <div className="bg-white p-8 lg:p-10 border-l border-gray-100">
                    <h3 className="text-navy font-semibold text-sm mb-5 uppercase tracking-wider">
                      Key Subjects
                    </h3>
                    <div className="space-y-3">
                      {course.subjects.slice(0, 5).map((subject) => (
                        <div key={subject.code} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                          </div>
                          <span className="text-navy text-sm font-medium">{subject.name}</span>
                        </div>
                      ))}
                      {course.subjects.length > 5 && (
                        <p className="text-muted text-xs pl-8">
                          +{course.subjects.length - 5} more subjects
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Right — What's included */}
                  <div className="bg-white p-8 lg:p-10 border-l border-gray-100">
                    <h3 className="text-navy font-semibold text-sm mb-5 uppercase tracking-wider">
                      What's Included
                    </h3>
                    <div className="space-y-3">
                      {course.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-3">
                          <CheckCircle2 size={16} className="text-gold flex-shrink-0" />
                          <span className="text-navy text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
