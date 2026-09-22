"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import CursorSparkles from "@/components/CursorSparkles";

const BLIND_COUNT = 7;

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const bigWordRef = useRef<HTMLParagraphElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" }, delay: 0.2 });

      tl.fromTo(
        ".blind",
        { scaleY: 1 },
        { scaleY: 0, duration: 1.4, ease: "power4.inOut", stagger: 0.09 }
      )
        .fromTo(
          ".hero-line",
          { yPercent: 110, opacity: 0, filter: "blur(14px)" },
          {
            yPercent: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.1,
            stagger: 0.08,
          },
          0.7
        )
        .fromTo(
          ".hero-sub",
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.5"
        )
        .fromTo(
          ".hero-cta",
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.4"
        );

      // Cursor-reactive spotlight — quickTo avoids re-render-per-frame cost
      if (spotlightRef.current && root.current) {
        const moveSpot = gsap.quickTo(spotlightRef.current, "x", {
          duration: 0.7,
          ease: "power3.out",
        });
        const moveSpotY = gsap.quickTo(spotlightRef.current, "y", {
          duration: 0.7,
          ease: "power3.out",
        });

        const onMove = (e: MouseEvent) => {
          const bounds = root.current!.getBoundingClientRect();
          moveSpot(e.clientX - bounds.left);
          moveSpotY(e.clientY - bounds.top);
        };

        root.current.addEventListener("mousemove", onMove);
        return () => root.current?.removeEventListener("mousemove", onMove);
      }
    },
    { scope: root }
  );

  // Background drifts opposite the cursor at a fraction of the speed — slower
  // than the foreground content, giving the scene a sense of depth.
  useGSAP(
    () => {
      if (!bgRef.current || !root.current) return;

      const moveBgX = gsap.quickTo(bgRef.current, "x", {
        duration: 1.6,
        ease: "power3.out",
      });
      const moveBgY = gsap.quickTo(bgRef.current, "y", {
        duration: 1.6,
        ease: "power3.out",
      });

      const onMove = (e: MouseEvent) => {
        const bounds = root.current!.getBoundingClientRect();
        const relX = e.clientX - (bounds.left + bounds.width / 2);
        const relY = e.clientY - (bounds.top + bounds.height / 2);
        moveBgX(relX * -0.015);
        moveBgY(relY * -0.015);
      };

      root.current.addEventListener("mousemove", onMove);
      return () => root.current?.removeEventListener("mousemove", onMove);
    },
    { scope: root }
  );

  // Magnetic CTA button
  useGSAP(
    () => {
      const btn = ctaRef.current;
      if (!btn) return;

      const moveX = gsap.quickTo(btn, "x", { duration: 0.4, ease: "power3.out" });
      const moveY = gsap.quickTo(btn, "y", { duration: 0.4, ease: "power3.out" });

      const onMove = (e: MouseEvent) => {
        const bounds = btn.getBoundingClientRect();
        const relX = e.clientX - (bounds.left + bounds.width / 2);
        const relY = e.clientY - (bounds.top + bounds.height / 2);
        moveX(relX * 0.35);
        moveY(relY * 0.35);
      };
      const onLeave = () => {
        moveX(0);
        moveY(0);
      };

      btn.addEventListener("mousemove", onMove);
      btn.addEventListener("mouseleave", onLeave);
      return () => {
        btn.removeEventListener("mousemove", onMove);
        btn.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: root }
  );

  // Scroll-out parallax fade as the hero leaves view
  useGSAP(
    () => {
      if (!contentRef.current || !root.current) return;

      gsap.to(contentRef.current, {
        y: -80,
        scale: 0.94,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Background drifts up slower than the foreground content on scroll
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          y: -30,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // The giant background word zooms into the background and fades as you scroll
      if (bigWordRef.current) {
        gsap.to(bigWordRef.current, {
          scale: 0.7,
          opacity: 0,
          y: -60,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 sm:px-12"
    >
      <div aria-hidden className="absolute inset-0 z-0 overflow-hidden">
        <div ref={bgRef} className="absolute -inset-8">
          <Image
            src="/images/hero.jpeg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-60"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/75 to-background/55" />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-[14%] z-1 overflow-hidden select-none sm:bottom-0"
      >
        <p
          ref={bigWordRef}
          className="font-display whitespace-nowrap bg-gradient-to-b from-white via-white/50 to-transparent bg-clip-text pl-[6vw] text-left text-[19vw] font-extrabold leading-none text-transparent sm:translate-y-[18%]"
        >
          DEVELOPER
        </p>
      </div>
      <div
        ref={spotlightRef}
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 z-2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(216,255,79,0.16),transparent_70%)] blur-2xl"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 z-3 flex">
        {Array.from({ length: BLIND_COUNT }).map((_, i) => (
          <div key={i} className="flex-1 border-r border-white/10 last:border-r-0" />
        ))}
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-0 z-20 flex">
        {Array.from({ length: BLIND_COUNT }).map((_, i) => (
          <div
            key={i}
            className={`blind flex-1 bg-background ${
              i % 2 === 0 ? "origin-top" : "origin-bottom"
            }`}
          />
        ))}
      </div>
      <CursorSparkles containerRef={root} />
      <div ref={contentRef} className="relative z-10 -mt-10 sm:-mt-30">
        <p className="hero-sub mb-4 font-mono text-sm uppercase tracking-[0.2em] text-muted">
          Full Stack Developer — Motion & Interaction
        </p>
        <h1 className="font-display max-w-4xl text-[clamp(2.25rem,6vw,80px)] font-extrabold leading-[0.95] tracking-tight">
          <span className="block overflow-hidden">
            <span className="hero-line block">Rama Bhattarai</span>
          </span>
          <span className="block overflow-hidden">
            <span className="hero-line block text-accent">builds polished</span>
          </span>
          <span className="block overflow-hidden">
            <span className="hero-line block">web experiences.</span>
          </span>
        </h1>
        <div className="hero-cta mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-40">
          <a
            ref={ctaRef}
            href="#work"
            className="inline-flex shrink-0 items-center gap-3 rounded-full bg-accent bg-[linear-gradient(135deg,var(--accent),var(--accent))] bg-[length:160%_160%] bg-[position:0%_50%] pl-6 pr-2 py-2 text-sm font-semibold text-background transition-[background-position,background-image] duration-500 ease-out hover:bg-[linear-gradient(135deg,var(--accent-secondary),#f8cfe0)] hover:bg-[position:100%_50%]"
          >
            See my work
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-background text-accent">
              ↗
            </span>
          </a>
          <p className="max-w-sm text-base text-muted">
            Full stack developer building end-to-end web apps — React &amp;
            TypeScript interfaces with expressive, performant motion (GSAP,
            Framer Motion), backed by the APIs and infrastructure behind
            them.{" "}
            <a href="#contact" className="font-semibold text-foreground underline-offset-4 hover:underline">
              Get in touch
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
