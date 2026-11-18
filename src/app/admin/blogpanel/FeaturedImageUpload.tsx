"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { UploadCloud, X, Loader2 } from "lucide-react";
import { uploadBlogImage } from "@/app/actions/upload-image";

interface FeaturedImageUploadProps {
  initialUrl?: string;
}

export default function FeaturedImageUpload({ initialUrl }: FeaturedImageUploadProps) {
  const [url, setUrl] = useState(initialUrl ?? "");
  const [preview, setPreview] = useState(initialUrl ?? "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setError("");
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const result = await uploadBlogImage(fd);
      if ("error" in result) {
        setError(result.error);
      } else {
        setUrl(result.url);
        setPreview(result.url);
      }
    } catch {
      setError("Upload failed. Check your Supabase storage bucket.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) void handleFile(file);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) void handleFile(file);
  }

  function handleUrlInput(event: React.ChangeEvent<HTMLInputElement>) {
    setUrl(event.target.value);
    setPreview(event.target.value);
  }

  function clearImage() {
    setUrl("");
    setPreview("");
    setError("");
  }

  return (
    <div className="space-y-3">
      {/* Hidden input that the form action reads */}
      <input name="featuredImage" type="hidden" value={url} />

      {/* Upload zone */}
      <div
        className={`relative flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-6 transition-colors ${
          uploading
            ? "border-gold/60 bg-gold/5"
            : "border-slate-200 bg-slate-50 hover:border-gold/50 hover:bg-gold/5"
        }`}
        onClick={() => !uploading && fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click(); }}
        aria-label="Upload featured image"
      >
        {uploading ? (
          <Loader2 className="animate-spin text-gold" size={28} />
        ) : (
          <UploadCloud className="text-slate-400" size={28} />
        )}
        <p className="text-sm text-secondary">
          {uploading ? "Uploading…" : "Click or drag & drop to upload"}
        </p>
        <p className="text-xs text-muted">JPEG, PNG, WebP, GIF, AVIF · max 5 MB</p>
        <input
          accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
          className="sr-only"
          onChange={handleChange}
          ref={fileInputRef}
          type="file"
        />
      </div>

      {/* OR enter URL manually */}
      <div className="flex items-center gap-2">
        <div className="h-px flex-1 bg-slate-200" />
        <span className="text-xs text-muted">or enter URL</span>
        <div className="h-px flex-1 bg-slate-200" />
      </div>
      <input
        className="input-field"
        onChange={handleUrlInput}
        placeholder="https://…"
        type="url"
        value={url}
      />

      {error && (
        <p className="text-xs text-red-600">{error}</p>
      )}

      {/* Preview */}
      {preview && (
        <div className="relative overflow-hidden rounded-xl border border-slate-200">
          <Image
            alt="Featured image preview"
            className="h-48 w-full object-cover"
            height={192}
            src={preview}
            unoptimized
            width={800}
            onError={() => setPreview("")}
          />
          <button
            aria-label="Remove featured image"
            className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
            onClick={clearImage}
            type="button"
          >
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  );
}

