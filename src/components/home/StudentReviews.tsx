"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";
import { testimonials } from "@/lib/data/faqs";
import TiltCard from "@/components/motion/TiltCard";

export default function StudentReviews() {
  const carouselRef = useRef<HTMLDivElement>(null);

  function moveCarousel(direction: -1 | 1) {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const card = carousel.querySelector<HTMLElement>("[data-review-card]");
    const gap = Number.parseFloat(getComputedStyle(carousel).columnGap) || 24;
    const distance = card ? card.offsetWidth + gap : carousel.clientWidth;
    carousel.scrollBy({ left: direction * distance, behavior: "smooth" });
  }

  return (
    <section aria-labelledby="student-reviews-title" className="section-padding overflow-hidden bg-off-white">
      <div className="container-wide">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
          <div className="max-w-2xl">
            <span className="section-label">Student Reviews</span>
            <h2
              className="mt-3 text-3xl font-bold leading-tight text-navy sm:text-4xl"
              id="student-reviews-title"
            >
              What Our Students Say
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-secondary sm:text-base">
              Hear from students about their preparation and learning experience.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              aria-label="Previous student reviews"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-navy shadow-sm transition-colors hover:border-gold hover:bg-gold/10"
              onClick={() => moveCarousel(-1)}
              type="button"
            >
              <ArrowLeft aria-hidden="true" size={18} />
            </button>
            <button
              aria-label="Next student reviews"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-navy shadow-sm transition-colors hover:border-gold hover:bg-gold/10"
              onClick={() => moveCarousel(1)}
              type="button"
            >
              <ArrowRight aria-hidden="true" size={18} />
            </button>
          </div>
        </div>

        <div
          aria-label="Student reviews"
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-4 sm:gap-5"
          ref={carouselRef}
          role="region"
          tabIndex={0}
        >
          {testimonials.map((testimonial) => (
            <TiltCard
              className="min-w-[85%] snap-start rounded-2xl sm:min-w-[calc(50%-0.625rem)] lg:min-w-[calc(33.333%-0.875rem)]"
              key={testimonial.id}
              tilt={2.5}
            >
              <article
                className="h-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
                data-review-card
              >
                <div aria-label={`${testimonial.rating} out of 5 stars`} className="mb-4 flex gap-1">
                  {Array.from({ length: testimonial.rating }, (_, index) => (
                    <Star
                      aria-hidden="true"
                      className="fill-gold text-gold"
                      key={`${testimonial.id}-star-${index}`}
                      size={15}
                    />
                  ))}
                </div>
                <Quote aria-hidden="true" className="mb-2 text-gold/60" size={22} />
                <p className="min-h-28 text-sm leading-6 text-secondary">
                  “{testimonial.review}”
                </p>
                <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy/5 text-sm font-semibold text-navy"
                  >
                    {testimonial.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")
                      .slice(0, 2)}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-navy">
                      {testimonial.name}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-muted">
                      {testimonial.qualification}
                      {testimonial.rank ? ` · ${testimonial.rank}` : ""}
                    </p>
                  </div>
                </div>
              </article>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
