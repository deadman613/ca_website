import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  Brain,
  Clock3,
  Play,
  Video,
} from "lucide-react";

const features = [
  {
    number: "01",
    icon: Video,
    title: "Learn from anywhere",
    description:
      "Get unlimited access to CA recorded lectures by our faculty. Watch, rewind and revise anytime, from any device. Lectures are updated after ICAI amendments, so you never study outdated rules.",
    label: "Recorded lectures",
  },
  {
    number: "02",
    icon: Clock3,
    title: "Finish the syllabus on time",
    description:
      "Every batch follows a published schedule, with the syllabus completed in time for focused revision before the exam.",
    label: "Time-bound batches",
  },
  {
    number: "03",
    icon: Brain,
    title: "Make learning stick",
    description:
      "Short concept blocks, practice after every topic and a recap before each new chapter help reinforce what you learn.",
    label: "Practice-led learning",
  },
  {
    number: "04",
    icon: BookOpenCheck,
    title: "Understand the why",
    description:
      "We teach the reasoning behind each rule, building conceptual clarity to help you tackle unfamiliar exam questions.",
    label: "Conceptual clarity",
  },
];

export default function HowWeTeach() {
  return (
    <section className="section-padding overflow-hidden bg-off-white">
      <div className="container-wide">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-16">
          <div>
            <span className="section-label inline-flex rounded-full border border-gold/30 bg-gold/10 px-4 py-2">
              Premium Learning
            </span>
            <h2 className="mt-5 text-3xl font-bold leading-tight text-navy sm:text-4xl lg:text-5xl">
              We don&apos;t hope for results.
              <span className="mt-1 block text-navy/65">
                We engineer them.
              </span>
              <span className="mt-1 block text-gold-muted">
                Every. Single. Year.
              </span>
            </h2>
          </div>
          <div className="lg:pb-1">
            <p className="max-w-xl text-lg font-semibold leading-relaxed text-navy sm:text-xl">
              There are many classes. We have a class of our own.
            </p>
            <p className="mt-3 max-w-xl text-sm leading-7 text-secondary sm:text-base">
              A learning system designed to make every lecture, practice session
              and revision count—from your first concept to exam day.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:gap-5">
          {features.map(({ number, icon: Icon, title, description, label }) => (
            <article
              key={number}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-lg sm:p-7"
            >
              <span
                aria-hidden="true"
                className="absolute right-5 top-3 text-5xl font-bold tracking-tight text-navy/[0.04] transition-colors group-hover:text-gold/10"
              >
                {number}
              </span>
              <div className="relative">
                <div className="flex items-center justify-between gap-4">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-navy/5 text-navy transition-colors group-hover:bg-navy group-hover:text-white">
                    <Icon aria-hidden="true" size={22} />
                  </span>
                  <span className="rounded-full bg-gold/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-gold-muted">
                    {label}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-bold text-navy">{title}</h3>
                <p className="mt-2 max-w-xl text-sm leading-6 text-secondary">
                  {description}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-6 rounded-2xl bg-navy px-6 py-7 text-white sm:px-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-light">
              Your next step
            </p>
            <p className="mt-2 text-lg font-semibold sm:text-xl">
              Find the right course and experience the learning approach.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/courses" className="btn-gold">
              Courses <ArrowRight aria-hidden="true" size={16} />
            </Link>
            <a
              href="https://www.youtube.com/@delhicaschool"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-white/30 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
            >
              <Play aria-hidden="true" size={15} />
              YouTube Channel
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
