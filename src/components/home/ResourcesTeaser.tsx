"use client";

import { Headphones, Trophy, Video, BookOpen } from "lucide-react";

const features = [
  {
    icon: Headphones,
    iconBg: "#EDE9FE",
    iconColor: "#7C3AED",
    label: "Doubt Solving",
  },
  {
    icon: Trophy,
    iconBg: "#FEF3C7",
    iconColor: "#D97706",
    label: "Best Results in India",
  },
  {
    icon: Video,
    iconBg: "#DBEAFE",
    iconColor: "#2563EB",
    label: "Video Library with Industry Best Faculty",
  },
  {
    icon: BookOpen,
    iconBg: "#FEF9C3",
    iconColor: "#B45309",
    label: "Detailed Revision Lectures",
  },
];

export default function ResourcesTeaser() {
  return (
    <section className="section-padding" style={{ background: "#F8F9FB" }}>
      <div className="container-wide">

        {/* Section label */}
        <p
          className="mb-8"
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 500,
            fontSize: "1rem",
            color: "#4A5568",
          }}
        >
          Complete Learning Ecosystem
        </p>

        {/* 4-column feature cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.label}
                style={{
                  background: "#ffffff",
                  borderRadius: "14px",
                  padding: "1.25rem 1.25rem 1.5rem",
                  border: "1px solid #F0F0F0",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                  transition: "box-shadow 0.2s, transform 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    "0 8px 24px rgba(0,0,0,0.08)";
                  (e.currentTarget as HTMLDivElement).style.transform =
                    "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    "0 2px 12px rgba(0,0,0,0.04)";
                  (e.currentTarget as HTMLDivElement).style.transform =
                    "translateY(0)";
                }}
              >
                {/* Icon circle */}
                <div
                  className="mb-4"
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    background: feature.iconBg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon size={20} style={{ color: feature.iconColor }} />
                </div>

                {/* Label */}
                <p
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 500,
                    fontSize: "0.875rem",
                    color: "#1A202C",
                    lineHeight: 1.45,
                  }}
                >
                  {feature.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
