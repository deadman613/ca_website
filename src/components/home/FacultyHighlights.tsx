"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  GraduationCap,
  Pause,
  Play,
  RotateCcw,
} from "lucide-react";
import { faculty } from "@/lib/data/faculty";

const team = [
  ...faculty.map((member, index) => ({
    id: member.id,
    name: member.name,
    role: member.designation,
    experience: member.experience,
    qualification: member.qualification,
    membership: `ICAI member since [year]`,
    subjects: member.subjects,
    levels: member.level,
    stream: "CA" as const,
    bio: member.bio,
    photo: member.photo,
    samplePhoto: `/faculty/sample/${member.id}.svg`,
    tone: index % 2 === 0 ? "faculty-portrait-blue" : "faculty-portrait-gold",
  })),
  {
    id: "cs-faculty",
    name: "[Name], CS",
    role: "Company Secretary Faculty",
    experience: "CS Faculty",
    qualification: "Company Secretary",
    membership: "ICSI member since [year]",
    subjects: ["[Subject]"],
    levels: ["CSEET", "CS Executive", "CS Professional"],
    stream: "CS" as const,
    bio: "Teaches [subject] for CSEET, CS Executive and CS Professional.",
    photo: "/faculty/sample/cs-faculty.svg",
    samplePhoto: "/faculty/sample/cs-faculty.svg",
    tone: "faculty-portrait-gold",
  },
];

function initialsFor(name: string) {
  return name
    .replace(/, CS$/, "")
    .split(" ")
    .filter((part) => part.length > 1 && part !== "[Name]")
    .slice(-2)
    .map((part) => part[0])
    .join("");
}

function FacultyPortrait({
  name,
  photo,
  samplePhoto,
  tone,
}: {
  name: string;
  photo?: string;
  samplePhoto: string;
  tone: string;
}) {
  const [showSamplePhoto, setShowSamplePhoto] = useState(
    !photo || photo.endsWith(".svg")
  );
  const [imageUnavailable, setImageUnavailable] = useState(false);
  const imageSrc = showSamplePhoto ? samplePhoto : photo;

  return (
    <div className={`faculty-card-portrait ${tone}`}>
      {imageSrc && !imageUnavailable ? (
        <Image
          src={imageSrc}
          alt=""
          fill
          sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 25vw"
          className="faculty-card-image"
          onError={() => {
            if (!showSamplePhoto) {
              setShowSamplePhoto(true);
            } else {
              setImageUnavailable(true);
            }
          }}
        />
      ) : (
        <div className="faculty-card-image-placeholder" aria-hidden="true">
          <span>{initialsFor(name) || "CS"}</span>
        </div>
      )}
      {showSamplePhoto && (
        <span className="faculty-sample-photo-label">Illustrative image</span>
      )}
    </div>
  );
}

export default function FacultyHighlights() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [flippedId, setFlippedId] = useState<string | null>(null);
  const [autoplayPaused, setAutoplayPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  function moveCarousel(direction: -1 | 1) {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const card = carousel.querySelector<HTMLElement>("[data-faculty-card]");
    const gap = Number.parseFloat(getComputedStyle(carousel).columnGap) || 20;
    const distance = card ? card.offsetWidth + gap : carousel.clientWidth;
    carousel.scrollBy({ left: direction * distance, behavior: "smooth" });
  }

  useEffect(() => {
    if (autoplayPaused || isHovered || flippedId) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const intervalId = window.setInterval(() => {
      const carousel = carouselRef.current;
      if (!carousel) return;

      const maxScroll = carousel.scrollWidth - carousel.clientWidth;
      if (maxScroll <= 0) return;

      if (carousel.scrollLeft >= maxScroll - 2) {
        carousel.scrollTo({ left: 0, behavior: "smooth" });
        return;
      }

      const card = carousel.querySelector<HTMLElement>("[data-faculty-card]");
      const gap = Number.parseFloat(getComputedStyle(carousel).columnGap) || 20;
      carousel.scrollBy({
        left: card ? card.offsetWidth + gap : carousel.clientWidth,
        behavior: "smooth",
      });
    }, 4500);

    return () => window.clearInterval(intervalId);
  }, [autoplayPaused, isHovered, flippedId]);

  return (
    <section className="section-padding overflow-hidden bg-off-white">
      <div className="container-wide">
        <header className="mx-auto mb-10 max-w-3xl text-center">
          <span className="section-label">Meet Your Mentors</span>
          <h2 className="mt-3 text-3xl font-bold leading-tight text-navy sm:text-4xl">
            Our Core Team: Qualified CA and CS Faculty
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-secondary sm:text-base">
            Learn from qualified Chartered Accountants and company secretaries
            with years of classroom experience.
          </p>
        </header>

        <div className="mb-5 flex items-center justify-between gap-4">
          <p className="text-xs font-medium text-muted" aria-live="polite">
            {autoplayPaused || isHovered || flippedId
              ? "Carousel paused"
              : "Auto-playing · pauses when you interact"}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label={autoplayPaused ? "Resume carousel autoplay" : "Pause carousel autoplay"}
              aria-pressed={autoplayPaused}
              onClick={() => setAutoplayPaused((paused) => !paused)}
              className="flex h-11 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 text-xs font-semibold text-navy shadow-sm transition-colors hover:border-gold hover:bg-gold/10"
            >
              {autoplayPaused ? (
                <Play aria-hidden="true" size={15} />
              ) : (
                <Pause aria-hidden="true" size={15} />
              )}
              {autoplayPaused ? "Play" : "Pause"}
            </button>
            <button
              type="button"
              aria-label="Previous faculty"
              onClick={() => moveCarousel(-1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-navy shadow-sm transition-colors hover:border-gold hover:bg-gold/10"
            >
              <ArrowLeft aria-hidden="true" size={18} />
            </button>
            <button
              type="button"
              aria-label="Next faculty"
              onClick={() => moveCarousel(1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-navy shadow-sm transition-colors hover:border-gold hover:bg-gold/10"
            >
              <ArrowRight aria-hidden="true" size={18} />
            </button>
          </div>
        </div>

        <div
          ref={carouselRef}
          aria-label="Faculty cards. Select a card to view trainer details."
          className="faculty-carousel flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-5"
          role="region"
          tabIndex={0}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocusCapture={() => setIsHovered(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node)) {
              setIsHovered(false);
            }
          }}
        >
          {team.map((member) => {
            const isFlipped = flippedId === member.id;
            return (
              <article
                key={member.id}
                data-faculty-card
                className="faculty-carousel-item shrink-0 snap-start"
              >
                <button
                  type="button"
                  className={`faculty-flip-card w-full text-left ${isFlipped ? "is-flipped" : ""}`}
                  aria-pressed={isFlipped}
                  aria-label={`${isFlipped ? "Show portrait" : "Show details for"} ${member.name}`}
                  onClick={() =>
                    setFlippedId(isFlipped ? null : member.id)
                  }
                >
                  <span className="faculty-flip-inner">
                    <span className="faculty-flip-face faculty-flip-front">
                      <FacultyPortrait
                        name={member.name}
                        photo={member.photo}
                        samplePhoto={member.samplePhoto}
                        tone={member.tone}
                      />
                      <span className="faculty-front-shade" aria-hidden="true" />
                      <span className="faculty-front-copy">
                        <span className="faculty-front-role">{member.role}</span>
                        <span className="faculty-front-name">{member.name}</span>
                        <span className="faculty-front-hint">Click to meet your trainer</span>
                      </span>
                    </span>

                    <span className="faculty-flip-face faculty-flip-back">
                      <span className="faculty-back-heading">
                        <span className="faculty-back-eyebrow">Meet your trainer</span>
                        <span className="faculty-back-name">{member.name}</span>
                        <span className="faculty-back-role">{member.role}</span>
                      </span>
                      <span className="faculty-back-content">
                        <span className="faculty-back-bio">{member.bio}</span>
                        <span className="faculty-back-credential">
                          <GraduationCap aria-hidden="true" size={17} />
                          <span>
                            <strong>{member.qualification}</strong>
                            <span>{member.membership}</span>
                          </span>
                        </span>
                        <span className="faculty-back-label">Teaches</span>
                        <span className="faculty-back-topics">
                          {member.subjects.join(", ")} · {member.stream}{" "}
                          {member.levels.join(", ")}
                        </span>
                      </span>
                      <span className="faculty-back-flip-hint">
                        <RotateCcw aria-hidden="true" size={14} />
                        Click to see portrait
                      </span>
                    </span>
                  </span>
                </button>
              </article>
            );
          })}
        </div>

        <p className="mx-auto mt-2 max-w-3xl text-center text-xs leading-5 text-muted">
          Faculty membership details and LinkedIn profiles: [Add verified details
          before publishing.]
        </p>

      </div>
    </section>
  );
}
