"use client";

import { useEffect, useRef } from "react";

/**
 * Radiation trefoil with a warning-beacon double-flash —
 * static symbol, periodic bright pulse like a hazard light.
 */
export default function PixelNuclear() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const startTime = performance.now();

    const resize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    function drawTrefoil(
      c: CanvasRenderingContext2D,
      cx: number, cy: number,
      outerR: number,
      strokeAlpha: number,
      fillAlpha: number,
      lw: number,
    ) {
      const innerR     = outerR / 3;
      const sectorSpan = (Math.PI * 2) / 3;
      const halfGap    = Math.PI / 12; // 15° gap each side → 60° sectors

      // Fixed orientation — π/2 offset so one petal points straight up
      const offset = -Math.PI / 2;

      if (fillAlpha > 0) {
        c.fillStyle = `rgba(103,232,249,${fillAlpha.toFixed(3)})`;
        for (let s = 0; s < 3; s++) {
          const a0 = s * sectorSpan + offset + halfGap;
          const a1 = (s + 1) * sectorSpan + offset - halfGap;
          c.beginPath();
          c.arc(cx, cy, outerR, a0, a1);
          c.arc(cx, cy, innerR, a1, a0, true);
          c.closePath();
          c.fill();
        }
        c.beginPath();
        c.arc(cx, cy, innerR, 0, Math.PI * 2);
        c.fill();
      }

      c.lineWidth   = lw;
      c.strokeStyle = `rgba(103,232,249,${strokeAlpha.toFixed(3)})`;
      for (let s = 0; s < 3; s++) {
        const a0 = s * sectorSpan + offset + halfGap;
        const a1 = (s + 1) * sectorSpan + offset - halfGap;
        c.beginPath();
        c.arc(cx, cy, outerR, a0, a1);
        c.arc(cx, cy, innerR, a1, a0, true);
        c.closePath();
        c.stroke();
      }
      c.beginPath();
      c.arc(cx, cy, innerR, 0, Math.PI * 2);
      c.stroke();
    }

    const draw = (now: number) => {
      rafRef.current = requestAnimationFrame(draw);
      const t = (now - startTime) / 1000;

      const cw = canvas.width;
      const ch = canvas.height;
      ctx.clearRect(0, 0, cw, ch);

      ctx.lineCap  = "round";
      ctx.lineJoin = "round";

      // ── Warning double-flash pattern (3.0s cycle) ──────────────────────
      // Each flash: 0.10s ramp-up · 0.45s hold · 0.10s ramp-down
      // flash1: 0.00–0.65s   gap: 0.65–0.85s   flash2: 0.85–1.50s   dark: 1.50–3.0s
      const cycle = t % 3.0;
      let flash = 0;
      if      (cycle < 0.10)  flash = cycle / 0.10;                    // ramp up 1
      else if (cycle < 0.55)  flash = 1.0;                             // hold 1
      else if (cycle < 0.65)  flash = 1 - (cycle - 0.55) / 0.10;      // ramp down 1
      else if (cycle < 0.85)  flash = 0;                               // gap
      else if (cycle < 0.95)  flash = (cycle - 0.85) / 0.10;          // ramp up 2
      else if (cycle < 1.40)  flash = 1.0;                             // hold 2
      else if (cycle < 1.50)  flash = 1 - (cycle - 1.40) / 0.10;      // ramp down 2
      // else remains 0 (dark for remainder of cycle)

      // Base dim opacity + flash boost
      const alphaMult = 0.60 + flash * 0.55;

      const cx   = cw * 0.50;
      const cy   = ch * 0.62;
      const maxR = Math.min(cw, ch) * 0.43;

      const rings = [
        { r: maxR * 0.32, strokeA: 0.20, fillA: 0.07, lwMult: 0.8 },
        { r: maxR * 0.62, strokeA: 0.18, fillA: 0.00, lwMult: 1.0 },
        { r: maxR * 0.92, strokeA: 0.16, fillA: 0.00, lwMult: 1.2 },
      ];

      for (const ring of rings) {
        drawTrefoil(
          ctx, cx, cy,
          ring.r,
          ring.strokeA * alphaMult,
          ring.fillA   * alphaMult,
          ring.lwMult  * dpr,
        );
      }

      // Outer boundary ring
      ctx.beginPath();
      ctx.arc(cx, cy, maxR * 1.04, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(103,232,249,${(0.08 * alphaMult).toFixed(3)})`;
      ctx.lineWidth   = 0.8 * dpr;
      ctx.stroke();
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      <canvas ref={canvasRef} aria-hidden className="block h-full w-full" />
    </div>
  );
}
