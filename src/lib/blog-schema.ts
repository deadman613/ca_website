import { siteName, siteUrl } from "@/lib/site";

export const schemaOrgContext = "https://schema.org";
const defaultSiteUrl = siteUrl ?? "https://delhicaschool.com";

export interface BlogPostingFields {
  title: string;
  description: string;
  authorName: string;
  authorImage: string;
  datePublished: string;
  dateModified: string;
  featuredImage: string;
  canonicalUrl: string;
  category: string;
  keywords: string[];
}

export type BlogPostingJsonLd = Record<string, unknown> & {
  "@context": typeof schemaOrgContext;
  "@type": "BlogPosting";
};

export type JsonLdSchema = Record<string, unknown> & {
  "@context": string;
  "@type": string | string[];
};

function absoluteUrl(value: string) {
  return new URL(value, `${defaultSiteUrl.replace(/\/+$/, "")}/`).toString();
}

export function getBlogCanonicalUrl(slug: string) {
  return absoluteUrl(`/blogs/${slug}`);
}

export function createBlogPostingSchema(
  fields: BlogPostingFields
): BlogPostingJsonLd {
  const canonicalUrl = fields.canonicalUrl || getBlogCanonicalUrl("");

  return {
    "@context": schemaOrgContext,
    "@type": "BlogPosting",
    headline: fields.title,
    description: fields.description,
    author: {
      "@type": "Person",
      name: fields.authorName,
      ...(fields.authorImage ? { image: absoluteUrl(fields.authorImage) } : {}),
    },
    publisher: {
      "@type": "Organization",
      name: siteName,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/logo/dacalogo.png"),
      },
    },
    datePublished: fields.datePublished,
    dateModified: fields.dateModified,
    ...(fields.featuredImage
      ? { image: [absoluteUrl(fields.featuredImage)] }
      : {}),
    mainEntityOfPage: canonicalUrl,
    url: canonicalUrl,
    articleSection: fields.category,
    keywords: fields.keywords,
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isNamedEntity(value: unknown) {
  if (typeof value === "string") return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0 && value.every(isNamedEntity);
  return isRecord(value) && typeof value.name === "string" && value.name.trim().length > 0;
}

function isHttpUrl(value: unknown): value is string {
  if (typeof value !== "string") return false;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function isValidMainEntityOfPage(value: unknown) {
  if (isHttpUrl(value)) return true;
  return isRecord(value) && isHttpUrl(value["@id"]);
}

export function isValidBlogPostingSchema(
  value: unknown
): value is BlogPostingJsonLd {
  if (!isRecord(value)) return false;
  const publisher = value.publisher;
  const logo = isRecord(publisher) ? publisher.logo : undefined;
  const mainEntityOfPage = value.mainEntityOfPage;

  return (
    value["@context"] === schemaOrgContext &&
    value["@type"] === "BlogPosting" &&
    typeof value.headline === "string" &&
    value.headline.trim().length > 0 &&
    typeof value.description === "string" &&
    value.description.trim().length > 0 &&
    isNamedEntity(value.author) &&
    isRecord(publisher) &&
    publisher["@type"] === "Organization" &&
    typeof publisher.name === "string" &&
    publisher.name.trim().length > 0 &&
    isRecord(logo) &&
    logo["@type"] === "ImageObject" &&
    isHttpUrl(logo.url) &&
    typeof value.datePublished === "string" &&
    !Number.isNaN(Date.parse(value.datePublished)) &&
    typeof value.dateModified === "string" &&
    !Number.isNaN(Date.parse(value.dateModified)) &&
    (mainEntityOfPage === undefined ||
      isValidMainEntityOfPage(mainEntityOfPage)) &&
    (value.url === undefined || isHttpUrl(value.url)) &&
    (value.articleSection === undefined ||
      (typeof value.articleSection === "string" &&
        value.articleSection.trim().length > 0)) &&
    (value.keywords === undefined ||
      typeof value.keywords === "string" ||
      (Array.isArray(value.keywords) &&
        value.keywords.every((keyword) => typeof keyword === "string"))) &&
    (value.image === undefined ||
      isHttpUrl(value.image) ||
      (Array.isArray(value.image) &&
        value.image.length > 0 &&
        value.image.every(isHttpUrl)))
  );
}

export function parseBlogSchemaInput(input: string): unknown {
  const scriptPattern =
    /<script\b(?=[^>]*\btype\s*=\s*(?:"application\/ld\+json"|'application\/ld\+json'|application\/ld\+json))[^>]*>([\s\S]*?)<\/script\s*>/gi;
  const scripts = [...input.matchAll(scriptPattern)];

  if (scripts.length === 0) return JSON.parse(input);

  const remainingInput = input.replace(scriptPattern, "").trim();
  if (remainingInput) {
    throw new Error("Only JSON-LD script blocks are allowed.");
  }

  const schemas = scripts.map((script) => JSON.parse(script[1]));
  return schemas.length === 1 ? schemas[0] : schemas;
}

export function isValidJsonLdSchema(value: unknown): value is JsonLdSchema {
  if (!isRecord(value)) return false;
  const types = Array.isArray(value["@type"])
    ? value["@type"]
    : [value["@type"]];
  if (
    value["@context"] !== schemaOrgContext ||
    types.length === 0 ||
    !types.every((type) => typeof type === "string" && type.trim().length > 0)
  ) {
    return false;
  }

  return types.includes("BlogPosting")
    ? isValidBlogPostingSchema(value)
    : true;
}

export function isValidBlogSchemaPayload(
  value: unknown,
  multiple: boolean
): boolean {
  if (multiple !== Array.isArray(value)) return false;
  const schemas = Array.isArray(value) ? value : [value];
  if (schemas.length === 0 || !schemas.every(isValidJsonLdSchema)) return false;

  const blogPostingCount = schemas.filter((schema) =>
    (Array.isArray(schema["@type"])
      ? schema["@type"]
      : [schema["@type"]]
    ).includes("BlogPosting")
  ).length;

  return blogPostingCount === 1;
}

export function parseBlogPostingSchemas(json: string): JsonLdSchema[] {
  let value: unknown;
  try {
    value = parseBlogSchemaInput(json);
  } catch {
    throw new Error("Stored structured data is not valid JSON.");
  }

  const schemas = Array.isArray(value) ? value : [value];
  if (!isValidBlogSchemaPayload(value, Array.isArray(value))) {
    throw new Error(
      "Structured data must contain exactly one valid BlogPosting and valid JSON-LD objects."
    );
  }

  return schemas;
}
