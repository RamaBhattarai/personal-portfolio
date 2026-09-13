"use client";

import { useRef } from "react";
import type { RefObject } from "react";
import { useAnimationFrame, useMotionValue, useSpring, type MotionValue } from "framer-motion";

const REPEL_RADIUS = 150;
const MAX_DISPLACEMENT = 26;

interface UseNodePhysicsOptions {
  index: number;
  containerRef: RefObject<HTMLElement | null>;
  restXPercent: number;
  restYPercent: number;
  cursorX: MotionValue<number>;
  cursorY: MotionValue<number>;
  cursorActive: MotionValue<number>;
  isLocked: boolean;
  prefersReducedMotion: boolean;
}

/**
 * Drives a node's idle sine-wave drift and cursor-repulsion offset.
 * Physics runs on a raw motion value each frame; a spring smooths the
 * result so drift and repulsion never snap or jitter.
 */
export function useNodePhysics({
  index,
  containerRef,
  restXPercent,
  restYPercent,
  cursorX,
  cursorY,
  cursorActive,
  isLocked,
  prefersReducedMotion,
}: UseNodePhysicsOptions) {
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const x = useSpring(targetX, { stiffness: 120, damping: 14, mass: 0.6 });
  const y = useSpring(targetY, { stiffness: 120, damping: 14, mass: 0.6 });

  // Deterministic per-node phase/speed/amplitude so nodes drift out of sync.
  const phase = useRef((index * 137.5) % 360).current;
  const speed = useRef(0.5 + ((index * 53) % 100) / 180).current;
  const amplitude = useRef(2 + ((index * 19) % 3)).current;

  useAnimationFrame((time) => {
    if (prefersReducedMotion) return;

    const t = (time / 1000) * speed + phase;
    const idleX = Math.sin(t) * amplitude;
    const idleY = Math.cos(t * 0.85) * amplitude;

    let repelX = 0;
    let repelY = 0;

    const container = containerRef.current;
    if (container && !isLocked && cursorActive.get() > 0) {
      const bounds = container.getBoundingClientRect();
      const nodeX = bounds.left + (restXPercent / 100) * bounds.width;
      const nodeY = bounds.top + (restYPercent / 100) * bounds.height;
      const dx = nodeX - cursorX.get();
      const dy = nodeY - cursorY.get();
      const dist = Math.hypot(dx, dy);

      if (dist < REPEL_RADIUS && dist > 0.01) {
        const force = (1 - dist / REPEL_RADIUS) * MAX_DISPLACEMENT;
        repelX = (dx / dist) * force;
        repelY = (dy / dist) * force;
      }
    }

    targetX.set(idleX + repelX);
    targetY.set(idleY + repelY);
  });

  return { x, y };
}
