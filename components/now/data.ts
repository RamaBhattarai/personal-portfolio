export interface NowContent {
  heading: string;
  body: string;
  /** Exact substrings from `body` to render with emphasis + animated underline. */
  emphasizedTerms: string[];
  lastUpdatedFallback: string;
}

export const nowContent: NowContent = {
  heading: "Right Now",
  body: "Right now, I'm deep in GSAP ScrollTrigger on the frontend, and sharpening my Node.js API design and database architecture on the backend.",
  emphasizedTerms: ["GSAP ScrollTrigger", "Node.js API design", "database architecture"],
  lastUpdatedFallback: "July 2026",
};

/** Set to your GitHub username to pull a live "Last updated" date; empty string keeps the static fallback. */
export const GITHUB_USERNAME = "ramaBhattarai";
