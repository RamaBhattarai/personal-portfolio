"use client";

import { Fragment } from "react";
import { motion, useReducedMotion } from "framer-motion";

const STAGGER_STEP = 0.05;
const WORD_DURATION = 0.5;
const UNDERLINE_DELAY_AFTER = 0.18;
const EASE = [0.16, 1, 0.3, 1] as const;

interface Chunk {
  text: string;
  emphasized: boolean;
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function chunkText(text: string, emphasize: string[]): Chunk[] {
  if (emphasize.length === 0) {
    return text.split(" ").map((word) => ({ text: word, emphasized: false }));
  }

  const pattern = emphasize
    .slice()
    .sort((a, b) => b.length - a.length)
    .map(escapeRegExp)
    .join("|");
  const regex = new RegExp(`(${pattern})`, "g");

  const chunks: Chunk[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    const before = text.slice(lastIndex, match.index).trim();
    if (before) {
      chunks.push(...before.split(" ").map((word) => ({ text: word, emphasized: false })));
    }
    chunks.push({ text: match[0], emphasized: true });
    lastIndex = match.index + match[0].length;
  }

  const rest = text.slice(lastIndex).trim();
  if (rest) {
    chunks.push(...rest.split(" ").map((word) => ({ text: word, emphasized: false })));
  }

  return chunks;
}

interface AnimatedParagraphProps {
  text: string;
  emphasize?: string[];
  className?: string;
}

/**
 * Reveals a paragraph word-by-word (blur + rise) on scroll into view.
 * Emphasized terms get a distinct color and a self-drawing underline that
 * starts just after that word settles into place.
 */
export default function AnimatedParagraph({
  text,
  emphasize = [],
  className,
}: AnimatedParagraphProps) {
  const prefersReducedMotion = useReducedMotion();
  const chunks = chunkText(text, emphasize);

  if (prefersReducedMotion) {
    return (
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className={className}
      >
        {chunks.map((chunk, i) => (
          <Fragment key={i}>
            {chunk.emphasized ? (
              <span className="font-medium text-accent-secondary underline decoration-accent-secondary/60 underline-offset-4">
                {chunk.text}
              </span>
            ) : (
              chunk.text
            )}
            {i < chunks.length - 1 ? " " : ""}
          </Fragment>
        ))}
      </motion.p>
    );
  }

  return (
    <p className={className}>
      {chunks.map((chunk, i) => {
        const delay = i * STAGGER_STEP;

        return (
          <Fragment key={i}>
            <motion.span
              initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: WORD_DURATION, delay, ease: EASE }}
              className={`relative inline-block ${
                chunk.emphasized ? "font-medium text-accent-secondary" : ""
              }`}
            >
              {chunk.text}
              {chunk.emphasized && (
                <motion.span
                  aria-hidden
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.35,
                    delay: delay + WORD_DURATION + UNDERLINE_DELAY_AFTER,
                    ease: "easeOut",
                  }}
                  className="absolute -bottom-0.5 left-0 h-[1.5px] w-full origin-left bg-accent-secondary/70"
                />
              )}
            </motion.span>
            {i < chunks.length - 1 ? " " : ""}
          </Fragment>
        );
      })}
    </p>
  );
}
