"use client";

import { useRef, useState, type MouseEvent } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
  type Variants,
} from "framer-motion";
import { FiArrowDownCircle } from "react-icons/fi";
import { colors } from "@/lib/theme";
import { experience, resumeUrl, type ExperienceEntry } from "./data";
import { projects, type Project } from "@/components/work/data";
import { useMagneticHover } from "@/components/contact/useMagneticHover";
import ScrambleText from "@/components/contact/ScrambleText";

const EASE = [0.16, 1, 0.3, 1] as const;
const NEUTRAL = colors.muted;
const ACCENT = colors.accent;
const MAX_TILT = 6;

const chapterVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

function useItem(prefersReducedMotion: boolean): Variants {
  return {
    hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  };
}

interface ResumeButtonProps {
  cursorX: MotionValue<number>;
  cursorY: MotionValue<number>;
  cursorActive: MotionValue<number>;
  prefersReducedMotion: boolean;
}

function ResumeButton({ cursorX, cursorY, cursorActive, prefersReducedMotion }: ResumeButtonProps) {
  const { ref, x, y } = useMagneticHover({ cursorX, cursorY, cursorActive, prefersReducedMotion });

  return (
    <motion.a
      ref={ref}
      href={resumeUrl}
      download
      style={{ x, y }}
      className="inline-flex shrink-0 items-center gap-3 rounded-full bg-accent bg-[linear-gradient(135deg,var(--accent),var(--accent))] bg-[length:160%_160%] bg-[position:0%_50%] pl-6 pr-2 py-2 text-sm font-semibold text-background transition-[background-position,background-image] duration-500 ease-out hover:bg-[linear-gradient(135deg,var(--accent-secondary),#f8cfe0)] hover:bg-[position:100%_50%]"
    >
      Download resume
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-background text-accent">
        <FiArrowDownCircle className="h-4 w-4" aria-hidden />
      </span>
    </motion.a>
  );
}

interface TagChipProps {
  tag: string;
  prefersReducedMotion: boolean;
}

function TagChip({ tag, prefersReducedMotion }: TagChipProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] text-muted transition-colors duration-300 group-hover:border-accent/30 group-hover:text-foreground"
    >
      <ScrambleText text={tag} active={isHovered && !prefersReducedMotion} />
    </span>
  );
}

interface ExperienceProjectProps {
  project: Project;
  clientNote?: string;
  item: Variants;
  index: number;
  prefersReducedMotion: boolean;
}

function ExperienceProject({ project, clientNote, item, index, prefersReducedMotion }: ExperienceProjectProps) {
  const hasLink = Boolean(project.href) && project.href !== "#";
  const cardRef = useRef<HTMLDivElement>(null);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const glowOpacity = useMotionValue(0);
  const glowBackground = useMotionTemplate`radial-gradient(220px circle at ${glowX}% ${glowY}%, ${colors.accentGlow}, transparent 70%)`;

  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rotateX = useSpring(rawRotateX, { stiffness: 150, damping: 15, mass: 0.5 });
  const rotateY = useSpring(rawRotateY, { stiffness: 150, damping: 15, mass: 0.5 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !cardRef.current) return;
    const bounds = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - bounds.left) / bounds.width;
    const py = (e.clientY - bounds.top) / bounds.height;
    glowX.set(px * 100);
    glowY.set(py * 100);
    rawRotateY.set((px - 0.5) * 2 * MAX_TILT);
    rawRotateX.set(-(py - 0.5) * 2 * MAX_TILT);
  };

  const handleMouseLeave = () => {
    glowOpacity.set(0);
    rawRotateX.set(0);
    rawRotateY.set(0);
  };

  const entranceVariants: Variants = prefersReducedMotion
    ? item
    : {
        hidden: { opacity: 0, y: 28, scale: 0.92, rotate: index % 2 === 0 ? -2 : 2 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          rotate: 0,
          transition: { type: "spring", stiffness: 140, damping: 15 },
        },
      };

  return (
    <motion.div
      ref={cardRef}
      variants={entranceVariants}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => glowOpacity.set(1)}
      onMouseLeave={handleMouseLeave}
      whileHover={prefersReducedMotion ? undefined : { scale: 1.02, y: -4 }}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      transition={{ duration: 0.3, ease: EASE }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-surface/60 p-5 transition-colors duration-300 hover:border-accent/40 sm:p-6"
    >
      <motion.div
        aria-hidden
        style={{ opacity: glowOpacity, background: glowBackground }}
        transition={{ duration: 0.3 }}
        className="pointer-events-none absolute inset-0"
      />

      <div className="relative flex flex-wrap items-baseline justify-between gap-2">
        <h4 className="font-display text-lg font-bold sm:text-xl">{project.title}</h4>
        {clientNote && (
          <span className="rounded-full border border-accent-secondary/40 bg-accent-secondary/10 px-2.5 py-0.5 text-[11px] text-accent-secondary">
            {clientNote}
          </span>
        )}
      </div>

      {hasLink && (
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="relative mt-1 inline-block text-xs font-semibold text-accent underline-offset-4 hover:underline"
        >
          Visit live site ↗
        </a>
      )}

      <div className="relative mt-3 flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <TagChip key={tag} tag={tag} prefersReducedMotion={prefersReducedMotion} />
        ))}
      </div>

      <ul className="relative mt-4 flex flex-col gap-1.5">
        {project.highlights.map((highlight) => (
          <li key={highlight} className="flex gap-2 text-sm leading-snug text-muted">
            <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent" />
            {highlight}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

interface ChapterProps {
  entry: ExperienceEntry;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  prefersReducedMotion: boolean;
}

function Chapter({ entry, index, total, scrollYProgress, prefersReducedMotion }: ChapterProps) {
  const [isHovered, setIsHovered] = useState(false);
  const item = useItem(prefersReducedMotion);
  const entryProjects = entry.projectIds
    .map((id) => projects.find((project) => project.id === id))
    .filter((project): project is Project => Boolean(project));

  const start = index / total;
  const mid = (index + 0.5) / total;
  const end = (index + 1) / total;
  const range = [start, mid, end];

  const opacity = useTransform(scrollYProgress, range, prefersReducedMotion ? [1, 1, 1] : [0.45, 1, 0.6]);
  const numberColor = useTransform(
    scrollYProgress,
    range,
    prefersReducedMotion ? [ACCENT, ACCENT, ACCENT] : [NEUTRAL, ACCENT, NEUTRAL]
  );
  const numberScale = useTransform(scrollYProgress, range, prefersReducedMotion ? [1, 1, 1] : [0.85, 1.15, 0.85]);

  return (
    <motion.div style={{ opacity }} className="relative pl-10 sm:pl-14">
      <motion.span
        aria-hidden
        style={{ color: numberColor, scale: numberScale }}
        className="absolute left-0 top-1 font-display text-sm font-bold sm:text-base"
      >
        {String(index + 1).padStart(2, "0")}
      </motion.span>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={chapterVariants}
      >
        <motion.div
          variants={item}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1"
        >
          <h3 className="font-display text-2xl font-bold sm:text-3xl">
            <span className="sr-only">
              {entry.role} — {entry.company}
            </span>
            <span aria-hidden>
              {entry.role} —{" "}
              <span className="text-accent">
                <ScrambleText text={entry.company} active={isHovered && !prefersReducedMotion} />
              </span>
            </span>
          </h3>
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted">
            {entry.start} – {entry.end}
          </p>
        </motion.div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {entryProjects.map((project, projectIndex) => (
            <ExperienceProject
              key={project.id}
              project={project}
              clientNote={entry.clientNotes?.[project.id]}
              item={item}
              index={projectIndex}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ExperienceSection() {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const cursorActive = useMotionValue(0);

  const listRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start center", "end center"],
  });

  const lineScale = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [1, 1] : [0, 1]);

  return (
    <section
      id="experience"
      className="relative overflow-hidden px-6 py-24 sm:px-12"
      onMouseMove={(e) => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
      }}
      onMouseEnter={() => cursorActive.set(1)}
      onMouseLeave={() => cursorActive.set(0)}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(120deg, ${colors.accentSecondary}1a, transparent 45%, ${colors.accent}1a)`,
          backgroundSize: "200% 200%",
          backgroundPosition: "50% 50%",
        }}
        animate={
          prefersReducedMotion ? undefined : { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }
        }
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto max-w-4xl">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <h2 className="font-display text-3xl font-bold sm:text-5xl">Experience</h2>
            <p className="mt-3 max-w-md text-sm text-muted sm:text-base">
              Two companies, five production systems shipped since Jan 2025 — while finishing a
              Computer Systems Engineering degree.
            </p>
          </div>
          <ResumeButton
            cursorX={cursorX}
            cursorY={cursorY}
            cursorActive={cursorActive}
            prefersReducedMotion={prefersReducedMotion}
          />
        </div>

        <div ref={listRef} className="relative mt-16 flex flex-col gap-16 sm:mt-20 sm:gap-20">
          <span aria-hidden className="absolute left-[7px] top-2 bottom-2 w-px bg-white/10 sm:left-[9px]" />
          <motion.span
            aria-hidden
            style={{ scaleY: lineScale }}
            className="absolute left-[7px] top-2 bottom-2 w-px origin-top bg-accent sm:left-[9px]"
          />
          {experience.map((entry, index) => (
            <Chapter
              key={entry.id}
              entry={entry}
              index={index}
              total={experience.length}
              scrollYProgress={scrollYProgress}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
