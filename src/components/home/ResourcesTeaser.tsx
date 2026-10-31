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
      "Learn from experienced faculty who understand the CA and CS exam journey and what it takes to succeed.",
    tone: "bg-navy/5 text-navy",
  },
  {
    icon: ClipboardCheck,
    title: "Exam-Pattern Tests",
    description:
      "Practise with timed mock papers designed around exam patterns, with detailed solutions to learn from every attempt.",
    tone: "bg-gold/15 text-gold-muted",
  },
  {
    icon: NotebookPen,
    title: "Personal Evaluation",
    description:
      "Get your answers reviewed by faculty, with clear feedback to help you improve beyond self-scored MCQs.",
    tone: "bg-amber-50 text-amber-700",
  },
  {
    icon: BookOpenCheck,
    title: "Concise Study Notes",
    description:
      "Revise with focused notes, flowcharts, and exam callouts made to support quick, confident revision.",
    tone: "bg-emerald-50 text-emerald-700",
  },
  {
    icon: Video,
    title: "Recorded Lectures",
    description:
      "Study at your own pace. Pause, replay, and revisit recorded lessons whenever it suits your schedule.",
    tone: "bg-rose-50 text-rose-700",
  },
  {
    icon: MessageCircleQuestion,
    title: "Doubt Resolution",
    description:
      "Ask questions and get helpful explanations from faculty, so you can keep moving forward with clarity.",
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
            Expert teaching, focused practice, and the support you need at every
            stage of your preparation.
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
