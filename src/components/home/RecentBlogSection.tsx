import Link from "next/link";
import { Calendar, User, ArrowRight } from "lucide-react";
import { getVisibleBlogPosts } from "@/lib/blogs";
import SectionHeading from "@/components/ui/SectionHeading";

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

export default async function RecentBlogSection() {
  const posts = await getVisibleBlogPosts();
  const recent = posts.slice(0, 3);

  if (recent.length === 0) return null;

  return (
    <section className="section-padding bg-white">
      <div className="container-wide">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            label="From the Blog"
            title="Latest Articles"
            subtitle="Study tips, exam updates, and guidance from our faculty."
            align="left"
          />
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-sm font-semibold text-navy hover:text-gold transition-colors shrink-0"
          >
            View all articles <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recent.map((post) => (
            <Link
              key={post.id}
              href={`/blogs/${post.slug}`}
              className="group flex flex-col rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg overflow-hidden"
            >
              {/* Featured image or colour strip */}
              {post.featuredImage ? (
                <div
                  className="h-44 w-full bg-cover bg-center"
                  style={{ backgroundImage: `url('${post.featuredImage}')` }}
                />
              ) : (
                <div className="h-2 w-full bg-gradient-to-r from-gold to-gold/40" />
              )}

              <div className="flex flex-1 flex-col p-6">
                {/* Category badge */}
                <span
                  className={`mb-3 inline-block self-start rounded border px-2.5 py-0.5 text-xs font-semibold ${categoryColors[post.category] ?? "text-gray-700 bg-gray-50 border-gray-200"}`}
                >
                  {post.category}
                </span>

                {/* Title */}
                <h3 className="mb-3 font-playfair text-lg font-bold leading-snug text-navy group-hover:text-navy line-clamp-2">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="mb-5 flex-1 text-sm leading-relaxed text-secondary line-clamp-2">
                  {post.excerpt}
                </p>

                {/* Author + date */}
                <div className="flex flex-wrap items-center gap-4 border-t border-gray-100 pt-4 text-xs text-muted">
                  <span className="flex items-center gap-1.5">
                    <User size={12} className="text-gold" />
                    <span className="font-medium text-navy/70">{post.author.name}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar size={12} className="text-gold" />
                    {formatDate(post.publishedAt)}
                  </span>
                  <span className="ml-auto font-medium text-navy/50">{post.readingTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}


