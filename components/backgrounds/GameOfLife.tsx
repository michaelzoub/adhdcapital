"use client";

import { useEffect, useRef } from "react";

interface GameOfLifeProps {
  /** Size of each cell in pixels. Default 5. */
  cellSize?: number;
  /** Fill color for live cells. Default "#111111". */
  color?: string;
  /** Milliseconds between generations. Default 140. */
  speed?: number;
  /** Opacity of live cells (0–1). Default 0.07 for very subtle. */
  opacity?: number;
  /** Initial density of live cells (0–1). Default 0.28. */
  density?: number;
}

/**
 * Conway's Game of Life canvas background.
 * Meant to be placed as `pointer-events-none absolute inset-0` inside a
 * `relative overflow-hidden` parent.
 *
 * Uses a toroidal (wrap-around) grid so patterns never die out at edges.
 * When the population collapses to zero the grid is re-seeded automatically.
 */
export default function GameOfLife({
  cellSize = 5,
  color = "#111111",
  speed = 140,
  opacity = 0.07,
  density = 0.28,
}: GameOfLifeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Both canvas and ctx are confirmed non-null above; alias for closure use.
    const cv = canvas;
    const cx = ctx;

    let rafId: number;
    let lastTick = 0;
    let cols = 0;
    let rows = 0;
    let grid: Uint8Array;
    let next: Uint8Array;

    function resize() {
      const w = cv.offsetWidth;
      const h = cv.offsetHeight;
      cv.width = w;
      cv.height = h;
      cols = Math.max(1, Math.floor(w / cellSize));
      rows = Math.max(1, Math.floor(h / cellSize));
      grid = seed();
      next = new Uint8Array(cols * rows);
    }

    function seed(): Uint8Array {
      const g = new Uint8Array(cols * rows);
      for (let i = 0; i < g.length; i++) {
        g[i] = Math.random() < density ? 1 : 0;
      }
      return g;
    }

    function idx(r: number, c: number) {
      return ((r + rows) % rows) * cols + ((c + cols) % cols);
    }

    function step() {
      let alive = 0;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const n =
            grid[idx(r - 1, c - 1)] +
            grid[idx(r - 1, c)] +
            grid[idx(r - 1, c + 1)] +
            grid[idx(r, c - 1)] +
            grid[idx(r, c + 1)] +
            grid[idx(r + 1, c - 1)] +
            grid[idx(r + 1, c)] +
            grid[idx(r + 1, c + 1)];
          const cur = grid[idx(r, c)];
          const nxt = cur ? (n === 2 || n === 3 ? 1 : 0) : n === 3 ? 1 : 0;
          next[idx(r, c)] = nxt;
          alive += nxt;
        }
      }
      // Re-seed if population dies out
      if (alive === 0) {
        grid = seed();
      } else {
        const tmp = grid;
        grid = next;
        next = tmp;
      }
    }

    function draw() {
      cx.clearRect(0, 0, cv.width, cv.height);
      cx.globalAlpha = opacity;
      cx.fillStyle = color;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (grid[idx(r, c)]) {
            cx.fillRect(c * cellSize + 1, r * cellSize + 1, cellSize - 1, cellSize - 1);
          }
        }
      }
      cx.globalAlpha = 1;
    }

    function tick(time: number) {
      rafId = requestAnimationFrame(tick);
      if (time - lastTick < speed) return;
      lastTick = time;
      step();
      draw();
    }

    resize();
    draw();
    rafId = requestAnimationFrame(tick);

    const ro = new ResizeObserver(resize);
    ro.observe(cv);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, [cellSize, color, speed, opacity, density]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}
