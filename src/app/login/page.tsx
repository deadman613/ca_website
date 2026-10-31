import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { signIn } from "@/app/actions/auth";
import { getAuthenticatedUser, getSafeReturnPath } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import TiltCard from "@/components/motion/TiltCard";
import Reveal from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Login",
  robots: { index: false, follow: false },
};

interface LoginPageProps {
  searchParams: Promise<{ next?: string; error?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { next, error } = await searchParams;
  const nextPath = getSafeReturnPath(next);

  if (!isSupabaseConfigured()) {
    return (
      <section className="login-scene section-padding relative isolate overflow-hidden">
        <div aria-hidden="true" className="login-orb login-orb-one" />
        <div aria-hidden="true" className="login-orb login-orb-two" />
        <div className="container-wide relative z-10 max-w-lg">
          <Reveal>
            <div className="glass-panel rounded-2xl p-8">
            <span className="section-label">Delhi CA School</span>
            <h1 className="mt-3 text-3xl font-bold text-navy">Member login</h1>
            <p className="mt-4 text-sm leading-relaxed text-secondary">
              Member login is temporarily unavailable because Supabase is not
              configured. Please contact the site administrator.
            </p>
            </div>
          </Reveal>
        </div>
      </section>
    );
  }

  if (await getAuthenticatedUser()) {
    redirect(nextPath);
  }

  return (
    <section className="login-scene section-padding relative isolate overflow-hidden">
      <div aria-hidden="true" className="login-orb login-orb-one" />
      <div aria-hidden="true" className="login-orb login-orb-two" />
      <div className="container-wide relative z-10 max-w-lg">
        <Reveal>
          <TiltCard className="rounded-2xl" tilt={2}>
            <div className="glass-panel rounded-2xl p-8">
          <span className="section-label">Delhi CA School</span>
          <h1 className="mt-3 text-3xl font-bold text-navy">Member login</h1>
          <p className="mt-3 text-sm leading-relaxed text-secondary">
            Sign in to continue to the full article. Accounts are provided by
            the school; public registration is not available.
          </p>

          {error === "credentials" && (
            <p role="alert" className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-700">
              We could not sign you in with those details. Please check your
              email and password and try again.
            </p>
          )}

          <form action={signIn} className="mt-6 space-y-4">
            <input type="hidden" name="next" value={nextPath} />
            <label className="block text-sm font-medium text-navy">
              Email
              <input
                autoComplete="email"
                className="input-field mt-2"
                name="email"
                required
                type="email"
              />
            </label>
            <label className="block text-sm font-medium text-navy">
              Password
              <input
                autoComplete="current-password"
                className="input-field mt-2"
                name="password"
                required
                type="password"
              />
            </label>
            <button className="btn-primary w-full" type="submit">
              Login to Read
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-secondary">
            Need an account?{" "}
            <Link className="font-semibold text-navy underline" href="/contact">
              Contact Delhi CA School
            </Link>
          </p>
            </div>
          </TiltCard>
        </Reveal>
      </div>
    </section>
  );
}
