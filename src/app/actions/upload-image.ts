"use server";

import { createClient } from "@supabase/supabase-js";
import { getAuthenticatedUser, isAdminUser } from "@/lib/auth";

const BUCKET = "blogimage";
const MAX_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"];

// Service role client — bypasses RLS, safe on server only
function getAdminStorageClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) throw new Error("Missing Supabase service role config.");
  return createClient(url, serviceKey, { auth: { persistSession: false } });
}

export async function uploadBlogImage(formData: FormData): Promise<{ url: string } | { error: string }> {
  // Verify admin session via cookie-based client (safe auth check)
  const user = await getAuthenticatedUser();
  if (!user || !isAdminUser(user)) {
    return { error: "Session expired. Please log in again." };
  }

  const file = formData.get("file");
  if (!(file instanceof File)) return { error: "No file provided." };
  if (!ALLOWED_TYPES.includes(file.type)) return { error: "Only JPEG, PNG, WebP, GIF, and AVIF images are allowed." };
  if (file.size > MAX_BYTES) return { error: "Image must be under 5 MB." };

  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const name = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const arrayBuffer = await file.arrayBuffer();

  // Use service role client to bypass RLS for upload
  const supabase = getAdminStorageClient();

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(name, arrayBuffer, { contentType: file.type, upsert: false });

  if (error) {
    console.error("[upload-image] Supabase storage error:", error);
    return { error: `Upload error: ${error.message}` };
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(name);
  return { url: data.publicUrl };
}

