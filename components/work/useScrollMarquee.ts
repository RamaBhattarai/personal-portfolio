"use client";

import type { RefObject } from "react";
import { useScroll, useSpring, useTransform, useVelocity, type MotionValue } from "framer-motion";

interface UseScrollMarqueeOptions {
  containerRef: RefObject<HTMLElement | null>;
  direction: "left" | "right";
  distance: number;
  prefersReducedMotion: boolean;
}

/**
 * Maps a row's vertical scroll progress to a horizontal translateX, then layers
 * a velocity-driven spring on top so the row keeps drifting briefly (and settles
 * over ~500ms) after the user stops scrolling, instead of snapping to a stop.
 */
export function useScrollMarquee({
  containerRef,
  direction,
  distance,
  prefersReducedMotion,
}: UseScrollMarqueeOptions): MotionValue<number> {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const range = direction === "left" ? [distance, -distance] : [-distance, distance];
  const baseX = useTransform(scrollYProgress, [0, 1], range);

  const velocity = useVelocity(baseX);
  const drift = useSpring(velocity, { stiffness: 90, damping: 20, mass: 0.4 });

  return useTransform([baseX, drift], ([base, momentum]) =>
    prefersReducedMotion ? 0 : (base as number) + (momentum as number) * 0.12
  );
}
