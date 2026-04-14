"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface NoisePlaneProps {
  className?: string;
  /** 0–1 opacity of the noise overlay */
  opacity?: number;
  /** canvas pixel size relative to display px (lower = coarser) */
  resolution?: number;
}

/**
 * Subtle animated grain overlay — canvas-rendered Perlin-like noise
 * that shifts slowly over time. Adds tactile warmth to flat surfaces.
 */
export function NoisePlane({ className, opacity = 0.045, resolution = 0.65 }: NoisePlaneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    let t = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width = Math.max(1, Math.floor(w * dpr * resolution));
      canvas.height = Math.max(1, Math.floor(h * dpr * resolution));
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const noise = (x: number, y: number, z: number) => {
      // cheap hash-based pseudo-noise
      const n =
        Math.sin(x * 127.1 + y * 311.7 + z * 74.9) * 43758.5453;
      return n - Math.floor(n);
    };

    const draw = () => {
      t += 0.004;
      const w = canvas.width;
      const h = canvas.height;
      const data = ctx.createImageData(w, h);
      const buf = data.data;
      for (let i = 0; i < w; i++) {
        for (let j = 0; j < h; j++) {
          const v = noise(i * 0.05, j * 0.05, t) * 255;
          const idx = (j * w + i) * 4;
          buf[idx] = buf[idx + 1] = buf[idx + 2] = v;
          buf[idx + 3] = 255;
        }
      }
      ctx.putImageData(data, 0, 0);
      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, [resolution]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
      style={{ opacity, imageRendering: "pixelated" }}
    />
  );
}
