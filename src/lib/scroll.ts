/**
 * Smoothly scrolls to a section by id, with an instant fallback for
 * embedded browsers that don't support programmatic smooth scrolling.
 */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const startY = window.scrollY;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  window.setTimeout(() => {
    if (Math.abs(window.scrollY - startY) < 2) {
      el.scrollIntoView({ behavior: "instant", block: "start" });
    }
  }, 150);
}
