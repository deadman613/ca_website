"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  createBlogPostingSchema,
  getBlogCanonicalUrl,
  isValidBlogSchemaPayload,
} from "@/lib/blog-schema";

interface SchemaMarkupEditorProps {
  initialSchemaJson?: string;
  initialSchemaMode?: "auto" | "manual";
  initialTitle?: string;
  initialDescription?: string;
  initialAuthor?: string;
  initialAuthorImage?: string;
  initialSlug?: string;
  initialCanonicalUrl?: string;
  initialCategory: string;
  initialKeywords?: string[];
  initialFeaturedImage?: string;
  initialDatePublished: string;
  initialDateModified: string;
}

function readFormValue(form: HTMLFormElement, name: string) {
  const field = form.elements.namedItem(name);
  if (
    field instanceof HTMLInputElement ||
    field instanceof HTMLTextAreaElement ||
    field instanceof HTMLSelectElement
  ) {
    return field.value;
  }
  return "";
}

function formatJson(value: unknown) {
  return JSON.stringify(value, null, 2);
}

function isSchemaArray(json?: string) {
  if (!json) return false;
  try {
    return Array.isArray(JSON.parse(json));
  } catch {
    return false;
  }
}

export default function SchemaMarkupEditor({
  initialSchemaJson,
  initialSchemaMode = "auto",
  initialTitle = "",
  initialDescription = "",
  initialAuthor = "",
  initialAuthorImage = "",
  initialSlug = "",
  initialCanonicalUrl = "",
  initialCategory,
  initialKeywords = [],
  initialFeaturedImage = "",
  initialDatePublished,
  initialDateModified,
}: SchemaMarkupEditorProps) {
  const schemaId = useId();
  const initialMultiplicity = isSchemaArray(initialSchemaJson)
    ? "multiple"
    : "single";
  const initialValues = {
    title: initialTitle,
    description: initialDescription,
    authorName: initialAuthor,
    authorImage: initialAuthorImage,
    datePublished: initialDatePublished,
    dateModified: initialDateModified,
    featuredImage: initialFeaturedImage,
    canonicalUrl: initialCanonicalUrl || getBlogCanonicalUrl(initialSlug),
    category: initialCategory,
    keywords: initialKeywords,
  };
  const initialGenerated = formatJson(createBlogPostingSchema(initialValues));
  const [mode, setMode] = useState(initialSchemaMode);
  const [multiplicity, setMultiplicity] = useState(initialMultiplicity);
  const [schemaJson, setSchemaJson] = useState(
    initialSchemaMode === "manual" && initialSchemaJson
      ? initialSchemaJson
      : initialMultiplicity === "multiple"
        ? formatJson([createBlogPostingSchema(initialValues)])
        : initialGenerated
  );
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const modeRef = useRef(mode);
  const multiplicityRef = useRef(multiplicity);

  useEffect(() => {
    const form = textareaRef.current?.form;
    if (!form) return;

    const updateGeneratedSchema = (event: Event) => {
      if (
        event.target instanceof HTMLTextAreaElement &&
        event.target.name === "schemaData"
      ) {
        return;
      }
      if (modeRef.current === "manual") return;

      const publishAt = readFormValue(form, "publishAt");
      const slug = readFormValue(form, "slug") || initialSlug;
      const parsedPublishAt = publishAt
        ? new Date(`${publishAt}:00+05:30`)
        : new Date(initialDatePublished);
      const values = {
        title: readFormValue(form, "title"),
        description:
          readFormValue(form, "seoDescription") ||
          readFormValue(form, "excerpt"),
        authorName: readFormValue(form, "authorName"),
        authorImage: readFormValue(form, "authorPhoto"),
        datePublished: Number.isNaN(parsedPublishAt.getTime())
          ? initialDatePublished
          : parsedPublishAt.toISOString(),
        dateModified: initialDateModified,
        featuredImage: readFormValue(form, "featuredImage"),
        canonicalUrl:
          readFormValue(form, "canonicalUrl") || getBlogCanonicalUrl(slug),
        category: readFormValue(form, "category"),
        keywords: readFormValue(form, "tags")
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      };

      const generatedSchema = createBlogPostingSchema(values);
      setSchemaJson(
        formatJson(
          multiplicityRef.current === "multiple"
            ? [generatedSchema]
            : generatedSchema
        )
      );
    };

    form.addEventListener("input", updateGeneratedSchema);
    form.addEventListener("change", updateGeneratedSchema);
    return () => {
      form.removeEventListener("input", updateGeneratedSchema);
      form.removeEventListener("change", updateGeneratedSchema);
    };
  }, [initialDateModified, initialDatePublished, initialSlug]);

  function useAutomaticSchema() {
    modeRef.current = "auto";
    setMode("auto");
    const form = textareaRef.current?.form;
    if (form) form.dispatchEvent(new Event("input", { bubbles: true }));
  }

  function changeMultiplicity(nextMultiplicity: "single" | "multiple") {
    if (nextMultiplicity === multiplicityRef.current) return;
    multiplicityRef.current = nextMultiplicity;
    setMultiplicity(nextMultiplicity);

    if (modeRef.current === "auto") {
      const form = textareaRef.current?.form;
      if (form) form.dispatchEvent(new Event("input", { bubbles: true }));
      return;
    }

    try {
      const value: unknown = JSON.parse(schemaJson);
      const converted = Array.isArray(value)
        ? nextMultiplicity === "multiple"
          ? value
          : value[0]
        : nextMultiplicity === "multiple"
          ? [value]
          : value;
      if (converted !== undefined) setSchemaJson(formatJson(converted));
    } catch {
      setSchemaJson(nextMultiplicity === "multiple" ? "[]" : "{}");
    }
  }

  function addSchema() {
    let schemas: unknown[];
    try {
      const value: unknown = JSON.parse(schemaJson);
      schemas = Array.isArray(value) ? value : [value];
    } catch {
      return;
    }

    modeRef.current = "manual";
    setMode("manual");
    if (multiplicityRef.current !== "multiple") {
      multiplicityRef.current = "multiple";
      setMultiplicity("multiple");
    }
    setSchemaJson(
      formatJson([
        ...schemas,
        { "@context": "https://schema.org", "@type": "WebPage" },
      ])
    );
  }

  function removeLastSchema() {
    try {
      const value: unknown = JSON.parse(schemaJson);
      if (!Array.isArray(value) || value.length <= 1) return;
      modeRef.current = "manual";
      setMode("manual");
      setSchemaJson(formatJson(value.slice(0, -1)));
    } catch {
      return;
    }
  }

  let parsedSchema: unknown;
  try {
    parsedSchema = JSON.parse(schemaJson);
  } catch {
    parsedSchema = null;
  }
  const isValid = isValidBlogSchemaPayload(
    parsedSchema,
    multiplicity === "multiple"
  );
  const validationMessage = isValid
    ? `Valid ${multiplicity === "multiple" ? "multiple" : "single"} JSON-LD schema${multiplicity === "multiple" ? "s" : ""} (one BlogPosting included)`
    : "Use valid JSON-LD with exactly one valid BlogPosting. Multiple mode requires a JSON array.";

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
      <div className="mb-5">
        <p className="section-label">03 · Schema markup</p>
        <h3 className="mt-1 text-lg font-semibold text-navy">
          BlogPosting structured data
        </h3>
        <p className="mt-1 text-sm font-normal text-secondary">
          BlogPosting is generated from this post. Choose one schema or a
          multiple-schema array, then edit the JSON-LD as needed.
        </p>
      </div>
      <input name="schemaMode" type="hidden" value={mode} />
      <input
        name="schemaMultiplicity"
        type="hidden"
        value={multiplicity}
      />
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <label className="text-sm font-medium text-navy" htmlFor={`${schemaId}-count`}>
          Schema count
        </label>
        <select
          className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-navy"
          id={`${schemaId}-count`}
          onChange={(event) =>
            changeMultiplicity(event.target.value as "single" | "multiple")
          }
          value={multiplicity}
        >
          <option value="single">One schema</option>
          <option value="multiple">Multiple schemas</option>
        </select>
        {multiplicity === "multiple" && (
          <>
            <button
              className="rounded-md border border-slate-200 px-3 py-2 text-xs font-medium text-navy"
              onClick={addSchema}
              type="button"
            >
              Add another schema
            </button>
            <button
              className="rounded-md border border-slate-200 px-3 py-2 text-xs font-medium text-navy"
              onClick={removeLastSchema}
              type="button"
            >
              Remove last schema
            </button>
          </>
        )}
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-navy" htmlFor={`${schemaId}-json`}>
            JSON-LD
          </label>
          <textarea
            aria-describedby={`${schemaId}-validation`}
            className="input-field mt-2 min-h-80 resize-y font-mono text-xs leading-5"
            id={`${schemaId}-json`}
            name="schemaData"
            onChange={(event) => {
              modeRef.current = "manual";
              setMode("manual");
              setSchemaJson(event.target.value);
            }}
            ref={textareaRef}
            spellCheck={false}
            value={schemaJson}
          />
          <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
            <p
              className={`text-xs ${isValid ? "text-emerald-700" : "text-red-700"}`}
              id={`${schemaId}-validation`}
              role="status"
            >
              {validationMessage}
            </p>
            {mode === "manual" && (
              <button
                className="text-xs font-semibold text-navy underline underline-offset-4"
                onClick={useAutomaticSchema}
                type="button"
              >
                Restore automatic schema
              </button>
            )}
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-navy">Live JSON preview</p>
          <pre className="mt-2 min-h-80 overflow-auto rounded-lg bg-slate-950 p-4 text-xs leading-5 text-slate-100">
            {schemaJson}
          </pre>
        </div>
      </div>
    </section>
  );
}
