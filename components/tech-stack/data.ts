import type { IconType } from "react-icons";
import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiFramer,
  SiGreensock,
  SiMysql,
  SiPostgresql,
  SiHtml5,
  SiCss,
  SiStorybook,
  SiGithubactions,
  SiDocker,
  SiGit,
} from "react-icons/si";

export type NodeSize = "large" | "medium" | "small";

export interface TechNode {
  name: string;
  icon: IconType;
  /** Official brand color, used at full saturation when active. */
  color: string;
  size: NodeSize;
  note: string;
  pairsWith: string[];
  /** Resting position as a percentage of the cluster's bounding area (0-100). */
  x: number;
  y: number;
}

export const techNodes: TechNode[] = [
  // Large — primary/daily tools
  {
    name: "React",
    icon: SiReact,
    color: "#61DAFB",
    size: "large",
    note: "My primary library for building interfaces.",
    pairsWith: ["Next.js", "Framer Motion", "GSAP", "Node.js", "Git"],
    x: 50,
    y: 42,
  },
  {
    name: "Next.js",
    icon: SiNextdotjs,
    color: "#FFFFFF",
    size: "large",
    note: "My default framework for shipping production apps.",
    pairsWith: ["React", "Node.js", "Express", "Git"],
    x: 33,
    y: 56,
  },
  {
    name: "Node.js",
    icon: SiNodedotjs,
    color: "#5FA04E",
    size: "large",
    note: "Runtime for every backend and API I build.",
    pairsWith: ["Next.js", "Express", "MySQL", "PostgreSQL", "Docker", "Git"],
    x: 67,
    y: 56,
  },
  {
    name: "Express",
    icon: SiExpress,
    color: "#FFFFFF",
    size: "large",
    note: "My go-to framework for REST APIs and services.",
    pairsWith: ["Node.js", "MySQL", "PostgreSQL", "Git"],
    x: 50,
    y: 70,
  },

  // Medium — frequently used
  {
    name: "Framer Motion",
    icon: SiFramer,
    color: "#0055FF",
    size: "medium",
    note: "Go-to for micro-interactions and page transitions.",
    pairsWith: ["React", "GSAP", "Storybook", "Git"],
    x: 21,
    y: 30,
  },
  {
    name: "GSAP",
    icon: SiGreensock,
    color: "#88CE02",
    size: "medium",
    note: "For scroll-scrubbed and timeline-based animation.",
    pairsWith: ["React", "Framer Motion", "Git"],
    x: 79,
    y: 30,
  },
  {
    name: "MySQL",
    icon: SiMysql,
    color: "#4479A1",
    size: "medium",
    note: "Relational storage for most of my client projects.",
    pairsWith: ["Node.js", "Express", "Docker", "Git"],
    x: 29,
    y: 80,
  },
  {
    name: "PostgreSQL",
    icon: SiPostgresql,
    color: "#4169E1",
    size: "medium",
    note: "My pick when a project needs stronger data guarantees.",
    pairsWith: ["Node.js", "Express", "Docker", "Git"],
    x: 71,
    y: 80,
  },

  // Small — tools/supporting
  {
    name: "HTML",
    icon: SiHtml5,
    color: "#E34F26",
    size: "small",
    note: "The markup foundation everything renders to.",
    pairsWith: ["CSS", "Git"],
    x: 10,
    y: 56,
  },
  {
    name: "CSS",
    icon: SiCss,
    color: "#1572B6",
    size: "small",
    note: "The styling layer under every interface I ship.",
    pairsWith: ["HTML", "Git"],
    x: 90,
    y: 56,
  },
  {
    name: "Storybook",
    icon: SiStorybook,
    color: "#FF4785",
    size: "small",
    note: "Where I build and document components in isolation.",
    pairsWith: ["React", "Framer Motion", "Git"],
    x: 16,
    y: 12,
  },
  {
    name: "CI/CD",
    icon: SiGithubactions,
    color: "#2088FF",
    size: "small",
    note: "Automated testing and deploys on every push.",
    pairsWith: ["Docker", "Git"],
    x: 84,
    y: 12,
  },
  {
    name: "Docker",
    icon: SiDocker,
    color: "#2496ED",
    size: "small",
    note: "Containerizing services for consistent environments.",
    pairsWith: ["Node.js", "MySQL", "PostgreSQL", "CI/CD", "Git"],
    x: 50,
    y: 16,
  },
  {
    name: "Git",
    icon: SiGit,
    color: "#F05032",
    size: "small",
    note: "Version control for every project, no exceptions.",
    pairsWith: [
      "React",
      "Next.js",
      "Node.js",
      "Express",
      "Framer Motion",
      "GSAP",
      "MySQL",
      "PostgreSQL",
      "HTML",
      "CSS",
      "Storybook",
      "CI/CD",
      "Docker",
    ],
    x: 50,
    y: 94,
  },
];
