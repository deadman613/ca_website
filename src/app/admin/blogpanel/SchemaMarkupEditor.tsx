"use client";

import { useId, useRef, useState } from "react";
import {
  isValidBlogSchemaPayload,
  parseBlogSchemaInput,
} from "@/lib/blog-schema";

interface SchemaMarkupEditorProps {
  initialSchemaJson?: string;
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
}: SchemaMarkupEditorProps) {
  const schemaId = useId();
  const initialMultiplicity = isSchemaArray(initialSchemaJson)
    ? "multiple"
    : "single";
  const [multiplicity, setMultiplicity] = useState(initialMultiplicity);
  const [schemaJson, setSchemaJson] = useState(initialSchemaJson ?? "");
  const multiplicityRef = useRef(multiplicity);

  function changeMultiplicity(nextMultiplicity: "single" | "multiple") {
    if (nextMultiplicity === multiplicityRef.current) return;
    multiplicityRef.current = nextMultiplicity;
    setMultiplicity(nextMultiplicity);

    if (!schemaJson.trim()) return;

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
      setSchemaJson(formatJson(value.slice(0, -1)));
    } catch {
      return;
    }
  }

  let parsedSchema: unknown;
  try {
    parsedSchema = parseBlogSchemaInput(schemaJson);
  } catch {
    parsedSchema = null;
  }
  const isEmpty = !schemaJson.trim();
  const isValid =
    isEmpty ||
    isValidBlogSchemaPayload(parsedSchema, Array.isArray(parsedSchema));
  const hasMultipleSchemas = Array.isArray(parsedSchema);
  const validationMessage = isEmpty
    ? "Optional. Add JSON-LD manually when needed."
    : isValid
      ? `Valid ${hasMultipleSchemas ? "multiple" : "single"} JSON-LD schema${hasMultipleSchemas ? "s" : ""} (one BlogPosting included)`
      : "Use valid JSON-LD with exactly one valid BlogPosting. Enter multiple schemas as a JSON array or separate JSON-LD script blocks.";

  function updateSchemaJson(value: string) {
    setSchemaJson(value);
    try {
      const parsedValue = parseBlogSchemaInput(value);
      const nextMultiplicity = Array.isArray(parsedValue)
        ? "multiple"
        : "single";
      multiplicityRef.current = nextMultiplicity;
      setMultiplicity(nextMultiplicity);
    } catch {
      return;
    }
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
      <div className="mb-5">
        <p className="section-label">03 · Schema markup</p>
        <h3 className="mt-1 text-lg font-semibold text-navy">
          BlogPosting structured data
        </h3>
        <p className="mt-1 text-sm font-normal text-secondary">
          Add valid JSON-LD manually, either as JSON or script blocks. Leave
          this blank to publish without BlogPosting structured data.
        </p>
      </div>
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
            onChange={(event) => updateSchemaJson(event.target.value)}
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
