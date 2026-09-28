import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import CTASection from "@/components/home/CTASection";
import { Award, Target, Eye, TrendingUp, Users, BookOpen, Building } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Our Story, Mission & Vision",
  description:
    "Learn about CA Excellence Institute — our founding story, mission to deliver academic excellence, vision for CA education, and the milestones that define our journey.",
};

const milestones = [
  {
    year: "2015",
    title: "Institute Founded",
    description:
      "CA Excellence Institute was established with a clear mission: to provide structured, expert-guided CA coaching that genuinely transforms outcomes.",
  },
  {
    year: "2017",
    title: "First Rank Holders",
    description:
      "Within two years of founding, our students began appearing in ICAI All India Rankings — validating our rigorous methodology.",
  },
  {
    year: "2019",
    title: "1,000+ Students Guided",
    description:
      "A major milestone — over a thousand students enrolled and successfully guided through various CA levels.",
  },
  {
    year: "2021",
    title: "Expanded Faculty Team",
    description:
      "Added four specialist faculty members with expertise in Advanced Accounts, Auditing, and Strategic Financial Management.",
  },
  {
    year: "2023",
    title: "New Learning Centre",
    description:
      "Inaugurated our expanded campus with modern classrooms, a dedicated library, and digital learning infrastructure.",
  },
  {
    year: "2024",
    title: "5,000+ Students",
    description:
      "Reached the landmark of 5,000 students guided across all CA levels with a 94% pass rate in batch students.",
  },
];

const achievements = [
  { icon: Users, value: "5,000+", label: "Students Guided" },
  { icon: TrendingUp, value: "94%", label: "Pass Rate" },
  { icon: Award, value: "15+", label: "AIR Holders" },
  { icon: BookOpen, value: "10+", label: "Years of Excellence" },
];

const values = [
  {
    icon: Target,
    title: "Academic Rigour",
    description:
      "We do not take shortcuts in teaching. Every concept is covered with depth, structure and clarity.",
  },
  {
    icon: Users,
    title: "Student First",
    description:
      "Every decision — from batch sizes to doubt-session frequency — is made with one priority: student outcomes.",
  },
  {
    icon: Award,
    title: "Expert Faculty",
    description:
      "We partner only with faculty who bring both professional qualification and proven teaching excellence.",
  },
  {
    icon: TrendingUp,
    title: "Consistent Results",
    description:
      "Our structured methodology delivers consistent results — not just for toppers but for every sincere student.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy section-padding">
        <div className="container-wide">
          <div className="max-w-3xl">
            <span className="section-label mb-4 block">Our Story</span>
            <h1 className="font-playfair text-white text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Building CA Careers
              <br />
              <span className="text-gold-light italic">Since 2015.</span>
            </h1>
            <p className="text-white/60 text-lg leading-relaxed max-w-xl">
              CA Excellence was founded with a belief that every serious CA aspirant deserves
              structured, expert guidance — not just content delivery, but genuine education
              that builds careers.
            </p>
          </div>
        </div>
      </section>

      {/* Achievement Stats */}
      <section className="bg-gold py-12">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="text-center">
                  <Icon size={22} className="text-navy/60 mx-auto mb-3" />
                  <div className="font-playfair text-navy text-4xl font-bold mb-1">
                    {item.value}
                  </div>
                  <div className="text-navy/70 text-sm font-semibold">{item.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <SectionHeading
                label="Our Story"
                title="How We Started"
                align="left"
                className="mb-6"
              />
              <div className="space-y-4 text-secondary text-base leading-relaxed"
                style={{ color: "var(--text-secondary)" }}>
                <p>
                  CA Excellence Institute was founded in 2015 by a group of qualified
                  Chartered Accountants who had observed a significant gap in CA coaching:
                  institutes were either overwhelmingly large and impersonal, or too small
                  to offer quality faculty across all subjects.
                </p>
                <p>
                  Our founders envisioned a structured, faculty-led institute that combined
                  the personal attention of a small setup with the academic rigour and
                  breadth of a large one. The result was CA Excellence — a premium coaching
                  institute built on systems, not just instruction.
                </p>
                <p>
                  Over the decade since our founding, we have refined our curriculum,
                  expanded our faculty team, and built a track record of consistent results
                  that speaks for itself: 5,000+ students guided, 15+ All India Rank
                  holders, and a 94% pass rate among our batch students.
                </p>
              </div>
            </div>
            <div className="bg-off-white rounded-2xl p-8 lg:p-10 border border-gray-100">
              <h3 className="font-playfair text-navy text-2xl font-bold mb-6">
                Our Values
              </h3>
              <div className="space-y-6">
                {values.map((value) => {
                  const Icon = value.icon;
                  return (
                    <div key={value.title} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-gold/15 border border-gold/25 flex items-center justify-center flex-shrink-0">
                        <Icon size={18} className="text-gold" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-navy mb-1">{value.title}</h4>
                        <p className="text-secondary text-sm leading-relaxed"
                          style={{ color: "var(--text-secondary)" }}>
                          {value.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-navy">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <div className="bg-white/[0.06] border border-white/10 rounded-2xl p-8 lg:p-10">
              <div className="w-12 h-12 rounded-lg bg-gold/20 border border-gold/30 flex items-center justify-center mb-6">
                <Target size={22} className="text-gold" />
              </div>
              <span className="section-label mb-3 block">Our Mission</span>
              <h2 className="font-playfair text-white text-3xl font-bold mb-4">
                Why We Exist
              </h2>
              <p className="text-white/60 leading-relaxed">
                To provide structured, expert-guided CA education that gives every sincere
                aspirant a genuine opportunity to clear the CA examination and build a
                rewarding professional career — regardless of their starting point.
              </p>
            </div>
            <div className="bg-white/[0.06] border border-white/10 rounded-2xl p-8 lg:p-10">
              <div className="w-12 h-12 rounded-lg bg-gold/20 border border-gold/30 flex items-center justify-center mb-6">
                <Eye size={22} className="text-gold" />
              </div>
              <span className="section-label mb-3 block">Our Vision</span>
              <h2 className="font-playfair text-white text-3xl font-bold mb-4">
                Where We&apos;re Going
              </h2>
              <p className="text-white/60 leading-relaxed">
                To become India&apos;s most trusted CA coaching institute — known not just for
                results, but for the quality of education, the character of our faculty,
                and the genuine success of our students in their professional lives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <SectionHeading
            label="Our Journey"
            title="Key Milestones"
            align="center"
            className="mb-14"
          />

          <div className="relative">
            {/* Center line */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-1/2" />

            <div className="space-y-8 lg:space-y-0">
              {milestones.map((milestone, idx) => (
                <div
                  key={milestone.year}
                  className={`lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center ${
                    idx % 2 === 0 ? "" : "lg:flex-row-reverse"
                  }`}
                >
                  {idx % 2 === 0 ? (
                    <>
                      <div className="lg:text-right mb-4 lg:mb-0 pr-8">
                        <span className="font-playfair text-gold text-4xl font-bold block mb-2">
                          {milestone.year}
                        </span>
                        <h3 className="font-playfair text-navy text-xl font-bold mb-2">
                          {milestone.title}
                        </h3>
                        <p className="text-secondary text-sm leading-relaxed"
                          style={{ color: "var(--text-secondary)" }}>
                          {milestone.description}
                        </p>
                      </div>
                      {/* Center dot */}
                      <div className="hidden lg:flex items-center">
                        <div className="w-4 h-4 rounded-full bg-gold border-4 border-gold/30 -ml-2 flex-shrink-0 z-10" />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="hidden lg:flex justify-end items-center">
                        <div className="w-4 h-4 rounded-full bg-gold border-4 border-gold/30 -mr-2 flex-shrink-0 z-10" />
                      </div>
                      <div className="mb-4 lg:mb-0 pl-8">
                        <span className="font-playfair text-gold text-4xl font-bold block mb-2">
                          {milestone.year}
                        </span>
                        <h3 className="font-playfair text-navy text-xl font-bold mb-2">
                          {milestone.title}
                        </h3>
                        <p className="text-secondary text-sm leading-relaxed"
                          style={{ color: "var(--text-secondary)" }}>
                          {milestone.description}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Infrastructure */}
      <section className="section-padding bg-off-white">
        <div className="container-wide">
          <SectionHeading
            label="Our Campus"
            title="Infrastructure & Facilities"
            align="center"
            className="mb-12"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Building, title: "Modern Classrooms", desc: "Air-conditioned classrooms with smart boards and excellent acoustics for focused learning." },
              { icon: BookOpen, title: "Study Library", desc: "Dedicated library with ICAI material, reference books and quiet study spaces." },
              { icon: Users, title: "Doubt-Solving Desk", desc: "On-campus doubt resolution by faculty — available every day during institute hours." },
              { icon: TrendingUp, title: "Digital Portal", desc: "Online access to recorded lectures, notes, tests and resources anytime, anywhere." },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="bg-white rounded-xl p-6 border border-gray-100 card-hover">
                  <div className="w-10 h-10 rounded-lg bg-gold/15 border border-gold/20 flex items-center justify-center mb-4">
                    <Icon size={18} className="text-gold" />
                  </div>
                  <h3 className="font-playfair text-navy font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-secondary text-sm leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}>
                    {item.desc}
                  </p>
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
