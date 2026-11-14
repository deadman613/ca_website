"use client";

import { useState } from "react";
import { Play, Mic, Clock, ChevronRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Link from "next/link";

const podcasts = [
  {
    id: "p1",
    episode: "EP 01",
    title: "Why I Started Delhi CA School — The Founding Story",
    guest: "CA Deepanshu Soni",
    guestRole: "Founder, Delhi CA School",
    duration: "38 min",
    description:
      "The vision behind Delhi CA School — how a gap in quality coaching for CA aspirants in Delhi led to the creation of a student-first institute.",
    tags: ["Founder story", "CA journey", "Coaching"],
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "/podcast/ep1.jpg",
    featured: true,
  },
  {
    id: "p2",
    episode: "EP 02",
    title: "How to Clear CA Foundation in the First Attempt",
    guest: "CA Deepanshu Soni",
    guestRole: "Founder, Delhi CA School",
    duration: "29 min",
    description:
      "A tactical breakdown of how students can approach their Foundation preparation with clarity, structure, and the right study habits.",
    tags: ["CA Foundation", "Study strategy"],
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "/podcast/ep2.jpg",
    featured: false,
  },
  {
    id: "p3",
    episode: "EP 03",
    title: "Articleship + CA Inter: Managing Both Without Burning Out",
    guest: "CA Deepanshu Soni",
    guestRole: "Founder, Delhi CA School",
    duration: "34 min",
    description:
      "Real talk on balancing articleship duties with CA Intermediate preparation — time management, stress, and what actually works.",
    tags: ["CA Intermediate", "Articleship", "Mental health"],
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "/podcast/ep3.jpg",
    featured: false,
  },
  {
    id: "p4",
    episode: "EP 04",
    title: "CA Final: The Mindset That Gets You Across the Line",
    guest: "CA Deepanshu Soni",
    guestRole: "Founder, Delhi CA School",
    duration: "42 min",
    description:
      "What separates CA Final students who pass on the first attempt from those who don't — it's not always about how much you studied.",
    tags: ["CA Final", "Exam mindset", "Preparation"],
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "/podcast/ep4.jpg",
    featured: false,
  },
];

export default function PodcastSection() {
  const [playing, setPlaying] = useState<string | null>(null);
  const featured = podcasts[0];
  const rest = podcasts.slice(1);

  return (
    <section className="section-padding bg-off-white">
      <div className="container-wide">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            label="Delhi CA Podcast"
            title="Conversations with the Founder"
            subtitle="Candid talks on CA preparation, career, and what it takes to succeed."
            align="left"
          />
          <Link
            href="https://www.youtube.com/@delhicaschool"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-navy hover:text-gold transition-colors shrink-0"
          >
            All Episodes <ChevronRight size={15} />
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
          {/* Featured episode — large card */}
          <div className="lg:col-span-3">
            <div className="group relative overflow-hidden rounded-2xl bg-navy shadow-xl">
              {/* Thumbnail */}
              <div
                className="relative h-56 w-full bg-cover bg-center sm:h-72"
                style={{
                  backgroundImage: `url('${featured.thumbnail}'), linear-gradient(135deg,#023CA9,#023CA9)`,
                }}
              >
                <div className="absolute inset-0 bg-navy/40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={() => setPlaying(playing === featured.id ? null : featured.id)}
                    className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-white/70 bg-white/15 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/25"
                    aria-label={`Play ${featured.title}`}
                  >
                    <Play className="ml-1.5 text-white" fill="white" size={30} />
                  </button>
                </div>
                <div className="absolute left-4 top-4">
                  <span className="rounded-full border border-gold/60 bg-gold/20 px-3 py-1 text-xs font-bold text-gold-light">
                    {featured.episode}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-6 sm:p-8">
                <div className="mb-3 flex flex-wrap gap-2">
                  {featured.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/15 bg-white/10 px-2.5 py-0.5 text-xs text-white/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="mb-3 font-playfair text-xl font-bold leading-snug text-white sm:text-2xl">
                  {featured.title}
                </h3>
                <p className="mb-5 text-sm leading-relaxed text-white/60">
                  {featured.description}
                </p>
                <div className="flex flex-wrap items-center gap-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/20 font-playfair text-sm font-bold text-gold">
                      DS
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{featured.guest}</p>
                      <p className="text-xs text-white/50">{featured.guestRole}</p>
                    </div>
                  </div>
                  <span className="ml-auto flex items-center gap-1.5 text-xs text-white/50">
                    <Clock size={12} /> {featured.duration}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Episode list */}
          <div className="flex flex-col gap-4 lg:col-span-2">
            {rest.map((ep) => (
              <a
                key={ep.id}
                href={ep.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
              >
                {/* Mini thumbnail */}
                <div
                  className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-cover bg-center"
                  style={{
                    backgroundImage: `url('${ep.thumbnail}'), linear-gradient(135deg,#023CA9,#023CA9)`,
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center bg-navy/40">
                    <Play className="text-white/90" fill="white" size={16} />
                  </div>
                </div>

                {/* Text */}
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="text-xs font-bold text-gold">{ep.episode}</span>
                    <span className="flex items-center gap-1 text-xs text-muted">
                      <Clock size={10} /> {ep.duration}
                    </span>
                  </div>
                  <h4 className="mb-1 text-sm font-bold leading-snug text-navy line-clamp-2 group-hover:text-gold transition-colors">
                    {ep.title}
                  </h4>
                  <p className="text-xs text-muted">{ep.guest}</p>
                </div>
              </a>
            ))}

            {/* Mic CTA */}
            <div className="rounded-xl border border-gold/25 bg-gold/10 p-5 text-center">
              <Mic className="mx-auto mb-2 text-gold" size={22} />
              <p className="mb-3 text-sm font-semibold text-navy">More episodes every week</p>
              <a
                href="https://www.youtube.com/@delhicaschool"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold block text-center text-sm"
              >
                Subscribe on YouTube
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



