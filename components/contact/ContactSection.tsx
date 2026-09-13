"use client";

import { useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
  type Variants,
} from "framer-motion";
import { colors } from "@/lib/theme";
import { contactContent, socialLinks, type SocialLink } from "./data";
import { useMagneticHover } from "./useMagneticHover";
import ScrambleText from "./ScrambleText";

const EASE = [0.16, 1, 0.3, 1] as const;

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

function useItemVariants(prefersReducedMotion: boolean): Variants {
  return {
    hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  };
}

interface SocialLinkItemProps {
  social: SocialLink;
  cursorX: MotionValue<number>;
  cursorY: MotionValue<number>;
  cursorActive: MotionValue<number>;
  prefersReducedMotion: boolean;
}

function SocialLinkItem({
  social,
  cursorX,
  cursorY,
  cursorActive,
  prefersReducedMotion,
}: SocialLinkItemProps) {
  const { ref, x, y, proximity } = useMagneticHover({
    cursorX,
    cursorY,
    cursorActive,
    prefersReducedMotion,
  });
  const scale = useTransform(proximity, [0, 1], [1, 1.1]);
  const color = useTransform(proximity, [0, 1], [colors.muted, colors.accent]);
  const Icon = social.icon;

  return (
    <motion.a
      ref={ref}
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ x, y, scale }}
      whileHover={{ scale: 1.1 }}
      className="flex items-center gap-2 text-muted transition-colors hover:text-accent"
    >
      <motion.span style={{ color }} className="flex">
        <Icon size={20} />
      </motion.span>
      <span className="text-sm">{social.name}</span>
    </motion.a>
  );
}

export default function ContactSection() {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const [emailHovered, setEmailHovered] = useState(false);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const cursorActive = useMotionValue(0);

  const item = useItemVariants(prefersReducedMotion);

  return (
    <section
      id="contact"
      className="relative overflow-hidden px-6 py-24 sm:px-12 sm:py-32"
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
          prefersReducedMotion
            ? undefined
            : { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }
        }
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, ${colors.accentGlow}, transparent 70%)` }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="relative mx-auto flex max-w-2xl flex-col items-center text-center"
      >
        <motion.h2
          variants={item}
          className="font-display max-w-xl text-2xl font-bold sm:text-5xl"
        >
          {contactContent.heading}
        </motion.h2>

        <motion.p variants={item} className="mt-4 max-w-md text-base text-muted sm:text-lg">
          {contactContent.subheading}
        </motion.p>

        <motion.a
          variants={item}
          href={`mailto:${contactContent.email}`}
          aria-label={`Email ${contactContent.email}`}
          onMouseEnter={() => setEmailHovered(true)}
          onMouseLeave={() => setEmailHovered(false)}
          className="group relative mt-10 inline-block font-display text-1xl font-bold text-foreground transition-colors duration-300 hover:text-accent sm:text-3xl"
        >
          <ScrambleText
            text={contactContent.email}
            active={emailHovered && !prefersReducedMotion}
          />
          <motion.span
            aria-hidden
            initial={false}
            animate={
              prefersReducedMotion
                ? { opacity: emailHovered ? 1 : 0 }
                : { scaleX: emailHovered ? 1 : 0 }
            }
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{ transformOrigin: "left" }}
            className="absolute -bottom-1 left-0 h-[2px] w-full bg-accent"
          />
        </motion.a>

        <motion.div variants={item} className="mt-12 flex gap-8">
          {socialLinks.map((social) => (
            <SocialLinkItem
              key={social.name}
              social={social}
              cursorX={cursorX}
              cursorY={cursorY}
              cursorActive={cursorActive}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </motion.div>
      </motion.div>

      <p className="relative mt-20 text-center text-xs text-muted">
        Built with React, TypeScript, and probably too much{" "}
        <span className="text-accent-secondary">Framer Motion</span>. © {new Date().getFullYear()}.
      </p>
    </section>
  );
}
