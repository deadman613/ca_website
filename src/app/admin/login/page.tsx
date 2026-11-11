import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { BookOpen, LayoutDashboard, PenLine, Shield } from "lucide-react";
import { signIn } from "@/app/actions/auth";
import { getAuthenticatedUser } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export const metadata: Metadata = {
  title: "Admin Login — Blog Panel",
  robots: { index: false, follow: false },
};

interface AdminLoginPageProps {
  searchParams: Promise<{ next?: string; error?: string }>;
}

export default async function AdminLoginPage({ searchParams }: AdminLoginPageProps) {
  const { error } = await searchParams;
  const nextPath = "/admin/blogpanel";

  if (!isSupabaseConfigured()) {
    return (
      <div className="admin-login-scene">
        <div className="admin-login-card">
          <div className="admin-login-logo">
            <BookOpen size={26} />
          </div>
          <span className="section-label">Delhi CA School</span>
          <h1 className="admin-login-title">Blog Panel Access</h1>
          <p className="admin-login-subtitle">
            Admin sign-in is temporarily unavailable — Supabase is not configured.
            Please contact the site administrator.
          </p>
        </div>
      </div>
    );
  }

  const user = await getAuthenticatedUser();
  if (user) {
    redirect(nextPath);
  }

  return (
    <div className="admin-login-scene">
      {/* Background grid pattern */}
      <div aria-hidden="true" className="admin-login-grid" />
      {/* Glow blobs */}
      <div aria-hidden="true" className="admin-login-blob admin-login-blob-1" />
      <div aria-hidden="true" className="admin-login-blob admin-login-blob-2" />

      <div className="admin-login-wrapper">
        {/* Left — branding panel */}
        <div className="admin-login-brand">
          <Link className="admin-login-logo-link" href="/">
            <span className="admin-login-logo">
              <BookOpen size={28} />
            </span>
            <span className="admin-login-brand-name">Delhi CA School</span>
          </Link>

          <h1 className="admin-login-brand-heading">
            Blog Panel<br />Administration
          </h1>
          <p className="admin-login-brand-desc">
            Authorised staff access only. Create, edit, and publish articles
            that reach thousands of CA aspirants across India.
          </p>

          <ul className="admin-login-features">
            {[
              { icon: PenLine, text: "Write & publish blog posts" },
              { icon: LayoutDashboard, text: "Manage drafts & schedules" },
              { icon: Shield, text: "Restricted to admin accounts" },
            ].map(({ icon: Icon, text }) => (
              <li className="admin-login-feature" key={text}>
                <span className="admin-login-feature-icon">
                  <Icon size={15} />
                </span>
                {text}
              </li>
            ))}
          </ul>
        </div>

        {/* Right — login form */}
        <div className="admin-login-form-panel">
          <div className="admin-login-form-inner">
            <div className="admin-login-form-header">
              <span className="admin-login-badge">
                <Shield size={12} /> Secure admin access
              </span>
              <h2 className="admin-login-form-title">Sign in to Blog Panel</h2>
              <p className="admin-login-form-sub">
                Use your authorised administrator email and password.
              </p>
            </div>

            {error === "credentials" && (
              <div role="alert" className="admin-login-error">
                <strong>Sign-in failed.</strong> Check your email and password
                and try again.
              </div>
            )}

            <form action={signIn} className="admin-login-form" id="admin-login-form">
              <input type="hidden" name="next" value={nextPath} />

              <label className="admin-login-label" htmlFor="admin-email">
                Email address
                <input
                  autoComplete="email"
                  className="input-field mt-2"
                  id="admin-email"
                  name="email"
                  placeholder="admin@example.com"
                  required
                  type="email"
                />
              </label>

              <label className="admin-login-label" htmlFor="admin-password">
                Password
                <input
                  autoComplete="current-password"
                  className="input-field mt-2"
                  id="admin-password"
                  name="password"
                  placeholder="••••••••••"
                  required
                  type="password"
                />
              </label>

              <button className="admin-login-btn" type="submit">
                Login to Blog Panel
              </button>
            </form>

            <p className="admin-login-footer">
              Not an admin?{" "}
              <Link className="admin-login-footer-link" href="/blogs">
                Browse the public blog
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
