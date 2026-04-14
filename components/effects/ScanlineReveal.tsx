"use client";

import { motion, useInView } from "motion/react";
import type { ReactNode } from "react";
import { useRef } from "react";

type ScanlineRevealProps = {
  children: ReactNode;
  className?: string;
  /** Delay before the wipe begins */
  delay?: number;
  /** Duration of the wipe animation */
  duration?: number;
  /** Color of the scanning bar */
  barColor?: string;
};

/**
 * Dramatic horizontal-scanline reveal:
 * A warm amber bar sweeps top-to-bottom, then the content fades in.
 * Sharp, cinematic, avantgarde feel.
 */
export function ScanlineReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.75,
  barColor = "rgba(180, 120, 50, 0.55)",
}: ScanlineRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* Content fades in after bar passes */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4, delay: delay + duration * 0.55, ease: "easeOut" }}
      >
        {children}
      </motion.div>

      {/* Scanning bar */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 h-[3px]"
        style={{ background: barColor }}
        initial={{ top: "-3px", opacity: 0 }}
        animate={
          inView
            ? { top: ["0%", "105%"], opacity: [0, 1, 1, 0] }
            : { top: "-3px", opacity: 0 }
        }
        transition={{
          duration,
          delay,
          ease: [0.16, 1, 0.3, 1],
          times: [0, 0.05, 0.9, 1],
        }}
      />

      {/* Wipe overlay — lifts up like a curtain */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0"
        initial={{ scaleY: 1 }}
        animate={inView ? { scaleY: 0 } : { scaleY: 1 }}
        transition={{
          duration,
          delay,
          ease: [0.76, 0, 0.24, 1],
        }}
        style={{
          top: 0,
          transformOrigin: "top center",
          background: "var(--av2-bg, #1a140e)",
        }}
      />
    </div>
  );
}
