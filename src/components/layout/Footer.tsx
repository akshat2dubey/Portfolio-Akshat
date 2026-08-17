import { Github, Linkedin, Mail, ShieldCheck } from "lucide-react";
import { SITE } from "../../data/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-edge bg-ink/60">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-5 py-12 sm:px-8">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-glow/40 bg-cyan-glow/10">
            <ShieldCheck className="h-5 w-5 text-cyan-glow" aria-hidden="true" />
          </span>
          <div className="text-left">
            <p className="font-display text-lg font-bold text-body">{SITE.name}</p>
            <p className="font-mono text-xs text-faint">
              Cybersecurity • Computer Science • Secure Systems
            </p>
          </div>
        </div>

        <nav aria-label="Social links" className="flex items-center gap-4">
          <a
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-edge-strong px-4 py-2 text-sm text-muted transition-colors duration-300 hover:border-cyan-glow/50 hover:text-cyan-soft"
          >
            <Github className="h-4 w-4" aria-hidden="true" /> GitHub
          </a>
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-edge-strong px-4 py-2 text-sm text-muted transition-colors duration-300 hover:border-cyan-glow/50 hover:text-cyan-soft"
          >
            <Linkedin className="h-4 w-4" aria-hidden="true" /> LinkedIn
          </a>
          <a
            href={`mailto:${SITE.email}`}
            title={SITE.email}
            className="flex items-center gap-2 rounded-full border border-edge-strong px-4 py-2 text-sm text-muted transition-colors duration-300 hover:border-cyan-glow/50 hover:text-cyan-soft"
          >
            <Mail className="h-4 w-4" aria-hidden="true" /> Email
          </a>
        </nav>

        <p className="font-mono text-xs text-faint">
          © {year} {SITE.name}. Built with React, TypeScript, Tailwind CSS & Three.js.
        </p>
      </div>
    </footer>
  );
}
