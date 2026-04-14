"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MarchingBorderProps {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  /** dash + gap in pixels */
  dashArray?: string;
  /** animation duration for one full lap in seconds */
  duration?: number;
  color?: string;
}

/**
 * Wraps children in an SVG rect that draws its own dashed border
 * with a marching-ants animation — no border-radius, sharp corners.
 */
export function MarchingBorder({
  children,
  className,
  innerClassName,
  dashArray = "8 6",
  duration = 14,
  color = "rgba(180,83,9,0.55)",
}: MarchingBorderProps) {
  return (
    <div className={cn("relative", className)}>
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.rect
          x="0.5"
          y="0.5"
          width="calc(100% - 1px)"
          height="calc(100% - 1px)"
          stroke={color}
          strokeWidth="1"
          strokeDasharray={dashArray}
          initial={{ strokeDashoffset: 0 }}
          animate={{ strokeDashoffset: -100 }}
          transition={{
            duration,
            ease: "linear",
            repeat: Infinity,
          }}
        />
      </svg>
      <div className={innerClassName}>{children}</div>
    </div>
  );
}
