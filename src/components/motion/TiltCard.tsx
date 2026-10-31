"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import type { CSSProperties, PointerEvent, ReactNode } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  tilt?: number;
}

export default function TiltCard({
  children,
  className = "",
  style,
  tilt = 5,
}: TiltCardProps) {
  const reduceMotion = useReducedMotion();
  const rotateX = useSpring(useMotionValue(0), {
    stiffness: 260,
    damping: 24,
    mass: 0.6,
  });
  const rotateY = useSpring(useMotionValue(0), {
    stiffness: 260,
    damping: 24,
    mass: 0.6,
  });
  const lift = useSpring(useMotionValue(0), {
    stiffness: 320,
    damping: 26,
    mass: 0.65,
  });

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (
      reduceMotion ||
      event.pointerType !== "mouse" ||
      window.matchMedia("(pointer: coarse)").matches
    ) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;

    rotateX.set((0.5 - y) * tilt);
    rotateY.set((x - 0.5) * tilt);
    lift.set(-3);
    event.currentTarget.style.setProperty("--pointer-x", `${x * 100}%`);
    event.currentTarget.style.setProperty("--pointer-y", `${y * 100}%`);
  }

  function resetPointer() {
    rotateX.set(0);
    rotateY.set(0);
    lift.set(0);
  }

  return (
    <div
      className={`motion-card-shell ${className}`}
      onPointerLeave={resetPointer}
      onPointerMove={handlePointerMove}
      style={{ perspective: 1000, ...style }}
    >
      <motion.div
        className="premium-card h-full"
        style={{ rotateX, rotateY, y: lift, transformStyle: "preserve-3d" }}
      >
        {children}
      </motion.div>
    </div>
  );
}
