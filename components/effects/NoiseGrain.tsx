"use client";

import { useEffect, useRef } from "react";

type NoiseGrainProps = {
  className?: string;
  /** Opacity of the grain layer */
  opacity?: number;
  /** How fast the grain refreshes (ms per frame) */
  refreshRate?: number;
  /** Scale of noise pixels — higher = coarser grain */
  scale?: number;
};

/**
 * Animated film-grain noise overlay.
 * Canvas-based: generates a new noise pattern every `refreshRate` ms
 * for an authentic analog/avantgarde texture.
 */
export function NoiseGrain({
  className = "",
  opacity = 0.045,
  refreshRate = 80,
  scale = 1,
}: NoiseGrainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      // Use logical resolution divided by scale for coarser grain
      const lw = Math.max(1, Math.floor(w / scale));
      const lh = Math.max(1, Math.floor(h / scale));
      canvas.width = lw;
      canvas.height = lh;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const paint = () => {
      const w = canvas.width;
      const h = canvas.height;
      if (w === 0 || h === 0) return;

      const imageData = ctx.createImageData(w, h);
      const buf = imageData.data;
      for (let i = 0; i < buf.length; i += 4) {
        const v = (Math.random() * 255) | 0;
        buf[i] = v;
        buf[i + 1] = v;
        buf[i + 2] = v;
        buf[i + 3] = 255;
      }
      ctx.putImageData(imageData, 0, 0);
    };

    paint();
    intervalRef.current = setInterval(paint, refreshRate);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      ro.disconnect();
    };
  }, [opacity, refreshRate, scale]);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        style={{ opacity, mixBlendMode: "overlay" }}
      />
    </div>
  );
}
