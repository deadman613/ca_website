import "server-only";

import { redirect } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export function getSafeReturnPath(value: string | null | undefined) {
  if (
    !value ||
    !value.startsWith("/") ||
    value.startsWith("//") ||
    value.includes("\\")
  ) {
    return "/blogs";
  }

  const parsed = new URL(value, "https://delhicaschool.invalid");
  if (parsed.origin !== "https://delhicaschool.invalid") return "/blogs";
  return value;
}

export async function getAuthenticatedUser(): Promise<User | null> {
  if (!isSupabaseConfigured()) return null;

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getUser();

  if (error && error.name !== "AuthSessionMissingError") {
    throw error;
  }

  return data.user;
}

export function isAdminUser(user: User | null) {
  const adminEmail = process.env.BLOG_ADMIN_EMAIL?.trim().toLowerCase();
  return Boolean(
    user?.email &&
      adminEmail &&
      user.email.trim().toLowerCase() === adminEmail
  );
}

export async function requireAdmin() {
  const user = await getAuthenticatedUser();

  if (!user) {
    redirect("/login?next=%2Fadmin%2Fblogpanel");
  }

  if (!isAdminUser(user)) {
    redirect("/blogs");
  }

  return user;
}
