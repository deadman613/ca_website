"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import type { BlogCategory, BlogPost } from "@/lib/data/blogs";
import { blogCategories } from "@/lib/data/blogs";
import StreamSwitcher from "@/components/layout/StreamSwitcher";
import { useStream } from "@/components/layout/StreamProvider";

const categoryColors: Record<string, string> = {
  "CA Foundation": "border-emerald-200 bg-emerald-50 text-emerald-700",
  "CA Inter":      "border-orange-200 bg-orange-50 text-orange-700",
  "CA Final":      "border-amber-200 bg-amber-50 text-amber-700",
  CSEET:           "border-blue-200 bg-blue-50 text-blue-700",
  "CS Executive":  "border-purple-200 bg-purple-50 text-purple-700",
  "CS Professional": "border-pink-200 bg-pink-50 text-pink-700",
  "Career guidance": "border-navy/20 bg-navy/5 text-navy",
  "Exam update":   "border-red-200 bg-red-50 text-red-700",
  "Study strategy": "border-sky-200 bg-sky-50 text-sky-700",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}


export default function BlogListing({ posts }: { posts: BlogPost[] }) {
  const { stream } = useStream();
  const [activeCategory, setActiveCategory] = useState<"all" | BlogCategory>("all");

  // Stream-filtered posts (used only for the featured card pick)
  const streamPosts =
    stream === "CA"
      ? posts.filter((post) =>
          ["CA Foundation", "CA Inter", "CA Final", "Career guidance", "Exam update", "Study strategy"].includes(post.category)
        )
      : posts.filter((post) =>
          ["CSEET", "CS Executive", "CS Professional", "Career guidance", "Exam update", "Study strategy"].includes(post.category)
        );

  // Featured = first stream post, only shown when there are 2+ total posts (so grid is never empty)
  const featured = posts.length > 1 ? streamPosts[0] : undefined;

  // Grid: "All" → ALL posts (minus featured if shown); specific category → filter all posts
  const listedPosts =
    activeCategory === "all"
      ? posts.filter((p) => !featured || p.id !== featured.id)
      : posts.filter((p) => p.category === activeCategory);

  return (
    <main>
      <section className="relative overflow-hidden border-b border-[#e7e4dc] bg-off-white">
        <div aria-hidden="true" className="absolute -right-32 -top-40 h-[30rem] w-[30rem] rounded-full border border-navy/5" />
        <div aria-hidden="true" className="absolute -right-12 -top-20 h-[22rem] w-[22rem] rounded-full border border-gold/20" />
        <div className="container-wide relative grid gap-12 py-16 md:py-24 lg:grid-cols-[1.4fr_0.6fr] lg:items-end lg:gap-16">
          <div className="max-w-3xl">
            <p className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold-muted">
              <Sparkles aria-hidden="true" size={15} />
              The Delhi CA School journal
            </p>
            <div className="mb-6">
              <StreamSwitcher className="border-gray-200 bg-white" />
            </div>
            <h1 className="mb-6 font-playfair text-4xl font-bold leading-[1.12] tracking-tight text-navy sm:text-5xl lg:text-6xl">
              Clarity for every step of your{" "}
              <span className="text-gold-muted">CA journey.</span>
            </h1>
            <p className="max-w-2xl text-base leading-7 text-secondary sm:text-lg">
              Practical study advice, exam updates, and guidance from people who know the path ahead.
            </p>
          </div>
          <div className="relative max-w-sm border-l-2 border-gold/70 pl-6 lg:justify-self-end">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted">Learn with direction</p>
            <p className="font-playfair text-xl font-semibold leading-relaxed text-navy sm:text-2xl">
              The right insight can make your next step feel simpler.
            </p>
            <span className="mt-5 block text-sm text-muted">
              {posts.length} {posts.length === 1 ? "article" : "articles"} total
            </span>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-wide">
          {activeCategory === "all" && featured && (
            <div className="mb-16">
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-8 bg-gold" />
                <p className="section-label">Editor&apos;s pick</p>
              </div>
              {/* Featured card — white + blue touch */}
              <Link
                className="group flex flex-col overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-blue-200"
                href={`/blogs/${featured.slug}`}
              >
                {/* Image on top — taller than small cards */}
                <div className="relative aspect-[16/7] overflow-hidden rounded-t-2xl bg-gradient-to-br from-blue-50 to-slate-100 sm:aspect-[16/6]">
                  {featured.featuredImage ? (
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                      style={{ backgroundImage: `url("${featured.featuredImage}")` }}
                    />
                  ) : (
                    <>
                      <span aria-hidden="true" className="absolute -right-10 -top-20 h-72 w-72 rounded-full border border-navy/10" />
                      <span aria-hidden="true" className="absolute -right-1 -top-11 h-52 w-52 rounded-full border border-gold/30" />
                      <span className="absolute inset-0 flex items-center justify-center select-none font-playfair text-9xl font-bold text-navy/10">CA</span>
                    </>
                  )}
                  {featured.access === "login_required" && (
                    <div className="absolute left-4 top-4 z-10">
                      <span className="rounded-full border border-navy/20 bg-white/90 px-3 py-1 text-xs font-semibold text-navy">
                        {featured.featuredLabel || "Members Only"}
                      </span>
                    </div>
                  )}
                </div>
                {/* Body */}
                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <p className="mb-3 text-sm text-slate-400">
                    {featured.author.name} · {featured.readingTime}
                  </p>
                  <div className="mb-2 flex items-start justify-between gap-3">
                    <h2 className="font-playfair text-2xl font-bold leading-snug text-navy transition-colors group-hover:text-gold-muted sm:text-3xl">
                      {featured.title}
                    </h2>
                    <ArrowRight aria-hidden="true" className="mt-1 shrink-0 text-navy/30 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-gold-muted" size={22} />
                  </div>
                  <p className="mb-5 text-sm leading-7 text-secondary sm:text-base">
                    {featured.excerpt}
                  </p>
                  {featured.access === "login_required" && (
                    <span className="mb-4 text-xs font-semibold text-amber-600">Login required</span>
                  )}
                  <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-blue-50 pt-4 text-sm">
                    <span className={`rounded-full border px-3 py-0.5 text-xs font-semibold ${categoryColors[featured.category] ?? "border-navy/20 bg-navy/5 text-navy"}`}>
                      {featured.category}
                    </span>
                    <span className="text-xs text-slate-400">{formatDate(featured.publishedAt)}</span>
                  </div>
                </div>
              </Link>
            </div>
          )}

          <div className="mb-8">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-gold-muted">Browse by topic</p>
            <h2 className="font-playfair text-2xl font-bold text-navy sm:text-3xl">Ideas for your next step</h2>
          </div>
          <div aria-label="Filter articles by category" className="mb-10 flex gap-2 overflow-x-auto pb-2" role="group">
            <button
              aria-pressed={activeCategory === "all"}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${activeCategory === "all" ? "border-navy bg-navy text-white" : "border-gray-200 bg-white text-navy hover:border-navy"}`}
              onClick={() => setActiveCategory("all")}
              type="button"
            >
              All articles
            </button>
            {blogCategories.map((category) => (
              <button
                aria-pressed={activeCategory === category}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${activeCategory === category ? "border-navy bg-navy text-white" : "border-gray-200 bg-white text-navy hover:border-navy"}`}
                key={category}
                onClick={() => setActiveCategory(category)}
                type="button"
              >
                {category}
              </button>
            ))}
          </div>

          {listedPosts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {listedPosts.map((post) => (
                <Link
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
                  href={`/blogs/${post.slug}`}
                  key={post.id}
                >
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden rounded-t-2xl bg-gradient-to-br from-blue-50 to-slate-100">
                    {post.featuredImage ? (
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                        style={{ backgroundImage: `url("${post.featuredImage}")` }}
                      />
                    ) : (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <svg className="h-14 w-14 text-navy/20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
                      </span>
                    )}
                  </div>
                  {/* Body */}
                  <div className="flex flex-1 flex-col p-5">
                    <p className="mb-2 text-xs text-slate-400">
                      {post.author.name} · {post.readingTime}
                    </p>
                    <div className="mb-1 flex items-start justify-between gap-2">
                      <h3 className="font-playfair text-base font-bold leading-snug text-navy transition-colors group-hover:text-gold-muted">
                        {post.title}
                      </h3>
                      <ArrowRight aria-hidden="true" className="mt-0.5 shrink-0 text-navy/30 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-gold-muted" size={16} />
                    </div>
                    <p className="mb-4 line-clamp-2 flex-1 text-sm leading-6 text-secondary">
                      {post.excerpt}
                    </p>
                    {post.access === "login_required" && (
                      <span className="mb-3 text-xs font-semibold text-amber-600">Login required</span>
                    )}
                    <div className="flex flex-wrap items-center gap-2 border-t border-blue-50 pt-3 text-xs">
                      <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${categoryColors[post.category] ?? "border-navy/20 bg-navy/5 text-navy"}`}>
                        {post.category}
                      </span>
                      <span className="text-slate-400">{formatDate(post.publishedAt)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-off-white px-6 py-16 text-center">
              <p className="font-playfair text-xl font-semibold text-navy">More insights are on the way.</p>
              <p className="mt-2 text-sm text-secondary">
                There are no articles in this category just yet.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
