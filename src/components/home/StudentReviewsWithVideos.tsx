"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight, Quote, Star, Play } from "lucide-react";
import { testimonials } from "@/lib/data/faqs";
import TiltCard from "@/components/motion/TiltCard";
import SectionHeading from "@/components/ui/SectionHeading";

const videoTestimonials = [
  {
    id: "v1",
    name: "Riya Sharma",
    result: "CA Foundation — 1st Attempt",
    thumbnail: "/testimonials/riya.jpg",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    quote: "Delhi CA School changed my approach completely.",
  },
  {
    id: "v2",
    name: "Arjun Mehta",
    result: "CA Intermediate — Both Groups",
    thumbnail: "/testimonials/arjun.jpg",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    quote: "The faculty here is truly exceptional.",
  },
  {
    id: "v3",
    name: "Priya Nanda",
    result: "CA Final — AIR 42",
    thumbnail: "/testimonials/priya.jpg",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    quote: "Structured study plans made the difference.",
  },
  {
    id: "v4",
    name: "Karan Gupta",
    result: "CA Foundation — 1st Attempt",
    thumbnail: "/testimonials/karan.jpg",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    quote: "Best decision of my CA journey.",
  },
];

export default function StudentReviewsWithVideos() {
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
        {/* Heading */}
        <div className="mb-12">
          <SectionHeading
            label="Success Stories"
            title="Students Who Made It"
            subtitle="Real results from real students — in their own words."
            align="center"
          />
        </div>

        {/* ── Video Testimonials ── */}
        <div className="mb-14">
          <p className="mb-5 text-sm font-semibold uppercase tracking-widest text-gold">
            Video Reviews
          </p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {videoTestimonials.map((v) => (
              <a
                key={v.id}
                href={v.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-2xl bg-navy shadow-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
                aria-label={`Watch ${v.name}'s video review`}
              >
                {/* Thumbnail placeholder / image */}
                <div
                  className="h-44 w-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url('${v.thumbnail}'), linear-gradient(135deg,#023CA9,#023CA9)`,
                    backgroundSize: "cover",
                  }}
                />
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-navy/40 transition-colors group-hover:bg-navy/55">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white/80 bg-white/20 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                    <Play className="ml-1 text-white" fill="white" size={22} />
                  </div>
                </div>
                {/* Info */}
                <div className="p-4">
                  <p className="text-sm font-semibold text-white">{v.name}</p>
                  <p className="mt-0.5 text-xs text-gold-light">{v.result}</p>
                  <p className="mt-2 text-xs italic text-white/60">"{v.quote}"</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* ── Written Reviews ── */}
        <div className="mb-6 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="mb-1 text-sm font-semibold uppercase tracking-widest text-gold">
              Written Reviews
            </p>
            <h2
              className="text-2xl font-bold text-navy sm:text-3xl"
              id="student-reviews-title"
            >
              What Our Students Say
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              aria-label="Previous reviews"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-navy shadow-sm transition-colors hover:border-gold hover:bg-gold/10"
              onClick={() => moveCarousel(-1)}
              type="button"
            >
              <ArrowLeft aria-hidden="true" size={18} />
            </button>
            <button
              aria-label="Next reviews"
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
                  "{testimonial.review}"
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



