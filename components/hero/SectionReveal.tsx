"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";

type SectionRevealProps = {
  children: ReactNode;
  className?: string;
  /** Fraction of element visible before triggering */
  amount?: number;
  delay?: number;
} & Omit<HTMLMotionProps<"div">, "children" | "className">;

/**
 * Scroll-driven reveal — use on section wrappers site-wide.
 */
export function SectionReveal({
  children,
  className = "",
  amount = 0.12,
  delay = 0,
  ...rest
}: SectionRevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1], delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
