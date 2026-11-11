"use client";

import { useState } from "react";
import { slugifyBlogTitle } from "@/lib/blog-slug";

interface BlogTitleSlugFieldsProps {
  initialTitle?: string;
  initialSlug?: string;
}

export default function BlogTitleSlugFields({
  initialTitle = "",
  initialSlug = "",
}: BlogTitleSlugFieldsProps) {
  const [title, setTitle] = useState(initialTitle);
  const [slug, setSlug] = useState(initialSlug || slugifyBlogTitle(initialTitle));

  function handleTitleChange(value: string) {
    setTitle(value);
    // Only auto-update slug if it hasn't been manually set (i.e. it's a new post)
    if (!initialSlug) {
      setSlug(slugifyBlogTitle(value));
    }
  }

  return (
    <>
      {/* Hidden slug input — auto-generated, submitted with the form */}
      <input name="slug" type="hidden" value={slug} />

      <label className="text-sm font-medium text-navy md:col-span-2">
        Post title
        <input
          className="input-field mt-2"
          maxLength={200}
          name="title"
          onChange={(event) => handleTitleChange(event.target.value)}
          placeholder="A helpful title for your readers"
          required
          value={title}
        />
        {/* Live URL preview */}
        <span className="mt-2 flex items-center gap-1.5 text-xs text-muted">
          <span className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[11px] text-secondary">
            /blogs/{slug || "your-post-slug"}
          </span>
          <span className="text-muted">— auto-generated from title</span>
        </span>
      </label>
    </>
  );
}
