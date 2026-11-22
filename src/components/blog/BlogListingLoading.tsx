export default function BlogListingLoading() {
  return (
    <main aria-label="Loading blog articles" className="animate-pulse">
      <section className="border-b border-[#e7e4dc] bg-off-white">
        <div className="container-wide py-16 md:py-24">
          <div className="h-4 w-48 rounded bg-gold/20" />
          <div className="mt-8 h-12 max-w-3xl rounded bg-navy/10" />
          <div className="mt-3 h-12 max-w-2xl rounded bg-navy/10" />
          <div className="mt-6 h-5 max-w-xl rounded bg-navy/5" />
        </div>
      </section>
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid gap-6 lg:grid-cols-3">
            {Array.from({ length: 6 }, (_, index) => (
              <article
                className="overflow-hidden rounded-2xl border border-slate-100 bg-white"
                key={index}
              >
                <div className="aspect-[16/10] bg-navy/10" />
                <div className="space-y-4 p-6">
                  <div className="h-4 w-24 rounded-full bg-gold/20" />
                  <div className="h-6 rounded bg-navy/10" />
                  <div className="h-4 rounded bg-navy/5" />
                  <div className="h-4 w-4/5 rounded bg-navy/5" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
