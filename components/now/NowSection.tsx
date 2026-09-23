"use client";

import { motion, useReducedMotion } from "framer-motion";
import { colors } from "@/lib/theme";
import { nowContent, GITHUB_USERNAME } from "./data";
import AnimatedParagraph from "./AnimatedParagraph";
import { useLatestCommit } from "./useLatestCommit";

export default function NowSection() {
  const prefersReducedMotion = useReducedMotion();
  const caption = useLatestCommit(GITHUB_USERNAME, nowContent.lastUpdatedFallback);

  return (
    <section id="now" className="relative overflow-hidden px-6 py-14 sm:px-12 sm:py-16">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(120deg, ${colors.accentSecondary}1a, transparent 45%, ${colors.accent}1a)`,
          backgroundSize: "200% 200%",
          backgroundPosition: "50% 50%",
        }}
        animate={
          prefersReducedMotion
            ? undefined
            : { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }
        }
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative max-w-xl">
        <div className="flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            {!prefersReducedMotion && (
              <motion.span
                aria-hidden
                className="absolute inline-flex h-full w-full rounded-full bg-accent"
                animate={{ scale: [1, 1.4], opacity: [0.8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
              />
            )}
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
          </span>
          <h2 className="font-display text-2xl font-bold sm:text-3xl">{nowContent.heading}</h2>
        </div>

        <AnimatedParagraph
          text={nowContent.body}
          emphasize={nowContent.emphasizedTerms}
          className="mt-4 text-base leading-relaxed text-muted sm:text-lg"
        />

        <p className="mt-6 text-xs text-muted/70">{caption}</p>
      </div>
    </section>
  );
}
