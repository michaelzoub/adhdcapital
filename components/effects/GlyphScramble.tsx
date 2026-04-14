"use client";

import { useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789·—∴∵⊕∞";

function randomChar() {
  return CHARSET[Math.floor(Math.random() * CHARSET.length)];
}

type GlyphScrambleProps = {
  text: string;
  className?: string;
  /** Speed: iterations per character (higher = longer scramble) */
  cyclesPerChar?: number;
  /** Delay before scramble starts (ms) */
  delayMs?: number;
  /** If true, triggers once when element enters viewport */
  triggerOnView?: boolean;
};

/**
 * Scrambles characters one-by-one into the final text string.
 * Each character cycles through random glyphs before settling.
 * Avantgarde / cyberpunk aesthetic for headlines.
 */
export function GlyphScramble({
  text,
  className = "",
  cyclesPerChar = 6,
  delayMs = 0,
  triggerOnView = true,
}: GlyphScrambleProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [displayed, setDisplayed] = useState<string[]>(
    triggerOnView ? text.split("").map(() => "") : text.split("")
  );
  const animating = useRef(false);

  const run = () => {
    if (animating.current) return;
    animating.current = true;
    const chars = text.split("");
    const revealed = new Array(chars.length).fill(false);
    let frame = 0;
    const totalFrames = chars.length * cyclesPerChar;

    const tick = () => {
      setDisplayed(
        chars.map((ch, i) => {
          if (ch === " ") return " ";
          if (revealed[i]) return ch;
          // Reveal characters progressively L-to-R
          const revealFrame = i * cyclesPerChar;
          if (frame >= revealFrame + cyclesPerChar) {
            revealed[i] = true;
            return ch;
          }
          if (frame < revealFrame) return "";
          return randomChar();
        })
      );
      frame++;
      if (frame <= totalFrames) {
        requestAnimationFrame(tick);
      } else {
        animating.current = false;
        setDisplayed(chars);
      }
    };

    setTimeout(() => requestAnimationFrame(tick), delayMs);
  };

  useEffect(() => {
    if (triggerOnView && inView) {
      run();
    } else if (!triggerOnView) {
      run();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, triggerOnView]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      {displayed.map((ch, i) => (
        <span
          key={i}
          className={
            ch && !text[i].match(/\s/)
              ? "inline-block transition-none"
              : "inline-block"
          }
          style={{
            opacity: ch === "" ? 0 : 1,
            minWidth: text[i] === " " ? "0.3em" : undefined,
          }}
        >
          {ch || "\u00A0"}
        </span>
      ))}
    </span>
  );
}
