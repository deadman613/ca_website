import Link from "next/link";

export default function ResultsSection() {
  return (
    <section id="our-results" className="section-padding bg-navy text-white">
      <div className="container-wide">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">500+ CAs Made, and Counting</h2>
          <p className="mt-4 text-sm text-white/70 sm:text-base">
            We share results students can verify. [Fill with real numbers only.]
          </p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            ["500+", "students have qualified as CAs after studying with us"],
            ["[_]", "students cleared CA [level] in the [May/Nov 20] attempt"],
            ["[___]", "students cleared CSEET / CS Executive / CS Professional in [attempt]"],
            ["Verified", "Result proof: [marksheet screenshots or gallery link]"],
          ].map(([value, label]) => (
            <article key={label} className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
              <strong className="block text-2xl text-gold-light">{value}</strong>
              <p className="mt-3 text-sm leading-relaxed text-white/75">{label}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/contact" className="btn-gold inline-flex">View Result Gallery</Link>
        </div>
      </div>
    </section>
  );
}
