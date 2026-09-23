export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  start: string;
  end: string;
  /** Project ids from work/data.ts to surface under this employer. */
  projectIds: string[];
  /** Per-project attribution override, e.g. client work delivered through this employer. */
  clientNotes?: Record<string, string>;
}

// Reverse-chronological, matching the resume in public/CV.
export const experience: ExperienceEntry[] = [
  {
    id: "gitgi-foundation",
    company: "Gitgi Foundation",
    role: "Full Stack Developer",
    start: "Sep 2025",
    end: "Present",
    projectIds: ["lms-platform", "bs-realty-platform", "bs-realty-insurance"],
    clientNotes: {
      "bs-realty-platform": "Client project — BS Realty",
      "bs-realty-insurance": "Client project — BS Realty",
    },
  },
  {
    id: "deskgoo",
    company: "Deskgoo",
    role: "Full Stack Developer",
    start: "Jan 2025",
    end: "Sep 2025",
    projectIds: ["retail-pos", "hr-ats-platform"],
  },
];

export const resumeUrl = "/CV/Rama_Bhattarai.pdf";
