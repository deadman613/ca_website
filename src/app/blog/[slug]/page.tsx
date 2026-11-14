import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpen, Clock, LockKeyhole, Tag, User } from "lucide-react";
import { isValidElement, type ReactNode } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { getBlogPostForViewer, getVisibleBlogPosts } from "@/lib/blogs";
import { blogCategories } from "@/lib/data/blogs";
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

function textFromChildren(children: ReactNode): string {
  if (typeof children === "string" || typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(textFromChildren).join("");
  if (isValidElement<{ children?: ReactNode }>(children)) {
    return textFromChildren(children.props.children);
  }
  return "";
}

function headingId(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .trim()
    .replace(/\s+/g, "-");
}

function getMarkdownHeadings(markdown: string) {
  const counts = new Map<string, number>();
  return markdown.split(/\r?\n/).flatMap((line) => {
    const match = line.match(/^(#{1,6})\s+(.+?)\s*#*\s*$/);
    if (!match) return [];

    const text = match[2]
      .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/<[^>]+>/g, "")
      .replace(/[`*_~]/g, "")
      .trim();
    const baseId = headingId(text);
    const count = counts.get(baseId) ?? 0;
    counts.set(baseId, count + 1);
    return [{ id: count ? `${baseId}-${count}` : baseId, text, level: match[1].length }];
  });
}

function getTableOfContents(markdown: string) {
  return getMarkdownHeadings(markdown).filter(({ level }) => level === 2 || level === 3);
}

function createMarkdownComponents(markdown: string): Components {
  const headings = getMarkdownHeadings(markdown);
  let headingIndex = 0;
  const nextHeadingId = (children: ReactNode) => {
    const text = textFromChildren(children);
    const id = headings[headingIndex]?.id ?? headingId(text);
    headingIndex += 1;
    return id;
  };

  return {
  h1: ({ children }) => <h1 id={nextHeadingId(children)} className="mb-5 mt-12 font-playfair text-3xl font-bold leading-tight text-navy sm:text-4xl">{children}</h1>,
  h2: ({ children }) => <h2 id={nextHeadingId(children)} className="mb-4 mt-12 scroll-mt-24 font-playfair text-2xl font-bold leading-tight text-navy sm:text-3xl">{children}</h2>,
  h3: ({ children }) => <h3 id={nextHeadingId(children)} className="mb-3 mt-8 scroll-mt-24 font-playfair text-xl font-bold leading-snug text-navy sm:text-2xl">{children}</h3>,
  h4: ({ children }) => <h4 id={nextHeadingId(children)} className="mb-3 mt-6 font-bold text-navy text-lg">{children}</h4>,
  h5: ({ children }) => <h5 id={nextHeadingId(children)} className="mb-2 mt-4 text-base font-semibold text-navy">{children}</h5>,
  h6: ({ children }) => <h6 id={nextHeadingId(children)} className="mb-2 mt-4 text-sm font-semibold uppercase tracking-wide text-navy">{children}</h6>,
  p: ({ children }) => <p className="my-5 text-[1.0625rem] leading-8 text-secondary">{children}</p>,
  ul: ({ children }) => <ul className="my-5 list-disc space-y-3 pl-6 text-[1.0625rem] leading-8 text-secondary marker:text-gold">{children}</ul>,
  ol: ({ children }) => <ol className="my-5 list-decimal space-y-3 pl-6 text-[1.0625rem] leading-8 text-secondary marker:font-semibold marker:text-gold">{children}</ol>,
  li: ({ children }) => <li>{children}</li>,
  a: ({ children, href }) => <a className="font-medium text-navy underline decoration-gold/60 underline-offset-4 hover:text-gold-muted" href={href}>{children}</a>,
  strong: ({ children }) => <strong className="font-semibold text-navy">{children}</strong>,
  blockquote: ({ children }) => <blockquote className="my-8 rounded-r-xl border-l-4 border-gold bg-off-white px-6 py-2 text-secondary [&_p]:text-lg [&_p]:italic">{children}</blockquote>,
  table: ({ children }) => <div className="my-8 overflow-x-auto rounded-xl border border-gray-200"><table className="w-full border-collapse text-left text-sm">{children}</table></div>,
  th: ({ children }) => <th className="border-b border-gray-200 bg-off-white px-4 py-3 font-semibold text-navy">{children}</th>,
  td: ({ children }) => <td className="border-b border-gray-100 px-4 py-3 text-secondary">{children}</td>,
  };
}

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
  const visiblePosts = await getVisibleBlogPosts();
  const related = visiblePosts
    .filter((item) => item.id !== post.id && item.category === post.category)
    .slice(0, 3);
  const latestPosts = visiblePosts.filter((item) => item.id !== post.id).slice(0, 4);
  const articleMarkdown = isLocked ? post.previewContent : post.content ?? post.previewContent;
  const tableOfContents = getTableOfContents(articleMarkdown);
  const tocItems = tableOfContents.length > 0
    ? tableOfContents
    : [{ id: "article-content", text: "Article overview", level: 2 }];
  const markdownComponents = createMarkdownComponents(articleMarkdown);
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
      <main className="min-h-screen bg-[#eaf2ff] py-6 sm:py-10">
        <div className="container-wide max-w-7xl">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2 truncate text-xs text-muted">
              <Link className="shrink-0 hover:text-navy" href="/">Home</Link>
              <span>/</span>
              <Link className="shrink-0 hover:text-navy" href="/blogs">Blog</Link>
              <span>/</span>
              <span className="truncate text-navy">{post.title}</span>
            </div>
            <Link className="inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold text-navy hover:text-gold-muted" href="/blogs">
              <ArrowLeft size={14} /> All articles
            </Link>
          </div>

          <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[minmax(0,1fr)_330px]">
            <article className="min-w-0 overflow-hidden rounded-2xl border border-[#d6e4fa] bg-white shadow-[0_8px_30px_rgba(27,75,142,0.07)]">
              <div className="px-5 pb-6 pt-6 sm:px-8 sm:pt-8 lg:px-10">
                <p className="mb-4 text-xs font-medium tracking-wide text-[#5480c3]">
                  {formatDate(post.publishedAt)}
                </p>
                <div className="mb-3 flex flex-wrap gap-2">
                  <span className={`inline-block rounded-full border px-3 py-1 text-[11px] font-semibold ${categoryColors[post.category]}`}>
                    {post.category}
                  </span>
                  {post.access === "login_required" && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-gold/50 bg-gold/10 px-3 py-1 text-[11px] font-semibold text-gold-muted">
                      <LockKeyhole size={11} /> {post.featuredLabel || "Members Only"}
                    </span>
                  )}
                </div>
                <h1 className="mb-5 max-w-4xl font-playfair text-2xl font-bold leading-tight tracking-tight text-navy sm:text-3xl lg:text-4xl">
                  {post.title}
                </h1>
                <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted">
                  <span className="inline-flex items-center gap-1.5 font-medium text-navy">
                    <User size={13} className="text-gold-muted" /> {post.author.name}
                  </span>
                  <span className="inline-flex items-center gap-1.5"><Clock size={13} className="text-gold-muted" />{post.readingTime}</span>
                </div>
                {post.featuredImage ? (
                  <div
                    aria-label={`Featured image for ${post.title}`}
                    className="aspect-[16/7] overflow-hidden rounded-xl bg-cover bg-center"
                    role="img"
                    style={{ backgroundImage: `url("${post.featuredImage}")` }}
                  />
                ) : (
                  <div
                    aria-label={`Illustration for ${post.title}`}
                    className="relative flex aspect-[16/7] items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-navy via-[#0759ad] to-[#0d234d]"
                    role="img"
                  >
                    <span aria-hidden="true" className="absolute -right-10 -top-20 h-72 w-72 rounded-full border border-white/15" />
                    <span aria-hidden="true" className="absolute -right-2 -top-12 h-52 w-52 rounded-full border border-gold/35" />
                    <span className="text-center">
                      <span className="block font-playfair text-8xl font-bold leading-none text-white/90 sm:text-9xl">CA</span>
                      <span className="mt-3 block text-[10px] font-semibold uppercase tracking-[0.35em] text-white/70">Delhi CA School</span>
                    </span>
                  </div>
                )}
              </div>

              <div className="px-5 pb-8 sm:px-8 lg:px-10">
                <details className="mb-8 overflow-hidden rounded-xl border border-[#c9dcf9] bg-[#f7faff]">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 text-xs font-semibold text-navy marker:content-none [&::-webkit-details-marker]:hidden">
                    <span className="inline-flex items-center gap-2"><BookOpen size={14} className="text-[#2873d8]" /> Table of contents</span>
                    <span aria-hidden="true" className="text-base text-[#2873d8]">+</span>
                  </summary>
                  <nav aria-label="Table of contents" className="border-t border-[#dce8f8] px-4 py-3">
                    <ol className="space-y-2">
                      {tocItems.map((heading) => (
                        <li className={heading.level === 3 ? "pl-4" : ""} key={heading.id}>
                          <a className="text-xs leading-5 text-secondary transition-colors hover:text-[#2873d8]" href={`#${heading.id}`}>
                            {heading.text}
                          </a>
                        </li>
                      ))}
                    </ol>
                  </nav>
                </details>

                {isLocked ? (
                  <>
                    <div className="blog-article mb-8" id="article-content">
                      <ReactMarkdown components={markdownComponents} remarkPlugins={[remarkGfm]}>
                        {post.previewContent}
                      </ReactMarkdown>
                    </div>
                    <div className="rounded-xl border border-gold/40 bg-off-white p-6 sm:p-8">
                      <div className="mb-3 flex items-center gap-2 text-navy">
                        <LockKeyhole className="shrink-0 text-gold-muted" size={20} />
                        <h2 className="font-playfair text-xl font-bold">Login required to read the full article</h2>
                      </div>
                      <p className="mb-5 text-sm leading-6 text-secondary">
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
                    <div className="blog-article" id="article-content">
                      <ReactMarkdown components={markdownComponents} remarkPlugins={[remarkGfm]}>
                        {articleMarkdown}
                      </ReactMarkdown>
                    </div>
                    {post.tags.length > 0 && (
                      <div className="mt-8 border-t border-gray-100 pt-6">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <Tag className="text-muted" size={14} />
                          {post.tags.map((tag) => <span className="tag-navy text-xs" key={tag}>{tag}</span>)}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </article>

            <aside className="space-y-4 lg:sticky lg:top-24">
              <section className="rounded-2xl border border-[#d6e4fa] bg-white p-4 shadow-[0_6px_20px_rgba(27,75,142,0.06)] sm:p-5">
                <h2 className="mb-4 text-[11px] font-bold uppercase tracking-[0.14em] text-[#2873d8]">Latest posts</h2>
                {latestPosts.length > 0 ? (
                  <ul className="space-y-3">
                    {latestPosts.map((item) => (
                      <li key={item.id}>
                        <Link className="group flex gap-3 rounded-lg border border-[#e5eefb] p-2 transition-colors hover:border-[#9fc2f2] hover:bg-[#f7faff]" href={`/blogs/${item.slug}`}>
                          {item.featuredImage ? (
                            <span
                              aria-hidden="true"
                              className="h-12 w-14 shrink-0 rounded-md bg-cover bg-center"
                              style={{ backgroundImage: `url("${item.featuredImage}")` }}
                            />
                          ) : (
                            <span aria-hidden="true" className="flex h-12 w-14 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-navy to-[#2873d8] font-playfair text-sm font-bold text-white">CA</span>
                          )}
                          <span className="min-w-0">
                            <span className="line-clamp-2 block text-xs font-semibold leading-4 text-navy group-hover:text-[#2873d8]">{item.title}</span>
                            <span className="mt-1 block truncate text-[9px] font-semibold uppercase tracking-wide text-[#5480c3]">{item.category}</span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs leading-5 text-muted">More articles are coming soon.</p>
                )}
              </section>

              <section className="rounded-2xl border border-[#d6e4fa] bg-white p-4 shadow-[0_6px_20px_rgba(27,75,142,0.06)] sm:p-5">
                <h2 className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#2873d8]">Enquire now</h2>
                <p className="mb-4 text-xs leading-5 text-secondary">Tell us what you&apos;re preparing for. Our team can help you choose the right next step.</p>
                <Link className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#2873d8] to-[#1554c0] px-4 py-2.5 text-xs font-semibold text-white transition-shadow hover:shadow-md" href="/contact#demo">
                  Book a free demo <ArrowRight size={14} />
                </Link>
              </section>

              <section className="rounded-2xl border border-[#d6e4fa] bg-white p-4 shadow-[0_6px_20px_rgba(27,75,142,0.06)] sm:p-5">
                <h2 className="mb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-[#2873d8]">Categories</h2>
                <div className="flex flex-wrap gap-2">
                  {blogCategories.map((category) => (
                    <span className="rounded-full border border-[#b8d2f6] bg-[#f4f8ff] px-2.5 py-1 text-[10px] font-medium text-navy" key={category}>
                      {category}
                    </span>
                  ))}
                </div>
                <p className="mt-3 border-t border-[#eaf1fb] pt-3 text-[10px] text-muted">Explore articles by your study stage.</p>
              </section>

              {post.tags.length > 0 && (
                <section className="rounded-2xl border border-[#d6e4fa] bg-white p-4 shadow-[0_6px_20px_rgba(27,75,142,0.06)] sm:p-5">
                  <h2 className="mb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-[#2873d8]">Tags</h2>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span className="rounded-full border border-[#d7e5f8] px-2.5 py-1 text-[10px] text-secondary" key={tag}>{tag}</span>
                    ))}
                  </div>
                </section>
              )}
            </aside>
          </div>

          {related.length > 0 && (
            <section className="mt-10 rounded-2xl border border-[#d6e4fa] bg-white p-5 shadow-[0_6px_20px_rgba(27,75,142,0.06)] sm:p-7">
              <h2 className="mb-5 font-playfair text-xl font-bold text-navy">More in {post.category}</h2>
              <div className="grid gap-4 sm:grid-cols-3">
                {related.map((item) => (
                  <Link className="group rounded-xl border border-gray-100 p-4 transition-colors hover:border-[#9fc2f2] hover:bg-[#f7faff]" href={`/blogs/${item.slug}`} key={item.id}>
                    <h3 className="mb-2 line-clamp-2 font-playfair font-bold leading-snug text-navy group-hover:text-[#2873d8]">{item.title}</h3>
                    <p className="text-xs text-muted">{item.readingTime}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  );
}
