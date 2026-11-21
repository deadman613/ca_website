const steps = [
  ["Counselling and demo", "Attend a CA coaching demo class and speak to a counsellor."],
  ["Classes", "Choose CA classes with live lectures, a classroom batch in Delhi, or recorded lectures."],
  ["Practice", "Weekly tests and chapter-wise practice."],
  ["Evaluation", "Faculty review your answers and give feedback."],
  ["Revision", "Join CA revision classes before the exam, with short notes and doubt sessions."],
];

export default function PreparationProcess() {
  return (
    <section className="section-padding bg-off-white">
      <div className="container-wide">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-navy sm:text-4xl">
            How Your Preparation Works with Us
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-secondary">
            Our content follows the ICAI and ICSI syllabus and is updated when the institutes
            announce changes. [Add: &quot;Reviewed by CA ____.&quot;]
          </p>
        </div>
        <ol className="mt-10 grid gap-4 md:grid-cols-5">
          {steps.map(([title, description], index) => (
            <li key={title} className="rounded-2xl border border-slate-200 bg-white p-5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy text-sm font-bold text-white">
                {index + 1}
              </span>
              <h3 className="mt-4 font-semibold text-navy">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-secondary">{description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
