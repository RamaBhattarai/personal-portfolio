"use client";

import { useSyncExternalStore } from "react";
import { useReducedMotion } from "framer-motion";
import { projects } from "./data";
import { distributeIntoRows } from "./utils";
import ProjectCard from "./ProjectCard";
import MarqueeRow from "./MarqueeRow";

const ROW_COUNT = 2;
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
  const rows = distributeIntoRows(projects, ROW_COUNT);

  if (prefersReducedMotion) {
    return (
      <section id={SECTION_ID} className="py-24">
        <h2 className="font-display px-6 text-3xl font-bold sm:px-12 sm:text-5xl">Selected Work</h2>
        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 px-6 sm:grid-cols-2 sm:px-12">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isTouch={isTouch}
              prefersReducedMotion={true}
            />
          ))}
        </div>
      </section>
    );
  }

  const rowStartIndices = rows.reduce<number[]>((acc, row, i) => {
    acc.push(i === 0 ? 0 : acc[i - 1] + rows[i - 1].length);
    return acc;
  }, []);

  return (
    <section id={SECTION_ID} className="relative overflow-x-hidden py-24">
      <h2 className="font-display px-6 text-3xl font-bold sm:px-12 sm:text-5xl">Selected Work</h2>
      <div className="mt-16 flex flex-col gap-16">
        {rows.map((rowProjects, rowIndex) => (
          <MarqueeRow
            key={rowIndex}
            projects={rowProjects}
            startIndex={rowStartIndices[rowIndex]}
            direction={rowIndex % 2 === 0 ? "left" : "right"}
            isTouch={isTouch}
            prefersReducedMotion={prefersReducedMotion}
          />
        ))}
      </div>
    </section>
  );
}
