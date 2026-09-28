"use client";

import { useState } from "react";
import { Play, X } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const videoItems = [
  {
    id: "v1",
    title: "Concept Class Preview",
    subject: "CA Foundation — Accounts",
    duration: "12 min",
    thumbnail: null,
  },
  {
    id: "v2",
    title: "Taxation Masterclass Preview",
    subject: "CA Intermediate — Income Tax",
    duration: "15 min",
    thumbnail: null,
  },
  {
    id: "v3",
    title: "Financial Reporting — Ind AS 115",
    subject: "CA Final — FR",
    duration: "18 min",
    thumbnail: null,
  },
];

export default function VideoTeaser() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section className="section-padding bg-off-white">
        <div className="container-wide">
          <SectionHeading
            label="See How We Teach"
            title="Experience Our Teaching"
            subtitle="Watch preview lectures and see the quality of teaching that has guided thousands of CA aspirants."
            align="center"
            className="mb-14"
          />

          {/* Main Video Placeholder */}
          <div
            className="relative w-full aspect-video max-w-4xl mx-auto rounded-2xl overflow-hidden bg-navy cursor-pointer group mb-8 shadow-2xl"
            onClick={() => setModalOpen(true)}
          >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-navy-dark via-navy to-navy-light" />

            {/* Grid pattern */}
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  0deg, transparent, transparent 40px, white 40px, white 41px
                ), repeating-linear-gradient(
                  90deg, transparent, transparent 40px, white 40px, white 41px
                )`,
              }}
            />

            {/* Center content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-white/10 text-9xl font-playfair font-bold mb-8 select-none">
                CA
              </div>
              <div className="relative z-10 text-center">
                <div
                  className="w-20 h-20 rounded-full bg-gold border-4 border-gold/30 flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:scale-110 transition-transform duration-300"
                >
                  <Play size={28} className="text-navy fill-navy ml-1" />
                </div>
                <p className="text-white font-playfair text-2xl font-bold mb-2">
                  See How We Teach
                </p>
                <p className="text-white/50 text-sm">
                  Watch a free preview lecture
                </p>
              </div>
            </div>

            {/* Gold border on hover */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-gold/30 rounded-2xl transition-colors duration-300" />
          </div>

          {/* Mini video cards */}
          <div className="grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {videoItems.map((video) => (
              <button
                key={video.id}
                onClick={() => setModalOpen(true)}
                className="group flex items-center gap-3 bg-white border border-gray-100 rounded-xl p-4 text-left hover:border-gold/30 hover:shadow-sm transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-lg bg-navy flex items-center justify-center flex-shrink-0 group-hover:bg-gold transition-colors duration-200">
                  <Play size={14} className="text-white fill-white ml-0.5" />
                </div>
                <div className="min-w-0">
                  <p className="text-navy text-sm font-semibold truncate">
                    {video.title}
                  </p>
                  <p className="text-muted text-xs truncate" style={{ color: "var(--text-muted)" }}>
                    {video.subject} · {video.duration}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-navy/80 backdrop-blur-sm"
            onClick={() => setModalOpen(false)}
          />
          <div className="relative bg-navy-dark rounded-2xl overflow-hidden w-full max-w-3xl shadow-2xl z-10">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <X size={18} className="text-white" />
            </button>
            <div className="aspect-video bg-navy flex items-center justify-center">
              <div className="text-center text-white/50">
                <Play size={48} className="mx-auto mb-4 opacity-30" />
                <p className="text-sm">Video player — connect your YouTube or Vimeo embed here</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
