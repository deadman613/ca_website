"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { faqs } from "@/lib/data/faqs";

export default function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  return (
    <section className="section-padding bg-white">
      <div className="container-wide">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-20">
          {/* Left */}
          <div className="lg:col-span-2">
            <SectionHeading
              label="FAQ"
              title="Frequently Asked Questions"
              subtitle="Find answers to the most common questions about our courses, eligibility, and teaching methodology."
              align="left"
            />

            <div className="mt-8 p-6 bg-off-white rounded-xl border border-gray-100">
              <p className="text-navy font-semibold text-sm mb-2">
                Still have questions?
              </p>
              <p className="text-secondary text-sm mb-4"
                style={{ color: "var(--text-secondary)" }}>
                Our academic counsellors are happy to help you with any queries
                about course selection, eligibility, or fees.
              </p>
              <a href="/contact" className="btn-primary text-sm px-5 py-2.5">
                Talk to a Counsellor
              </a>
            </div>
          </div>

          {/* Right — Accordion */}
          <div className="lg:col-span-3 space-y-3">
            {faqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`border rounded-xl overflow-hidden transition-all duration-200 ${
                    isOpen
                      ? "border-gold/40 shadow-sm"
                      : "border-gray-100 hover:border-gray-200"
                  }`}
                >
                  <button
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    className="w-full flex items-start justify-between gap-4 p-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span
                      className={`font-semibold text-sm leading-relaxed transition-colors ${
                        isOpen ? "text-navy" : "text-navy/80"
                      }`}
                    >
                      {faq.question}
                    </span>
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                        isOpen ? "bg-gold text-navy" : "bg-gray-100 text-navy"
                      }`}
                    >
                      {isOpen ? <Minus size={12} /> : <Plus size={12} />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5">
                      <div className="h-px bg-gray-100 mb-4" />
                      <p className="text-secondary text-sm leading-relaxed"
                        style={{ color: "var(--text-secondary)" }}>
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
