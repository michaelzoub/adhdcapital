"use client";

import { motion } from "motion/react";

/**
 * Animated floating-path SVG background for the variation2 "At a glance" section.
 * Warm amber/terracotta strokes on a dark surface.
 */
export function FloatingPathsAv2() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        aria-hidden
        className="absolute h-full w-full"
        fill="none"
        viewBox="0 0 696 316"
        preserveAspectRatio="xMidYMid slice"
      >
        {Array.from({ length: 20 }, (_, i) => (
          <motion.path
            key={i}
            d={`M-${380 - i * 5} -${189 + i * 6}C-${380 - i * 5} -${189 + i * 6} -${312 - i * 5} ${216 - i * 6} ${152 - i * 5} ${343 - i * 6}C${616 - i * 5} ${470 - i * 6} ${684 - i * 5} ${875 - i * 6} ${684 - i * 5} ${875 - i * 6}`}
            stroke={`rgba(180,120,50,${0.04 + i * 0.012})`}
            strokeWidth={0.3 + i * 0.02}
            initial={{ pathLength: 0.25, opacity: 0.1 }}
            animate={{
              pathLength: [0.25, 1, 0.25],
              opacity: [0.05, 0.22, 0.05],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 22 + (i % 10) * 1.35,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}
