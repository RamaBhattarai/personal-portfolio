"use client";

import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import { socialLinks } from "@/components/contact/data";
import { resumeUrl } from "@/components/experience/data";
import { projects } from "@/components/work/data";
import ScrambleText from "@/components/contact/ScrambleText";

const exploreLinks = [
  { label: "Selected Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Tech Stack", href: "#tech-stack" },
  { label: "Now", href: "#now" },
  { label: "Contact", href: "#contact" },
];

function linkClass() {
  return "text-sm text-foreground/80 transition-colors hover:text-accent";
}

export default function Footer() {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const [isHovered, setIsHovered] = useState(false);
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/10 px-6 pt-16 sm:px-12 sm:pt-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(circle at 50% 100%, rgba(216,255,79,0.08), transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="flex flex-col gap-12 sm:flex-row sm:justify-between">
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-accent font-display text-sm font-bold text-background">
                R
              </span>
              <span className="font-display text-lg font-bold">Rama Bhattarai</span>
            </div>
            <p className="mt-3 text-sm text-muted">Full Stack Developer — Motion &amp; Interaction.</p>
          </div>

          <div className="grid grid-cols-2 gap-x-10 gap-y-10 sm:grid-cols-3 sm:gap-x-16">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted">Projects</p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {projects.map((project) => {
                  const hasLink = Boolean(project.href) && project.href !== "#";
                  return (
                    <li key={project.id}>
                      <a
                        href={hasLink ? project.href : "#work"}
                        target={hasLink ? "_blank" : undefined}
                        rel={hasLink ? "noopener noreferrer" : undefined}
                        className={linkClass()}
                      >
                        {project.shortTitle}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div>
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted">Explore</p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {exploreLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className={linkClass()}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted">Connect</p>
              <ul className="mt-4 flex flex-col gap-2.5">
                <li>
                  <a href={resumeUrl} download className={linkClass()}>
                    Résumé
                  </a>
                </li>
                {socialLinks.map((social) => (
                  <li key={social.name}>
                    <a href={social.url} target="_blank" rel="noopener noreferrer" className={linkClass()}>
                      {social.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div
          aria-hidden
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative mt-20 block w-full cursor-default select-none whitespace-nowrap text-center font-display text-[clamp(4rem,26vw,220px)] font-extrabold leading-none tracking-tight text-transparent transition-[filter] duration-500 [-webkit-text-stroke:1.5px_var(--accent)] sm:mt-28"
          style={{
            filter:
              isHovered && !prefersReducedMotion
                ? "drop-shadow(0 0 40px rgba(216,255,79,0.65))"
                : "drop-shadow(0 0 32px rgba(216,255,79,0.35))",
          }}
        >
          <ScrambleText text="RAMA" active={isHovered && !prefersReducedMotion} />
        </div>

        <div className="relative mt-10 flex flex-col items-center gap-6 pb-12 sm:pb-16">
          <p className="text-xs text-muted">© {year} Rama Bhattarai. All rights reserved.</p>
          <div className="flex gap-6">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="text-muted transition-colors hover:text-accent"
                >
                  <Icon size={20} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
