import type { Metadata } from "next";
import { GraduationCap, Star, User } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { faculty } from "@/lib/data/faculty";
import CTASection from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "Our Faculty | Expert CA Educators",
  description:
    "Meet our experienced faculty team — qualified CAs with years of teaching and industry expertise across Foundation, Intermediate and Final levels.",
};

export default function FacultyPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy section-padding">
        <div className="container-wide">
          <div className="max-w-2xl">
            <span className="section-label mb-4 block">Our Educators</span>
            <h1 className="font-playfair text-white text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Learn From Those
              <br />
              <span className="text-gold-light italic">Who've Mastered It.</span>
            </h1>
            <p className="text-white/60 text-lg leading-relaxed">
              Every faculty member at CA Excellence is a qualified professional with
              deep subject expertise and a genuine commitment to student success.
            </p>
          </div>
        </div>
      </section>

      {/* Faculty Grid */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <SectionHeading
            label="Faculty Directory"
            title="Expert Faculty, Every Level"
            subtitle="Our faculty bring qualifications, industry experience and proven teaching methodology to every class."
            align="center"
            className="mb-14"
          />

          <div className="space-y-10">
            {faculty.map((member, idx) => (
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
