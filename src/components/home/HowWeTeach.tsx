"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Minus, Video, Clock, Headphones, BookOpen, Play, LayoutGrid } from "lucide-react";

const features = [
  {
    id: "f1",
    icon: Video,
    title: "Video library with industry best faculty",
    description:
      "Unlimited access to high-quality recorded lectures by our expert faculty — watch, rewind and revise anytime, from any device.",
  },
  {
    id: "f2",
    icon: Clock,
    title: "100% time-bound syllabus completion",
    description:
      "Every batch follows a strict schedule designed to complete the entire ICAI syllabus well before the examination — leaving ample time for revision.",
  },
  {
    id: "f3",
    icon: Headphones,
    title: "Learning pedagogy designed to stick",
    description:
      "Our teach-practice-revise cycle ensures concepts are not just understood but retained through structured repetition and application.",
  },
  {
    id: "f4",
    icon: BookOpen,
    title: "Focus on conceptual clarity",
    description:
      "We never rush through fundamentals. Deep conceptual understanding is built first — so students can apply knowledge to any question pattern.",
  },
];

export default function HowWeTeach() {
  const [openId, setOpenId] = useState<string>("f1");

  return (
    <section className="section-padding bg-white">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ─── LEFT — Content ─── */}
          <div>
            {/* Badge */}
            <div
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 mb-6"
              style={{
                background: "rgba(201,168,76,0.12)",
                border: "1px solid rgba(201,168,76,0.3)",
              }}
            >
              <span style={{ color: "#C9A84C", fontSize: "0.7rem" }}>✦</span>
              <span
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 600,
                  fontSize: "0.72rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#a88a3d",
                }}
              >
                Premium Learning
              </span>
            </div>

            {/* Heading */}
            <h2
              className="mb-3"
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 700,
                fontSize: "clamp(1.6rem, 2.8vw, 2.4rem)",
                lineHeight: 1.2,
                letterSpacing: "-0.01em",
                color: "var(--color-navy)",
              }}
            >
              We don&apos;t hope for results.
              <br />
              We engineer them.
              <br />
              Every. Single. Year.
            </h2>

            {/* Subtitle */}
            <p
              className="mb-8"
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 400,
                fontSize: "0.9rem",
                color: "#718096",
                lineHeight: 1.65,
              }}
            >
              There are many classes. We have a class of our own.
            </p>

            {/* Accordion Feature List */}
            <div className="space-y-2 mb-10">
              {features.map((feature) => {
                const isOpen = openId === feature.id;
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.id}
                    onClick={() => setOpenId(isOpen ? "" : feature.id)}
                    className="cursor-pointer rounded-xl transition-all duration-200"
                    style={{
                      border: isOpen
                        ? "1.5px solid rgba(0,60,158,0.12)"
                        : "1.5px solid transparent",
                      background: isOpen ? "#ffffff" : "transparent",
                      boxShadow: isOpen
                        ? "0 4px 20px rgba(0,60,158,0.07)"
                        : "none",
                      padding: "0.9rem 1rem",
                    }}
                  >
                    <div className="flex items-center justify-between gap-3">
                      {/* Icon + Title */}
                      <div className="flex items-center gap-3">
                        <div
                          className="flex-shrink-0 rounded-full flex items-center justify-center"
                          style={{
                            width: "36px",
                            height: "36px",
                            background: isOpen
                              ? "rgba(0,60,158,0.08)"
                              : "rgba(0,60,158,0.05)",
                          }}
                        >
                          <Icon
                            size={16}
                            style={{ color: isOpen ? "var(--color-navy)" : "#8492a6" }}
                          />
                        </div>
                        <span
                          style={{
                            fontFamily: "Poppins, sans-serif",
                            fontWeight: isOpen ? 600 : 500,
                            fontSize: "0.9rem",
                            color: isOpen ? "var(--color-navy)" : "#4A5568",
                            lineHeight: 1.4,
                          }}
                        >
                          {feature.title}
                        </span>
                      </div>

                      {/* Toggle icon */}
                      <div
                        className="flex-shrink-0 rounded-full flex items-center justify-center transition-colors"
                        style={{
                          width: "26px",
                          height: "26px",
                          background: isOpen
                            ? "rgba(0,60,158,0.08)"
                            : "rgba(0,60,158,0.04)",
                        }}
                      >
                        {isOpen ? (
                          <Minus size={13} style={{ color: "var(--color-navy)" }} />
                        ) : (
                          <Plus size={13} style={{ color: "#8492a6" }} />
                        )}
                      </div>
                    </div>

                    {/* Description — shown when open */}
                    {isOpen && (
                      <p
                        className="mt-3"
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          fontWeight: 400,
                          fontSize: "0.84rem",
                          color: "#718096",
                          lineHeight: 1.65,
                          paddingLeft: "48px",
                        }}
                      >
                        {feature.description}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center gap-5">
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 rounded-lg text-white"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  padding: "0.7rem 1.5rem",
                  background: "var(--color-navy)",
                  textDecoration: "none",
                  gap: "0.5rem",
                }}
              >
                <LayoutGrid size={15} />
                Courses
              </Link>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 500,
                  fontSize: "0.875rem",
                  color: "#4A5568",
                  textDecoration: "none",
                }}
              >
                <div
                  className="rounded-full flex items-center justify-center"
                  style={{
                    width: "28px",
                    height: "28px",
                    border: "1.5px solid #CBD5E0",
                  }}
                >
                  <Play size={11} style={{ color: "#4A5568", marginLeft: "2px" }} />
                </div>
                YouTube Channel
              </a>
            </div>
          </div>

          {/* ─── RIGHT — Image ─── */}
          <div className="relative">
            <div
              className="relative w-full overflow-hidden"
              style={{
                borderRadius: "16px",
                aspectRatio: "4/3",
                background: "linear-gradient(135deg, #e8f0fe 0%, #dbeafe 100%)",
              }}
            >
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #f0f4ff 0%, #e8edf8 100%)" }}
              >
                {/* Desk scene illustration */}
                <div className="text-center px-8">
                  <div className="flex items-end justify-center gap-4 mb-6">
                    {/* Student 1 */}
                    <div className="flex flex-col items-center">
                      <div
                        className="rounded-full mb-2"
                        style={{
                          width: "52px",
                          height: "52px",
                          background: "linear-gradient(135deg, #fbd5b5, #f8a57a)",
                        }}
                      />
                      <div
                        style={{
                          width: "80px",
                          height: "60px",
                          borderRadius: "8px",
                          background: "#C5CEE0",
                          position: "relative",
                        }}
                      >
                        {/* Laptop screen */}
                        <div
                          style={{
                            position: "absolute",
                            inset: "8px 8px 4px",
                            borderRadius: "4px",
                            background: "var(--color-navy)",
                          }}
                        />
                      </div>
                    </div>

                    {/* Student 2 */}
                    <div className="flex flex-col items-center">
                      <div
                        className="rounded-full mb-2"
                        style={{
                          width: "52px",
                          height: "52px",
                          background: "linear-gradient(135deg, #b5c8f5, #8eacef)",
                        }}
                      />
                      <div
                        style={{
                          width: "80px",
                          height: "60px",
                          borderRadius: "8px",
                          background: "#C5CEE0",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            inset: "8px 8px 4px",
                            borderRadius: "4px",
                            background: "var(--color-navy)",
                          }}
                        />
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Floating stat card */}
            <div
              className="absolute"
              style={{
                bottom: "-16px",
                left: "-16px",
                background: "var(--color-navy)",
                borderRadius: "12px",
                padding: "14px 18px",
                boxShadow: "0 8px 32px rgba(0,60,158,0.25)",
              }}
            >
              <div
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 700,
                  fontSize: "1.5rem",
                  color: "#C9A84C",
                  lineHeight: 1,
                }}
              >
                CA
              </div>
              <div
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 400,
                  fontSize: "0.72rem",
                  color: "rgba(255,255,255,0.6)",
                  marginTop: "3px",
                }}
              >
                Structured preparation
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
