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
    id: "bs-realty-platform",
    title: "BS Realty — Real Estate Platform",
    shortTitle: "BS Realty",
    description:
      "A full-scale admin dashboard and public website, built with modern Next.js rendering strategies (SSR, SSG, ISR) and full on-page SEO optimization.",
    tags: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Framer Motion", "React Query"],
    highlights: [
      "Full Admin Dashboard + Website Built From Scratch",
      "Server Components for Faster Load Times",
      "Real-Time Updates via Socket.io",
    ],
    image: "https://picsum.photos/seed/bs-realty-platform/1200/900",
    href: "#",
  },
  {
    id: "bs-realty-insurance",
    title: "BS Realty — Insurance Portal",
    shortTitle: "Insurance Portal",
    description:
      "A production-grade insurance portal with role-based dashboards for agents and admins, real-time notifications via Socket.IO, and interactive mapping with Leaflet.",
    tags: ["React 19", "TypeScript", "Zustand", "React Query", "Tailwind CSS", "Docker"],
    highlights: [
      "Multi-Step Quote Wizard",
      "Role-Based Access Control",
      "Real-Time Notifications + Live Mapping",
    ],
    image: "https://picsum.photos/seed/bs-realty-insurance/1200/900",
    href: "#",
  },
  {
    id: "job-portal-ats",
    title: "Job Portal — Applicant Tracking System",
    shortTitle: "Job Portal ATS",
    description:
      "A full-scale ATS supporting multi-role hiring workflows, with a custom CI/CD pipeline (SonarQube scan → Docker build → push → SSH deploy) and containerized, zero-downtime deployments.",
    tags: ["React 19", "TypeScript", "TanStack Query v5", "Vitest", "Docker", "Drone CI/CD", "Nginx"],
    highlights: [
      "Multi-Role Hiring Workflows",
      "Timezone-Aware Interview Scheduling",
      "4-Stage Zero-Downtime CI/CD Pipeline",
    ],
    image: "https://picsum.photos/seed/job-portal-ats/1200/900",
    href: "#",
  },
  {
    id: "retail-pos",
    title: "Retail POS System",
    shortTitle: "Retail POS",
    description:
      "A retail point-of-sale system handling sales, billing, inventory, and reporting, with secure password-protected admin controls for sensitive operations.",
    tags: ["PHP", "jQuery", "Bootstrap", "AdminLTE", "MySQL"],
    highlights: [
      "Barcode-Based Checkout Flow",
      "Real-Time Inventory Tracking",
      "Secure Admin Workflows",
    ],
    image: "https://picsum.photos/seed/retail-pos/1200/900",
    href: "#",
  },
  {
    id: "lumen-photography",
    title: "Lumen Photography — Portfolio & Gallery",
    shortTitle: "Lumen Photography",
    description:
      "A scroll-driven photography portfolio with parallax gallery reveals, a full-screen lightbox, and GSAP ScrollTrigger-powered image transitions.",
    tags: ["Next.js", "GSAP", "ScrollTrigger", "Framer Motion", "Tailwind CSS"],
    highlights: [
      "Parallax Gallery With Scroll-Linked Reveals",
      "Full-Screen Lightbox With Keyboard Navigation",
      "Optimized Image Loading for Large Galleries",
    ],
    image: "https://picsum.photos/seed/lumen-photography/1200/900",
    href: "#",
  },
  {
    id: "edulearn-platform",
    title: "EduLearn — Online Learning Platform",
    shortTitle: "EduLearn",
    description:
      "A full-featured e-learning platform with course authoring, video-based lessons, quizzes, and progress tracking for students and instructors alike.",
    tags: ["Next.js", "React 19", "TypeScript", "PostgreSQL", "Prisma", "Stripe"],
    highlights: [
      "Course Builder With Drag-and-Drop Lesson Ordering",
      "Video Progress Tracking + Resume Playback",
      "Stripe-Powered Course Enrollment & Payments",
    ],
    image: "https://picsum.photos/seed/edulearn-platform/1200/900",
    href: "#",
  },
];
