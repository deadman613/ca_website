"use client";

import { useState } from "react";
import { Download, BookOpen, FileText, Filter } from "lucide-react";
import { resources, resourceCategories } from "@/lib/data/resources";
import CTASection from "@/components/home/CTASection";
import StreamSwitcher from "@/components/layout/StreamSwitcher";
import { useStream } from "@/components/layout/StreamProvider";

const typeIcons: Record<string, typeof BookOpen> = {
  Notes: BookOpen,
  Video: FileText,
  "Mock test": FileText,
  "Practice paper": FileText,
};

const levelColors: Record<string, string> = {
  Foundation: "text-blue-700 bg-blue-50 border-blue-200",
  Intermediate: "text-emerald-700 bg-emerald-50 border-emerald-200",
  Final: "text-amber-700 bg-amber-50 border-amber-200",
  General: "text-purple-700 bg-purple-50 border-purple-200",
};

export default function ResourcesPage() {
  const { stream } = useStream();
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered =
    stream === "CA"
      ? resources.filter(
          (resource) =>
            activeFilter === "all" || resource.type === activeFilter
        )
      : [];

  return (
    <>
      {/* Hero */}
      <section className="bg-navy section-padding">
        <div className="container-wide">
          <div className="max-w-2xl">
            <span className="section-label mb-4 block">Knowledge Library</span>
            <div className="mb-5">
              <StreamSwitcher />
            </div>
            <h1 className="font-playfair text-white text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Free Resources
              <br />
              <span className="text-gold-light italic">For Every Stage.</span>
            </h1>
            <p className="text-white/60 text-lg leading-relaxed">
              {stream === "CA"
                ? "Browse free CA notes, videos, mock tests and practice papers by category."
                : "Browse free CS notes, videos, mock tests and practice papers by category."}
            </p>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          {/* Filters */}
          <div className="flex items-center gap-3 flex-wrap mb-10">
            <div className="flex items-center gap-2 text-muted">
              <Filter size={15} />
              <span className="text-sm font-medium">Filter by:</span>
            </div>
            {resourceCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ${
                  activeFilter === cat.id
                    ? "bg-navy text-white border-navy"
                    : "bg-white text-navy border-gray-200 hover:border-navy"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Count */}
          <p className="text-muted text-sm mb-8" style={{ color: "var(--text-muted)" }}>
            Showing {filtered.length} resource{filtered.length !== 1 ? "s" : ""}
          </p>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {filtered.map((resource) => {
              const Icon = typeIcons[resource.type] || BookOpen;
              return (
                <div
                  key={resource.id}
                  className="group bg-white border border-gray-100 rounded-xl overflow-hidden card-hover"
                >
                  {/* Thumbnail */}
                  <div className="h-40 bg-gradient-to-br from-navy to-navy-light flex items-center justify-center relative">
                    <Icon size={40} className="text-white/20" />
                    <div className="absolute top-3 left-3">
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded border ${
                          levelColors[resource.level]
                        }`}
                      >
                        {resource.level}
                      </span>
                    </div>
                    <div className="absolute bottom-3 right-3">
                      <span className="tag">{resource.type}</span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-playfair text-navy font-bold text-lg leading-snug mb-3 group-hover:text-navy">
                      {resource.title}
                    </h3>
                    <p className="text-secondary text-sm leading-relaxed mb-5 line-clamp-2"
                      style={{ color: "var(--text-secondary)" }}>
                      {resource.description}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-muted text-xs" style={{ color: "var(--text-muted)" }}>
                        {resource.downloads?.toLocaleString("en-IN")} downloads
                      </span>
                      <a
                        href={resource.downloadUrl || "#"}
                        className="flex items-center gap-1.5 text-navy text-sm font-semibold hover:text-gold transition-colors"
                      >
                        {resource.type === "Mock test" ||
                        resource.type === "Practice paper"
                          ? "View Paper"
                          : "Download"}
                        <Download size={13} />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <BookOpen size={40} className="text-gray-200 mx-auto mb-4" />
              <p className="text-muted">
                {stream === "CS"
                  ? "CS resources are being prepared. Please check back soon."
                  : "No resources found for this category."}
              </p>
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}
