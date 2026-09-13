"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import type { Project } from "./data";
import ProjectCard from "./ProjectCard";
import { useScrollMarquee } from "./useScrollMarquee";

interface MarqueeRowProps {
  projects: Project[];
  startIndex: number;
  direction: "left" | "right";
  isTouch: boolean;
  prefersReducedMotion: boolean;
}

export default function MarqueeRow({
  projects,
  startIndex,
  direction,
  isTouch,
  prefersReducedMotion,
}: MarqueeRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const x = useScrollMarquee({ containerRef: rowRef, direction, distance: 160, prefersReducedMotion });

  return (
    <div ref={rowRef} className="w-full">
      <motion.div style={{ x }} className="flex w-max -mx-[6vw] gap-8 px-6 sm:px-12">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={startIndex + i}
            isTouch={isTouch}
            prefersReducedMotion={prefersReducedMotion}
          />
        ))}
      </motion.div>
    </div>
  );
}
