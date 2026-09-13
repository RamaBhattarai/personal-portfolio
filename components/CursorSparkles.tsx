"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  rotate: number;
}

const SPAWN_INTERVAL_MS = 55;
const MAX_SPARKLES = 14;

let sparkleId = 0;

interface CursorSparklesProps {
  containerRef: RefObject<HTMLElement | null>;
}

/** Tiny pink stars that trail the cursor across a container and fade out. */
export default function CursorSparkles({ containerRef }: CursorSparklesProps) {
  const prefersReducedMotion = useReducedMotion();
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const lastSpawnRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (prefersReducedMotion || !container) return;

    function onMove(e: MouseEvent) {
      const now = performance.now();
      if (now - lastSpawnRef.current < SPAWN_INTERVAL_MS) return;
      lastSpawnRef.current = now;

      const bounds = container!.getBoundingClientRect();
      const sparkle: Sparkle = {
        id: sparkleId++,
        x: e.clientX - bounds.left,
        y: e.clientY - bounds.top,
        size: 4 + Math.random() * 4,
        rotate: Math.random() * 60 - 30,
      };
      setSparkles((prev) => [...prev.slice(-(MAX_SPARKLES - 1)), sparkle]);
    }

    container.addEventListener("mousemove", onMove);
    return () => container.removeEventListener("mousemove", onMove);
  }, [containerRef, prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  function remove(id: number) {
    setSparkles((prev) => prev.filter((s) => s.id !== id));
  }

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-15 overflow-hidden">
      {sparkles.map((s) => (
        <motion.span
          key={s.id}
          initial={{ opacity: 0.9, scale: 0.4, rotate: s.rotate }}
          animate={{ opacity: 0, scale: 1, y: -14 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          onAnimationComplete={() => remove(s.id)}
          style={{
            position: "absolute",
            left: s.x,
            top: s.y,
            width: s.size,
            height: s.size,
            translateX: "-50%",
            translateY: "-50%",
          }}
          className="text-accent-secondary"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%">
            <path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z" />
          </svg>
        </motion.span>
      ))}
    </div>
  );
}
