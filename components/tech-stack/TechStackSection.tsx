"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, type Variants } from "framer-motion";
import { colors } from "@/lib/theme";
import { techNodes } from "./data";
import TechNode from "./TechNode";
import ConnectorLines from "./ConnectorLines";
import { useStarfield } from "./useStarfield";

const outerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

const atmosphereVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

const linesVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};

const nodesGroupVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

export default function TechStackSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion() ?? false;
  const stars = useStarfield();

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const cursorActive = useMotionValue(0);

  const [hoveredName, setHoveredName] = useState<string | null>(null);
  const [lockedName, setLockedName] = useState<string | null>(null);

  const activeName = lockedName ?? hoveredName;

  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto flex flex-col items-center px-6 text-center sm:px-12">
        <h2 className="font-display text-3xl font-bold sm:text-5xl">What's In My Stack</h2>
        <p className="mt-4 max-w-[520px] text-base text-muted sm:text-lg">
          The tools I reach for daily — hover a node to see how each one fits into my workflow.
        </p>
      </div>

      <div className="mt-14 px-6 sm:mt-20 sm:px-12">
        <motion.div
          ref={containerRef}
          variants={outerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          onMouseMove={(e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
          }}
          onMouseEnter={() => cursorActive.set(1)}
          onMouseLeave={() => cursorActive.set(0)}
          onClick={() => setLockedName(null)}
          className="relative mx-auto aspect-[4/3] w-[80%] max-w-4xl"
        >
          <motion.div aria-hidden variants={atmosphereVariants} className="absolute inset-0">
            <div
              className="absolute left-1/2 top-1/2 h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
              style={{ background: `radial-gradient(circle, ${colors.accentGlow}, transparent 70%)` }}
            />
            {stars.map((star, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  opacity: star.opacity,
                }}
              />
            ))}
          </motion.div>

          <motion.div variants={linesVariants}>
            <ConnectorLines
              nodes={techNodes}
              activeName={activeName}
              prefersReducedMotion={prefersReducedMotion}
            />
          </motion.div>

          <motion.div variants={nodesGroupVariants} className="absolute inset-0">
            {techNodes.map((node, index) => (
              <TechNode
                key={node.name}
                node={node}
                index={index}
                containerRef={containerRef}
                cursorX={cursorX}
                cursorY={cursorY}
                cursorActive={cursorActive}
                isActive={node.name === activeName}
                isDimmed={lockedName !== null && node.name !== lockedName}
                isLocked={lockedName !== null}
                prefersReducedMotion={prefersReducedMotion}
                onHoverStart={() => setHoveredName(node.name)}
                onHoverEnd={() => setHoveredName(null)}
                onSelect={() =>
                  setLockedName((prev) => (prev === node.name ? null : node.name))
                }
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
