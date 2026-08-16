import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ShieldCheck } from "lucide-react";
import { useActiveSection } from "../../hooks/useActiveSection";
import { scrollToId } from "../../lib/scroll";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "securebank", label: "SecureBank" },
  { id: "journey", label: "Journey" },
  { id: "contact", label: "Contact" },
] as const;

export function Navbar() {
  const active = useActiveSection();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Glass background once the page is scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    // Wait a tick so the menu closes and body scroll unlocks first.
    window.setTimeout(() => scrollToId(id), 60);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-strong shadow-[0_8px_40px_rgba(0,0,0,0.45)]" : "bg-transparent"
      }`}
    >
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8"
        aria-label="Primary"
      >
        {/* Logo */}
        <button
          onClick={() => go("home")}
          className="group flex items-center gap-2.5 font-display text-[1.05rem] font-bold tracking-tight text-body"
          aria-label="Back to top — Akshat Dubey"
        >
          <span className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-glow/40 bg-cyan-glow/10 transition-shadow duration-300 group-hover:shadow-[0_0_18px_rgba(34,211,238,0.4)]">
            <ShieldCheck className="h-5 w-5 text-cyan-glow" aria-hidden="true" />
          </span>
          <span className="hidden sm:inline">
            Akshat<span className="text-cyan-glow">.</span>Dubey
          </span>
          <span className="sm:hidden">Akshat</span>
        </button>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => go(item.id)}
                className={`relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-200 ${
                  active === item.id ? "text-cyan-soft" : "text-muted hover:text-body"
                }`}
                aria-current={active === item.id ? "true" : undefined}
              >
                {item.label}
                {active === item.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full border border-cyan-glow/25 bg-cyan-glow/10"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </button>
            </li>
          ))}
        </ul>

        <a
          href="https://github.com/akshat2dubey"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden rounded-full border border-edge-strong px-4 py-2 font-mono text-xs text-muted transition-colors duration-300 hover:border-cyan-glow/50 hover:text-cyan-soft lg:inline-flex"
        >
          ~/github/akshat2dubey
        </a>

        {/* Mobile toggle */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-edge text-body lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="glass-strong overflow-hidden border-t border-edge lg:hidden"
          >
            <ul className="space-y-1 px-5 py-4">
              {NAV_ITEMS.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <button
                    onClick={() => go(item.id)}
                    className={`w-full rounded-lg px-4 py-3 text-left text-[0.95rem] font-medium transition-colors ${
                      active === item.id
                        ? "bg-cyan-glow/10 text-cyan-soft"
                        : "text-muted hover:bg-white/5 hover:text-body"
                    }`}
                  >
                    <span className="mr-3 font-mono text-xs text-faint">
                      0{i + 1}
                    </span>
                    {item.label}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
