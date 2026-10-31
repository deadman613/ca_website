interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}

export default function SectionHeading({
  label,
  title,
  subtitle,
  align = "center",
  light = false,
  className = "",
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <div className={`flex flex-col ${isCenter ? "items-center text-center" : "items-start text-left"} ${className}`}>
      {label && (
        <span className="section-label mb-3">{label}</span>
      )}

      <h2
        style={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: 700,
          fontSize: "clamp(1.6rem, 3vw, 2.5rem)",
          lineHeight: 1.2,
          letterSpacing: "-0.01em",
          color: light ? "#ffffff" : "var(--color-navy)",
          maxWidth: isCenter ? "660px" : undefined,
        }}
      >
        {title}
      </h2>

      {/* Gold accent line */}
      {isCenter ? (
        <div className="flex items-center gap-2 mt-4">
          <div className="h-px w-10" style={{ background: "rgba(201,168,76,0.35)" }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#C9A84C" }} />
          <div className="h-px w-10" style={{ background: "rgba(201,168,76,0.35)" }} />
        </div>
      ) : (
        <div className="mt-3 w-10 h-0.5 rounded" style={{ background: "#C9A84C" }} />
      )}

      {subtitle && (
        <p
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 400,
            fontSize: "0.9375rem",
            lineHeight: 1.7,
            color: light ? "rgba(255,255,255,0.65)" : "#4A5568",
            maxWidth: "580px",
            marginTop: "1rem",
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
