import { motion } from "framer-motion";
import { ArrowRight, Github, Landmark } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { ButtonLink } from "../ui/ButtonLink";
import { TiltCard } from "../ui/TiltCard";
import { iconFor } from "../ui/Icon";
import { PROJECTS, SECUREBANK_STAGE_CHIPS } from "../../data/projects";
import { SECUREBANK_STAGES } from "../../data/securebank";
import type { Project } from "../../data/projects";

function StatusBadge({ status, label }: { status: Project["status"]; label: string }) {
  const styles: Record<Project["status"], string> = {
    active: "border-emerald-400/40 bg-emerald-400/10 text-emerald-300",
    "in-progress": "border-cyan-glow/40 bg-cyan-glow/10 text-cyan-soft",
    planned: "border-edge-strong bg-white/[0.04] text-muted",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[0.65rem] ${styles[status]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
      {label}
    </span>
  );
}

function ProjectCard({ project, delay }: { project: Project; delay: number }) {
  const Icon = iconFor(project.id === "securebank" ? "shield" : "layers");
  return (
    <Reveal delay={delay} className="h-full">
      <TiltCard max={4} className="h-full">
        <motion.article
          whileHover={{ y: -6 }}
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
          className="group glass relative flex h-full flex-col overflow-hidden rounded-2xl p-6"
        >
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-grid-fine"
            aria-hidden="true"
          />
          <div className="relative flex h-full flex-col">
          <div className="mb-4 flex items-start justify-between">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-glow/30 bg-cyan-glow/10 transition-shadow duration-300 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.35)]">
              <Icon className="h-5 w-5 text-cyan-glow" aria-hidden="true" />
            </span>
            <StatusBadge status={project.status} label={project.statusLabel} />
          </div>

          <h3 className="font-display text-lg font-semibold text-body">{project.name}</h3>
          <p className="mt-1 font-mono text-[0.72rem] text-cyan-soft/70">{project.tagline}</p>
          <p className="mt-3 flex-1 text-[0.88rem] leading-relaxed text-muted">{project.description}</p>

          <div className="mt-5 space-y-3">
            <div>
              <p className="mb-1.5 font-mono text-[0.62rem] uppercase tracking-wider text-faint">Stack</p>
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span key={t} className="rounded border border-edge bg-white/[0.03] px-2 py-0.5 text-[0.7rem] text-muted">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-1.5 font-mono text-[0.62rem] uppercase tracking-wider text-faint">Security concepts</p>
              <div className="flex flex-wrap gap-1.5">
                {project.security.map((s) => (
                  <span key={s} className="rounded border border-cyan-glow/25 bg-cyan-glow/[0.06] px-2 py-0.5 text-[0.7rem] text-cyan-soft/80">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-edge-strong px-4 py-2 text-xs font-medium text-muted transition-colors duration-300 hover:border-cyan-glow/50 hover:text-cyan-soft"
              >
                <Github className="h-3.5 w-3.5" aria-hidden="true" /> GitHub
              </a>
            )}
            {project.anchor && (
              <a
                href={`#${project.anchor}`}
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-cyan-soft transition-colors duration-300 hover:text-cyan-glow"
              >
                Explore {project.anchor === "securebank" ? "SecureBank" : "project"}
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
        </motion.article>
      </TiltCard>
    </Reveal>
  );
}

function FlagshipCard() {
  return (
    <Reveal>
      <TiltCard max={2} className="mb-8">
        <div className="glow-border relative overflow-hidden rounded-3xl bg-ink/80">
        <div className="absolute inset-0 bg-grid-fine opacity-50" aria-hidden="true" />
        <div
          aria-hidden="true"
          className="absolute -right-24 -top-24 h-80 w-80 rounded-full blur-[110px]"
          style={{ background: "radial-gradient(circle, rgba(34,211,238,0.22), transparent 70%)" }}
        />
        <div className="relative grid gap-8 p-7 sm:p-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-glow/35 bg-cyan-glow/10 shadow-[0_0_24px_rgba(34,211,238,0.25)]">
                <Landmark className="h-6 w-6 text-cyan-glow" aria-hidden="true" />
              </span>
              <div>
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-cyan-glow">Flagship project</p>
                <h3 className="font-display text-xl font-bold text-body sm:text-2xl">
                  SecureBank Enterprise Lab
                </h3>
              </div>
            </div>
            <p className="font-mono text-xs text-cyan-soft/70">
              A realistic banking security environment · 9 connected stages
            </p>
            <p className="mt-4 max-w-xl text-[0.92rem] leading-relaxed text-muted">
              My long-term cybersecurity project: a single, realistic banking security environment
              where networking, Linux hardening, threat modeling, application security, pentesting,
              SIEM, incident response and DevSecOps are combined — each stage building on the last,
              the way real enterprises design, secure and monitor their infrastructure.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <ButtonLink href="#securebank" variant="primary">
                Explore the architecture <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href="https://github.com/akshat2dubey" external variant="outline">
                <Github className="h-4 w-4" aria-hidden="true" /> GitHub
              </ButtonLink>
            </div>
          </div>

          {/* Stage pipeline preview */}
          <div className="flex flex-col justify-center gap-1.5">
            <p className="mb-1 font-mono text-[0.62rem] uppercase tracking-wider text-faint">
              The nine stages
            </p>
            {SECUREBANK_STAGE_CHIPS.map((chip, i) => {
              const inProgress = chip.includes("building");
              const stageNum = SECUREBANK_STAGES[i];
              return (
                <a
                  key={chip}
                  href="#securebank"
                  className={`group flex items-center gap-3 rounded-lg border px-3 py-1.5 text-[0.78rem] transition-all duration-300 ${
                    inProgress
                      ? "border-cyan-glow/40 bg-cyan-glow/[0.07] text-cyan-soft"
                      : "border-edge bg-white/[0.02] text-muted hover:border-cyan-glow/30 hover:text-body"
                  }`}
                >
                  <span
                    className={`font-mono text-[0.65rem] ${inProgress ? "text-cyan-glow" : "text-faint"}`}
                  >
                    {String(stageNum.number).padStart(2, "0")}
                  </span>
                  <span className="flex-1 truncate">{chip}</span>
                  {inProgress && (
                    <span className="relative flex h-1.5 w-1.5 shrink-0">
                      <span className="absolute h-full w-full animate-ping rounded-full bg-cyan-glow opacity-70" />
                      <span className="relative h-1.5 w-1.5 rounded-full bg-cyan-glow" />
                    </span>
                  )}
                </a>
              );
            })}
          </div>
        </div>
        </div>
      </TiltCard>
    </Reveal>
  );
}

export function Projects() {
  const rest = PROJECTS.filter((p) => !p.featured);
  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="// projects"
          title="What I'm building"
          subtitle="Real systems, documented and shipped. SecureBank is the flagship — more projects are on the way and will appear here as they mature."
        />

        <FlagshipCard />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {rest.map((p, i) => (
            <ProjectCard key={p.id} project={p} delay={i * 0.08} />
          ))}
        </div>

        <Reveal className="mt-10">
          <p className="text-center font-mono text-xs text-faint">
            // new projects land here automatically — add them in{" "}
            <code className="text-muted">src/data/projects.ts</code>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
