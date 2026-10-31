import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  FolderOpen,
  FileText,
  LayoutDashboard,
  Plus,
  Users,
} from "lucide-react";
import { deleteBlogPost, saveBlogPost } from "@/app/actions/blog-admin";
import { signOut } from "@/app/actions/auth";
import MarkdownEditor from "@/app/admin/blogpanel/MarkdownEditor";
import { blogCategories, type BlogPost } from "@/lib/data/blogs";
import { getAdminBlogPosts } from "@/lib/blogs";
import { getBlogAdminSetupIssues, isBlogAdminConfigured } from "@/lib/supabase/config";
import AnimatedNumber from "@/components/motion/AnimatedNumber";
import TiltCard from "@/components/motion/TiltCard";
import Reveal from "@/components/motion/Reveal";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog management",
  robots: { index: false, follow: false },
};

interface BlogPanelProps {
  searchParams: Promise<{ status?: string; saved?: string; deleted?: string; error?: string }>;
}

function localDateTime(value: string | null) {
  if (!value) return "";
  const date = new Date(value);
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return `${values.year}-${values.month}-${values.day}T${values.hour}:${values.minute}`;
}

function BlogEditor({ post }: { post?: BlogPost }) {
  return (
    <form action={saveBlogPost} className="space-y-6">
      {post && <input name="id" type="hidden" value={post.id} />}

      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
        <div className="mb-5">
          <p className="section-label">01 · Article details</p>
          <h3 className="mt-1 text-lg font-semibold text-navy">Give your post a clear identity</h3>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-sm font-medium text-navy md:col-span-2">
            Post title
            <input className="input-field mt-2" defaultValue={post?.title} maxLength={200} name="title" placeholder="A helpful title for your readers" required />
          </label>
          <label className="text-sm font-medium text-navy">
            URL slug
            <input className="input-field mt-2" defaultValue={post?.slug} name="slug" pattern="[a-z0-9]+(?:-[a-z0-9]+)*" placeholder="ca-exam-preparation-guide" required />
            <span className="mt-1 block text-xs font-normal text-muted">Your article address will be /blogs/your-slug</span>
          </label>
          <label className="text-sm font-medium text-navy">
            Category
            <select className="input-field mt-2" defaultValue={post?.category ?? blogCategories[0]} name="category">
              {blogCategories.map((category) => <option key={category}>{category}</option>)}
            </select>
          </label>
          <label className="text-sm font-medium text-navy md:col-span-2">
            Short description
            <textarea className="input-field mt-2 min-h-24" defaultValue={post?.excerpt} maxLength={1000} name="excerpt" placeholder="A short introduction shown on the blog listing." required />
          </label>
          <label className="text-sm font-medium text-navy">
            Author name
            <input className="input-field mt-2" defaultValue={post?.author.name ?? ""} maxLength={120} name="authorName" required />
          </label>
          <label className="text-sm font-medium text-navy">
            Author role / designation
            <input className="input-field mt-2" defaultValue={post?.author.designation ?? ""} maxLength={160} name="authorDesignation" placeholder="CA Faculty" required />
          </label>
          <label className="text-sm font-medium text-navy">
            Author photo URL (optional)
            <input className="input-field mt-2" defaultValue={post?.author.photo ?? ""} name="authorPhoto" placeholder="https://…" type="url" />
          </label>
          <label className="text-sm font-medium text-navy">
            Reading time
            <input className="input-field mt-2" defaultValue={post?.readingTime ?? "5 min read"} maxLength={40} name="readingTime" required />
          </label>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
        <div className="mb-5">
          <p className="section-label">02 · Search &amp; appearance</p>
          <h3 className="mt-1 text-lg font-semibold text-navy">Help readers find your article</h3>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-sm font-medium text-navy">
            SEO title (optional)
            <input className="input-field mt-2" defaultValue={post?.seoTitle ?? ""} maxLength={200} name="seoTitle" placeholder="Uses the post title when blank" />
          </label>
          <label className="text-sm font-medium text-navy">
            Featured image URL (optional)
            <input className="input-field mt-2" defaultValue={post?.featuredImage ?? ""} name="featuredImage" placeholder="https://…" type="url" />
          </label>
          <label className="text-sm font-medium text-navy md:col-span-2">
            Meta description (optional)
            <textarea className="input-field mt-2 min-h-20" defaultValue={post?.seoDescription ?? ""} maxLength={300} name="seoDescription" placeholder="Uses the short description when blank" />
          </label>
          <label className="text-sm font-medium text-navy">
            Featured label (optional)
            <input className="input-field mt-2" defaultValue={post?.featuredLabel ?? ""} maxLength={80} name="featuredLabel" placeholder="Members Only" />
          </label>
          <label className="text-sm font-medium text-navy">
            Tags / keywords
            <input className="input-field mt-2" defaultValue={post?.tags.join(", ")} maxLength={1000} name="tags" placeholder="exam preparation, study tips" />
          </label>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
        <div className="mb-5">
          <p className="section-label">03 · Access &amp; publishing</p>
          <h3 className="mt-1 text-lg font-semibold text-navy">Choose who can read this post</h3>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <label className="text-sm font-medium text-navy">
            Blog access
            <select className="input-field mt-2" defaultValue={post?.access ?? "public"} name="access">
              <option value="public">Public</option>
              <option value="login_required">Login required</option>
            </select>
          </label>
          <label className="text-sm font-medium text-navy">
            Publication status
            <select className="input-field mt-2" defaultValue={post?.status ?? "published"} name="status">
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="scheduled">Scheduled</option>
            </select>
          </label>
          <label className="text-sm font-medium text-navy">
            Publish date &amp; time (IST)
            <input className="input-field mt-2" defaultValue={localDateTime(post?.publishAt ?? null)} name="publishAt" type="datetime-local" />
          </label>
          <label className="text-sm font-medium text-navy md:col-span-3">
            Preview content (shown before login)
            <textarea className="input-field mt-2 min-h-24" defaultValue={post?.previewContent} maxLength={8000} name="previewContent" placeholder="Optional for public posts; required for login-only posts." />
          </label>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
        <div className="mb-5">
          <p className="section-label">04 · Article content</p>
          <h3 className="mt-1 text-lg font-semibold text-navy">Write the full article</h3>
        </div>
        <MarkdownEditor initialValue={post?.content ?? ""} />
      </section>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-gold/30 bg-gold/10 p-4 sm:px-6">
        <p className="text-sm text-navy">
          {post ? "Changes appear on the blog after you save." : "New posts are published immediately by default."}
        </p>
        <button className="btn-gold" type="submit">
          {post ? "Save changes" : "Publish post"}
        </button>
      </div>
    </form>
  );
}

function statusLabel(status: BlogPost["status"]) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export default async function BlogPanelPage({ searchParams }: BlogPanelProps) {
  const query = await searchParams;
  if (!isBlogAdminConfigured()) {
    const setupIssues = getBlogAdminSetupIssues();
    return (
      <section className="min-h-[70vh] bg-off-white px-4 py-16">
        <div className="mx-auto max-w-2xl rounded-2xl border border-gold/30 bg-white p-8 shadow-sm">
          <span className="section-label">Administration</span>
          <h1 className="mt-3 text-3xl font-bold text-navy">Blog management</h1>
          <p className="mt-4 text-sm leading-relaxed text-secondary">
            Complete the remaining settings in the project&apos;s local environment file, then restart the development server:
          </p>
          <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-relaxed text-secondary">
            {setupIssues.map((issue) => <li key={issue}>{issue}</li>)}
          </ul>
        </div>
      </section>
    );
  }

  const posts = await getAdminBlogPosts();
  const statuses = ["all", "public", "login_required", "draft", "scheduled"];
  const filter = statuses.includes(query.status ?? "") ? query.status ?? "all" : "all";
  const filteredPosts = posts.filter((post) => {
    if (filter === "all") return true;
    if (filter === "public") return post.access === "public";
    if (filter === "login_required") return post.access === "login_required";
    return post.status === filter;
  });
  const publishedCount = posts.filter((post) => post.status === "published").length;
  const draftCount = posts.filter((post) => post.status === "draft").length;
  const scheduledCount = posts.filter((post) => post.status === "scheduled").length;

  return (
    <div className="min-h-screen bg-[#f5f5f2] px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-[1500px] gap-6 lg:grid-cols-[250px_minmax(0,1fr)]">
        <aside className="h-fit rounded-2xl bg-navy p-5 text-white shadow-lg lg:sticky lg:top-24">
          <Link className="mb-8 flex items-center gap-3" href="/">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-gold/40 bg-gold/15 text-gold-light">
              <BookOpen size={22} />
            </span>
            <span>
              <span className="block font-semibold">Delhi CA School</span>
              <span className="text-xs text-white/55">Blog studio</span>
            </span>
          </Link>
          <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">Workspace</p>
          <nav aria-label="Blog management" className="space-y-1">
            <a className="flex items-center gap-3 rounded-lg bg-white/10 px-3 py-2.5 text-sm font-medium text-white" href="#overview">
              <LayoutDashboard size={17} /> Overview
            </a>
            <a className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white" href="#posts">
              <FileText size={17} /> All posts
            </a>
            <a className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white" href="#editor">
              <Plus size={17} /> Create post
            </a>
            <Link className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white" href="/blogs" target="_blank">
              <ArrowUpRight size={17} /> View public blog
            </Link>
          </nav>
          <form action={signOut} className="mt-8 border-t border-white/10 pt-5">
            <button className="w-full rounded-lg border border-white/15 px-3 py-2.5 text-left text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white" type="submit">
              Sign out
            </button>
          </form>
        </aside>

        <main className="min-w-0 space-y-7">
          <header className="flex flex-wrap items-end justify-between gap-4" id="overview">
            <div>
              <p className="section-label">Content workspace</p>
              <h1 className="mt-1 text-3xl font-bold text-navy sm:text-4xl">Blog studio</h1>
              <p className="mt-2 text-sm text-secondary">Create, publish, and manage articles for Delhi CA School.</p>
            </div>
            <Link className="btn-gold inline-flex items-center gap-2" href="#editor">
              <Plus size={17} /> Create post
            </Link>
          </header>

          {query.saved && <p role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">Post saved. Published posts now appear on <Link className="font-semibold underline" href="/blogs">/blogs</Link>.</p>}
          {query.deleted && <p role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">Blog post deleted.</p>}
          {query.error && (
            <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
              {query.error === "schedule"
                ? "Choose a future date for a scheduled post and a current or past date for a published post."
                : "The post could not be saved. Check the fields and slug, then try again."}
            </p>
          )}

          <section aria-label="Post statistics" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {[
              { label: "Total blogs", value: posts.length, description: "All articles in your workspace", icon: FileText },
              { label: "Published blogs", value: publishedCount, description: "Visible on the public blog", icon: BookOpen },
              { label: "Draft blogs", value: draftCount, description: "Only visible to admins", icon: FileText },
              { label: "Scheduled blogs", value: scheduledCount, description: "Waiting for publish time", icon: LayoutDashboard },
              { label: "Categories", value: blogCategories.length, description: "Available blog categories", icon: FolderOpen },
              { label: "Total readers", value: "—", description: "Reader analytics are not connected", icon: Users },
            ].map(({ label, value, description, icon: Icon }, index) => (
              <Reveal className="h-full" delay={index * 0.045} key={label}>
                <TiltCard className="rounded-2xl" tilt={4}>
                  <div className="h-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium text-secondary">{label}</p>
                        <AnimatedNumber label={label} value={value} />
                      </div>
                      <span className="motion-stat-icon flex h-11 w-11 items-center justify-center rounded-xl bg-gold/10 text-gold-muted">
                        <Icon aria-hidden="true" size={20} />
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-muted">{description}</p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </section>

          <section className="scroll-mt-24" id="editor">
            <div className="mb-4">
              <p className="section-label">Write &amp; publish</p>
              <h2 className="mt-1 text-2xl font-bold text-navy">Create a post</h2>
            </div>
            <BlogEditor />
          </section>

          <section className="scroll-mt-24" id="posts">
            <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="section-label">Your content</p>
                <h2 className="mt-1 text-2xl font-bold text-navy">All posts</h2>
              </div>
              <Link className="text-sm font-semibold text-navy underline decoration-gold underline-offset-4" href="/blogs">
                Open /blogs
              </Link>
            </div>
            <div className="mb-4 flex flex-wrap gap-2">
              {[
                ["all", "All"],
                ["public", "Public"],
                ["login_required", "Login required"],
                ["draft", "Draft"],
                ["scheduled", "Scheduled"],
              ].map(([value, label]) => (
                <a
                  aria-current={filter === value ? "page" : undefined}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${filter === value ? "border-navy bg-navy text-white" : "border-slate-200 bg-white text-navy hover:border-gold"}`}
                  href={`/admin/blogpanel${value === "all" ? "" : `?status=${value}`}#posts`}
                  key={value}
                >
                  {label}
                </a>
              ))}
            </div>
            <div className="space-y-3">
              {filteredPosts.map((post) => (
                <details className="premium-admin-item group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm" key={post.id}>
                  <summary className="flex cursor-pointer flex-wrap items-center justify-between gap-3">
                    <span>
                      <span className="block font-semibold text-navy">{post.title}</span>
                      <span className="mt-1 block text-xs text-muted">/blogs/{post.slug} · {post.category}</span>
                    </span>
                    <span className="flex flex-wrap gap-2 text-xs">
                      <span className="rounded-full bg-navy/5 px-3 py-1 font-semibold text-navy">{statusLabel(post.status)}</span>
                      <span className={`rounded-full px-3 py-1 font-semibold ${post.access === "public" ? "bg-emerald-50 text-emerald-800" : "bg-amber-50 text-amber-800"}`}>
                        {post.access === "public" ? "Public" : "Login required"}
                      </span>
                    </span>
                  </summary>
                  <div className="mt-6 border-t border-slate-100 pt-5">
                    {post.status !== "draft" && (
                      <p className="mb-5 text-sm">
                        <Link className="font-semibold text-navy underline decoration-gold underline-offset-4" href={`/blogs/${post.slug}`} target="_blank">
                          Preview public article
                        </Link>
                      </p>
                    )}
                    <BlogEditor post={post} />
                    <form action={deleteBlogPost} className="mt-4">
                      <input name="id" type="hidden" value={post.id} />
                      <button className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-700 transition-colors hover:bg-red-50" type="submit">
                        Delete post
                      </button>
                    </form>
                  </div>
                </details>
              ))}
              {filteredPosts.length === 0 && (
                <p className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-secondary">No blog posts in this filter.</p>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
