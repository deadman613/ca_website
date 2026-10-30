import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import CTASection from "@/components/home/CTASection";
import { Award, Target, Eye, TrendingUp, Users, BookOpen, Building } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Our Story, Mission & Vision",
  description:
    "Learn about Delhi CA School and its focus on structured CA preparation for aspirants in Delhi.",
};

const milestones = [
  {
    year: "01",
    title: "Build core concepts",
    description:
      "Start with the concepts and subject knowledge required for your current CA level.",
  },
  {
    year: "02",
    title: "Follow a study plan",
    description:
      "Organize preparation around the syllabus, your goals, and the time available before your exams.",
  },
  {
    year: "03",
    title: "Practice consistently",
    description:
      "Use questions and mock practice to strengthen understanding and identify topics for revision.",
  },
  {
    year: "04",
    title: "Review and revise",
    description:
      "Revisit key concepts, work on weaker areas, and prepare for the format of your CA examinations.",
  },
];

const achievements = [
  { icon: BookOpen, value: "CA", label: "Focused preparation" },
  { icon: Target, value: "3", label: "Course levels" },
  { icon: TrendingUp, value: "1", label: "Step at a time" },
  { icon: Users, value: "Delhi", label: "Local focus" },
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
              CA Coaching in Delhi
              <br />
              <span className="text-gold-light italic">From Foundation to Final.</span>
            </h1>
            <p className="text-white/60 text-lg leading-relaxed max-w-xl">
              Delhi CA School helps CA aspirants approach their studies with
              structure, clear course guidance, and exam-focused preparation.
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
                label="Our Approach"
                title="CA Preparation, Step by Step"
                align="left"
                className="mb-6"
              />
              <div className="space-y-4 text-secondary text-base leading-relaxed"
                style={{ color: "var(--text-secondary)" }}>
                <p>
                  Delhi CA School is focused on helping aspiring Chartered
                  Accountants navigate the CA course with clear information and
                  structured preparation at each stage.
                </p>
                <p>
                  From Foundation through Intermediate and Final, students can
                  explore course details, study resources, and guidance for their
                  preparation.
                </p>
                <p>
                  Our focus is to make the CA journey easier to understand and
                  help students plan their next step with confidence.
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
                To make CA preparation more structured and accessible for aspirants
                in Delhi, with clear guidance from registration through exam preparation.
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
                To be a trusted place for CA aspirants in Delhi to find course
                information, preparation resources, and guidance at every level.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <SectionHeading
            label="Study Approach"
            title="A Clearer Path Through CA Preparation"
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
              { icon: Building, title: "Course Guidance", desc: "Understand the Foundation, Intermediate, and Final stages and explore the right next step." },
              { icon: BookOpen, title: "Study Resources", desc: "Explore notes, practice materials, and exam resources for CA preparation." },
              { icon: Users, title: "Subject Support", desc: "Get guidance on topics, study plans, and the questions that come up during preparation." },
              { icon: TrendingUp, title: "Exam Preparation", desc: "Build a steady routine for practice, revision, and exam readiness." },
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
