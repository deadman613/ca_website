"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { getSafeReturnPath } from "@/lib/auth";
import { createSupabaseActionClient } from "@/lib/supabase/server";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

export async function signIn(formData: FormData) {
  const nextPath = getSafeReturnPath(String(formData.get("next") ?? ""));
  const parsed = loginSchema.safeParse({
    email: String(formData.get("email") ?? "").trim(),
    password: String(formData.get("password") ?? ""),
  });

  if (!parsed.success) {
    redirect(`/login?error=credentials&next=${encodeURIComponent(nextPath)}`);
  }

  const supabase = await createSupabaseActionClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error) {
    redirect(`/login?error=credentials&next=${encodeURIComponent(nextPath)}`);
  }

  redirect(nextPath);
}

export async function signOut() {
  const supabase = await createSupabaseActionClient();
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
  redirect("/blogs");
}
