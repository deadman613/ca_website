import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookOpenCheck,
  CalendarDays,
  Clock3,
  GraduationCap,
  Target,
} from "lucide-react";

const roadmap = [
  {
    stage: "After Class XII",
    timing: "Age [__]",
    detail: "Register and begin CA Foundation.",
    support: "CA Foundation coaching, 4 to 5 months.",
    icon: GraduationCap,
  },
  {
    stage: "Intermediate",
    timing: "Next stage",
    detail: "Prepare for both groups of CA Intermediate.",
    support: "CA Inter coaching and test series.",
    icon: BookOpenCheck,
  },
  {
    stage: "Articleship",
    timing: "Practical training",
    detail: "Complete practical training as per current ICAI rules.",
    support: "Articleship guidance.",
    icon: Clock3,
  },
  {
    stage: "Final",
    timing: "Final stage",
    detail: "Prepare for the CA Final examinations.",
    support: "CA Final coaching and revision classes.",
    icon: Target,
  },
  {
    stage: "Qualified CA",
    timing: "Target age [__]",
    detail: "Work towards becoming a qualified Chartered Accountant.",
    support: "A plan mapped to your schedule.",
    icon: Award,
  },
];

export default function USPSection() {
  return (
    <section
      id="why-delhi-ca-school"
      className="relative overflow-hidden bg-off-white py-20 sm:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-36 -top-40 h-96 w-96 rounded-full bg-gold/10 blur-3xl"
      />
      <div className="container-wide relative">
        <header className="mx-auto max-w-3xl text-center">
          <span className="section-label inline-flex rounded-full border border-gold/30 bg-gold/10 px-4 py-2">
            Why Delhi CA School
          </span>
          <h2 className="mt-5 text-3xl font-bold leading-tight text-navy sm:text-4xl lg:text-5xl">
            500+ CAs Made.
            <span className="mt-1 block text-navy/70">
              A path to become a CA before 21.
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-secondary sm:text-base">
            Most students lose years to wrong planning: late Foundation registration,
            gaps between levels and attempts wasted on weak preparation. At Delhi CA
            School, we plan your CA journey year by year, from CA Foundation coaching
            to CA Final coaching, so you can aim to become a Chartered Accountant
            before you turn 21.
          </p>
        </header>

        <div className="mx-auto mt-12 grid max-w-5xl gap-5 lg:grid-cols-2">
          <article className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-8">
            <div className="absolute right-0 top-0 h-32 w-32 rounded-bl-full bg-gold/10" />
            <div className="relative flex h-full flex-col">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gold/15 text-gold-muted">
                <Award aria-hidden="true" size={22} />
              </span>
              <p className="mt-5 text-5xl font-bold tracking-tight text-navy sm:text-6xl">
                500<span className="text-gold">+</span>
              </p>
              <h3 className="mt-1 text-xl font-semibold text-navy">CAs made</h3>
              <p className="mt-3 max-w-lg text-sm leading-6 text-secondary">
                Between [year] and [year], more than 500 of our students have become
                Chartered Accountants. [Add: gallery or list with name, attempt and
                year, with student permission.]
              </p>
              <Link
                href="/#our-results"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-gold-muted"
              >
                View Our CAs <ArrowRight aria-hidden="true" size={16} />
              </Link>
            </div>
          </article>

          <article className="relative overflow-hidden rounded-3xl bg-navy p-7 text-white shadow-lg shadow-navy/15 sm:p-8">
            <div
              aria-hidden="true"
              className="absolute -bottom-16 -right-12 h-56 w-56 rounded-full border-[32px] border-white/5"
            />
            <div className="relative flex h-full flex-col">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-gold-light">
                <CalendarDays aria-hidden="true" size={22} />
              </span>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-gold-light">
                Your plan, built around you
              </p>
              <h3 className="mt-2 text-2xl font-bold text-white">
                Become a CA before 21
              </h3>
              <p className="mt-3 text-sm leading-6 text-white/75">
                We start with your age and schedule, then build a plan around it:
                when to register, which attempt to target and when to start
                articleship. Time-bound batches, our CA test series and CA revision
                classes keep you on that plan.
              </p>
              <Link
                href="/contact#demo"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold-light transition-colors hover:text-white"
              >
                Get Your CA Roadmap <ArrowRight aria-hidden="true" size={16} />
              </Link>
            </div>
          </article>
        </div>

        <div className="mt-16">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="section-label">Your next steps</p>
              <h3 className="mt-2 text-2xl font-bold text-navy sm:text-3xl">
                The CA by 21 roadmap
              </h3>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-secondary">
              <CalendarDays aria-hidden="true" className="text-gold-muted" size={15} />
              A timeline planned around your attempt schedule
            </span>
          </div>

          <ol className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <span
              aria-hidden="true"
              className="absolute left-[10%] right-[10%] top-5 hidden h-px bg-gradient-to-r from-gold/30 via-gold to-gold/30 lg:block"
            />
            {roadmap.map(({ stage, timing, detail, support, icon: Icon }, index) => (
              <li
                key={stage}
                className="relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-transform duration-200 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-4 border-off-white bg-navy text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <Icon aria-hidden="true" className="text-gold-muted" size={20} />
                </div>
                <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-gold-muted">
                  {timing}
                </p>
                <h4 className="mt-1 text-base font-bold text-navy">{stage}</h4>
                <p className="mt-3 text-sm leading-5 text-secondary">{detail}</p>
                <p className="mt-4 border-t border-slate-100 pt-3 text-xs leading-5 text-muted">
                  <span className="font-semibold text-navy">Support: </span>
                  {support}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-10 flex flex-col items-center gap-5 rounded-2xl border border-gold/20 bg-white px-6 py-6 text-center shadow-sm sm:flex-row sm:justify-between sm:text-left">
          <p className="max-w-2xl text-xs leading-5 text-muted">
            Timelines depend on ICAI rules and on clearing each attempt. Our
            counsellors map your exact plan in a free session.
          </p>
          <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row">
            <Link href="/contact#demo" className="btn-primary">
              Book a Free Demo Class
            </Link>
            <Link href="/contact" className="btn-secondary">
              Talk to a Counsellor
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
