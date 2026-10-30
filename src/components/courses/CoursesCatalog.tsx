"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { courses } from "@/lib/data/courses";
import CTASection from "@/components/home/CTASection";
import StreamSwitcher from "@/components/layout/StreamSwitcher";
import { useStream } from "@/components/layout/StreamProvider";

const levelColors = {
  Foundation: { bg: "bg-blue-50", border: "border-blue-100", badge: "text-blue-700 bg-blue-100" },
  Intermediate: { bg: "bg-emerald-50", border: "border-emerald-100", badge: "text-emerald-700 bg-emerald-100" },
  Final: { bg: "bg-amber-50", border: "border-amber-100", badge: "text-amber-700 bg-amber-100" },
};

export default function CoursesCatalog() {
  const { stream } = useStream();
  const [activeLevel, setActiveLevel] = useState("all");
  const [mode, setMode] = useState("all");
  const [category, setCategory] = useState("all");
  const [subject, setSubject] = useState("all");
  const levels =
    stream === "CA"
      ? ["Foundation", "Intermediate", "Final"]
      : ["CSEET (Foundation)", "Executive", "Professional"];
  const selectedLevel = levels.includes(activeLevel) ? activeLevel : "all";
  const filteredCourses = useMemo(
    () =>
      courses.filter((course) => {
        if (stream !== "CA") return false;
        if (mode !== "all" || category !== "all") return false;
        if (selectedLevel !== "all" && course.level !== selectedLevel) return false;
        if (
          subject !== "all" &&
          !course.subjects.some((item) => item.code === subject)
        ) {
          return false;
        }
        return true;
      }),
    [category, mode, selectedLevel, stream, subject]
  );

  return (
    <>
      <section className="bg-navy section-padding">
        <div className="container-wide">
          <div className="max-w-3xl">
            <span className="section-label mb-4 block">All Programs</span>
            <div className="mb-5">
              <StreamSwitcher />
            </div>
            <h1 className="font-playfair text-white text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Your {stream} Journey
              <br />
              <span className="text-gold-light italic">Starts Here.</span>
            </h1>
            <p className="text-white/60 text-lg leading-relaxed max-w-xl">
              {stream === "CA"
                ? "Explore CA Foundation, Intermediate and Final programs designed to support every stage of your journey."
                : "Explore the CSEET (Foundation), Executive and Professional stages of the CS journey."}
            </p>
          </div>
        </div>
      </section>

      {stream === "CA" && <section className="bg-off-white py-10 border-b border-gray-100">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "3", label: "CA course levels" },
              { value: "CA", label: "Focused preparation" },
              { value: "Delhi", label: "Local course guidance" },
              { value: "1", label: "Step at a time" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-playfair text-navy text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-secondary text-sm" style={{ color: "var(--text-secondary)" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>}

      <section className="section-padding bg-white">
        <div className="container-wide">
          <SectionHeading
            label="Choose Your Stream and Level"
            title={`Find Your ${stream} Course`}
            subtitle="Choose a level, then narrow the results using the course filters."
            align="center"
            className="mb-14"
          />

          <div className="mb-10 rounded-2xl border border-gray-100 bg-off-white p-5 lg:p-7">
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span className="text-sm font-semibold text-navy">Level</span>
              <button
                type="button"
                onClick={() => setActiveLevel("all")}
                className={`rounded-full border px-4 py-2 text-sm font-medium ${selectedLevel === "all" ? "border-navy bg-navy text-white" : "border-gray-200 bg-white text-navy"}`}
              >
                All levels
              </button>
              {levels.map((level) => (
                <button
                  type="button"
                  key={level}
                  onClick={() => setActiveLevel(level)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium ${selectedLevel === level ? "border-navy bg-navy text-white" : "border-gray-200 bg-white text-navy"}`}
                >
                  {level}
                </button>
              ))}
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <label className="text-sm font-medium text-navy">
                Mode
                <select value={mode} onChange={(event) => setMode(event.target.value)} className="input-field mt-2 bg-white">
                  <option value="all">All modes</option>
                  <option>Face to face</option>
                  <option>Online / Live</option>
                  <option>Test series</option>
                  <option>Exam oriented</option>
                </select>
              </label>
              <label className="text-sm font-medium text-navy">
                Category
                <select value={category} onChange={(event) => setCategory(event.target.value)} className="input-field mt-2 bg-white">
                  <option value="all">All categories</option>
                  <option>Individual</option>
                  <option>Combo</option>
                </select>
              </label>
              <label className="text-sm font-medium text-navy">
                Subject
                <select value={subject} onChange={(event) => setSubject(event.target.value)} className="input-field mt-2 bg-white">
                  <option value="all">All subjects</option>
                  {Array.from(new Set(courses.flatMap((course) => course.subjects.map((item) => item.code)))).map((paper) => (
                    <option key={paper}>{paper}</option>
                  ))}
                </select>
              </label>
              <button
                type="button"
                onClick={() => {
                  setActiveLevel("all");
                  setMode("all");
                  setCategory("all");
                  setSubject("all");
                }}
                className="self-end rounded-md border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-navy hover:border-navy"
              >
                Clear filters
              </button>
            </div>
          </div>

          {stream === "CS" ? (
            <div className="grid gap-5 md:grid-cols-3">
              {levels
                .filter((level) => selectedLevel === "all" || selectedLevel === level)
                .map((level) => (
                  <article
                    id={level.toLowerCase().replace(/[()]/g, "").replace(/\s+/g, "-")}
                    key={level}
                    className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm"
                  >
                    <span className="section-label">{level}</span>
                    <h3 className="mt-3 font-playfair text-2xl font-bold text-navy">
                      {level === "CSEET (Foundation)" ? level : `CS ${level}`}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-secondary">
                      Course details and subject-wise offerings for this level are coming soon. Contact us to discuss your requirements.
                    </p>
                    <Link href="/contact#demo" className="btn-primary mt-6">
                      Enquire about this course <ArrowRight size={15} />
                    </Link>
                  </article>
                ))}
            </div>
          ) : (
            <div className="space-y-8 lg:space-y-10">
              {filteredCourses.map((course) => {
                const colors = levelColors[course.level];
                return (
                  <div key={course.id} className={`grid lg:grid-cols-3 gap-0 rounded-2xl overflow-hidden border ${colors.border} shadow-sm hover:shadow-md transition-shadow duration-300`}>
                    <div className={`${colors.bg} p-8 lg:p-10 flex flex-col justify-between`}>
                      <div>
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded mb-4 inline-block ${colors.badge}`}>{course.level}</span>
                        <div className="text-5xl mb-4">{course.icon}</div>
                        <h2 className="font-playfair text-navy text-3xl font-bold mb-3">{course.title}</h2>
                        <p className="text-secondary text-sm leading-relaxed mb-6" style={{ color: "var(--text-secondary)" }}>{course.description}</p>
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
                      <Link href={`/courses/${course.slug}`} className="btn-primary mt-8 inline-flex items-center gap-2 self-start">
                        View Details <ArrowRight size={15} />
                      </Link>
                    </div>
                    <div className="bg-white p-8 lg:p-10 border-l border-gray-100">
                      <h3 className="text-navy font-semibold text-sm mb-5 uppercase tracking-wider">Key Subjects</h3>
                      <div className="space-y-3">
                        {course.subjects.slice(0, 5).map((item) => (
                          <div key={item.code} className="flex items-start gap-3">
                            <div className="w-5 h-5 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                            </div>
                            <span className="text-navy text-sm font-medium">{item.name}</span>
                          </div>
                        ))}
                        {course.subjects.length > 5 && <p className="text-muted text-xs pl-8">+{course.subjects.length - 5} more subjects</p>}
                      </div>
                    </div>
                    <div className="bg-white p-8 lg:p-10 border-l border-gray-100">
                      <h3 className="text-navy font-semibold text-sm mb-5 uppercase tracking-wider">What&apos;s Included</h3>
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
          )}
          {stream === "CA" && filteredCourses.length === 0 && (
            <p className="py-12 text-center text-sm text-secondary">
              No course listings match these filters. Try clearing a filter or contact us
              to check current course availability.
            </p>
          )}
        </div>
      </section>
      <CTASection />
    </>
  );
}
