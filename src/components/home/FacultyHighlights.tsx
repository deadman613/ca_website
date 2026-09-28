"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { faculty } from "@/lib/data/faculty";

export default function FacultyHighlights() {
  const [showAll, setShowAll] = useState(false);

  // Show 4 initially, all on "Show More"
  const displayed = showAll ? faculty : faculty.slice(0, 4);

  return (
    <section className="section-padding bg-white">
      <div className="container-wide">

        {/* Heading */}
        <h2
          className="mb-2"
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 700,
            fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
            color: "#0B1F3A",
            letterSpacing: "-0.01em",
          }}
        >
          Our Core Team
        </h2>
        <p
          className="mb-10"
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 400,
            fontSize: "0.9rem",
            color: "#718096",
          }}
        >
          Learn from qualified CAs with decades of teaching excellence.
        </p>

        {/* Faculty Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 mb-10">
          {displayed.map((member, idx) => {
            const isFeatured = idx === 2; // centre card elevated
            // Initials from name
            const initials = member.name
              .split(" ")
              .filter((w) => w.length > 1)
              .slice(-2)
              .map((w) => w[0])
              .join("");

            return (
              <div
                key={member.id}
                style={{
                  background: "#ffffff",
                  borderRadius: "16px",
                  padding: "1.75rem 1.25rem 1.5rem",
                  border: isFeatured
                    ? "1.5px solid #E2E8F0"
                    : "1px solid #F0F2F5",
                  boxShadow: isFeatured
                    ? "0 8px 32px rgba(0,0,0,0.10)"
                    : "0 1px 4px rgba(0,0,0,0.04)",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  transition: "box-shadow 0.22s, transform 0.22s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    "0 12px 36px rgba(0,0,0,0.12)";
                  (e.currentTarget as HTMLDivElement).style.transform =
                    "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = isFeatured
                    ? "0 8px 32px rgba(0,0,0,0.10)"
                    : "0 1px 4px rgba(0,0,0,0.04)";
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                }}
              >
                {/* Circular avatar */}
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: "3px solid #F0F2F5",
                    marginBottom: "1rem",
                    position: "relative",
                    flexShrink: 0,
                    background: "linear-gradient(135deg, #0B1F3A 0%, #152d50 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* Try photo first */}
                  <Image
                    src={`/faculty/${member.id}.jpg`}
                    alt={member.name}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                  {/* Initials fallback */}
                  <span
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 700,
                      fontSize: "1.25rem",
                      color: "#C9A84C",
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    {initials}
                  </span>
                </div>

                {/* Name */}
                <p
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 600,
                    fontSize: "0.75rem",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "#0B1F3A",
                    marginBottom: "4px",
                    lineHeight: 1.3,
                  }}
                >
                  {member.name}
                </p>

                {/* Experience */}
                <p
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 400,
                    fontSize: "0.78rem",
                    color: "#718096",
                  }}
                >
                  {member.experience} of teaching experience
                </p>
              </div>
            );
          })}
        </div>

        {/* Show More / View All button */}
        <div className="flex justify-center">
          {faculty.length > 4 && !showAll ? (
            <button
              onClick={() => setShowAll(true)}
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 600,
                fontSize: "0.9rem",
                color: "#ffffff",
                background: "#C9A84C",
                border: "none",
                borderRadius: "50px",
                padding: "0.75rem 2.5rem",
                cursor: "pointer",
                boxShadow: "0 4px 16px rgba(201,168,76,0.3)",
                transition: "background 0.2s, transform 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLButtonElement).style.background = "#a88a3d")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLButtonElement).style.background = "#C9A84C")
              }
            >
              Show More
            </button>
          ) : (
            <Link
              href="/faculty"
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 600,
                fontSize: "0.9rem",
                color: "#ffffff",
                background: "#0B1F3A",
                borderRadius: "50px",
                padding: "0.75rem 2.5rem",
                textDecoration: "none",
                display: "inline-block",
                transition: "background 0.2s",
              }}
            >
              Meet All Faculty
            </Link>
          )}
        </div>

      </div>
    </section>
  );
}
