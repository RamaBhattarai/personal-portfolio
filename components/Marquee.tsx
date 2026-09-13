"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { techNodes } from "@/components/tech-stack/data";

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

  // Sourced from the tech-stack section's node list so this ticker can
  // never drift out of sync with the actual stack shown further down the
  // page — one list to keep accurate instead of two.
  const track = [...techNodes, ...techNodes];

  return (
    <div
      ref={root}
      className="border-y border-white/10 bg-surface py-6 overflow-hidden"
    >
      <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap">
        {track.map((node, i) => {
          const Icon = node.icon;
          return (
            <span key={`${node.name}-${i}`} className="flex items-center gap-10">
              <span className="font-display flex items-center gap-3 text-2xl font-semibold text-muted sm:text-4xl">
                <Icon className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" />
                {node.name}
              </span>
              <span aria-hidden className="h-7 w-px bg-white sm:h-9" />
            </span>
          );
        })}
      </div>
    </div>
  );
}
