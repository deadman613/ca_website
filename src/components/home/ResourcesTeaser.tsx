import {
  BookOpenCheck,
  ClipboardCheck,
  GraduationCap,
  MessageCircleQuestion,
  NotebookPen,
  Video,
  type LucideIcon,
} from "lucide-react";
import TiltCard from "@/components/motion/TiltCard";
import Reveal from "@/components/motion/Reveal";

const reasons: {
  icon: LucideIcon;
  title: string;
  description: string;
  tone: string;
}[] = [
  {
    icon: GraduationCap,
    title: "Rank-Holder Faculty",
    description:
      "Learn from faculty who have cleared these exams and teach them every day. Our faculty have helped 500+ students become CAs.",
    tone: "bg-navy/5 text-navy",
  },
  {
    icon: ClipboardCheck,
    title: "Exam-Pattern Tests",
    description:
      "Our CA test series and CA online test series give you timed papers based on the latest ICAI pattern, with detailed solutions. Papers are reviewed by faculty before release.",
    tone: "bg-gold/15 text-gold-muted",
  },
  {
    icon: NotebookPen,
    title: "Personal Evaluation",
    description:
      "Faculty check your answers and give written feedback. This improves your answer presentation, which MCQ scoring alone cannot do.",
    tone: "bg-amber-50 text-amber-700",
  },
  {
    icon: BookOpenCheck,
    title: "Concise Study Notes",
    description:
      "Notes, flowcharts and exam callouts for fast revision. Notes are revised after every ICAI update.",
    tone: "bg-emerald-50 text-emerald-700",
  },
  {
    icon: Video,
    title: "Recorded Lectures",
    description:
      "Pause, replay and revisit lessons at your own pace. Useful for working students and those preparing from other cities.",
    tone: "bg-rose-50 text-rose-700",
  },
  {
    icon: MessageCircleQuestion,
    title: "Doubt Resolution",
    description:
      "Ask questions during live lectures or in dedicated doubt sessions, and get clear explanations from faculty.",
    tone: "bg-sky-50 text-sky-700",
  },
];

export default function ResourcesTeaser() {
  return (
    <section className="section-padding bg-off-white">
      <div className="container-wide">
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
          <span className="section-label">Why Students Choose Us</span>
          <h2 className="mt-3 text-3xl font-bold leading-tight text-navy sm:text-4xl">
            Everything You Need to Crack CA &amp; CS
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-secondary sm:text-base">
            Many students compare options before choosing the best CA coaching
            for themselves. Here is what you get at Delhi CA School, a CA coaching
            institute and company secretary institute under one roof.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map(({ icon: Icon, title, description, tone }) => (
            <Reveal key={title}>
              <TiltCard className="rounded-2xl" tilt={3}>
                <article className="h-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                  <span className={`motion-feature-icon mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl ${tone}`}>
                    <Icon aria-hidden="true" size={20} strokeWidth={2.2} />
                  </span>
                  <h3 className="text-base font-semibold text-navy">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-secondary">
                    {description}
                  </p>
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
