"use client";

import { motion } from "motion/react";

type Props = { labels: readonly string[] };

/** Infinite horizontal scroll; `motion` so animation isn’t dropped by CSS pipeline / stacks cleanly under hero stagger. */
export function PartnersMarquee({ labels }: Props) {
  const loop = [...labels, ...labels];

  return (
    <div className="relative mt-6 overflow-hidden py-2">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-14 bg-gradient-to-r from-[#e8eaed] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-14 bg-gradient-to-l from-[#e8eaed] to-transparent" />
      <motion.div
        className="flex w-max gap-16 md:gap-24"
        initial={{ x: 0 }}
        animate={{ x: "-50%" }}
        transition={{
          duration: 38,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        {loop.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="whitespace-nowrap font-sans text-sm font-semibold uppercase tracking-[0.12em] text-zinc-800 md:text-base"
          >
            {name}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
