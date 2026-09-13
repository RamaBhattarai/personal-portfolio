"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { colors } from "@/lib/theme";

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

const steps: ProcessStep[] = [
  {
    number: "01",
    title: "Understand",
    description:
      "Every project starts with questions, not code. I dig into the brief, the users, and the constraints before opening Figma — building the wrong thing fast is still building the wrong thing.",
  },
  {
    number: "02",
    title: "Prototype",
    description:
      "I sketch the interaction early, even rough and ugly. Testing how something feels to use matters more at this stage than how it looks.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "Clean components, typed props, no shortcuts I'll regret in a week. I write code like someone else has to maintain it — because they do.",
  },
  {
    number: "04",
    title: "Polish",
    description:
      "The last 10% is where it actually becomes good: motion timing, edge cases, loading states, performance. This is the part most people skip. I don't.",
  },
];

const NEUTRAL = colors.muted;
const ACCENT = colors.accent;

interface ProcessStepItemProps {
  step: ProcessStep;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  prefersReducedMotion: boolean;
}

function ProcessStepItem({
  step,
  index,
  total,
  scrollYProgress,
  prefersReducedMotion,
}: ProcessStepItemProps) {
  const start = index / total;
  const mid = (index + 0.5) / total;
  const end = (index + 1) / total;
  const range = [start, mid, end];

  const opacity = useTransform(
    scrollYProgress,
    range,
    prefersReducedMotion ? [1, 1, 1] : [0.4, 1, 0.7]
  );
  const scale = useTransform(
    scrollYProgress,
    range,
    prefersReducedMotion ? [1, 1, 1] : [0.95, 1, 1]
  );
  const color = useTransform(
    scrollYProgress,
    range,
    prefersReducedMotion ? [ACCENT, ACCENT, ACCENT] : [NEUTRAL, ACCENT, NEUTRAL]
  );

  return (
    <motion.div
      style={{ opacity, scale }}
      className="relative flex flex-col gap-2 py-10 pl-12 sm:flex-row sm:items-start sm:gap-8 sm:py-14 sm:pl-20"
    >
      <motion.span
        style={{ color }}
        className="font-display shrink-0 text-3xl font-bold tracking-tight sm:text-4xl"
      >
        {step.number} — {step.title}
      </motion.span>
      <p className="max-w-xl text-base text-muted sm:pt-1.5 sm:text-lg">
        {step.description}
      </p>
    </motion.div>
  );
}

export default function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  const lineScale = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [1, 1] : [0, 1]
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-background px-6 py-24 sm:px-12"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative mx-auto max-w-4xl">
        <h2 className="font-display text-3xl font-bold sm:text-5xl">How I Work</h2>
        <p className="mt-4 text-base text-muted sm:text-lg">
          Four steps, every project, no exceptions.
        </p>

        <div className="relative mt-16">
          <div
            aria-hidden
            className="absolute left-3 top-0 bottom-0 w-px bg-white/10 sm:left-6"
          />
          <motion.div
            aria-hidden
            style={{ scaleY: lineScale }}
            className="absolute left-3 top-0 bottom-0 w-px origin-top bg-accent sm:left-6"
          />

          {steps.map((step, index) => (
            <ProcessStepItem
              key={step.number}
              step={step}
              index={index}
              total={steps.length}
              scrollYProgress={scrollYProgress}
              prefersReducedMotion={prefersReducedMotion ?? false}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
