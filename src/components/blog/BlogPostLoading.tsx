export default function BlogPostLoading() {
  return (
    <main
      aria-label="Loading article"
      className="min-h-screen bg-[#eaf2ff] py-6 sm:py-10"
    >
      <div className="container-wide max-w-7xl animate-pulse">
        <div className="mb-5 h-4 w-56 rounded bg-navy/10" />
        <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
          <article className="overflow-hidden rounded-2xl border border-[#d6e4fa] bg-white p-5 shadow-sm sm:p-8 lg:p-10">
            <div className="h-3 w-28 rounded bg-navy/10" />
            <div className="mt-5 h-4 w-32 rounded-full bg-gold/20" />
            <div className="mt-5 h-10 max-w-2xl rounded bg-navy/10" />
            <div className="mt-3 h-10 max-w-xl rounded bg-navy/10" />
            <div className="mt-7 aspect-[16/7] rounded-xl bg-navy/10" />
            <div className="mt-8 h-12 rounded-xl bg-navy/5" />
            <div className="mt-8 space-y-4">
              <div className="h-4 rounded bg-navy/5" />
              <div className="h-4 rounded bg-navy/5" />
              <div className="h-4 w-5/6 rounded bg-navy/5" />
              <div className="h-36 rounded-xl bg-navy/5" />
              <div className="h-4 rounded bg-navy/5" />
              <div className="h-4 w-4/5 rounded bg-navy/5" />
            </div>
          </article>
          <aside className="hidden space-y-4 lg:block">
            <div className="h-48 rounded-2xl bg-white p-5 shadow-sm" />
            <div className="h-36 rounded-2xl bg-white p-5 shadow-sm" />
          </aside>
        </div>
      </div>
    </main>
  );
}
