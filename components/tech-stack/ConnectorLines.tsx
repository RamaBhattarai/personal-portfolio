"use client";

import { motion } from "framer-motion";
import { colors } from "@/lib/theme";
import type { TechNode } from "./data";

interface Edge {
  key: string;
  from: TechNode;
  to: TechNode;
}

function getUniqueEdges(nodes: TechNode[]): Edge[] {
  const seen = new Set<string>();
  const edges: Edge[] = [];

  for (const node of nodes) {
    for (const pairName of node.pairsWith) {
      const target = nodes.find((n) => n.name === pairName);
      if (!target) continue;

      const key = [node.name, target.name].sort().join("::");
      if (seen.has(key)) continue;
      seen.add(key);
      edges.push({ key, from: node, to: target });
    }
  }

  return edges;
}

interface ConnectorLinesProps {
  nodes: TechNode[];
  activeName: string | null;
  prefersReducedMotion: boolean;
}

export default function ConnectorLines({
  nodes,
  activeName,
  prefersReducedMotion,
}: ConnectorLinesProps) {
  const edges = getUniqueEdges(nodes);

  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 z-10 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      {edges.map((edge) => {
        const isActiveEdge =
          activeName !== null && (edge.from.name === activeName || edge.to.name === activeName);

        return (
          <motion.line
            key={edge.key}
            x1={edge.from.x}
            y1={edge.from.y}
            x2={edge.to.x}
            y2={edge.to.y}
            stroke={colors.accent}
            vectorEffect="non-scaling-stroke"
            initial={false}
            animate={{
              opacity: isActiveEdge ? (prefersReducedMotion ? 0.75 : [0.6, 0.8, 0.6]) : 0.12,
              strokeWidth: isActiveEdge ? 1 : 0.5,
            }}
            transition={
              isActiveEdge && !prefersReducedMotion
                ? { opacity: { duration: 1.4, repeat: Infinity, ease: "easeInOut" }, strokeWidth: { duration: 0.3 } }
                : { duration: 0.3 }
            }
          />
        );
      })}
    </svg>
  );
}
