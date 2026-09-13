# Portfolio

Rama Bhattarai's personal portfolio — a full stack developer's site with a motion/frontend specialty, built with Next.js. The site itself is the pitch: every section leans on deliberate, physically-grounded motion (GSAP, Framer Motion) rather than static marketing-template layout, and stays fully usable when `prefers-reduced-motion` is on. See [PRODUCT.md](PRODUCT.md) for the full brand/product brief.

## Tech Stack

- [Next.js 16](https://nextjs.org) (App Router) + React 19 + TypeScript
- Tailwind CSS 4
- GSAP (`@gsap/react`) and Framer Motion for animation
- Node.js/Express, MySQL/PostgreSQL, and Docker on the backend (see [components/tech-stack](components/tech-stack) for the full stack breakdown shown on the site)
- ESLint 9

## Getting Started

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site. The page auto-updates as you edit files under `app/` and `components/`.

### Other scripts

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # run ESLint
```

## Project Structure

```
app/
  page.tsx          # composes the page from the sections below
  layout.tsx         # root layout, fonts, metadata
  globals.css        # Tailwind + design tokens
components/
  Hero.tsx, Marquee.tsx, ProcessSection.tsx, CursorSparkles.tsx
  work/              # "Selected work" section (project cards grid)
  tech-stack/         # animated tech-stack graph (node physics, starfield, connectors)
  now/                # "Now" section, including a live "last updated" caption from GitHub
  contact/            # contact section (scramble text, magnetic hover)
lib/
  content.ts          # shared content/data (e.g. skills list)
  gsap.ts, theme.ts    # GSAP setup helpers, theme tokens
```

## Notable Implementation Details

- **"Now" section** ([components/now/useLatestCommit.ts](components/now/useLatestCommit.ts)) — fetches the latest public GitHub push event client-side to show a live "Last updated" date, falling back to a static date if the request fails.
- **Accessibility** — respects `prefers-reduced-motion` site-wide (see `useReducedMotion` usage), keeps real text in the DOM behind decorative scramble effects, and maintains focus-visible/keyboard support on interactive elements.

## Deployment

The easiest way to deploy is [Vercel](https://vercel.com/new), from the creators of Next.js. See the [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying) for other options.

> **Note:** This repo pins a pre-release Next.js version (16.2.9) with breaking changes from the Next.js you may be used to — see [AGENTS.md](AGENTS.md) and the docs under `node_modules/next/dist/docs/` before making framework-level changes.
