"use client";

import { useState, type MouseEvent } from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { FiLock } from "react-icons/fi";
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
  // Case-study pages aren't live yet — cards without a real href render as
  // inert, hoverable/focusable panels instead of a link to nowhere (which
  // previously jumped the page to the top via href="#").
  const hasLink = Boolean(project.href) && project.href !== "#";

  // Touch has no hover: the first tap reveals details, and (for a real
  // link) a second tap follows it. Without a link, tapping just toggles
  // the reveal since there's nowhere to navigate to.
  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (isTouch && !isActive) {
      e.preventDefault();
      setIsActive(true);
    }
  };

  const handlePanelClick = () => {
    if (isTouch) setIsActive((prev) => !prev);
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

  const sharedProps = {
    onMouseEnter: () => !isTouch && setIsActive(true),
    onMouseLeave: () => !isTouch && setIsActive(false),
    onFocus: () => !isTouch && setIsActive(true),
    onBlur: () => !isTouch && setIsActive(false),
    whileHover: prefersReducedMotion ? undefined : { scale: 1.03 },
    whileFocus: prefersReducedMotion ? undefined : { scale: 1.03 },
    animate: {
      boxShadow: isActive
        ? "0 30px 60px -20px rgba(0,0,0,0.55)"
        : "0 10px 30px -18px rgba(0,0,0,0.35)",
    },
    transition: { duration: 0.3, ease: EASE },
    className: `group relative block aspect-[4/3] w-full overflow-hidden rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
      hasLink ? "cursor-pointer" : "cursor-default"
    }`,
  };

  const children = (
    <>
      <Image
        src={project.image}
        alt={project.title}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover"
      />

      {!hasLink && (
        <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full border border-white/15 bg-black/55 px-3 py-1 text-[11px] text-white/80 backdrop-blur-sm">
          <FiLock className="h-3 w-3 shrink-0" aria-hidden />
          Confidential — client NDA
        </div>
      )}

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
        className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col gap-2 px-5 pb-5"
      >
        <motion.h3
          variants={detailItemVariants}
          className="font-display text-lg font-bold leading-tight text-white sm:text-xl"
        >
          {project.title}
        </motion.h3>
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

      <motion.div
        animate={{ opacity: isActive ? 0 : 1 }}
        transition={{ duration: 0.2 }}
        className="absolute bottom-0 left-0 rounded-tr-2xl bg-black/70 px-4 py-3 backdrop-blur-sm"
      >
        <span className="font-display text-base font-bold text-white sm:text-lg">
          <span className="text-accent">{String(index + 1).padStart(2, "0")}</span> — {project.shortTitle}
        </span>
      </motion.div>
    </>
  );

  if (hasLink) {
    return (
      <motion.a
        href={project.href}
        aria-label={`View case study: ${project.title}`}
        onClick={handleLinkClick}
        {...sharedProps}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.div role="group" tabIndex={0} aria-label={project.title} onClick={handlePanelClick} {...sharedProps}>
      {children}
    </motion.div>
  );
}
