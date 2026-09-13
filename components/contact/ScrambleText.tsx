"use client";

import { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const DURATION = 280;

function randomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

interface ScrambleTextProps {
  text: string;
  /** Set true to trigger the scramble-to-reveal cycle (e.g. on hover). */
  active: boolean;
  className?: string;
}

/**
 * Cycles each character through random glyphs before settling back to the
 * real text, left-to-right. Purely a visual flourish — the real text stays
 * available to assistive tech via the parent's aria-label, since this span
 * is rendered aria-hidden.
 */
export default function ScrambleText({ text, active, className }: ScrambleTextProps) {
  const [display, setDisplay] = useState(text);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active) {
      setDisplay(text);
      return;
    }

    const start = performance.now();

    function tick(now: number) {
      const progress = Math.min((now - start) / DURATION, 1);
      const revealCount = Math.floor(progress * text.length);

      setDisplay(
        text
          .split("")
          .map((char, i) => (char === " " || i < revealCount ? char : randomChar()))
          .join("")
      );

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(text);
      }
    }

    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [active, text]);

  return (
    <span aria-hidden="true" className={className}>
      {display}
    </span>
  );
}
