"use client";

import { motion, useReducedMotion } from "motion/react";

type MarqueeVoice = "mono" | "serif" | "accent";

type MarqueeItem = {
  label: string;
  voice: MarqueeVoice;
};

type AvantMarqueeProps = {
  items: readonly MarqueeItem[];
};

function toneClass(voice: MarqueeVoice): string {
  if (voice === "serif") {
    return "font-serif-display text-[clamp(0.95rem,2.2vw,1.15rem)] italic font-semibold tracking-tight text-[#2f241b]";
  }
  if (voice === "accent") {
    return "font-sans text-sm md:text-base uppercase tracking-[0.18em] font-semibold text-[#92400e]";
  }
  return "font-mono text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-[#7c2d12]";
}

/**
 * Warm, sharp-edged editorial strip used in the avantgarde variation.
 */
export function AvantMarquee({ items }: AvantMarqueeProps) {
  const reduceMotion = useReducedMotion();
  const loop = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-[#d6c5b6] bg-[#f7f1e8] py-3">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-16 bg-gradient-to-r from-[#f7f1e8] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-16 bg-gradient-to-l from-[#f7f1e8] to-transparent" />
      {reduceMotion ? (
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-3 px-4">
          {items.map((item) => (
            <span key={item.label} className={toneClass(item.voice)}>
              {item.label}
            </span>
          ))}
        </div>
      ) : (
        <motion.div
          className="flex w-max items-baseline gap-10 md:gap-16"
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{ duration: 34, ease: "linear", repeat: Infinity, repeatType: "loop" }}
        >
          {loop.map((item, index) => (
            <span key={`${item.label}-${index}`} className={toneClass(item.voice)}>
              {item.label}
            </span>
          ))}
        </motion.div>
      )}
    </div>
  );
}
