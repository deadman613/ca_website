import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  ClipboardCheck,
  GraduationCap,
  NotebookPen,
  Video,
  type LucideIcon,
} from "lucide-react";

const reasons: {
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    icon: GraduationCap,
    title: "Rank-Holder Faculty",
    description:
      "Learn from faculty who have cleared these exams and teach them every day. Our faculty have helped 500+ students become CAs.",
  },
  {
    icon: ClipboardCheck,
    title: "Exam-Pattern Tests",
    description:
      "Our CA test series and CA online test series give you timed papers based on the latest ICAI pattern, with detailed solutions. Papers are reviewed by faculty before release.",
  },
  {
    icon: NotebookPen,
    title: "Personal Evaluation",
    description:
      "Faculty check your answers and give written feedback. This improves your answer presentation, which MCQ scoring alone cannot do.",
  },
  {
    icon: BookOpenCheck,
    title: "Concise Study Notes",
    description:
      "Notes, flowcharts and exam callouts for fast revision. Notes are revised after every ICAI update.",
  },
];

export default function ResourcesTeaser() {
  return (
    <section className="section-padding bg-white">
      <div className="container-wide">
        <header className="mb-10 max-w-3xl sm:mb-12">
          <span className="section-label">Why Students Choose Us</span>
          <h2 className="mt-3 text-3xl font-bold leading-tight text-navy sm:text-4xl lg:text-5xl">
            Everything You Need to Crack CA and CS
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-secondary sm:text-base">
            Many students compare options before choosing the best CA coaching for
            themselves. Here is what you get at Delhi CA School, a CA coaching
            institute and company secretary institute under one roof.
          </p>
        </header>

        <div className="grid gap-5 lg:grid-cols-[1.7fr_0.9fr]">
          <div className="grid gap-4 sm:grid-cols-2">
            {reasons.map(({ icon: Icon, title, description }) => (
              <article
                key={title}
                className="group rounded-2xl border border-slate-100 bg-slate-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:bg-white hover:shadow-lg sm:p-7"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-navy/20 bg-white text-navy transition-colors group-hover:border-gold group-hover:bg-gold/10 group-hover:text-gold-muted">
                  <Icon aria-hidden="true" size={20} strokeWidth={1.8} />
                </span>
                <h3 className="mt-6 text-xl font-semibold tracking-tight text-navy">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-secondary">
                  {description}
                </p>
              </article>
            ))}
          </div>

          <aside className="relative flex flex-col overflow-hidden rounded-2xl bg-navy p-7 text-white shadow-xl shadow-navy/15 sm:p-8 lg:p-9">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full border-[36px] border-white/[0.04]"
            />
            <div className="relative flex h-full flex-col">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/40 text-gold-light">
                <Video aria-hidden="true" size={20} strokeWidth={1.8} />
              </span>
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-gold-light">
                Learn on your schedule
              </p>
              <h3 className="mt-2 text-2xl font-semibold leading-snug text-white sm:text-3xl">
                Flexible learning, personal support
              </h3>
              <div className="mt-5 space-y-5 text-sm leading-6 text-white/75">
                <p>
                  <strong className="font-semibold text-white">Recorded Lectures:</strong>{" "}
                  Pause, replay and revisit lessons at your own pace. Useful for
                  working students and those preparing from other cities.
                </p>
                <p>
                  <strong className="font-semibold text-white">Doubt Resolution:</strong>{" "}
                  Ask questions during live lectures or in dedicated doubt
                  sessions, and get clear explanations from faculty.
                </p>
              </div>
              <div className="mt-8 border-t border-white/15 pt-6">
                <p className="text-sm leading-6 text-white/70">
                  See how our classes and support fit your CA or CS preparation.
                </p>
                <Link
                  href="/contact#demo"
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-semibold text-navy transition-all hover:-translate-y-0.5 hover:bg-gold-light"
                >
                  Book a Free Demo
                  <ArrowRight aria-hidden="true" size={16} />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
