import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, Calendar, User, ArrowLeft, Tag } from "lucide-react";
import { blogPosts } from "@/lib/data/blogs";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author.name],
    },
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const categoryColors: Record<string, string> = {
  "Exam Updates": "text-red-700 bg-red-50 border-red-200",
  "Study Tips": "text-blue-700 bg-blue-50 border-blue-200",
  "Result Analysis": "text-purple-700 bg-purple-50 border-purple-200",
  Foundation: "text-emerald-700 bg-emerald-50 border-emerald-200",
  Intermediate: "text-orange-700 bg-orange-50 border-orange-200",
  Final: "text-amber-700 bg-amber-50 border-amber-200",
  General: "text-gray-700 bg-gray-50 border-gray-200",
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = blogPosts
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-off-white border-b border-gray-100 py-3">
        <div className="container-wide">
          <div className="flex items-center gap-2 text-sm text-muted"
            style={{ color: "var(--text-muted)" }}>
            <Link href="/" className="hover:text-navy transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-navy transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-navy truncate">{post.title}</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-navy py-16">
        <div className="container-wide max-w-4xl">
          <Link href="/blog" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm mb-8">
            <ArrowLeft size={15} /> Back to Blog
          </Link>
          <span
            className={`text-xs font-semibold px-3 py-1.5 rounded border mb-5 inline-block ${categoryColors[post.category]}`}
          >
            {post.category}
          </span>
          <h1 className="font-playfair text-white text-3xl lg:text-5xl font-bold leading-snug mb-6">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-5 text-sm text-white/50">
            <span className="flex items-center gap-2">
              <User size={14} className="text-gold" />
              <span className="text-white/80 font-medium">{post.author.name}</span>
              <span>·</span>
              <span>{post.author.designation}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={14} className="text-gold" />
              {formatDate(post.publishedAt)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} className="text-gold" />
              {post.readingTime}
            </span>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="container-wide">
          <div className="grid lg:grid-cols-4 gap-10 lg:gap-14">
            {/* Article */}
            <div className="lg:col-span-3">
              <div
                className="prose prose-lg max-w-none"
                style={{
                  "--tw-prose-headings": "var(--navy)",
                  "--tw-prose-body": "var(--text-secondary)",
                } as React.CSSProperties}
              >
                <div
                  className="text-secondary leading-relaxed space-y-4"
                  style={{ color: "var(--text-secondary)" }}
                  dangerouslySetInnerHTML={{
                    __html: post.content
                      .trim()
                      .replace(/^# (.+)$/gm, '<h1 class="font-playfair text-navy text-3xl font-bold mt-8 mb-4">$1</h1>')
                      .replace(/^## (.+)$/gm, '<h2 class="font-playfair text-navy text-2xl font-bold mt-8 mb-4">$1</h2>')
                      .replace(/^### (.+)$/gm, '<h3 class="font-playfair text-navy text-xl font-bold mt-6 mb-3">$1</h3>')
                      .replace(/\*\*(.+?)\*\*/g, '<strong class="text-navy font-semibold">$1</strong>')
                      .replace(/^- (.+)$/gm, '<li class="ml-4 list-disc text-secondary">$1</li>')
                      .replace(/\n\n/g, '</p><p class="text-secondary leading-relaxed my-4">')
                      .replace(/^\d+\. (.+)$/gm, '<li class="ml-4 list-decimal text-secondary">$1</li>'),
                  }}
                />
              </div>

              {/* Tags */}
              <div className="mt-10 pt-8 border-t border-gray-100">
                <div className="flex items-center gap-3 flex-wrap">
                  <Tag size={14} className="text-muted" />
                  {post.tags.map((tag) => (
                    <span key={tag} className="tag-navy text-xs">{tag}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Author Card */}
                <div className="bg-off-white rounded-xl p-5 border border-gray-100">
                  <h3 className="font-semibold text-navy text-sm mb-4">About the Author</h3>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold">
                        {post.author.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                      </span>
                    </div>
                    <div>
                      <p className="text-navy font-semibold text-sm">{post.author.name}</p>
                      <p className="text-muted text-xs" style={{ color: "var(--text-muted)" }}>{post.author.designation}</p>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="bg-navy rounded-xl p-5 text-white">
                  <h3 className="font-playfair font-bold mb-3">Ready to Start?</h3>
                  <p className="text-white/60 text-xs mb-4 leading-relaxed">
                    Book a free demo class and experience our teaching methodology.
                  </p>
                  <Link href="/contact#demo" className="btn-gold text-sm block text-center">
                    Book Free Demo
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {related.length > 0 && (
        <section className="py-12 bg-off-white border-t border-gray-100">
          <div className="container-wide">
            <h2 className="font-playfair text-navy text-2xl font-bold mb-8">Related Articles</h2>
            <div className="grid sm:grid-cols-3 gap-5">
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`/blog/${p.slug}`}
                  className="bg-white border border-gray-100 rounded-xl p-5 card-hover"
                >
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded border mb-3 inline-block ${categoryColors[p.category]}`}>
                    {p.category}
                  </span>
                  <h3 className="font-playfair text-navy font-bold leading-snug mb-2">
                    {p.title}
                  </h3>
                  <p className="text-muted text-xs" style={{ color: "var(--text-muted)" }}>{p.readingTime}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
