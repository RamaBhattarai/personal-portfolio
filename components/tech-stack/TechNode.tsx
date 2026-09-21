"use client";

import type { RefObject } from "react";
import { motion, type MotionValue, type Variants } from "framer-motion";
import type { TechNode as TechNodeData } from "./data";
import { useNodePhysics } from "./useNodePhysics";

// Sized in container-query units (cqw) rather than vw: node position (x/y)
// is a percentage of the visualization's own box, not the viewport, so
// size has to track that same box or nodes drift out of proportion and
// overlap whenever the container's width-to-viewport ratio changes across
// breakpoints (e.g. once `w-[80%]` kicks in, or max-w-4xl caps it).
const SIZE_PX: Record<TechNodeData["size"], string> = {
  large: "clamp(56px, 18cqw, 150px)",
  medium: "clamp(46px, 15cqw, 120px)",
  small: "clamp(36px, 11cqw, 90px)",
};

const ICON_SIZE: Record<TechNodeData["size"], string> = {
  large: "42%",
  medium: "38%",
  small: "36%",
};

const Z_INDEX: Record<TechNodeData["size"], number> = {
  large: 30,
  medium: 20,
  small: 10,
};

const scatterOffset = (index: number) => {
  const angle = (index * 137.5 * Math.PI) / 180;
  const radius = 220 + (index % 3) * 50;
  // Rounded to keep the server-rendered and hydrated transform strings
  // byte-identical — Framer Motion's SSR style serialization rounds these
  // differently than the client's live computation at full float precision.
  return {
    x: Math.round(Math.cos(angle) * radius * 100) / 100,
    y: Math.round(Math.sin(angle) * radius * 100) / 100,
  };
};

interface TechNodeProps {
  node: TechNodeData;
  index: number;
  containerRef: RefObject<HTMLElement | null>;
  cursorX: MotionValue<number>;
  cursorY: MotionValue<number>;
  cursorActive: MotionValue<number>;
  isActive: boolean;
  isDimmed: boolean;
  isLocked: boolean;
  prefersReducedMotion: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onSelect: () => void;
}

export default function TechNode({
  node,
  index,
  containerRef,
  cursorX,
  cursorY,
  cursorActive,
  isActive,
  isDimmed,
  isLocked,
  prefersReducedMotion,
  onHoverStart,
  onHoverEnd,
  onSelect,
}: TechNodeProps) {
  const { x, y } = useNodePhysics({
    index,
    containerRef,
    restXPercent: node.x,
    restYPercent: node.y,
    cursorX,
    cursorY,
    cursorActive,
    isLocked,
    prefersReducedMotion,
  });

  const offset = scatterOffset(index);
  const Icon = node.icon;
  const size = SIZE_PX[node.size];

  const entranceVariants: Variants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.4 } },
      }
    : {
        hidden: { opacity: 0, x: offset.x, y: offset.y, scale: 0.5 },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          transition: { type: "spring", stiffness: 120, damping: 13 },
        },
      };

  const labelOnLeft = node.x > 62;

  return (
    <motion.div
      variants={entranceVariants}
      style={{
        left: `${node.x}%`,
        top: `${node.y}%`,
        translateX: "-50%",
        translateY: "-50%",
        zIndex: isActive ? 50 : Z_INDEX[node.size],
      }}
      className="absolute"
    >
      <motion.button
        type="button"
        style={{ x, y, width: size, height: size }}
        animate={{
          scale: isActive ? 1.15 : 1,
          opacity: isDimmed ? 0.5 : isActive ? 1 : 0.85,
          filter: isActive ? "grayscale(0) saturate(1.1) brightness(1.05)" : "grayscale(0.55) saturate(0.6)",
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onMouseEnter={onHoverStart}
        onMouseLeave={onHoverEnd}
        onFocus={onHoverStart}
        onBlur={onHoverEnd}
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
        aria-label={node.name}
        className="relative flex shrink-0 items-center justify-center rounded-full border border-white/10 bg-surface shadow-lg outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <Icon style={{ color: node.color, width: ICON_SIZE[node.size], height: ICON_SIZE[node.size] }} />

        {isActive && (
          <motion.div
            role="tooltip"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`pointer-events-none absolute top-1/2 z-40 w-[min(14rem,55vw)] -translate-y-1/2 rounded-xl border border-accent-secondary/50 bg-accent-secondary/10 p-4 text-left shadow-xl backdrop-blur-sm sm:w-56 ${
              labelOnLeft ? "right-full mr-4" : "left-full ml-4"
            }`}
          >
            <p className="font-display text-sm font-semibold text-accent-secondary">{node.name}</p>
            <p className="mt-1 text-xs leading-snug text-muted">{node.note}</p>
          </motion.div>
        )}
      </motion.button>
    </motion.div>
  );
}
