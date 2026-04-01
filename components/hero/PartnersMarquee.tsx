"use client";

import { motion, useReducedMotion } from "motion/react";

export type PartnerVoice = "sans" | "serif" | "mono" | "accent";

export type PartnerMarqueeItem = {
  label: string;
  voice: PartnerVoice;
};

type Props = { labels: readonly PartnerMarqueeItem[] };

const base = "whitespace-nowrap";

function voiceClass(voice: PartnerVoice): string {
  switch (voice) {
    case "serif":
      return `${base} font-serif-display text-[clamp(0.8rem,2.2vw,0.98rem)] font-semibold italic tracking-tight text-zinc-900`;
    case "mono":
      return `${base} font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-cyan-950 md:text-[11px]`;
    case "accent":
      return `${base} bg-[var(--gradient-brand)] bg-clip-text text-sm font-semibold uppercase tracking-[0.12em] text-transparent md:text-base`;
    default:
      return `${base} font-sans text-sm font-semibold uppercase tracking-[0.12em] text-zinc-800 md:text-base`;
  }
}

/**
 * Infinite horizontal scroll — duplicated track + motion `x: -50%` for a dependable loop.
 */
export function PartnersMarquee({ labels }: Props) {
  const reduceMotion = useReducedMotion();
  const loop = [...labels, ...labels];

  return (
    <div className="relative mt-6 overflow-hidden py-2">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-14 bg-gradient-to-r from-[#e8eaed] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-14 bg-gradient-to-l from-[#e8eaed] to-transparent" />
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
          className="flex w-max items-baseline gap-10 md:gap-16"
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{
            duration: 36,
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
