"use client";

import { useState, type MouseEvent } from "react";
import { motion, type Variants } from "framer-motion";
import type { Project } from "./data";

const EASE = [0.16, 1, 0.3, 1] as const;

interface ProjectCardProps {
  project: Project;
  index: number;
  isTouch: boolean;
  prefersReducedMotion: boolean;
}

export default function ProjectCard({ project, index, isTouch, prefersReducedMotion }: ProjectCardProps) {
  const [isActive, setIsActive] = useState(false);

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (isTouch && !isActive) {
      e.preventDefault();
      setIsActive(true);
    }
  };

  const overlayVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.55, transition: { duration: prefersReducedMotion ? 0.2 : 0.35, ease: EASE } },
  };

  const detailContainerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  };

  const detailItemVariants: Variants = prefersReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.2 } } }
    : { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE } } };

  return (
    <motion.a
      href={project.href}
      aria-label={`View case study: ${project.title}`}
      onClick={handleClick}
      onMouseEnter={() => !isTouch && setIsActive(true)}
      onMouseLeave={() => !isTouch && setIsActive(false)}
      onFocus={() => !isTouch && setIsActive(true)}
      onBlur={() => !isTouch && setIsActive(false)}
      whileHover={prefersReducedMotion ? undefined : { scale: 1.03 }}
      whileFocus={prefersReducedMotion ? undefined : { scale: 1.03 }}
      animate={{
        boxShadow: isActive
          ? "0 30px 60px -20px rgba(0,0,0,0.55)"
          : "0 10px 30px -18px rgba(0,0,0,0.35)",
      }}
      transition={{ duration: 0.3, ease: EASE }}
      className="group relative block aspect-[4/3] w-[clamp(300px,42vw,480px)] shrink-0 overflow-hidden rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={project.image} alt="" className="absolute inset-0 h-full w-full object-cover" />

      <motion.div
        aria-hidden
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
        variants={overlayVariants}
        className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"
      />

      <motion.div
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
        variants={detailContainerVariants}
        className="pointer-events-none absolute inset-x-0 bottom-12 flex flex-col gap-2 px-5"
      >
        <motion.div variants={detailItemVariants} className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/20 bg-black/40 px-2.5 py-0.5 text-[11px] text-white/90 backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </motion.div>
        <ul className="flex flex-col gap-1">
          {project.highlights.map((highlight) => (
            <motion.li key={highlight} variants={detailItemVariants} className="text-xs text-white/85">
              {highlight}
            </motion.li>
          ))}
        </ul>
      </motion.div>

      <div className="absolute bottom-0 left-0 rounded-tr-2xl bg-black/55 px-4 py-2.5 backdrop-blur-sm">
        <span className="font-display text-sm font-semibold text-white">
          {String(index + 1).padStart(2, "0")} — {project.shortTitle}
        </span>
      </div>
    </motion.a>
  );
}
