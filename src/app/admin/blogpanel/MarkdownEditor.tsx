"use client";

import { useId, useRef, useState, type CSSProperties } from "react";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Image as ImageIcon,
  Italic,
  Link,
  List,
  Loader2,
  Minus,
  Plus,
  Quote,
  Table as TableIcon,
} from "lucide-react";
import { uploadBlogImage } from "@/app/actions/upload-image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import TurndownService from "turndown";
import { isStandaloneAsteriskArtifact } from "@/lib/blog-markdown";

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

type TableAlignment = "left" | "center" | "right";

interface MarkdownTable {
  rows: string[][];
  alignments: TableAlignment[];
}

function validTextAlignment(
  alignment: string | undefined
): CSSProperties["textAlign"] {
  return alignment === "left" ||
    alignment === "center" ||
    alignment === "right" ||
    alignment === "justify"
    ? alignment
    : undefined;
}

function splitTableRow(line: string) {
  const cells: string[] = [];
  let cell = "";
  let escaped = false;

  for (const character of line.trim().replace(/^\|/, "").replace(/\|$/, "")) {
    if (character === "|" && !escaped) {
      cells.push(cell.trim().replace(/\\\|/g, "|"));
      cell = "";
    } else {
      cell += character;
    }
    escaped = character === "\\" && !escaped;
    if (character !== "\\") escaped = false;
  }
  cells.push(cell.trim().replace(/\\\|/g, "|"));
  return cells;
}

function parseMarkdownTable(markdown: string): MarkdownTable | null {
  const lines = markdown.trim().split(/\r?\n/);
  if (lines.length < 2) return null;

  const header = splitTableRow(lines[0]);
  const separators = splitTableRow(lines[1]);
  if (
    !header.length ||
    separators.length !== header.length ||
    !separators.every((cell) => /^:?-{3,}:?$/.test(cell))
  ) {
    return null;
  }

  const body = lines.slice(2).map(splitTableRow);
  if (body.some((row) => row.length !== header.length)) return null;

  const alignments = separators.map((separator): TableAlignment => {
    if (separator.startsWith(":") && separator.endsWith(":")) return "center";
    if (separator.endsWith(":")) return "right";
    return "left";
  });
  return { rows: [header, ...body], alignments };
}

function serializeMarkdownTable({ rows, alignments }: MarkdownTable) {
  const escapeCell = (value: string) =>
    value.replace(/\\/g, "\\\\").replace(/\|/g, "\\|").replace(/\r?\n/g, " ");
  const header = rows[0].map(escapeCell);
  const separator = alignments.map((alignment) => {
    if (alignment === "center") return ":---:";
    if (alignment === "right") return "---:";
    return ":---";
  });
  const body = rows.slice(1).map((row) => row.map(escapeCell));
  return [header, separator, ...body]
    .map((row) => `| ${row.join(" | ")} |`)
    .join("\n");
}

export default function MarkdownEditor({ initialValue }: MarkdownEditorProps) {
  const [value, setValue] = useState(initialValue);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [previewMode, setPreviewMode] = useState(false);
  const [tableDialogOpen, setTableDialogOpen] = useState(false);
  const [isUpdatingTable, setIsUpdatingTable] = useState(false);
  const [tableRows, setTableRows] = useState<string[][]>([
    ["Header 1", "Header 2", "Header 3"],
    ["", "", ""],
    ["", "", ""],
  ]);
  const [tableAlignments, setTableAlignments] = useState<TableAlignment[]>([
    "left",
    "left",
    "left",
  ]);
  const editorId = useId();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const tableSelectionRef = useRef<{ start: number; end: number } | null>(null);

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

  function openTableEditor() {
    const textarea = textareaRef.current;
    const start = textarea?.selectionStart ?? value.length;
    const end = textarea?.selectionEnd ?? value.length;
    const selectedTable = start < end ? parseMarkdownTable(value.slice(start, end)) : null;
    tableSelectionRef.current = { start, end };
    setIsUpdatingTable(Boolean(selectedTable));

    if (selectedTable) {
      setTableRows(selectedTable.rows);
      setTableAlignments(selectedTable.alignments);
    } else {
      setTableRows([
        ["Header 1", "Header 2", "Header 3"],
        ["", "", ""],
        ["", "", ""],
      ]);
      setTableAlignments(["left", "left", "left"]);
    }
    setTableDialogOpen(true);
  }

  function updateTableCell(rowIndex: number, columnIndex: number, text: string) {
    setTableRows((rows) =>
      rows.map((row, currentRow) =>
        currentRow === rowIndex
          ? row.map((cell, currentColumn) =>
              currentColumn === columnIndex ? text : cell
            )
          : row
      )
    );
  }

  function addTableRow() {
    setTableRows((rows) => [
      ...rows,
      Array.from({ length: tableAlignments.length }, () => ""),
    ]);
  }

  function addTableColumn() {
    setTableRows((rows) => rows.map((row, index) => [
      ...row,
      index === 0 ? `Header ${row.length + 1}` : "",
    ]));
    setTableAlignments((alignments) => [...alignments, "left"]);
  }

  function removeTableRow() {
    if (tableRows.length <= 1) return;
    setTableRows((rows) => rows.slice(0, -1));
  }

  function removeTableColumn() {
    if (tableAlignments.length <= 1) return;
    setTableRows((rows) => rows.map((row) => row.slice(0, -1)));
    setTableAlignments((alignments) => alignments.slice(0, -1));
  }

  function resizeTableRows(count: number) {
    if (!Number.isInteger(count) || count < 1 || count > 100) return;
    setTableRows((rows) => {
      if (count <= rows.length) return rows.slice(0, count);
      return [
        ...rows,
        ...Array.from({ length: count - rows.length }, () =>
          Array.from({ length: tableAlignments.length }, () => "")
        ),
      ];
    });
  }

  function resizeTableColumns(count: number) {
    if (!Number.isInteger(count) || count < 1 || count > 100) return;
    setTableRows((rows) =>
      rows.map((row, rowIndex) => {
        if (count <= row.length) return row.slice(0, count);
        return [
          ...row,
          ...Array.from({ length: count - row.length }, (_, index) =>
            rowIndex === 0 ? `Header ${row.length + index + 1}` : ""
          ),
        ];
      })
    );
    setTableAlignments((alignments) => {
      if (count <= alignments.length) return alignments.slice(0, count);
      return [
        ...alignments,
        ...Array.from({ length: count - alignments.length }, () => "left" as const),
      ];
    });
  }

  function insertTable() {
    const selection = tableSelectionRef.current ?? {
      start: value.length,
      end: value.length,
    };
    const prefix = value.slice(0, selection.start);
    const suffix = value.slice(selection.end);
    const before = prefix.length && !prefix.endsWith("\n\n")
      ? prefix.endsWith("\n") ? "\n" : "\n\n"
      : "";
    const after = suffix.length && !suffix.startsWith("\n\n")
      ? suffix.startsWith("\n") ? "\n" : "\n\n"
      : "";
    const table = serializeMarkdownTable({
      rows: tableRows,
      alignments: tableAlignments,
    });
    const insertion = `${before}${table}${after}`;
    const nextValue = `${prefix}${insertion}${suffix}`;
    setValue(nextValue);
    setTableDialogOpen(false);

    const textarea = textareaRef.current;
    if (textarea) {
      const cursorPosition = prefix.length + before.length + table.length;
      requestAnimationFrame(() => {
        textarea.focus();
        textarea.setSelectionRange(cursorPosition, cursorPosition);
      });
    }
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
        setPreviewMode(true);
      }
    } catch (err) {
      // Re-throw Next.js redirect/notFound errors — never swallow them
      if (err && typeof err === "object" && "digest" in err) throw err;
      setUploadError("Upload failed: " + (err instanceof Error ? err.message : "Unknown error"));
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
    // 1. Image paste from clipboard
    const items = Array.from(event.clipboardData.items);
    const imageItem = items.find((item) => item.type.startsWith("image/"));
    if (imageItem) {
      event.preventDefault();
      const file = imageItem.getAsFile();
      if (file) void handleImageUpload(file);
      return;
    }

    // 2. Rich HTML paste (from Word, Google Docs, websites, etc.)
    const html = event.clipboardData.getData("text/html");
    if (html) {
      event.preventDefault();
      const td = new TurndownService({
        headingStyle: "atx",          // # H1, ## H2 …
        bulletListMarker: "-",
        codeBlockStyle: "fenced",
      });
      td.addRule("tables", {
        filter: "table",
        replacement: (_content, node) => {
          const table = node as HTMLTableElement;
          const rows = Array.from(table.rows)
            .map((row) =>
              Array.from(row.cells).map((cell) =>
                td
                  .turndown(cell.innerHTML)
                  .trim()
                  .replace(/\r?\n/g, "<br>")
                  .replace(/(?<!\\)\|/g, "\\|")
              )
            )
            .filter((row) => row.length > 0);
          const columnCount = Math.max(0, ...rows.map((row) => row.length));
          if (rows.length === 0 || columnCount === 0) return "";

          for (const row of rows) {
            while (row.length < columnCount) row.push("");
          }

          const headerCells = Array.from(table.rows[0].cells);
          const separators = Array.from({ length: columnCount }, (_, index) => {
            const alignment =
              headerCells[index]?.style.textAlign ||
              headerCells[index]?.getAttribute("align")?.toLowerCase();
            if (alignment === "center") return ":---:";
            if (alignment === "right") return "---:";
            return ":---";
          });
          const markdownRows = [
            rows[0],
            separators,
            ...rows.slice(1),
          ].map((row) => `| ${row.join(" | ")} |`);

          return `\n\n${markdownRows.join("\n")}\n\n`;
        },
      });
      // Keep images as markdown
      td.addRule("images", {
        filter: "img",
        replacement: (_content, node) => {
          const img = node as HTMLImageElement;
          const alt = img.alt || "";
          const src = img.src || "";
          return src ? `\n\n![${alt}](${src})\n\n` : "";
        },
      });
      const markdown = td.turndown(html).trim();
      insertAtCursor(markdown);
      return;
    }

    // 3. Plain text — let browser handle normally (onChange will sync)
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

        <button
          aria-label="Insert table"
          className="rounded-md p-2 text-navy transition-colors hover:bg-gold/15 hover:text-navy"
          onClick={openTableEditor}
          title="Insert table"
          type="button"
        >
          <TableIcon aria-hidden="true" size={16} />
        </button>

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
        <div className="flex rounded-lg border border-slate-200 bg-white p-0.5">
          <button
            aria-pressed={!previewMode}
            className={`rounded-md px-3 py-1 text-xs font-medium ${previewMode ? "text-secondary" : "bg-navy text-white"}`}
            onClick={() => setPreviewMode(false)}
            type="button"
          >
            Write
          </button>
          <button
            aria-pressed={previewMode}
            className={`rounded-md px-3 py-1 text-xs font-medium ${previewMode ? "bg-navy text-white" : "text-secondary"}`}
            onClick={() => setPreviewMode(true)}
            type="button"
          >
            Preview
          </button>
        </div>
      </div>

      {uploadError && (
        <p className="border-b border-red-100 bg-red-50 px-4 py-2 text-xs text-red-700">
          {uploadError}
        </p>
      )}

      {tableDialogOpen && (
        <div
          aria-labelledby={`${editorId}-table-title`}
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"
          role="dialog"
        >
          <div className="max-h-[90vh] w-full max-w-4xl overflow-auto rounded-2xl bg-white p-5 shadow-2xl sm:p-7">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-navy" id={`${editorId}-table-title`}>
                  Table editor
                </h3>
                <p className="mt-1 text-sm text-secondary">
                  The first row is the semantic header row. Use Markdown inline
                  syntax for bold or italic cell text.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <label className="flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-xs font-medium text-navy">
                  Rows including header
                  <input
                    aria-label="Table row count including header"
                    className="w-16 rounded border border-slate-200 px-2 py-1"
                    max={100}
                    min={1}
                    onChange={(event) => resizeTableRows(Number(event.target.value))}
                    type="number"
                    value={tableRows.length}
                  />
                </label>
                <label className="flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-xs font-medium text-navy">
                  Columns
                  <input
                    aria-label="Table column count"
                    className="w-16 rounded border border-slate-200 px-2 py-1"
                    max={100}
                    min={1}
                    onChange={(event) => resizeTableColumns(Number(event.target.value))}
                    type="number"
                    value={tableAlignments.length}
                  />
                </label>
                <button
                  className="inline-flex items-center gap-1 rounded-md border border-slate-200 px-3 py-2 text-xs font-medium text-navy"
                  onClick={addTableRow}
                  type="button"
                >
                  <Plus size={14} /> Add row
                </button>
                <button
                  className="inline-flex items-center gap-1 rounded-md border border-slate-200 px-3 py-2 text-xs font-medium text-navy disabled:opacity-40"
                  disabled={tableRows.length <= 1}
                  onClick={removeTableRow}
                  type="button"
                >
                  <Minus size={14} /> Remove row
                </button>
                <button
                  className="inline-flex items-center gap-1 rounded-md border border-slate-200 px-3 py-2 text-xs font-medium text-navy"
                  onClick={addTableColumn}
                  type="button"
                >
                  <Plus size={14} /> Add column
                </button>
                <button
                  className="inline-flex items-center gap-1 rounded-md border border-slate-200 px-3 py-2 text-xs font-medium text-navy disabled:opacity-40"
                  disabled={tableAlignments.length <= 1}
                  onClick={removeTableColumn}
                  type="button"
                >
                  <Minus size={14} /> Remove column
                </button>
              </div>
            </div>

            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[42rem] border-collapse text-left text-sm">
                <thead>
                  <tr>
                    {tableRows[0].map((_, columnIndex) => {
                      const AlignIcon = tableAlignments[columnIndex] === "center"
                        ? AlignCenter
                        : tableAlignments[columnIndex] === "right"
                          ? AlignRight
                          : AlignLeft;
                      return (
                        <th className="border-b border-slate-200 p-2" key={columnIndex}>
                          <label className="mb-1 flex items-center gap-2 text-xs font-medium text-navy">
                            Header · Column {columnIndex + 1}
                          </label>
                          <input
                            aria-label={`Header for column ${columnIndex + 1}`}
                            className="input-field"
                            onChange={(event) => updateTableCell(0, columnIndex, event.target.value)}
                            value={tableRows[0][columnIndex]}
                          />
                          <label className="mt-2 flex items-center gap-2 text-xs text-secondary">
                            <AlignIcon aria-hidden="true" size={14} />
                            Column alignment
                            <select
                              aria-label={`Alignment for column ${columnIndex + 1}`}
                              className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs"
                              onChange={(event) => {
                                const alignment = event.target.value as TableAlignment;
                                setTableAlignments((current) =>
                                  current.map((item, index) =>
                                    index === columnIndex ? alignment : item
                                  )
                                );
                              }}
                              value={tableAlignments[columnIndex]}
                            >
                              <option value="left">Left</option>
                              <option value="center">Center</option>
                              <option value="right">Right</option>
                            </select>
                          </label>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {tableRows.slice(1).map((row, rowOffset) => (
                    <tr key={rowOffset}>
                      {row.map((cell, columnIndex) => (
                        <td className="border-b border-slate-100 p-2" key={columnIndex}>
                          <label className="sr-only">
                            Row {rowOffset + 2}, column {columnIndex + 1}
                          </label>
                          <input
                            aria-label={`Row ${rowOffset + 2}, column ${columnIndex + 1}`}
                            className="input-field"
                            onChange={(event) => updateTableCell(rowOffset + 1, columnIndex, event.target.value)}
                            value={cell}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-navy"
                onClick={() => setTableDialogOpen(false)}
                type="button"
              >
                Cancel
              </button>
              <button className="btn-gold" onClick={insertTable} type="button">
                {isUpdatingTable ? "Update table" : "Insert table"}
              </button>
            </div>
          </div>
        </div>
      )}

      <label className="sr-only" htmlFor={editorId}>
        Full article content
      </label>
      {previewMode ? (
        <div className="blog-article min-h-96 space-y-5 p-4">
          {value.trim() ? (
            <ReactMarkdown
              components={{
                p: ({ children }) =>
                  isStandaloneAsteriskArtifact(children) ? null : <p>{children}</p>,
                strong: ({ children }) => (
                  <strong className="font-semibold text-navy">{children}</strong>
                ),
                em: ({ children }) => (
                  <em className="italic">{children}</em>
                ),
                table: ({ children }) => (
                  <div className="my-8 overflow-x-auto rounded-xl border border-gray-200">
                    <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
                      {children}
                    </table>
                  </div>
                ),
                th: ({ children, align }) => (
                  <th
                    className="border-b border-gray-200 bg-off-white px-4 py-3 font-semibold text-navy"
                    scope="col"
                    style={{ textAlign: validTextAlignment(align) }}
                  >
                    {children}
                  </th>
                ),
                td: ({ children, align }) => (
                  <td
                    className="border-b border-gray-100 px-4 py-3 text-secondary"
                    style={{ textAlign: validTextAlignment(align) }}
                  >
                    {children}
                  </td>
                ),
                img: ({ src, alt }) => {
                  if (!src) return null;
                  return (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      alt={alt ?? ""}
                      className="my-6 block h-auto max-w-full rounded-xl"
                      loading="lazy"
                      src={src}
                    />
                  );
                },
              }}
              remarkPlugins={[remarkGfm]}
            >
              {value}
            </ReactMarkdown>
          ) : (
            <p className="text-sm text-muted">Your article preview will appear here.</p>
          )}
        </div>
      ) : (
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
      )}
      {/* Hidden input carries the value for the form action */}
      <input name="content" type="hidden" value={value} />
    </div>
  );
}
