# Akshat Dubey — Cybersecurity & Computer Science Portfolio

A premium, frontend-only portfolio for **Akshat Dubey** — a Computer Science & Engineering student focused on **cybersecurity, secure systems, networking, Linux and DevSecOps**.

Built with **React 19 + TypeScript + Vite + Tailwind CSS v4**, animated with **Framer Motion**, and featuring a custom **Three.js (React Three Fiber)** network visualization in the hero.

## ✨ Highlights

- **Hero** — interactive 3D security-network visualization (nodes, edges, travelling data packets, security crystal) that reacts subtly to the mouse, behind a circular portrait with rotating orbit rings and parallax floating chips.
- **SecureBank Enterprise Lab** — flagship project section with a clickable 8-layer security architecture (Internet → Recon → App → Linux → Monitoring → Detection → IR → DevSecOps), an inspector detail panel, and all **9 stages** as interactive cards with honest status labels (Stage 1 in progress, rest planned).
- **Skills, Journey, Milestones** — categorized skill cards, a scroll-driven learning-arc timeline, and milestones split into *reached* vs. clearly-labeled *future goals* (no invented achievements).
- **Performance** — the Three.js scene is lazy-loaded and code-split, reduces complexity on mobile (`70` nodes vs `130`), lowers DPR, pauses when off-screen, and respects `prefers-reduced-motion` throughout.
- **Accessibility & SEO** — semantic HTML, aria labels, focus rings, full Open Graph / Twitter metadata, JSON-LD structured data, and a custom favicon + generated social preview image.

## 🚀 Run locally

```bash
npm install
npm run dev
```

Open the printed URL (default `http://localhost:5173`).

### Production build

```bash
npm run build     # typechecks + builds to dist/
npm run preview   # serve the production build locally
```

## 🖼️ Photo & asset regeneration

Your portrait is optimized automatically:

1. Drop your portrait at `scripts/profile-original.jpeg` (highest resolution you have).
2. Run `npm run assets` — regenerates:
   - `src/assets/profile.jpg` (640×640 circular-crop-ready portrait)
   - `public/og-image.png` (1200×630 social preview)
   - `public/favicon-32.png`

Source photos are git-ignored; only the generated assets are committed.

## ✏️ Editing your content

All content lives in `src/data/` — no component edits needed:

| File | What it controls |
| --- | --- |
| `src/data/site.ts` | Name, email, GitHub & LinkedIn links (also `index.html` metadata) |
| `src/data/skills.ts` | Skill categories + current focus |
| `src/data/projects.ts` | Project cards — **add future projects here** |
| `src/data/securebank.ts` | SecureBank stages + architecture layers |
| `src/data/journey.ts` | Journey timeline + milestones/goals |

**Before you go live:** replace the placeholder email in `src/data/site.ts` (`email` field) with your real address.

## 🗂️ Structure

```
src/
├── components/
│   ├── layout/      Navbar, Footer, ScrollProgress
│   ├── sections/    Hero, About, Skills, Projects, SecureBank, Journey, Achievements, Contact
│   ├── three/       HeroScene (Three.js network visualization)
│   └── ui/          Reveal, TiltCard, ButtonLink, CursorGlow, SectionHeading, Icon
├── data/            All editable content
├── hooks/           useActiveSection, useIsMobile
└── lib/             scroll helper
```

## 📦 Deploying

Static site — deploy `dist/` to GitHub Pages, Vercel, Netlify or Cloudflare Pages. If you use GitHub Pages with a project-page URL (`/repo/`), set `base` in `vite.config.ts` accordingly.

---

© 2026 Akshat Dubey. Built with React, TypeScript, Tailwind CSS & Three.js.
