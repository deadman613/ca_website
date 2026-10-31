"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock, Calendar, User, ArrowRight } from "lucide-react";
import type { BlogCategory, BlogPost } from "@/lib/data/blogs";
import { blogCategories } from "@/lib/data/blogs";
import StreamSwitcher from "@/components/layout/StreamSwitcher";
import { useStream } from "@/components/layout/StreamProvider";
import TiltCard from "@/components/motion/TiltCard";
import Reveal from "@/components/motion/Reveal";

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
    month: "long",
    year: "numeric",
  });
}

function FeaturedImage({ post, large = false }: { post: BlogPost; large?: boolean }) {
  return (
    <div
      aria-label={post.featuredImage ? `Featured image for ${post.title}` : undefined}
      className={`group/image relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-navy to-navy-light ${large ? "min-h-64 lg:col-span-3" : "h-44"}`}
      role={post.featuredImage ? "img" : undefined}
    >
      {post.featuredImage && (
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover/image:scale-105"
          style={{ backgroundImage: `url("${post.featuredImage}")` }}
        />
      )}
      {!post.featuredImage && (
        <span className={`select-none font-playfair font-bold text-white/10 ${large ? "text-8xl" : "text-5xl"}`}>CA</span>
      )}
      <div className="absolute left-3 top-3 z-10 flex flex-wrap gap-2">
        <span className={`rounded border px-2.5 py-1 text-xs font-semibold ${categoryColors[post.category]}`}>
          {post.category}
        </span>
        {post.access === "login_required" && (
          <span className="rounded border border-white/30 bg-navy/85 px-2.5 py-1 text-xs font-semibold text-white">
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

  return (
    <>
      <section className="bg-navy section-padding">
        <div className="container-wide">
          <div className="max-w-2xl">
            <span className="section-label mb-4 block">Insights &amp; Guidance</span>
            <div className="mb-5"><StreamSwitcher /></div>
            <h1 className="font-playfair text-5xl font-bold leading-tight text-white mb-6 lg:text-6xl">
              Delhi CA School
              <br />
              <span className="text-gold-light italic">Blog.</span>
            </h1>
            <p className="text-lg leading-relaxed text-white/60">
              Study strategies and exam guidance for CA aspirants at every stage.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-wide">
          {activeCategory === "all" && featured && (
            <Reveal className="mb-14">
              <p className="section-label mb-6">Featured Article</p>
              <TiltCard className="rounded-2xl" tilt={3}>
                <Link
                  className="group grid h-full gap-0 overflow-hidden rounded-2xl border border-gray-100 bg-off-white lg:grid-cols-5"
                  href={`/blogs/${featured.slug}`}
                >
                  <FeaturedImage large post={featured} />
                  <div className="flex flex-col justify-between p-8 lg:col-span-2 lg:p-10">
                    <div>
                      <h2 className="mb-4 font-playfair text-2xl font-bold leading-snug text-navy transition-colors duration-300 group-hover:text-gold-muted lg:text-3xl">
                        {featured.title}
                      </h2>
                      <p className="mb-6 text-sm leading-relaxed text-secondary" style={{ color: "var(--text-secondary)" }}>
                        {featured.excerpt}
                      </p>
                      {featured.access === "login_required" && (
                        <p className="mb-4 text-sm font-semibold text-navy">Login required to read the full article.</p>
                      )}
                    </div>
                    <div>
                      <div className="mb-4 flex flex-wrap items-center gap-4 text-xs text-muted" style={{ color: "var(--text-muted)" }}>
                        <span className="flex items-center gap-1"><User size={12} />{featured.author.name}</span>
                        <span className="flex items-center gap-1"><Calendar size={12} />{formatDate(featured.publishedAt)}</span>
                        <span className="flex items-center gap-1"><Clock size={12} />{featured.readingTime}</span>
                      </div>
                      <span className="flex items-center gap-2 text-sm font-semibold text-navy transition-colors group-hover:text-gold">
                        {featured.access === "login_required" ? "Preview Article" : "Read Article"} <ArrowRight className="transition-transform group-hover:translate-x-1" size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              </TiltCard>
            </Reveal>
          )}

          <div className="mb-10 flex flex-wrap gap-2">
            <button
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all ${activeCategory === "all" ? "border-navy bg-navy text-white" : "border-gray-200 bg-white text-navy hover:border-navy"}`}
              onClick={() => setActiveCategory("all")}
              type="button"
            >
              All Posts
            </button>
            {blogCategories.map((category) => (
              <button
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all ${activeCategory === category ? "border-navy bg-navy text-white" : "border-gray-200 bg-white text-navy hover:border-navy"}`}
                key={category}
                onClick={() => setActiveCategory(category)}
                type="button"
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(activeCategory === "all" ? streamPosts.slice(1) : filtered).map((post, index) => (
              <Reveal key={post.id} delay={index * 0.045}>
                <TiltCard className="rounded-xl" tilt={4}>
                  <Link
                    className="group block h-full overflow-hidden rounded-xl border border-gray-100 bg-white"
                    href={`/blogs/${post.slug}`}
                  >
                    <FeaturedImage post={post} />
                    <div className="p-5">
                      <h3 className="mb-3 font-playfair text-lg font-bold leading-snug text-navy transition-colors duration-300 group-hover:text-gold-muted">{post.title}</h3>
                      <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-secondary" style={{ color: "var(--text-secondary)" }}>
                        {post.excerpt}
                      </p>
                      {post.access === "login_required" && (
                        <span className="mb-3 inline-block text-xs font-semibold text-amber-800">Login required</span>
                      )}
                      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-4 text-xs text-muted" style={{ color: "var(--text-muted)" }}>
                        <span>{post.author.name} · {formatDate(post.publishedAt)} · {post.readingTime}</span>
                        <ArrowRight aria-hidden="true" className="shrink-0 text-navy transition-transform duration-200 group-hover:translate-x-1 group-hover:text-gold" size={15} />
                      </div>
                    </div>
                  </Link>
                </TiltCard>
              </Reveal>
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="py-12 text-center text-sm text-secondary">
              {stream === "CS"
                  ? "No CS articles are available in this category yet."
                : "No articles are available in this category yet."}
            </p>
          )}
        </div>
      </section>
    </>
  );
}
