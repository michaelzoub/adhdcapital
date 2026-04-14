"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

type WarmWireframeFieldProps = {
  className?: string;
  density?: number;
};

/**
 * Orthogonal wireframe motion field.
 * Keeps geometry sharp and optimistic with warm drafting tones.
 */
export function WarmWireframeField({ className, density = 16 }: WarmWireframeFieldProps) {
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

    const drawFrame = (now: number) => {
      rafRef.current = requestAnimationFrame(drawFrame);
      const time = prefersReduced ? 0 : (now - start) / 1000;

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.lineCap = "square";
      context.lineJoin = "miter";

      const safeDensity = Math.max(8, density);
      const xStep = width / safeDensity;
      const yStep = height / safeDensity;

      for (let i = 0; i <= safeDensity; i++) {
        const wobble = Math.sin(time * 0.65 + i * 0.35) * 7;
        const x = i * xStep + wobble;
        context.strokeStyle = "rgba(146, 64, 14, 0.2)";
        context.lineWidth = 1;
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, height);
        context.stroke();
      }

      for (let i = 0; i <= safeDensity; i++) {
        const wobble = Math.cos(time * 0.5 + i * 0.32) * 6;
        const y = i * yStep + wobble;
        context.strokeStyle = "rgba(120, 53, 15, 0.16)";
        context.lineWidth = 1;
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(width, y);
        context.stroke();
      }

      const scanner = ((time * 42) % (width + height)) - height;
      context.strokeStyle = "rgba(180, 83, 9, 0.3)";
      context.lineWidth = 1;
      context.beginPath();
      context.moveTo(scanner, 0);
      context.lineTo(scanner + height, height);
      context.stroke();
    };

    rafRef.current = requestAnimationFrame(drawFrame);
    return () => {
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, [density]);

  return (
    <div ref={hostRef} className={cn("absolute inset-0 overflow-hidden", className)}>
      <canvas ref={canvasRef} aria-hidden className="block h-full w-full" />
    </div>
  );
}
