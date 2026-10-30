"use client";

import { useMemo, useState } from "react";
import { GraduationCap, Star } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { faculty } from "@/lib/data/faculty";
import CTASection from "@/components/home/CTASection";
import StreamSwitcher from "@/components/layout/StreamSwitcher";
import { useStream } from "@/components/layout/StreamProvider";

export default function FacultyDirectory() {
  const { stream } = useStream();
  const [subject, setSubject] = useState("all");
  const subjects = Array.from(new Set(faculty.flatMap((member) => member.subjects)));
  const filteredFaculty = useMemo(
    () =>
      stream === "CA"
        ? faculty.filter(
            (member) =>
              subject === "all" || member.subjects.includes(subject)
          )
        : [],
    [stream, subject]
  );
  const subjectGroups = subjects
    .filter((item) => subject === "all" || item === subject)
    .map((item) => ({
      subject: item,
      members: filteredFaculty.filter((member) => member.subjects.includes(item)),
    }));

  return (
    <>
      {/* Hero */}
      <section className="bg-navy section-padding">
        <div className="container-wide">
          <div className="max-w-2xl">
            <span className="section-label mb-4 block">Our Educators</span>
            <div className="mb-5">
              <StreamSwitcher />
            </div>
            <h1 className="font-playfair text-white text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Learn From Those
              <br />
              <span className="text-gold-light italic">Who&apos;ve Mastered It.</span>
            </h1>
            <p className="text-white/60 text-lg leading-relaxed">
              Meet our {stream} faculty by subject and level.
            </p>
          </div>
        </div>
      </section>

      {/* Faculty Grid */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <SectionHeading
            label="Faculty Directory"
            title={`Expert ${stream} Faculty`}
            subtitle="Choose a subject to find the faculty teaching that paper."
            align="center"
            className="mb-14"
          />

          {stream === "CA" && (
            <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setSubject("all")}
                className={`rounded-full border px-4 py-2 text-sm font-semibold ${subject === "all" ? "border-navy bg-navy text-white" : "border-gray-200 text-navy"}`}
              >
                All subjects
              </button>
              {subjects.map((item) => (
                <button
                  type="button"
                  key={item}
                  onClick={() => setSubject(item)}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold ${subject === item ? "border-navy bg-navy text-white" : "border-gray-200 text-navy"}`}
                >
                  {item}
                </button>
              ))}
            </div>
          )}

          {stream === "CA" && (
            <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {subjectGroups.map((group) => (
                <div
                  key={group.subject}
                  className="rounded-xl border border-gray-100 bg-off-white p-5"
                >
                  <h3 className="mb-3 font-semibold text-navy">{group.subject}</h3>
                  <ul className="space-y-2 text-sm text-secondary">
                    {group.members.map((member) => (
                      <li key={member.id}>{member.name}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {stream === "CS" && (
            <p className="mb-8 rounded-xl border border-gray-100 bg-off-white p-6 text-center text-sm text-secondary">
              CS faculty details are being finalized. Contact us to learn about
              upcoming CS batches.
            </p>
          )}

          <div className="space-y-10">
            {filteredFaculty.map((member, idx) => (
              <div
                key={member.id}
                className={`grid lg:grid-cols-3 gap-0 rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 ${
                  idx % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Photo Panel */}
                <div className="bg-gradient-to-br from-navy to-navy-light relative overflow-hidden min-h-64 lg:min-h-0">
                  <div className="absolute inset-0 opacity-5">
                    <div
                      className="w-full h-full"
                      style={{
                        backgroundImage: `repeating-linear-gradient(
                          45deg, white 0, white 1px, transparent 0, transparent 50%
                        )`,
                        backgroundSize: "20px 20px",
                      }}
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-28 h-28 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center mx-auto mb-4">
                        <span className="font-playfair text-white text-4xl font-bold">
                          {member.name
                            .split(" ")
                            .slice(1)
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <p className="text-gold text-sm font-semibold">{member.experience}</p>
                    </div>
                  </div>
                  {/* Gold bottom line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gold" />
                </div>

                {/* Main Info */}
                <div className="bg-white p-8 border-l border-gray-100">
                  <div className="mb-5">
                    <h2 className="font-playfair text-navy text-2xl font-bold mb-1">
                      {member.name}
                    </h2>
                    <p className="text-gold text-sm font-semibold uppercase tracking-wide mb-2">
                      {member.designation}
                    </p>
                    <div className="flex items-center gap-2 mb-3">
                      <GraduationCap size={14} className="text-muted" />
                      <span className="text-secondary text-sm"
                        style={{ color: "var(--text-secondary)" }}>
                        {member.qualification}
                      </span>
                    </div>
                  </div>
                  <p className="text-secondary text-sm leading-relaxed mb-5"
                    style={{ color: "var(--text-secondary)" }}>
                    {member.bio}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {member.subjects.map((subject) => (
                      <span key={subject} className="tag">{subject}</span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {member.level.map((level) => (
                      <span key={level} className="tag-navy">{level}</span>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div className="bg-off-white p-8 border-l border-gray-100">
                  <h3 className="font-semibold text-navy text-sm uppercase tracking-wider mb-5">
                    Achievements
                  </h3>
                  <div className="space-y-3 mb-6">
                    {member.achievements.map((achievement) => (
                      <div key={achievement} className="flex items-start gap-3">
                        <Star size={13} className="text-gold flex-shrink-0 mt-0.5 fill-gold" />
                        <span className="text-navy text-sm">{achievement}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-auto">
                    <p className="text-muted text-xs font-medium mb-3 uppercase tracking-wide"
                      style={{ color: "var(--text-muted)" }}>
                      Teaching Philosophy
                    </p>
                    <blockquote className="text-secondary text-sm italic leading-relaxed border-l-2 border-gold pl-3"
                      style={{ color: "var(--text-secondary)" }}>
                      &ldquo;{member.philosophy}&rdquo;
                    </blockquote>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
