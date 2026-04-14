"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@!%&*";

interface TextRevealProps {
  text: string;
  className?: string;
  /** ms delay before the effect starts */
  delay?: number;
  /** ms per character reveal cycle */
  speed?: number;
}

/**
 * Character-scramble reveal: letters randomise then lock in place one by one,
 * triggered when the element scrolls into view.
 */
export function TextReveal({
  text,
  className = "",
  delay = 0,
  speed = 55,
}: TextRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const [displayed, setDisplayed] = useState<string[]>(
    () => text.split("").map(() => " ")
  );
  const frameRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!isInView || startedRef.current) return;
    startedRef.current = true;

    const chars = text.split("");
    let lockedCount = 0;
    let tick = 0;

    const scramble = () => {
      setDisplayed(
        chars.map((c, i) => {
          if (c === " ") return " ";
          if (i < lockedCount) return c;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
      );
      tick++;
      // lock one character every ~3 ticks
      if (tick % 3 === 0) lockedCount++;
      if (lockedCount <= chars.length) {
        frameRef.current = setTimeout(scramble, speed);
      } else {
        setDisplayed(chars);
      }
    };

    const timer = setTimeout(scramble, delay);
    return () => {
      clearTimeout(timer);
      if (frameRef.current) clearTimeout(frameRef.current);
    };
  }, [isInView, text, delay, speed]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      {displayed.map((c, i) => (
        <span key={i} aria-hidden>
          {c}
        </span>
      ))}
    </span>
  );
}
