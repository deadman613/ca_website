"use server";

import { requireAdmin } from "@/lib/auth";
import { createSupabaseActionClient } from "@/lib/supabase/server";

const BUCKET = "blog-images";
const MAX_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"];

export async function uploadBlogImage(formData: FormData): Promise<{ url: string } | { error: string }> {
  await requireAdmin();

  const file = formData.get("file");
  if (!(file instanceof File)) return { error: "No file provided." };
  if (!ALLOWED_TYPES.includes(file.type)) return { error: "Only JPEG, PNG, WebP, GIF, and AVIF images are allowed." };
  if (file.size > MAX_BYTES) return { error: "Image must be under 5 MB." };

  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const name = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const arrayBuffer = await file.arrayBuffer();

  const supabase = await createSupabaseActionClient();

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(name, arrayBuffer, { contentType: file.type, upsert: false });

  if (error) {
    console.error("[upload-image] Supabase storage error:", error);
    return { error: `Supabase storage error: ${error.message} (bucket: ${BUCKET})` };
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(name);
  return { url: data.publicUrl };
}

