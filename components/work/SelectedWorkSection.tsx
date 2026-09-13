"use client";

import { useSyncExternalStore } from "react";
import { useReducedMotion } from "framer-motion";
import { projects } from "./data";
import ProjectCard from "./ProjectCard";

const SECTION_ID = "work";

function subscribeToPointerType(callback: () => void) {
  const mql = window.matchMedia("(pointer: coarse)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getIsTouch() {
  return window.matchMedia("(pointer: coarse)").matches;
}

function getIsTouchServer() {
  return false;
}

export default function SelectedWorkSection() {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const isTouch = useSyncExternalStore(subscribeToPointerType, getIsTouch, getIsTouchServer);

  return (
    <section id={SECTION_ID} className="py-24">
      <h2 className="font-display px-6 text-3xl font-bold sm:px-12 sm:text-5xl">Selected Work</h2>
      <p className="mt-3 px-6 text-sm text-muted sm:px-12">
        All shipped, production work for real clients — case studies are limited by NDAs, but I&apos;m happy to walk through the details live.
      </p>
      <div className="mt-12 grid grid-cols-1 gap-6 px-6 sm:grid-cols-2 sm:px-12 lg:grid-cols-3">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            isTouch={isTouch}
            prefersReducedMotion={prefersReducedMotion}
          />
        ))}
      </div>
    </section>
  );
}
