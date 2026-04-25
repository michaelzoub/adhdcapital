"use client";

import type React from "react";

import { cn } from "@/lib/utils";

interface AuroraBackgroundProps {
  className?: string;
  /** Animation duration in seconds. Higher = slower/more subtle. Default 80s. */
  animationSpeed?: number;
  /** Overall opacity of the aurora layer. Default 0.12 = very subtle. */
  opacity?: number;
  /**
   * Five color stops for the repeating gradient.
   * Defaults to very dark grays — suitable for near-black section backgrounds.
   */
  colors?: [string, string, string, string, string];
}

/**
 * Animated aurora-style gradient background.
 * Designed to be placed as `pointer-events-none absolute inset-0` inside a
 * `relative overflow-hidden` parent — no wrapping div required.
 *
 * Default palette is dark gray on dark-section backgrounds.
 * Pass lighter `colors` for light-background usage.
 */
export function AuroraBackground({
  className,
  animationSpeed = 80,
  opacity = 0.12,
  colors = ["#2e2e2e", "#3d3d3d", "#484848", "#333333", "#282828"],
}: AuroraBackgroundProps) {
  const [c1, c2, c3, c4, c5] = colors;
  const gradient = `repeating-linear-gradient(100deg, ${c1} 10%, ${c2} 15%, ${c3} 20%, ${c4} 25%, ${c5} 30%)`;

  return (
    <div
      className={cn("pointer-events-none absolute -inset-[10px] overflow-hidden", className)}
    >
      <div
        className="absolute inset-0 blur-[14px] will-change-transform"
        style={{
          backgroundImage: gradient,
          backgroundSize: "300% 200%",
          backgroundPosition: "50% 50%",
          animation: `aurora ${animationSpeed}s linear infinite`,
          opacity,
        }}
      />
    </div>
  );
}
