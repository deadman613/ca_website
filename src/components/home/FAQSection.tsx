"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { faqs } from "@/lib/data/faqs";
import Link from "next/link";

const categoryColors: Record<string, string> = {
  General: "bg-blue-50 text-blue-700 border-blue-200",
  Foundation: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Intermediate: "bg-orange-50 text-orange-700 border-orange-200",
  Final: "bg-amber-50 text-amber-700 border-amber-200",
};

export default function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  const half = Math.ceil(faqs.length / 2);
  const leftCol = faqs.slice(0, half);
  const rightCol = faqs.slice(half);

  function FAQItem({ faq }: { faq: (typeof faqs)[0] }) {
    const isOpen = openId === faq.id;
    return (
      <div
        className={`rounded-xl border transition-all duration-200 ${
          isOpen
            ? "border-navy/20 bg-white shadow-md"
            : "border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm"
        }`}
      >
        <button
          onClick={() => setOpenId(isOpen ? null : faq.id)}
          className="flex w-full items-start justify-between gap-4 p-5 text-left"
          aria-expanded={isOpen}
        >
          <span
            className={`text-sm font-semibold leading-relaxed transition-colors ${
              isOpen ? "text-navy" : "text-gray-800"
            }`}
          >
            {faq.question}
          </span>
          <div
            className={`mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full transition-colors ${
              isOpen ? "bg-navy text-white" : "bg-gray-100 text-gray-500"
            }`}
          >
            {isOpen ? <Minus size={12} /> : <Plus size={12} />}
          </div>
        </button>

        {isOpen && (
          <div className="px-5 pb-5">
            <div className="mb-3 h-px bg-gray-100" />
            <p className="text-sm leading-relaxed text-gray-600">
              {faq.answer}
            </p>
            {faq.category && (
              <span
                className={`mt-3 inline-block rounded border px-2 py-0.5 text-xs font-medium ${
                  categoryColors[faq.category] ?? "bg-gray-50 text-gray-600 border-gray-200"
                }`}
              >
                {faq.category}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-wide">
        {/* Heading */}
        <div className="mb-12 text-center">
          <SectionHeading
            label="FAQ"
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about our courses, eligibility, fees, and teaching approach."
            align="center"
          />
        </div>

        {/* Two-column accordion grid */}
        <div className="grid gap-3 md:grid-cols-2 md:gap-x-6 md:gap-y-3">
          <div className="space-y-3">
            {leftCol.map((faq) => (
              <FAQItem key={faq.id} faq={faq} />
            ))}
          </div>
          <div className="space-y-3">
            {rightCol.map((faq) => (
              <FAQItem key={faq.id} faq={faq} />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <p className="mb-1 text-base font-semibold text-gray-900">
            Still have questions?
          </p>
          <p className="mb-5 text-sm text-gray-500">
            Our academic counsellors are happy to help with any queries about course selection, eligibility, or fees.
          </p>
          <Link href="/contact" className="btn-primary text-sm px-6 py-3">
            Talk to a Counsellor
          </Link>
        </div>
      </div>
    </section>
  );
}

