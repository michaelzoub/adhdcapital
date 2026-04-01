"use client";

import { motion, useScroll, useTransform } from "motion/react";

/** Scroll cue: left-aligned, wheel nudges on a loop, fades as you leave the hero. */
export function ScrollMouseHint() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 48, 140], [1, 0.45, 0]);
  const lift = useTransform(scrollY, [0, 140], [0, -20]);

  return (
    <motion.div
      className="pointer-events-none mt-14 hidden flex-col items-start gap-2 self-start text-zinc-400 md:flex"
      style={{ opacity, y: lift }}
      aria-hidden
    >
      <svg width="24" height="36" viewBox="0 0 24 36" fill="none" className="opacity-90">
        <rect x="1" y="1" width="22" height="34" rx="0" stroke="currentColor" strokeWidth="1.5" />
        <motion.rect
          x="10"
          width="4"
          height="8"
          rx="1"
          fill="currentColor"
          fillOpacity={0.5}
          animate={{ y: [8, 14, 8] }}
          transition={{ duration: 1.55, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
      <span className="font-mono text-[9px] uppercase tracking-[0.2em]">Scroll</span>
    </motion.div>
  );
}
