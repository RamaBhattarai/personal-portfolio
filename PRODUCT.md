# Product

## Register

brand

## Users

Recruiters, hiring managers, and prospective freelance/contract clients evaluating a full stack/motion developer's real-world work. They skim fast, so craft has to read instantly in the first few seconds of scroll.

## Product Purpose

A personal portfolio for a full stack developer with a motion/frontend specialty. Its job is to prove technical and design craft through the site itself (motion, interaction detail, polish) as much as through the project descriptions — the medium is the pitch. Success = a visitor remembers the site and reaches out.

## Brand Personality

Precise, kinetic, quietly confident. Dark editorial canvas (near-black background, warm off-white foreground) with a lime accent for primary/professional signals and a pink secondary accent reserved for playful/personal hover moments. Motion is a design material, not decoration — every interaction should feel deliberate and physically grounded (springs, eases, real depth) rather than templated.

## Anti-references

Generic SaaS marketing template look (gradient-text hero, cookie-cutter feature grid, safe corporate blue). Also avoid Awwwards-style parallax-for-its-own-sake with no connection to content — motion here always serves revealing real project detail, never spectacle alone.

## Design Principles

- Motion communicates meaning (reveal = attention direction), never just flourish.
- Reuse the site's existing kinetic vocabulary (scramble text, magnetic hover, spring-physics scatter-to-place) rather than inventing new one-off effects per section.
- Editorial pacing: each project is a full "chapter," not a compressed grid cell.
- Every animated affordance has a static, equally legible `prefers-reduced-motion` fallback.
- Real project data only — no placeholder/lorem content in shipped sections.

## Accessibility & Inclusion

Respect `prefers-reduced-motion` everywhere (already the pattern site-wide via `useReducedMotion`). Maintain focus-visible states and keyboard operability on interactive elements (links, buttons). Decorative/animated text (scramble effects) must not be the only source of truth for content — real text must remain in the DOM for assistive tech.
