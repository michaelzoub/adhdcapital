"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "motion/react";
import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";

type CounterTickerProps = {
  /** Final number to count up to */
  to: number;
  /** Optional prefix e.g. "$" */
  prefix?: string;
  /** Optional suffix e.g. "%" or "K+" */
  suffix?: string;
  /** Duration in seconds */
  duration?: number;
  /** Delay before counter starts */
  delay?: number;
  className?: string;
  style?: CSSProperties;
};

/**
 * Animated counting number — counts from 0 to `to` when scrolled into view.
 * Uses motion's animate() for a smooth eased count.
 */
export function CounterTicker({
  to,
  prefix = "",
  suffix = "",
  duration = 1.8,
  delay = 0,
  className = "",
  style,
}: CounterTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v).toLocaleString());

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, to, {
      duration,
      delay,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [inView, to, duration, delay, count]);

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}
