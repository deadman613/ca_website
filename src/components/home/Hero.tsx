"use client";

import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const bullets = [
  "CA Foundation to Final",
  "Structured course guidance",
  "Exam preparation resources",
  "For CA aspirants in Delhi",
];

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (v) {
      v.play().catch(() => {});
      setVideoLoaded(true);
    }
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "100vh", minHeight: "560px", maxHeight: "800px" }}
    >
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          LAYER 1 — Full-bleed video background
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="absolute inset-0 bg-black">
        {/* VIDEO */}
        <video
          ref={videoRef}
          autoPlay
          muted={muted}
          loop
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "center center" }}
        >
          {/* ▶ Drop your video at /public/hero-video.mp4 */}
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>

        {/* Fallback shown when no video file */}
        {!videoLoaded && (
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, #002D75 0%, #1D5CB8 40%, #003C9E 100%)",
            }}
          >
            {/* Decorative grid lines */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `
                  repeating-linear-gradient(0deg,transparent,transparent 80px,rgba(255,255,255,.1) 80px,rgba(255,255,255,.1) 81px),
                  repeating-linear-gradient(90deg,transparent,transparent 80px,rgba(255,255,255,.1) 80px,rgba(255,255,255,.1) 81px)
                `,
              }}
            />
            {/* Placeholder faculty card */}
            <div className="absolute left-[12%] top-1/2 -translate-y-1/2 text-center">
              <div
                className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-white/10 flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.05)" }}
              >
                <span
                  className="font-playfair text-white text-5xl font-bold opacity-40"
                  style={{ lineHeight: 1 }}
                >
                  CA
                </span>
              </div>
              <p className="text-white/30 text-sm">
                Place video at{" "}
                <code className="text-yellow-400/60">/public/hero-video.mp4</code>
              </p>
            </div>
          </div>
        )}

        {/* Mute button — bottom-left of video */}
        <button
          onClick={() => {
            setMuted((m) => {
              if (videoRef.current) videoRef.current.muted = !m;
              return !m;
            });
          }}
          className="absolute bottom-5 left-5 z-20 flex items-center gap-1.5 text-white/60 hover:text-white transition-colors text-xs"
          title={muted ? "Unmute" : "Mute"}
        >
          {muted ? (
            /* muted icon */
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16.5 12A4.5 4.5 0 0 0 14 8V11.18L16.45 13.63A4.43 4.43 0 0 0 16.5 12zM19 12a7 7 0 0 1-.36 2.22L20 15.57A9 9 0 0 0 21 12a9 9 0 0 0-7-8.77V5.29A7 7 0 0 1 19 12zM4.27 3L3 4.27 7.73 9H3v6h4l5 5V13.27l4.25 4.25A6.92 6.92 0 0 1 14 19.54V21.23A9 9 0 0 0 17.69 18.24L19.73 20.27 21 19 3 1zM12 4 9.91 6.09 12 8.18z"/>
            </svg>
          ) : (
            /* unmuted icon */
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.5 4.5 0 0 0 2.5-4zm2.5-.9V12A7 7 0 0 1 14 19v1.76A9 9 0 0 0 21 12a9 9 0 0 0-7-8.77V5.07A7 7 0 0 1 19 11.1z"/>
            </svg>
          )}
          <span>{muted ? "Unmuted" : "Muted"}</span>
        </button>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          LAYER 2 — Right text panel with
          diagonal left edge (clip-path)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div
        className="absolute top-0 right-0 h-full flex items-center"
        style={{
          /* Panel occupies right ~46% of viewport */
          width: "48%",
          /* Diagonal left edge: top-left corner pushed right ~80px,
             bottom-left corner at 0 → creates the slant */
          clipPath: "polygon(80px 0%, 100% 0%, 100% 100%, 0% 100%)",
          background: "linear-gradient(135deg, #003C9E 0%, #1D5CB8 60%, #002D75 100%)",
        }}
      >
        {/* Inner dot-grid texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(201,168,76,0.12) 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
          }}
        />
        {/* Glow blob */}
        <div
          className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)" }}
        />

        {/* ── CONTENT ── */}
        <div className="relative z-10 pl-20 pr-10 py-10 w-full">

          {/* Discovery badge */}
          <div
            className="inline-flex items-center gap-2 rounded-full mb-6 px-4 py-1.5"
            style={{ background: "rgba(201,168,76,0.18)", border: "1px solid rgba(201,168,76,0.4)" }}
          >
            <Star size={12} className="text-gold fill-gold" />
            <span
              className="text-xs font-bold tracking-widest uppercase"
              style={{ color: "#E8C97A" }}
            >
              Delhi CA School
            </span>
          </div>

          {/* Heading */}
          <h1
            className="font-bold leading-[1.15] mb-7"
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.6rem, 2.6vw, 2.8rem)",
              letterSpacing: "-0.01em",
              color: "#ffffff",
            }}
          >
            CA Coaching in Delhi
            <br />
            <span style={{ color: "#E8C97A", fontWeight: 700 }}>
              Your Journey, Structured.
            </span>
          </h1>

          {/* Bullet points — 2 columns */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-3.5 mb-8">
            {bullets.map((point) => (
              <div key={point} className="flex items-start gap-2.5">
                {/* Circle outline checkmark — matches JK Shah style */}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  className="flex-shrink-0 mt-0.5"
                  style={{ color: "#C9A84C" }}
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M8 12l3 3 5-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-white/80 text-sm leading-snug">{point}</span>
              </div>
            ))}
          </div>

          {/* CTA Button — solid amber/gold, matches JK Shah */}
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 font-bold rounded-md transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: "#C9A84C",
              color: "var(--color-navy)",
              fontSize: "0.9rem",
              padding: "0.8rem 1.75rem",
              boxShadow: "0 4px 20px rgba(201,168,76,0.35)",
            }}
          >
            Explore Our Courses
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/contact#demo"
            className="ml-3 inline-flex items-center rounded-md border border-white/40 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Book a free demo
          </Link>
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          LAYER 3 — Thin top gradient for navbar
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div
        className="absolute top-0 left-0 right-0 h-24 pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,60,158,0.55) 0%, transparent 100%)",
        }}
      />
    </section>
  );
}
