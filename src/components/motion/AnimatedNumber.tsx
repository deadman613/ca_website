"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function AnimatedNumber({
  value,
  label,
}: {
  value: number | string;
  label: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.span
      aria-label={`${label}: ${value}`}
      className="mt-2 block text-3xl font-bold text-navy"
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.4, ease: "easeOut" }}
    >
      {value}
    </motion.span>
  );
}
