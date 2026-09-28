import Link from "next/link";
import { CheckCircle2, Clock, Users, BookOpen, ArrowRight, Calendar } from "lucide-react";
import type { Course } from "@/lib/data/courses";
import SectionHeading from "@/components/ui/SectionHeading";
import CTASection from "@/components/home/CTASection";

interface CourseDetailPageProps {
  course: Course;
}

const levelBadgeColors = {
  Foundation: "bg-blue-100 text-blue-800",
  Intermediate: "bg-emerald-100 text-emerald-800",
  Final: "bg-amber-100 text-amber-800",
};

export default function CourseDetailTemplate({ course }: CourseDetailPageProps) {
  const badgeColor = levelBadgeColors[course.level];

  // Group subjects by group if applicable
  const groups: Record<string, typeof course.subjects> = {};
  const ungrouped: typeof course.subjects = [];
  course.subjects.forEach((subject) => {
    if (subject.group) {
      if (!groups[subject.group]) groups[subject.group] = [];
      groups[subject.group].push(subject);
    } else {
      ungrouped.push(subject);
    }
  });
  const hasGroups = Object.keys(groups).length > 0;

  return (
    <>
      {/* Hero */}
      <section className="bg-navy section-padding">
        <div className="container-wide">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-start">
            <div className="lg:flex-1">
              <span className={`text-xs font-semibold px-3 py-1.5 rounded mb-5 inline-block ${badgeColor}`}>
                {course.level}
              </span>
              <span className="section-label block mb-3">CA {course.level} Program</span>
              <h1 className="font-playfair text-white text-5xl lg:text-6xl font-bold leading-tight mb-4">
                {course.title}
              </h1>
              <p className="text-gold-light text-xl font-playfair italic mb-6">
                {course.tagline}
              </p>
              <p className="text-white/60 text-base leading-relaxed mb-8 max-w-lg">
                {course.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact#demo" className="btn-gold">
                  Book Free Demo
                </Link>
                <Link href="/contact" className="btn-outline-white">
                  Enquire Now
                </Link>
              </div>
            </div>

            {/* Quick info card */}
            <div className="bg-white/[0.06] border border-white/10 rounded-2xl p-7 lg:w-80 flex-shrink-0 w-full">
              <h3 className="text-white font-semibold mb-6 text-sm uppercase tracking-wide">
                Course Overview
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Clock size={16} className="text-gold" />
                  <div>
                    <span className="text-white/40 text-xs block">Duration</span>
                    <span className="text-white text-sm font-semibold">{course.duration}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <BookOpen size={16} className="text-gold" />
                  <div>
                    <span className="text-white/40 text-xs block">Subjects</span>
                    <span className="text-white text-sm font-semibold">{course.subjects.filter(s => !s.group || s.group).length} Papers</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users size={16} className="text-gold" />
                  <div>
                    <span className="text-white/40 text-xs block">Batch Options</span>
                    <span className="text-white text-sm font-semibold">{course.batches.length} batches available</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-gold mt-0.5" />
                  <div>
                    <span className="text-white/40 text-xs block">Eligibility</span>
                    <span className="text-white text-sm font-semibold leading-snug">{course.eligibility}</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-white/10">
                <span className="text-white/40 text-xs block mb-1">Starting Fee</span>
                <span className="text-gold font-playfair text-2xl font-bold">{course.fee.regular}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="py-14 bg-off-white border-b border-gray-100">
        <div className="container-wide">
          <div className="max-w-3xl">
            <span className="section-label mb-3 block">Eligibility</span>
            <h2 className="font-playfair text-navy text-3xl font-bold mb-4">
              Who Can Join?
            </h2>
            <p className="text-secondary text-base leading-relaxed"
              style={{ color: "var(--text-secondary)" }}>
              {course.eligibility}
            </p>
          </div>
        </div>
      </section>

      {/* Subjects */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <SectionHeading
            label="Syllabus"
            title="Subjects & Papers"
            subtitle="Complete coverage of all papers in the ICAI prescribed syllabus."
            align="left"
            className="mb-10"
          />

          {hasGroups ? (
            <div className="grid md:grid-cols-2 gap-8">
              {Object.entries(groups).map(([groupName, subjects]) => (
                <div key={groupName} className="bg-off-white rounded-xl p-6 border border-gray-100">
                  <h3 className="font-playfair text-navy text-xl font-bold mb-5">
                    {groupName}
                  </h3>
                  <div className="space-y-4">
                    {subjects.map((subject) => (
                      <div key={subject.code} className="flex items-start gap-4 p-4 bg-white rounded-lg border border-gray-100">
                        <div className="w-8 h-8 rounded bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-gold text-xs font-bold">
                            {subject.code.slice(-1)}
                          </span>
                        </div>
                        <div>
                          <h4 className="text-navy font-semibold text-sm mb-1">{subject.name}</h4>
                          {subject.description && (
                            <p className="text-secondary text-xs leading-relaxed"
                              style={{ color: "var(--text-secondary)" }}>
                              {subject.description}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {ungrouped.map((subject) => (
                <div key={subject.code} className="flex items-start gap-4 p-5 bg-off-white rounded-xl border border-gray-100 hover:border-gold/30 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-navy flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">
                      {subject.code.replace("Paper ", "P")}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-navy font-bold text-sm mb-1">{subject.name}</h4>
                    {subject.description && (
                      <p className="text-secondary text-xs leading-relaxed"
                        style={{ color: "var(--text-secondary)" }}>
                        {subject.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Batches */}
      <section className="section-padding bg-off-white">
        <div className="container-wide">
          <SectionHeading
            label="Batches"
            title="Batch Options"
            subtitle="Choose the batch schedule that works best for your timeline and availability."
            align="left"
            className="mb-10"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {course.batches.map((batch) => (
              <div
                key={batch.name}
                className={`bg-white rounded-xl p-6 border shadow-sm transition-all duration-200 hover:shadow-md ${
                  batch.type === "Fast Track"
                    ? "border-gold/30 ring-1 ring-gold/20"
                    : "border-gray-100"
                }`}
              >
                {batch.type === "Fast Track" && (
                  <span className="tag mb-3 inline-block">Fast Track</span>
                )}
                <h3 className="font-playfair text-navy text-xl font-bold mb-4">
                  {batch.name}
                </h3>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm">
                    <Clock size={14} className="text-gold flex-shrink-0" />
                    <span className="text-secondary" style={{ color: "var(--text-secondary)" }}>{batch.timing}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar size={14} className="text-gold flex-shrink-0" />
                    <span className="text-secondary" style={{ color: "var(--text-secondary)" }}>{batch.duration}</span>
                  </div>
                  {batch.seats && (
                    <div className="flex items-center gap-3 text-sm">
                      <Users size={14} className="text-gold flex-shrink-0" />
                      <span className="text-secondary" style={{ color: "var(--text-secondary)" }}>
                        {batch.seats} seats per batch
                      </span>
                    </div>
                  )}
                </div>
                <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                  <div>
                    <span className="text-muted text-xs block">Fee</span>
                    <span className="text-navy font-playfair text-xl font-bold">{batch.fee}</span>
                  </div>
                  <Link href="/contact#demo" className="btn-primary text-xs px-4 py-2">
                    Enrol Now <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <SectionHeading
                label="Included"
                title="Everything You Need to Succeed"
                align="left"
                className="mb-8"
              />
              <div className="space-y-4">
                {course.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-4 p-4 bg-off-white rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-gold/15 border border-gold/25 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 size={15} className="text-gold" />
                    </div>
                    <span className="text-navy font-medium text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-navy rounded-2xl p-8 text-white">
              <h3 className="font-playfair text-2xl font-bold mb-6">
                Fee Structure
              </h3>
              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between py-3 border-b border-white/10">
                  <span className="text-white/70 text-sm">Regular Batch</span>
                  <span className="text-gold font-playfair text-xl font-bold">{course.fee.regular}</span>
                </div>
                {course.fee.fastTrack && (
                  <div className="flex items-center justify-between py-3 border-b border-white/10">
                    <span className="text-white/70 text-sm">Fast Track Batch</span>
                    <span className="text-gold font-playfair text-xl font-bold">{course.fee.fastTrack}</span>
                  </div>
                )}
              </div>
              <div className="mb-8">
                <p className="text-white/50 text-xs mb-3 uppercase tracking-widest">Fee Includes</p>
                <div className="space-y-2">
                  {course.fee.includes.map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                      <span className="text-white/80 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Link href="/contact#demo" className="btn-gold w-full text-center block">
                Book Free Demo Class
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
