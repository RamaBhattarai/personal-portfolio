export interface Project {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  tags: string[];
  highlights: [string, string, string];
  image: string;
  href: string;
}

export const projects: Project[] = [
  {
    id: "lms-platform",
    title: "Gitgi Foundation — LMS Platform",
    shortTitle: "LMS Platform",
    description:
      "A multi-service learning platform (in progress) with independently deployable learning and real-time communication services, shared JWT auth with refresh-token rotation, and an AI-powered multilingual learning assistant.",
    tags: ["Next.js", "React", "TypeScript", "NestJS", "PostgreSQL", "Prisma", "Redis", "Socket.IO", "MinIO"],
    highlights: [
      "Multi-Service Architecture With Independent Databases",
      "Real-Time Chat, Presence & Threaded Q&A via Socket.IO",
      "AI-Powered, Multilingual Learning Assistant",
    ],
    image: "/images/lms.jpeg",
    href: "#",
  },
  {
    id: "hr-ats-platform",
    title: "HR & Applicant Tracking Platform",
    shortTitle: "HR & ATS",
    description:
      "An integrated HR and applicant tracking platform covering job postings, candidate applications, interview scheduling, hiring workflows, employee management, leave, payroll, and performance.",
    tags: ["React", "TypeScript", "TanStack Query", "Tailwind CSS", "Storybook", "Node.js", "Express", "PostgreSQL", "Prisma"],
    highlights: [
      "Multi-Role Recruitment & HR Dashboards",
      "Timezone-Aware Interview Scheduling With Calendar Sync",
      "JWT, OAuth 2.0, RBAC & Real-Time Notifications",
    ],
    image: "/images/ats.jpeg",
    href: "#",
  },
  {
    id: "bs-realty-platform",
    title: "BS Realty — Real Estate Platform",
    shortTitle: "BS Realty",
    description:
      "A full-stack real estate platform built from the ground up — public website, admin dashboard, and role-based agent portals — using modern Next.js rendering strategies for performance and SEO.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "TanStack Query", "Zustand", "Node.js", "Express", "Prisma", "MySQL"],
    highlights: [
      "Admin Dashboard + Public Website Built From Scratch",
      "Server Components, SSR/SSG/ISR for Faster Load Times",
      "Concurrency-Safe Appointment Scheduling",
    ],
    image: "/images/realestate.jpeg",
    href: "https://bsrealtyllc.com/",
  },
  {
    id: "bs-realty-insurance",
    title: "BS Realty — Insurance Portal",
    shortTitle: "Insurance Portal",
    description:
      "A production-grade insurance portal with role-based dashboards for agents and admins, real-time notifications, and interactive mapping, sharing centralized SSO/IAM with the real estate platform.",
    tags: ["React", "TypeScript", "Zustand", "TanStack Query", "Tailwind CSS", "Node.js", "Prisma", "Socket.IO"],
    highlights: [
      "Multi-Step Quote Wizard",
      "Role-Based Dashboards + Centralized SSO/IAM",
      "Real-Time Notifications + Live Mapping (Leaflet)",
    ],
    image: "/images/insurance.jpeg",
    href: "https://insurance.bsrealtyllc.com/",
  },
  {
    id: "retail-pos",
    title: "Retail POS & Inventory Management",
    shortTitle: "Retail POS",
    description:
      "A full-stack retail point-of-sale system handling sales, billing, inventory, suppliers, and reporting, with barcode-based checkout and concurrency-safe stock updates.",
    tags: ["React", "Node.js", "Express", "PostgreSQL", "Prisma", "JWT"],
    highlights: [
      "Barcode Lookup + Hold/Resume Checkout Flow",
      "Real-Time Inventory & Concurrent Stock Updates",
      "JWT Auth + Role-Based Admin Controls",
    ],
    image: "/images/pos.jpeg",
    href: "#",
  },
];
