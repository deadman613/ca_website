"use client";

import { useId, useRef, useState } from "react";
import { Bold, Heading2, Italic, Link, List, Quote } from "lucide-react";

interface MarkdownEditorProps {
  initialValue: string;
}

const toolbarItems = [
  { label: "Bold", icon: Bold, before: "**", after: "**" },
  { label: "Italic", icon: Italic, before: "*", after: "*" },
  { label: "Heading", icon: Heading2, before: "## ", after: "", line: true },
  { label: "Bullet list", icon: List, before: "- ", after: "", line: true },
  { label: "Quote", icon: Quote, before: "> ", after: "", line: true },
  { label: "Link", icon: Link, before: "[", after: "](https://)" },
] as const;

export default function MarkdownEditor({ initialValue }: MarkdownEditorProps) {
  const [value, setValue] = useState(initialValue);
  const editorId = useId();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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
        <span className="ml-auto px-2 text-xs text-muted">Markdown supported</span>
      </div>
      <label className="sr-only" htmlFor={editorId}>Full article content</label>
      <textarea
        className="min-h-72 w-full resize-y border-0 p-4 text-sm leading-7 text-navy outline-none focus:ring-0"
        id={editorId}
        maxLength={100000}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Write your blog post… Use the toolbar or Markdown."
        ref={textareaRef}
        value={value}
      />
      <input name="content" type="hidden" value={value} />
    </div>
  );
}
