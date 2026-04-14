"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

type WarmFuturePulseProps = {
  className?: string;
};

/**
 * Expanding square-rings with a restrained scanline pulse.
 */
export function WarmFuturePulse({ className }: WarmFuturePulseProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = hostRef.current;
    if (!canvas || !host) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    const prefersReduced =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = window.devicePixelRatio || 1;
    const start = performance.now();

    let width = 0;
    let height = 0;

    const resize = () => {
      width = Math.max(1, host.clientWidth);
      height = Math.max(1, host.clientHeight);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(host);

    const draw = (now: number) => {
      rafRef.current = requestAnimationFrame(draw);
      const t = prefersReduced ? 0 : (now - start) / 1000;

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.lineJoin = "miter";
      context.lineCap = "square";

      const cx = width / 2;
      const cy = height / 2;
      const base = Math.min(width, height) * 0.12;
      const layers = 7;

      for (let i = 0; i < layers; i++) {
        const phase = (t * 0.6 + i / layers) % 1;
        const size = base + phase * Math.min(width, height) * 0.78;
        const alpha = (1 - phase) * (0.24 - i * 0.018);
        if (alpha <= 0) {
          continue;
        }

        context.strokeStyle = `rgba(180, 83, 9, ${alpha.toFixed(3)})`;
        context.lineWidth = 1;
        context.strokeRect(cx - size / 2, cy - size / 2, size, size);
      }

      const bandY = ((t * 110) % (height + 80)) - 40;
      context.fillStyle = "rgba(146, 64, 14, 0.12)";
      context.fillRect(0, bandY, width, 1.5);
      context.fillStyle = "rgba(124, 45, 18, 0.08)";
      context.fillRect(0, bandY + 4, width, 1);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={hostRef} className={cn("absolute inset-0 overflow-hidden", className)}>
      <canvas ref={canvasRef} aria-hidden className="block h-full w-full" />
    </div>
  );
}
