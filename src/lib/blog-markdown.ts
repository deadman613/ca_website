import type { ReactNode } from "react";

export function isStandaloneAsteriskArtifact(children: ReactNode) {
  if (typeof children === "string") return children.trim() === "**";
  return (
    Array.isArray(children) &&
    children.length === 1 &&
    typeof children[0] === "string" &&
    children[0].trim() === "**"
  );
}
