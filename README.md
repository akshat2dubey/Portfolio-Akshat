# Akshat Dubey — Cybersecurity & Computer Science Portfolio

A premium, frontend-only portfolio for **Akshat Dubey** — a Computer Science & Engineering student focused on **cybersecurity, secure systems, networking, Linux and DevSecOps**.

Built with **React 19 + TypeScript + Vite + Tailwind CSS v4**, animated with **Framer Motion**, and featuring a custom **Three.js (React Three Fiber)** network visualization in the hero.

## ✨ Highlights

- **Hero** — interactive 3D security-network visualization (nodes, edges, travelling data packets, security crystal) that reacts subtly to the mouse, behind a circular portrait with rotating orbit rings and parallax floating chips.
- **Ambient 3D environment** — a single fixed WebGL field (node cloud, breathing connections, drifting particles, wireframe geometries, perspective grid floor) spans the whole page below the hero, undulates gently with scroll and shifts its accent hue per section.
- **SecureBank topology** — a dedicated layered banking-network scene (curved data paths, travelling packets, pulsing security-monitor nodes, wireframe core) pinned behind the architecture explorer on a viewport-height sticky stage.
- **SecureBank Enterprise Lab** — flagship project section with a clickable 8-layer security architecture (Internet → Recon → App → Linux → Monitoring → Detection → IR → DevSecOps), an inspector detail panel, and all **9 stages** as interactive cards with honest status labels (Stage 1 in progress, rest planned).
- **Skills, Journey, Milestones** — categorized skill cards, a scroll-driven learning-arc timeline, and milestones split into *reached* vs. clearly-labeled *future goals* (no invented achievements).
- **Contact** — a dedicated email card with the live `akshatd166@gmail.com` address, a `mailto:` CTA, and the address also wired into the footer link.
- **Performance** — every Three.js scene is lazy-loaded and code-split, reduces complexity on mobile and low-core devices, lowers DPR, pauses when off-screen or the tab is hidden, adapts the field to the viewport aspect, and respects `prefers-reduced-motion` throughout (static render, interface fully usable). Falls back gracefully to the CSS-only design when WebGL is unavailable.
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

## 🗂️ Structure

```
src/
├── components/
│   ├── layout/      Navbar, Footer, ScrollProgress
│   ├── sections/    Hero, About, Skills, Projects, SecureBank, Journey, Achievements, Contact
│   ├── three/       AmbientScene, SecureBankScene, HeroScene (Three.js network visualizations)
│   └── ui/          Reveal, TiltCard, ButtonLink, CursorGlow, SectionHeading, Icon
├── data/            All editable content
├── hooks/           useActiveSection, useIsMobile
└── lib/             scroll helper
```

## 📦 Deploying

Static site — deploy `dist/` to GitHub Pages, Vercel, Netlify or Cloudflare Pages. If you use GitHub Pages with a project-page URL (`/repo/`), set `base` in `vite.config.ts` accordingly.

---

© 2026 Akshat Dubey. Built with React, TypeScript, Tailwind CSS & Three.js.
