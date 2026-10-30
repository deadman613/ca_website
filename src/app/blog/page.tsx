"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock, Calendar, User, ArrowRight } from "lucide-react";
import { blogPosts, blogCategories, type BlogCategory } from "@/lib/data/blogs";
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
    month: "long",
    year: "numeric",
  });
}

export default function BlogPage() {
  const { stream } = useStream();
  const [activeCategory, setActiveCategory] = useState<"all" | BlogCategory>(
    "all"
  );
  const streamPosts =
    stream === "CA"
      ? blogPosts.filter((post) =>
          ["CA Foundation", "CA Inter", "CA Final", "Career guidance", "Exam update", "Study strategy"].includes(post.category)
        )
      : [];

  const filtered =
    activeCategory === "all"
      ? streamPosts
      : streamPosts.filter((p) => p.category === activeCategory);

  const featured = streamPosts[0];

  return (
    <>
      {/* Hero */}
      <section className="bg-navy section-padding">
        <div className="container-wide">
          <div className="max-w-2xl">
            <span className="section-label mb-4 block">Insights & Guidance</span>
            <div className="mb-5">
              <StreamSwitcher />
            </div>
            <h1 className="font-playfair text-white text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Delhi CA School
              <br />
              <span className="text-gold-light italic">Blog.</span>
            </h1>
            <p className="text-white/60 text-lg leading-relaxed">
              Study strategies and exam guidance for CA aspirants at every stage.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-wide">
          {/* Featured Post */}
          {activeCategory === "all" && featured && (
            <div className="mb-14">
              <p className="section-label mb-6">Featured Article</p>
              <Link
                href={`/blog/${featured.slug}`}
                className="grid lg:grid-cols-5 gap-0 bg-off-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300 group"
              >
                <div className="lg:col-span-3 bg-gradient-to-br from-navy to-navy-light min-h-64 flex items-center justify-center relative">
                  <div className="text-white/5 font-playfair text-8xl font-bold select-none">
                    CA
                  </div>
                  <div className="absolute top-5 left-5">
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded border ${
                        categoryColors[featured.category]
                      }`}
                    >
                      {featured.category}
                    </span>
                  </div>
                </div>
                <div className="lg:col-span-2 p-8 lg:p-10 flex flex-col justify-between">
                  <div>
                    <h2 className="font-playfair text-navy text-2xl lg:text-3xl font-bold leading-snug mb-4 group-hover:text-navy">
                      {featured.title}
                    </h2>
                    <p className="text-secondary text-sm leading-relaxed mb-6"
                      style={{ color: "var(--text-secondary)" }}>
                      {featured.excerpt}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-4 text-xs text-muted mb-4"
                      style={{ color: "var(--text-muted)" }}>
                      <span className="flex items-center gap-1">
                        <User size={12} /> {featured.author.name}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={12} /> {formatDate(featured.publishedAt)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} /> {featured.readingTime}
                      </span>
                    </div>
                    <span className="flex items-center gap-2 text-navy font-semibold text-sm group-hover:text-gold transition-colors">
                      Read Article <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mb-10">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                activeCategory === "all"
                  ? "bg-navy text-white border-navy"
                  : "bg-white text-navy border-gray-200 hover:border-navy"
              }`}
            >
              All Posts
            </button>
            {blogCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                  activeCategory === cat
                    ? "bg-navy text-white border-navy"
                    : "bg-white text-navy border-gray-200 hover:border-navy"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Blog Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(activeCategory === "all" ? streamPosts.slice(1) : filtered).map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group bg-white border border-gray-100 rounded-xl overflow-hidden card-hover"
              >
                {/* Thumbnail */}
                <div className="h-44 bg-gradient-to-br from-navy to-navy-light flex items-center justify-center relative">
                  <span className="font-playfair text-white/10 text-5xl font-bold select-none">CA</span>
                  <div className="absolute top-3 left-3">
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded border ${
                        categoryColors[post.category]
                      }`}
                    >
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-playfair text-navy font-bold text-lg leading-snug mb-3 group-hover:text-navy">
                    {post.title}
                  </h3>
                  <p className="text-secondary text-sm leading-relaxed mb-4 line-clamp-2"
                    style={{ color: "var(--text-secondary)" }}>
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-muted pt-4 border-t border-gray-100"
                    style={{ color: "var(--text-muted)" }}>
                    <span>{post.author.name}</span>
                    <span>·</span>
                    <span>{formatDate(post.publishedAt)}</span>
                    <span>·</span>
                    <span>{post.readingTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="py-12 text-center text-sm text-secondary">
              {stream === "CS"
                ? "CS articles are being prepared. Please check back soon."
                : "No articles are available in this category yet."}
            </p>
          )}
        </div>
      </section>
    </>
  );
}
