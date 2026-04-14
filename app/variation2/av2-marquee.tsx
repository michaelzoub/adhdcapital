"use client";

import { motion, useReducedMotion } from "motion/react";

export type Av2MarqueeItem = {
  label: string;
  /** Visual treatment */
  voice: "serif" | "mono" | "accent" | "sans";
};

const base = "whitespace-nowrap";

function voiceClass(voice: Av2MarqueeItem["voice"]): string {
  switch (voice) {
    case "serif":
      return `${base} font-serif-display text-[clamp(0.85rem,2.2vw,1rem)] font-semibold italic tracking-tight text-[#e8d5b7]`;
    case "mono":
      return `${base} font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-[#b89060]/90 md:text-[11px]`;
    case "accent":
      return `${base} bg-gradient-to-r from-[#d4a04c] via-[#e8c07a] to-[#c87832] bg-clip-text text-sm font-semibold uppercase tracking-[0.14em] text-transparent md:text-base`;
    default:
      return `${base} font-sans text-sm font-semibold uppercase tracking-[0.14em] text-[#c8b89a] md:text-base`;
  }
}

type Props = {
  labels: readonly Av2MarqueeItem[];
  /** Tailwind `from-*` class for the edge fade */
  fadeFromColor?: string;
};

/**
 * Infinite-scroll marquee for the avantgarde variation.
 * Dark surface, warm amber/gold typography.
 */
export function Av2Marquee({ labels, fadeFromColor = "#1a140e" }: Props) {
  const reduceMotion = useReducedMotion();
  const loop = [...labels, ...labels];

  const fadeCss = fadeFromColor;

  return (
    <div className="relative mt-6 overflow-hidden py-2">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16"
        style={{ background: `linear-gradient(to right, ${fadeCss}, transparent)` }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16"
        style={{ background: `linear-gradient(to left, ${fadeCss}, transparent)` }}
      />
      {reduceMotion ? (
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-3 md:justify-start">
          {labels.map((item) => (
            <span key={item.label} className={voiceClass(item.voice)}>
              {item.label}
            </span>
          ))}
        </div>
      ) : (
        <motion.div
          className="flex w-max items-baseline gap-12 md:gap-20"
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{
            duration: 40,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          {loop.map((item, i) => (
            <span key={`${item.label}-${i}`} className={voiceClass(item.voice)}>
              {item.label}
            </span>
          ))}
        </motion.div>
      )}
    </div>
  );
}
