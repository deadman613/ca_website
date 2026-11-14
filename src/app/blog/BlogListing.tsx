"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, Sparkles, User } from "lucide-react";
import type { BlogCategory, BlogPost } from "@/lib/data/blogs";
import { blogCategories } from "@/lib/data/blogs";
import StreamSwitcher from "@/components/layout/StreamSwitcher";
import { useStream } from "@/components/layout/StreamProvider";

const categoryColors: Record<string, string> = {
  "CA Foundation": "text-emerald-700 bg-emerald-50 border-emerald-200",
  "CA Inter": "text-orange-700 bg-orange-50 border-orange-200",
  "CA Final": "text-amber-700 bg-amber-50 border-amber-200",
  CSEET: "text-blue-700 bg-blue-50 border-blue-200",
  "CS Executive": "text-purple-700 bg-purple-50 border-purple-200",
  "CS Professional": "text-pink-700 bg-pink-50 border-pink-200",
  "Career guidance": "text-gray-700 bg-gray-50 border-gray-200",
  "Exam update": "text-red-700 bg-red-50 border-red-200",
  "Study strategy": "text-blue-700 bg-blue-50 border-blue-200",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function FeaturedImage({ post, large = false }: { post: BlogPost; large?: boolean }) {
  return (
    <div
      aria-label={post.featuredImage ? `Featured image for ${post.title}` : undefined}
      className={`group/image relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-navy to-[#071b4d] ${
        large ? "min-h-64 lg:min-h-[420px]" : "aspect-[16/10]"
      }`}
      role={post.featuredImage ? "img" : undefined}
    >
      {post.featuredImage ? (
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover/image:scale-105"
          style={{ backgroundImage: `url("${post.featuredImage}")` }}
        />
      ) : (
        <>
          <span aria-hidden="true" className="absolute -right-10 -top-20 h-72 w-72 rounded-full border border-white/10" />
          <span aria-hidden="true" className="absolute -right-1 -top-11 h-52 w-52 rounded-full border border-gold/30" />
          <span className={`select-none font-playfair font-bold text-white/15 ${large ? "text-9xl" : "text-7xl"}`}>CA</span>
        </>
      )}
      <div className="absolute left-4 top-4 z-10 flex flex-wrap gap-2">
        <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${categoryColors[post.category]}`}>
          {post.category}
        </span>
        {post.access === "login_required" && (
          <span className="rounded-full border border-white/30 bg-navy/85 px-3 py-1 text-xs font-semibold text-white">
            {post.featuredLabel || "Members Only"}
          </span>
        )}
      </div>
    </div>
  );
}

export default function BlogListing({ posts }: { posts: BlogPost[] }) {
  const { stream } = useStream();
  const [activeCategory, setActiveCategory] = useState<"all" | BlogCategory>("all");
  const streamPosts =
    stream === "CA"
      ? posts.filter((post) =>
          ["CA Foundation", "CA Inter", "CA Final", "Career guidance", "Exam update", "Study strategy"].includes(post.category)
        )
      : posts.filter((post) =>
          ["CSEET", "CS Executive", "CS Professional", "Career guidance", "Exam update", "Study strategy"].includes(post.category)
        );
  const filtered =
    activeCategory === "all"
      ? streamPosts
      : streamPosts.filter((post) => post.category === activeCategory);
  const featured = streamPosts[0];
  const listedPosts = activeCategory === "all" ? streamPosts.slice(1) : filtered;

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
              {streamPosts.length} {streamPosts.length === 1 ? "article" : "articles"} for {stream} students
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
              <Link
                className="group grid overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl lg:grid-cols-2"
                href={`/blogs/${featured.slug}`}
              >
                <FeaturedImage large post={featured} />
                <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
                  <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-gold-muted">Featured article</p>
                  <h2 className="mb-4 font-playfair text-2xl font-bold leading-snug text-navy transition-colors group-hover:text-gold-muted sm:text-3xl">
                    {featured.title}
                  </h2>
                  <p className="mb-8 text-sm leading-7 text-secondary sm:text-base">
                    {featured.excerpt}
                  </p>
                  {featured.access === "login_required" && (
                    <p className="mb-5 text-sm font-semibold text-navy">Login required to read the full article.</p>
                  )}
                  <div className="mt-auto">
                    <div className="mb-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted">
                      <span className="flex items-center gap-1.5"><User size={13} />{featured.author.name}</span>
                      <span className="flex items-center gap-1.5"><Calendar size={13} />{formatDate(featured.publishedAt)}</span>
                      <span className="flex items-center gap-1.5"><Clock size={13} />{featured.readingTime}</span>
                    </div>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-navy">
                      {featured.access === "login_required" ? "Preview article" : "Read article"}
                      <ArrowRight className="transition-transform group-hover:translate-x-1" size={16} />
                    </span>
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
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-lg"
                  href={`/blogs/${post.slug}`}
                  key={post.id}
                >
                  <FeaturedImage post={post} />
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <h3 className="mb-3 font-playfair text-lg font-bold leading-snug text-navy transition-colors group-hover:text-gold-muted">
                      {post.title}
                    </h3>
                    <p className="mb-6 line-clamp-3 flex-1 text-sm leading-6 text-secondary">
                      {post.excerpt}
                    </p>
                    {post.access === "login_required" && (
                      <span className="mb-3 text-xs font-semibold text-amber-800">Login required</span>
                    )}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-4 text-xs text-muted">
                      <span>{formatDate(post.publishedAt)} · {post.readingTime}</span>
                      <ArrowRight aria-hidden="true" className="shrink-0 text-navy transition-transform duration-200 group-hover:translate-x-1 group-hover:text-gold" size={15} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-off-white px-6 py-16 text-center">
              <p className="font-playfair text-xl font-semibold text-navy">More insights are on the way.</p>
              <p className="mt-2 text-sm text-secondary">
                {stream === "CS"
                  ? "There are no CS articles in this category just yet."
                  : "There are no articles in this category just yet."}
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
