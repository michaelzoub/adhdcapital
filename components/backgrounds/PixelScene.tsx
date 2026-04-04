"use client";

import { useEffect, useRef } from "react";

// Base pixel block size in CSS pixels (scaled by DPR in draw loop)
const PS_BASE = 4;

// ---------------------------------------------------------------------------
// Pixel drawing primitive
// ---------------------------------------------------------------------------
function blk(
  ctx: CanvasRenderingContext2D,
  gx: number,
  gy: number,
  ps: number,
  color: string,
) {
  ctx.fillStyle = color;
  ctx.fillRect(Math.round(gx) * ps, Math.round(gy) * ps, ps, ps);
}

// ---------------------------------------------------------------------------
// Mountain
// ---------------------------------------------------------------------------
function drawMountain(
  ctx: CanvasRenderingContext2D,
  cols: number,
  rows: number,
  ps: number,
) {
  const peakCol = cols * 0.48;
  const peakRow = rows * 0.28;
  const baseRow = rows - 1;
  const leftEdge = cols * 0.04;
  const rightEdge = cols * 0.96;

  for (let col = Math.floor(leftEdge); col <= Math.ceil(rightEdge); col++) {
    const tLeft = (col - leftEdge) / (peakCol - leftEdge);
    const tRight = (rightEdge - col) / (rightEdge - peakCol);
    const t = Math.min(tLeft, tRight);
    if (t <= 0) continue;

    const colPeakRow = baseRow - t * (baseRow - peakRow);

    for (let row = Math.floor(colPeakRow); row < baseRow; row++) {
      const h = Math.max(0, Math.min(1, (row - peakRow) / (baseRow - peakRow)));
      // Top of peak: dark slate blue; base: light blue
      const r = Math.round(72 + h * 82);
      const g = Math.round(110 + h * 68);
      const b = Math.round(172 + h * 42);
      blk(ctx, col, row, ps, `rgb(${r},${g},${b})`);
    }
  }
}

// ---------------------------------------------------------------------------
// Clouds
// ---------------------------------------------------------------------------
const CLOUD_SHAPES = [
  [
    [2, 0], [3, 0], [4, 0],
    [1, 1], [2, 1], [3, 1], [4, 1], [5, 1],
    [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2],
    [0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3],
  ],
  [
    [1, 0], [2, 0], [3, 0],
    [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1],
    [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2],
  ],
  [
    [3, 0], [4, 0],
    [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1],
    [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2],
    [0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3],
  ],
] as const;

function drawCloud(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  ps: number,
  shapeIdx: number,
  color: string,
) {
  const shape = CLOUD_SHAPES[shapeIdx % CLOUD_SHAPES.length];
  for (const [dx, dy] of shape) {
    blk(ctx, cx + dx, cy + dy, ps, color);
  }
}

// ---------------------------------------------------------------------------
// Stick figure with hammer
// ---------------------------------------------------------------------------
function drawStickFigure(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  ps: number,
  /** 0 = arm raised, 1 = arm swung down (impact) */
  armT: number,
  color: string,
) {
  const b = (gx: number, gy: number) => blk(ctx, gx, gy, ps, color);

  // Head (rounded square)
  const head: [number, number][] = [
    [0, 0], [1, 0], [2, 0],
    [-1, 1], [0, 1], [1, 1], [2, 1], [3, 1],
    [-1, 2], [0, 2], [1, 2], [2, 2], [3, 2],
    [0, 3], [1, 3], [2, 3],
  ];
  for (const [dx, dy] of head) b(cx + dx, cy + dy);

  // Torso
  for (let i = 4; i <= 11; i++) b(cx + 1, cy + i);

  // Left arm (static — resting, angled slightly down-left)
  b(cx, cy + 5);
  b(cx - 1, cy + 6);
  b(cx - 2, cy + 7);
  b(cx - 3, cy + 8);
  b(cx - 3, cy + 9); // hand

  // Legs
  b(cx, cy + 12);
  b(cx - 1, cy + 13);
  b(cx - 2, cy + 14);
  b(cx - 2, cy + 15);

  b(cx + 2, cy + 12);
  b(cx + 3, cy + 13);
  b(cx + 4, cy + 14);
  b(cx + 4, cy + 15);

  // Right arm + hammer — animated
  // Angle: raised = -PI*0.55 (upper-right), down = PI*0.3 (lower-right)
  const angleUp = -Math.PI * 0.55;
  const angleDown = Math.PI * 0.3;
  const angle = angleUp + armT * (angleDown - angleUp);
  const ax = Math.cos(angle);
  const ay = Math.sin(angle);
  const sx = cx + 2; // shoulder x
  const sy = cy + 5; // shoulder y
  const armLen = 5;

  // Arm pixels
  for (let i = 0; i <= armLen; i++) {
    b(Math.round(sx + ax * i), Math.round(sy + ay * i));
  }

  // Hammer tip position
  const tx = sx + ax * (armLen + 1);
  const ty = sy + ay * (armLen + 1);

  // Hammer head: perpendicular to arm, 5 pixels wide × 2 deep
  const px2 = -ay;
  const py2 = ax;
  for (let i = -2; i <= 2; i++) {
    b(Math.round(tx + px2 * i), Math.round(ty + py2 * i));
    b(Math.round(tx + px2 * i + ax), Math.round(ty + py2 * i + ay));
  }
}

// ---------------------------------------------------------------------------
// Nuclear trefoil
// ---------------------------------------------------------------------------
function drawNuclear(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  ps: number,
  rotAngle: number,
  fillColor: string,
  ringColor: string,
) {
  const outerR = 9.5;
  const innerR = 2.8;
  const gapAngle = Math.PI / 10; // gap between sectors
  const sectorSpan = (Math.PI * 2) / 3;
  const fillSpan = sectorSpan - gapAngle;

  const minC = Math.floor(cx - outerR - 1);
  const maxC = Math.ceil(cx + outerR + 2);
  const minR = Math.floor(cy - outerR - 1);
  const maxR = Math.ceil(cy + outerR + 2);

  for (let col = minC; col <= maxC; col++) {
    for (let row = minR; row <= maxR; row++) {
      const dx = col + 0.5 - cx;
      const dy = row + 0.5 - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Outer ring halo
      if (dist >= outerR && dist < outerR + 1.4) {
        blk(ctx, col, row, ps, ringColor);
        continue;
      }

      if (dist > outerR || dist < innerR) continue;

      // Sector check (with rotation)
      let a = Math.atan2(dy, dx) - rotAngle;
      a = ((a % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
      const aInSector = a % sectorSpan;
      if (aInSector < fillSpan) {
        blk(ctx, col, row, ps, fillColor);
      }
    }
  }

  // Inner filled circle
  const innerMin = Math.floor(cx - innerR - 1);
  const innerMax = Math.ceil(cx + innerR + 1);
  for (let col = innerMin; col <= innerMax; col++) {
    for (let row = Math.floor(cy - innerR - 1); row <= Math.ceil(cy + innerR + 1); row++) {
      const dx = col + 0.5 - cx;
      const dy = row + 0.5 - cy;
      if (Math.sqrt(dx * dx + dy * dy) < innerR) {
        blk(ctx, col, row, ps, fillColor);
      }
    }
  }
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function PixelScene() {
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
    const ps = PS_BASE * dpr;
    const startTime = performance.now();

    const cloudConfigs = [
      { yFrac: 0.07, speed: 0.35, shape: 0 },
      { yFrac: 0.14, speed: 0.2, shape: 1 },
      { yFrac: 0.04, speed: 0.55, shape: 2 },
    ];

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

    const draw = (now: number) => {
      rafRef.current = requestAnimationFrame(draw);
      const t = (now - startTime) / 1000;

      const cw = canvas.width;
      const ch = canvas.height;
      const cols = Math.ceil(cw / ps);
      const rows = Math.ceil(ch / ps);

      ctx.clearRect(0, 0, cw, ch);

      // Mountain
      drawMountain(ctx, cols, rows, ps);

      // Clouds (wrapping)
      const cloudColor = "#cce4f5";
      for (let i = 0; i < cloudConfigs.length; i++) {
        const c = cloudConfigs[i];
        const cloudW = 10;
        const rawX = ((t * c.speed * 6 + cols * (i / cloudConfigs.length)) % (cols + cloudW)) - cloudW;
        drawCloud(ctx, Math.round(rawX), Math.round(c.yFrac * rows), ps, c.shape, cloudColor);
      }

      // Stick figure — standing on mountain slope
      const figX = Math.round(cols * 0.44);
      const figY = Math.round(rows * 0.42);
      // Slow hammer swing — ease with smoothstep on sin
      const raw = Math.sin(t * 2.2);
      const armT = (raw + 1) / 2; // 0–1
      drawStickFigure(ctx, figX, figY, ps, armT, "#4a7fa8");

      // Nuclear symbol — upper-right, slow rotation
      const nucX = Math.round(cols * 0.74);
      const nucY = Math.round(rows * 0.24);
      drawNuclear(ctx, nucX, nucY, ps, t * 0.35, "#4a7fa8", "#7aabcc");
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
