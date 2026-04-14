"use client";

import { motion, useReducedMotion } from "motion/react";
import type { PartnerMarqueeItem } from "@/components/hero/PartnersMarquee";

const base = "whitespace-nowrap";

function voiceClass(voice: PartnerMarqueeItem["voice"]): string {
  switch (voice) {
    case "serif":
      return `${base} font-serif-display text-[clamp(0.82rem,2.2vw,1rem)] font-semibold italic tracking-tight text-[#1a0f00]`;
    case "mono":
      return `${base} font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-[#7c4a00]/90 md:text-[11px]`;
    case "accent":
      return `${base} bg-gradient-to-r from-[#c45c00] via-[#e07a20] to-[#7c4a00] bg-clip-text text-sm font-semibold uppercase tracking-[0.14em] text-transparent md:text-base`;
    default:
      return `${base} font-sans text-sm font-semibold uppercase tracking-[0.14em] text-[#1a0f00] md:text-base`;
  }
}

type Props = { labels: readonly PartnerMarqueeItem[] };

/** Avantgarde marquee — warm amber palette, sharp geometry. */
export function AvantgardeMarquee({ labels }: Props) {
  const reduceMotion = useReducedMotion();
  const loop = [...labels, ...labels];

  return (
    <div className="relative mt-8 overflow-hidden py-3">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#fdf5e8] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#fdf5e8] to-transparent" />
      {reduceMotion ? (
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
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
            <span key={`${item.label}-${item.voice}-${i}`} className={voiceClass(item.voice)}>
              {item.label}
            </span>
          ))}
        </motion.div>
      )}
    </div>
  );
}
