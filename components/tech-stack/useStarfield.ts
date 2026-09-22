"use client";

import { useEffect, useState } from "react";

export interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
}

function randomStar(radiusMax: number): Star {
  const angle = Math.random() * Math.PI * 2;
  const radius = Math.random() * radiusMax;
  return {
    x: 50 + Math.cos(angle) * radius,
    y: 50 + Math.sin(angle) * radius,
    size: 2 + Math.random(),
    opacity: 0.08 + Math.random() * 0.07,
  };
}

function generateStarfield(): Star[] {
  // Sparse coverage across the full section, plus a denser pass biased
  // toward the center so the cluster reads as the atmosphere's focal point.
  const sparse = Array.from({ length: 36 }, () => randomStar(58));
  const dense = Array.from({ length: 26 }, () => randomStar(28));
  return [...sparse, ...dense].filter(
    (star) => star.x >= 0 && star.x <= 100 && star.y >= 0 && star.y <= 100
  );
}

/**
 * Generates starfield dot positions once per mount, not on every re-render.
 * Positions are randomized, so generation is deferred to a client-only effect
 * to keep the server-rendered markup (empty) matching the initial client render.
 */
export function useStarfield(): Star[] {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    // Client-only by design: random values would mismatch SSR output.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStars(generateStarfield());
  }, []);

  return stars;
}
