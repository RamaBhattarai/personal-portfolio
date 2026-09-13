/**
 * Design tokens for JS/motion contexts that can't consume CSS variables
 * (framer-motion color interpolation, canvas, etc). Mirrors the values in
 * app/globals.css — keep the two in sync when a value changes.
 */
export const colors = {
  background: "#0A0A0A",
  surface: "#141416",
  foreground: "#F4F1EA",
  muted: "#9A9A9E",
  /** Lime — primary/professional accent: CTAs, active/selected states. */
  accent: "#D8FF4F",
  /** Pink — secondary/personal accent: hover reveals, playful touches only. */
  accentSecondary: "#F4A6C6",
  glowSecondaryFrom: "rgba(244, 166, 198, 0.1)",
  glowSecondaryTo: "rgba(201, 166, 244, 0.1)",
  /** Lime accent pre-mixed to ~11% opacity, for ambient background glows. */
  accentGlow: "rgba(216, 255, 79, 0.11)",
} as const;
