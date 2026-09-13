"use client";

import { useRef } from "react";
import { useAnimationFrame, useMotionValue, useSpring, type MotionValue } from "framer-motion";

const RADIUS = 72;
const MAX_PULL = 14;

interface UseMagneticHoverOptions {
  /** Viewport-relative cursor position, shared across all magnetic elements in a section. */
  cursorX: MotionValue<number>;
  cursorY: MotionValue<number>;
  cursorActive: MotionValue<number>;
  prefersReducedMotion: boolean;
}

/**
 * Springs an element toward the cursor when the cursor is within RADIUS of
 * its center, and back to rest otherwise. Also exposes a 0-1 `proximity`
 * value (spring-smoothed) for driving scale/color changes as the cursor
 * approaches, independent of the position offset itself.
 */
export function useMagneticHover({
  cursorX,
  cursorY,
  cursorActive,
  prefersReducedMotion,
}: UseMagneticHoverOptions) {
  const ref = useRef<HTMLAnchorElement>(null);

  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const targetProximity = useMotionValue(0);

  const x = useSpring(targetX, { stiffness: 180, damping: 18 });
  const y = useSpring(targetY, { stiffness: 180, damping: 18 });
  const proximity = useSpring(targetProximity, { stiffness: 200, damping: 20 });

  useAnimationFrame(() => {
    if (prefersReducedMotion || !ref.current || cursorActive.get() === 0) {
      targetX.set(0);
      targetY.set(0);
      targetProximity.set(0);
      return;
    }

    const bounds = ref.current.getBoundingClientRect();
    const centerX = bounds.left + bounds.width / 2;
    const centerY = bounds.top + bounds.height / 2;
    const dx = cursorX.get() - centerX;
    const dy = cursorY.get() - centerY;
    const dist = Math.hypot(dx, dy);

    if (dist < RADIUS) {
      const pull = 1 - dist / RADIUS;
      targetX.set((dx / (dist || 1)) * pull * MAX_PULL);
      targetY.set((dy / (dist || 1)) * pull * MAX_PULL);
      targetProximity.set(pull);
    } else {
      targetX.set(0);
      targetY.set(0);
      targetProximity.set(0);
    }
  });

  return { ref, x, y, proximity };
}
