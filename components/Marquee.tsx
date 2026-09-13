"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

const items = [
  { name: "React", icon: "circle" },
  { name: "TypeScript", icon: "square" },
  { name: "GSAP", icon: "bolt" },
  { name: "Framer Motion", icon: "blend" },
  { name: "Next.js", icon: "triangle" },
  { name: "Three.js", icon: "cube" },
  { name: "CSS Animation", icon: "play" },
  { name: "REST APIs", icon: "swap" },
] as const;

function SkillIcon({ icon }: { icon: (typeof items)[number]["icon"] }) {
  const common = {
    viewBox: "0 0 24 24",
    className: "h-5 w-5 shrink-0 sm:h-6 sm:w-6",
  };

  switch (icon) {
    case "circle":
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="12" cy="12" r="7" />
          <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
        </svg>
      );
    case "square":
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="5" y="5" width="14" height="14" rx="2" />
        </svg>
      );
    case "bolt":
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
        </svg>
      );
    case "blend":
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="9" cy="12" r="6" />
          <circle cx="15" cy="12" r="6" />
        </svg>
      );
    case "triangle":
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <path d="M12 4 21 20H3Z" />
        </svg>
      );
    case "cube":
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M12 3 4 7v10l8 4 8-4V7Z" />
          <path d="M4 7l8 4 8-4M12 11v10" />
        </svg>
      );
    case "play":
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="12" cy="12" r="8" />
          <path d="M10 9l5 3-5 3Z" fill="currentColor" stroke="none" />
        </svg>
      );
    case "swap":
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <path d="M4 9h13l-3-3M20 15H7l3 3" />
        </svg>
      );
  }
}

export default function Marquee() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = root.current?.querySelector(".marquee-track");
      if (!track) return;

      const width = track.scrollWidth / 2;
      gsap.to(track, {
        x: -width,
        duration: 24,
        ease: "none",
        repeat: -1,
      });
    },
    { scope: root }
  );

  const track = [...items, ...items];

  return (
    <div
      ref={root}
      className="border-y border-white/10 bg-surface py-6 overflow-hidden"
    >
      <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap">
        {track.map((item, i) => (
          <span key={`${item.name}-${i}`} className="flex items-center gap-10">
            <span className="font-display flex items-center gap-3 text-2xl font-semibold text-muted sm:text-4xl">
              <SkillIcon icon={item.icon} />
              {item.name}
            </span>
            <span aria-hidden className="h-7 w-px bg-white sm:h-9" />
          </span>
        ))}
      </div>
    </div>
  );
}
