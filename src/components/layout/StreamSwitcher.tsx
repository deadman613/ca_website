"use client";

import { useStream } from "@/components/layout/StreamProvider";

export default function StreamSwitcher({
  className = "",
}: {
  className?: string;
}) {
  const { stream, setStream } = useStream();

  return (
    <div
      aria-label="Choose coaching stream"
      className={`inline-flex rounded-full border border-gray-200 bg-white p-1 ${className}`}
      role="group"
    >
      {(["CA", "CS"] as const).map((option) => (
        <button
          key={option}
          type="button"
          aria-pressed={stream === option}
          onClick={() => setStream(option)}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
            stream === option
              ? "bg-navy text-white"
              : "text-navy/70 hover:text-navy"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
