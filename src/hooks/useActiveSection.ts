import { useEffect, useState } from "react";

const SECTION_IDS = [
  "home",
  "about",
  "skills",
  "projects",
  "securebank",
  "journey",
  "contact",
];

export function useActiveSection(): string {
  const [active, setActive] = useState<string>("home");

  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry that is closest to the top of the viewport.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return active;
}
