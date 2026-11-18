"use client";

import { useId, useRef, useState } from "react";
import { Bold, Italic, Link, List, Quote, Image as ImageIcon, Loader2 } from "lucide-react";
import { uploadBlogImage } from "@/app/actions/upload-image";

interface MarkdownEditorProps {
  initialValue: string;
}

const toolbarItems = [
  { label: "Bold", icon: Bold, before: "**", after: "**" },
  { label: "Italic", icon: Italic, before: "*", after: "*" },
  { label: "Bullet list", icon: List, before: "- ", after: "", line: true },
  { label: "Quote", icon: Quote, before: "> ", after: "", line: true },
  { label: "Link", icon: Link, before: "[", after: "](https://)" },
] as const;

export default function MarkdownEditor({ initialValue }: MarkdownEditorProps) {
  const [value, setValue] = useState(initialValue);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const editorId = useId();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function applyParagraph() {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const lineStart = value.lastIndexOf("\n", start - 1) + 1;
    const selectedEnd =
      end > start && value[end - 1] === "\n" ? end - 1 : end;
    const lineEnd = value.indexOf("\n", selectedEnd);
    const blockEnd = lineEnd === -1 ? value.length : lineEnd;
    const stripped = value
      .slice(lineStart, blockEnd)
      .split("\n")
      .map((line) => line.replace(/^ {0,3}#{1,6}[ \t]*/, ""))
      .join("\n");
    const nextValue =
      value.slice(0, lineStart) + stripped + value.slice(blockEnd);

    setValue(nextValue);
    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(lineStart, lineStart + stripped.length);
    });
  }

  function applyHeading(level: number) {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const lineStart = value.lastIndexOf("\n", start - 1) + 1;
    const selectedEnd =
      end > start && value[end - 1] === "\n" ? end - 1 : end;
    const lineEnd = value.indexOf("\n", selectedEnd);
    const blockEnd = lineEnd === -1 ? value.length : lineEnd;
    const selectedLines = value
      .slice(lineStart, blockEnd)
      .split("\n")
      .map((line) => {
        const text = line.replace(/^ {0,3}#{1,6}[ \t]*/, "");
        return text.trim() ? `${"#".repeat(level)} ${text}` : text;
      })
      .join("\n");
    const nextValue =
      value.slice(0, lineStart) + selectedLines + value.slice(blockEnd);

    setValue(nextValue);
    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(lineStart, lineStart + selectedLines.length);
    });
  }

  function applyFormat(before: string, after: string, line = false) {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = value.slice(start, end);
    const lineStart = line ? value.lastIndexOf("\n", start - 1) + 1 : start;
    const textBeforeSelection = line ? value.slice(lineStart, start) : "";
    const insertion = `${before}${textBeforeSelection}${selected}${after}`;
    const nextValue =
      value.slice(0, lineStart) + insertion + value.slice(end);

    setValue(nextValue);
    requestAnimationFrame(() => {
      textarea.focus();
      const selectionStart =
        lineStart + before.length + textBeforeSelection.length;
      textarea.setSelectionRange(
        selectionStart,
        selectionStart + selected.length
      );
    });
  }

  function insertAtCursor(text: string) {
    const textarea = textareaRef.current;
    if (!textarea) {
      setValue((prev) => prev + "\n" + text + "\n");
      return;
    }
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const prefix = value.slice(0, start);
    const suffix = value.slice(end);
    const needsNewlineBefore = prefix.length > 0 && !prefix.endsWith("\n");
    const needsNewlineAfter = suffix.length > 0 && !suffix.startsWith("\n");
    const insertion = `${needsNewlineBefore ? "\n" : ""}${text}${needsNewlineAfter ? "\n" : ""}`;
    const next = prefix + insertion + suffix;
    setValue(next);
    const cursorPos = prefix.length + insertion.length;
    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(cursorPos, cursorPos);
    });
  }

  async function handleImageUpload(file: File) {
    setUploadError("");
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const result = await uploadBlogImage(fd);
      if ("error" in result) {
        setUploadError(result.error);
      } else {
        const altText = file.name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ");
        insertAtCursor(`![${altText}](${result.url})`);
      }
    } catch {
      setUploadError("Upload failed. Check your Supabase storage bucket.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  function handleDrop(event: React.DragEvent<HTMLTextAreaElement>) {
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      event.preventDefault();
      void handleImageUpload(file);
    }
  }

  function handlePaste(event: React.ClipboardEvent<HTMLTextAreaElement>) {
    // Handle image paste from clipboard
    const items = Array.from(event.clipboardData.items);
    const imageItem = items.find((item) => item.type.startsWith("image/"));
    if (imageItem) {
      event.preventDefault();
      const file = imageItem.getAsFile();
      if (file) void handleImageUpload(file);
      return;
    }
    // Plain text paste: let browser handle it, then sync state
    // We use onInput instead to capture pasted text — see onInput handler below
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white focus-within:border-gold focus-within:ring-2 focus-within:ring-gold/20">
      <div
        aria-label="Markdown formatting"
        className="flex flex-wrap items-center gap-1 border-b border-slate-200 bg-off-white p-2"
        role="toolbar"
      >
        {toolbarItems.map(({ label, icon: Icon, before, after, ...item }) => (
          <button
            aria-label={label}
            className="rounded-md p-2 text-navy transition-colors hover:bg-gold/15 hover:text-navy"
            key={label}
            onClick={() => applyFormat(before, after, "line" in item && item.line)}
            title={label}
            type="button"
          >
            <Icon aria-hidden="true" size={16} />
          </button>
        ))}

        {/* Image insert button */}
        <button
          aria-label="Insert image"
          className="rounded-md p-2 text-navy transition-colors hover:bg-gold/15 hover:text-navy disabled:opacity-50"
          disabled={uploading}
          onClick={() => fileInputRef.current?.click()}
          title="Insert image"
          type="button"
        >
          {uploading ? (
            <Loader2 aria-hidden="true" className="animate-spin" size={16} />
          ) : (
            <ImageIcon aria-hidden="true" size={16} />
          )}
        </button>
        <input
          accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
          className="sr-only"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void handleImageUpload(file);
          }}
          ref={fileInputRef}
          type="file"
        />

        <div className="mx-1 h-5 w-px bg-slate-200" aria-hidden="true" />

        <label className="rounded-md px-2 py-1 text-sm text-navy">
          <span className="sr-only">Apply text style</span>
          <select
            aria-label="Apply text style"
            className="rounded-md border border-slate-200 bg-white px-2 py-1"
            defaultValue=""
            onChange={(event) => {
              const val = event.target.value;
              if (val === "p") applyParagraph();
              else if (val) applyHeading(Number(val));
              event.target.value = "";
            }}
          >
            <option value="">Style</option>
            <option value="p">Paragraph</option>
            {[1, 2, 3, 4, 5, 6].map((level) => (
              <option key={level} value={level}>
                H{level}
              </option>
            ))}
          </select>
        </label>

        <span className="ml-auto px-2 text-xs text-muted">
          Markdown · drag or paste images
        </span>
      </div>

      {uploadError && (
        <p className="border-b border-red-100 bg-red-50 px-4 py-2 text-xs text-red-700">
          {uploadError}
        </p>
      )}

      <label className="sr-only" htmlFor={editorId}>
        Full article content
      </label>
      <textarea
        className="min-h-96 w-full resize-y border-0 p-4 text-sm leading-7 text-navy outline-none focus:ring-0"
        id={editorId}
        maxLength={100000}
        name="content-textarea"
        onChange={(event) => setValue(event.target.value)}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onPaste={handlePaste}
        placeholder="Write your blog post… Use the toolbar, drag & drop images, or paste images directly."
        ref={textareaRef}
        value={value}
      />
      {/* Hidden input carries the value for the form action */}
      <input name="content" type="hidden" value={value} />
    </div>
  );
}
