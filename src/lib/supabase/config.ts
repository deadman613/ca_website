import {
  isPrismaDatabaseConfigured,
  isPrismaMigrationDatabaseConfigured,
} from "@/lib/prisma-config";

function isValidSupabaseUrl(value: string) {
  try {
    const url = new URL(value);
    return (
      (url.protocol === "https:" || url.protocol === "http:") &&
      url.hostname.length > 0 &&
      (url.hostname.endsWith(".supabase.co") ||
        url.hostname === "localhost" ||
        url.hostname === "127.0.0.1") &&
      !/your-project|example\.com|replace-with/i.test(value)
    );
  } catch {
    return false;
  }
}

function isValidAnonKey(value: string) {
  return (
    value.trim().length > 20 &&
    !/replace-with|your-project|example/i.test(value)
  );
}

function isValidAdminEmail(value: string) {
  return (
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) &&
    !/admin@example\.com/i.test(value)
  );
}

export function getBlogAdminSetupIssues() {
  const issues: string[] = [];
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? "";
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ?? "";
  const adminEmail = process.env.BLOG_ADMIN_EMAIL?.trim() ?? "";

  if (!isValidSupabaseUrl(url)) {
    issues.push(
      "NEXT_PUBLIC_SUPABASE_URL must be the Project URL from Supabase → Project Settings → API (https://<project-ref>.supabase.co), not a database connection or pooler URL."
    );
  }
  if (!isValidAnonKey(anonKey)) {
    issues.push(
      "Set NEXT_PUBLIC_SUPABASE_ANON_KEY to the project's anon or publishable API key."
    );
  }
  if (!isPrismaDatabaseConfigured()) {
    issues.push(
      "Set DATABASE_URL to the rotated pooled PostgreSQL connection string for the Prisma backend. Keep it server-only and do not use the exposed old database password."
    );
  }
  if (!isPrismaMigrationDatabaseConfigured()) {
    issues.push(
      "Set DIRECT_URL to the rotated direct or session-pooled PostgreSQL connection string used by Prisma migrations. Keep it server-only."
    );
  }
  if (!isValidAdminEmail(adminEmail)) {
    issues.push(
      "Set BLOG_ADMIN_EMAIL to the email address of the Supabase account that will administer the blog."
    );
  }

  return issues;
}

export function isBlogAdminConfigured() {
  return getBlogAdminSetupIssues().length === 0;
}

export function getSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

  if (!url || !anonKey || !isValidSupabaseUrl(url) || !isValidAnonKey(anonKey)) {
    throw new Error(
      "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL to your project's HTTP(S) URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to its anon or publishable key."
    );
  }

  return { url, anonKey };
}

export function isSupabaseConfigured() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  return Boolean(
    url &&
      anonKey &&
      isValidSupabaseUrl(url) &&
      isValidAnonKey(anonKey)
  );
}
