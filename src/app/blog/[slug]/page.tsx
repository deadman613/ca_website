import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, LockKeyhole, Tag, User } from "lucide-react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { getBlogPostForViewer, getVisibleBlogPosts } from "@/lib/blogs";
import { siteUrl } from "@/lib/site";

interface Props {
  params: Promise<{ slug: string }>;
}

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

const markdownComponents: Components = {
  h1: ({ children }) => <h2 className="mb-4 mt-8 font-playfair text-3xl font-bold text-navy">{children}</h2>,
  h2: ({ children }) => <h2 className="mb-4 mt-8 font-playfair text-2xl font-bold text-navy">{children}</h2>,
  h3: ({ children }) => <h3 className="mb-3 mt-6 font-playfair text-xl font-bold text-navy">{children}</h3>,
  p: ({ children }) => <p className="my-4 leading-relaxed text-secondary">{children}</p>,
  ul: ({ children }) => <ul className="my-4 list-disc space-y-2 pl-6 text-secondary">{children}</ul>,
  ol: ({ children }) => <ol className="my-4 list-decimal space-y-2 pl-6 text-secondary">{children}</ol>,
  li: ({ children }) => <li>{children}</li>,
  a: ({ children, href }) => <a className="text-navy underline hover:text-gold" href={href}>{children}</a>,
  strong: ({ children }) => <strong className="font-semibold text-navy">{children}</strong>,
  blockquote: ({ children }) => <blockquote className="my-5 border-l-4 border-gold pl-4 text-secondary">{children}</blockquote>,
  table: ({ children }) => <div className="my-5 overflow-x-auto"><table className="w-full border-collapse text-left text-sm">{children}</table></div>,
  th: ({ children }) => <th className="border border-gray-200 bg-off-white p-2 font-semibold text-navy">{children}</th>,
  td: ({ children }) => <td className="border border-gray-200 p-2 text-secondary">{children}</td>,
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function isPublished(post: Awaited<ReturnType<typeof getBlogPostForViewer>>) {
  return Boolean(
    post &&
      (post.status === "published" ||
        (post.status === "scheduled" &&
          post.publishAt &&
          new Date(post.publishAt) <= new Date()))
  );
}

function jsonLd(value: Record<string, unknown>) {
  return {
    __html: JSON.stringify(value).replace(/</g, "\\u003c"),
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostForViewer(slug);
  if (!post) return { title: "Post Not Found", robots: { index: false, follow: false } };

  const publicPost = post.access === "public" && isPublished(post);
  const canonical = `/blogs/${post.slug}`;
  const seoTitle = post.seoTitle || post.title;
  const seoDescription = post.seoDescription || post.excerpt;
  return {
    title: seoTitle,
    description: seoDescription,
    alternates: { canonical },
    robots: publicPost
      ? { index: true, follow: true }
      : { index: false, follow: false },
    openGraph: publicPost
      ? {
            title: seoTitle,
            description: seoDescription,
            type: "article" as const,
            publishedTime: post.publishedAt,
            authors: [post.author.name],
            ...(post.featuredImage ? { images: [post.featuredImage] } : {}),
            url: canonical,
          }
      : {
          title: "Member article | Delhi CA School",
          description: "Sign in to read this member-only article.",
          type: "website" as const,
          url: canonical,
        },
  };
}

export const dynamic = "force-dynamic";

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostForViewer(slug);
  if (!post) notFound();

  const isLocked = post.access === "login_required" && !post.content;
  const isPublic = post.access === "public" && isPublished(post);
  const related = (await getVisibleBlogPosts())
    .filter((item) => item.id !== post.id && item.category === post.category)
    .slice(0, 3);
  const loginUrl = `/login?next=${encodeURIComponent(`/blogs/${post.slug}`)}`;
  const blogPosting = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    articleBody: post.content,
    datePublished: post.publishedAt,
    author: { "@type": "Person", name: post.author.name },
    publisher: { "@type": "Organization", name: "Delhi CA School" },
    mainEntityOfPage: siteUrl
      ? new URL(`/blogs/${post.slug}`, siteUrl).toString()
      : `/blogs/${post.slug}`,
    ...(post.featuredImage ? { image: [post.featuredImage] } : {}),
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl ? new URL("/", siteUrl).toString() : "/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: siteUrl ? new URL("/blogs", siteUrl).toString() : "/blogs",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: siteUrl
          ? new URL(`/blogs/${post.slug}`, siteUrl).toString()
          : `/blogs/${post.slug}`,
      },
    ],
  };

  return (
    <>
      {isPublic && post.content && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={jsonLd(blogPosting)}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={jsonLd(breadcrumb)}
          />
        </>
      )}
      <div className="border-b border-gray-100 bg-off-white py-3">
        <div className="container-wide">
          <div className="flex items-center gap-2 truncate text-sm text-muted" style={{ color: "var(--text-muted)" }}>
            <Link className="transition-colors hover:text-navy" href="/">Home</Link>
            <span>/</span>
            <Link className="transition-colors hover:text-navy" href="/blogs">Blog</Link>
            <span>/</span>
            <span className="truncate text-navy">{post.title}</span>
          </div>
        </div>
      </div>

      <section className="bg-navy py-16">
        <div className="container-wide max-w-4xl">
          <Link className="mb-8 inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white" href="/blogs">
            <ArrowLeft size={15} /> Back to Blog
          </Link>
          <div className="mb-5 flex flex-wrap gap-2">
            <span className={`inline-block rounded border px-3 py-1.5 text-xs font-semibold ${categoryColors[post.category]}`}>
              {post.category}
            </span>
            {post.access === "login_required" && (
              <span className="inline-flex items-center gap-1 rounded border border-gold/50 bg-gold/10 px-3 py-1.5 text-xs font-semibold text-gold-light">
                <LockKeyhole size={12} /> {post.featuredLabel || "Members Only"}
              </span>
            )}
          </div>
          <h1 className="mb-6 font-playfair text-3xl font-bold leading-snug text-white lg:text-5xl">
            {post.title}
          </h1>
          <p className="mb-6 max-w-3xl text-lg leading-relaxed text-white/65">{post.excerpt}</p>
          <div className="flex flex-wrap items-center gap-5 text-sm text-white/55">
            <span className="flex items-center gap-2">
              <User className="text-gold" size={14} />
              <span className="font-medium text-white/80">{post.author.name}</span>
              <span>·</span><span>{post.author.designation}</span>
            </span>
            <span className="flex items-center gap-1.5"><Calendar className="text-gold" size={14} />{formatDate(post.publishedAt)}</span>
            <span className="flex items-center gap-1.5"><Clock className="text-gold" size={14} />{post.readingTime}</span>
          </div>
        </div>
      </section>

      {post.featuredImage && (
        <div
          aria-label={`Featured image for ${post.title}`}
          className="h-64 bg-cover bg-center md:h-96"
          role="img"
          style={{ backgroundImage: `url("${post.featuredImage}")` }}
        />
      )}

      <section className="bg-white py-12 lg:py-16">
        <div className="container-wide">
          <div className="grid gap-10 lg:grid-cols-4 lg:gap-14">
            <article className="lg:col-span-3">
              {isLocked ? (
                <>
                  {post.previewContent && (
                    <div className="mb-8">
                      <ReactMarkdown components={markdownComponents} remarkPlugins={[remarkGfm]}>
                        {post.previewContent}
                      </ReactMarkdown>
                    </div>
                  )}
                  <div className="rounded-2xl border border-gold/30 bg-off-white p-7 md:p-9">
                    <div className="mb-3 flex items-center gap-2 text-navy">
                      <LockKeyhole size={20} />
                      <h2 className="font-playfair text-2xl font-bold">Login required to read the full article</h2>
                    </div>
                    <p className="mb-6 text-sm leading-relaxed text-secondary">
                      Sign in with your Delhi CA School account to continue reading this article.
                    </p>
                    <Link className="btn-gold" href={loginUrl}>Login to Read Full Article</Link>
                    <p className="mt-4 text-sm text-secondary">
                      Need an account? <Link className="font-semibold text-navy underline" href="/contact">Contact Delhi CA School</Link>
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="blog-article">
                    <ReactMarkdown components={markdownComponents} remarkPlugins={[remarkGfm]}>
                      {post.content ?? post.previewContent}
                    </ReactMarkdown>
                  </div>
                  {post.tags.length > 0 && (
                    <div className="mt-10 border-t border-gray-100 pt-8">
                      <div className="flex flex-wrap items-center gap-3">
                        <Tag className="text-muted" size={14} />
                        {post.tags.map((tag) => <span className="tag-navy text-xs" key={tag}>{tag}</span>)}
                      </div>
                    </div>
                  )}
                </>
              )}
            </article>

            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="rounded-xl border border-gray-100 bg-off-white p-5">
                  <h2 className="mb-4 text-sm font-semibold text-navy">About the Author</h2>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-navy">
                      <span className="text-sm font-bold text-white">
                        {post.author.name.split(" ").map((part) => part[0]).join("").slice(0, 2)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-navy">{post.author.name}</p>
                      <p className="text-xs text-muted" style={{ color: "var(--text-muted)" }}>{post.author.designation}</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl bg-navy p-5 text-white">
                  <h2 className="mb-3 font-playfair font-bold">Ready to Start?</h2>
                  <p className="mb-4 text-xs leading-relaxed text-white/60">Book a free demo class and experience our teaching methodology.</p>
                  <Link className="btn-gold block text-center text-sm" href="/contact#demo">Book Free Demo</Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-gray-100 bg-off-white py-12">
          <div className="container-wide">
            <h2 className="mb-8 font-playfair text-2xl font-bold text-navy">Related Articles</h2>
            <div className="grid gap-5 sm:grid-cols-3">
              {related.map((item) => (
                <Link className="card-hover rounded-xl border border-gray-100 bg-white p-5" href={`/blogs/${item.slug}`} key={item.id}>
                  <span className={`mb-3 inline-block rounded border px-2 py-0.5 text-xs font-semibold ${categoryColors[item.category]}`}>{item.category}</span>
                  <h3 className="mb-2 font-playfair font-bold leading-snug text-navy">{item.title}</h3>
                  <p className="text-xs text-muted" style={{ color: "var(--text-muted)" }}>{item.readingTime}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
