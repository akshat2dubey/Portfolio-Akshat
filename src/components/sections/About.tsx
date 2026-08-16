import { motion } from "framer-motion";
import { Binary, BookOpen, Compass, Cpu, ShieldCheck, Terminal } from "lucide-react";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

const APPROACH = [
  {
    icon: Binary,
    title: "Learn by building",
    text: "I turn concepts into working systems — like SecureBank, where networking, Linux and security theory become a real environment.",
  },
  {
    icon: ShieldCheck,
    title: "Think like both sides",
    text: "Understanding how systems are secured means understanding how they're attacked. I study defense and offense together.",
  },
  {
    icon: BookOpen,
    title: "Document everything",
    text: "Threat models, pentest reports, incident write-ups — security work is only as strong as the documentation behind it.",
  },
];

export function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="// about"
          title="An engineer building security, one real project at a time"
          subtitle="I'm a Computer Science & Engineering student focused on cybersecurity. My path is practical: understand systems deeply, then build, secure, test and document them."
        />

        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Bio */}
          <Reveal from="right">
            <div className="glass relative h-full rounded-2xl p-7 sm:p-9">
              <span className="absolute right-6 top-5 font-mono text-xs text-faint" aria-hidden="true">
                ~/about.txt
              </span>
              <div className="space-y-4 text-[0.98rem] leading-relaxed text-muted">
                <p>
                  Hi — I'm <span className="font-semibold text-body">Akshat</span>, a Computer Science &
                  Engineering student who got hooked on security the moment I realized how much of the
                  modern world depends on getting it right. My focus is{" "}
                  <span className="text-cyan-soft">cybersecurity, secure systems, networking and Linux</span>,
                  with a growing interest in DevSecOps.
                </p>
                <p>
                  I learn by building. My main project,{" "}
                  <a href="#securebank" className="font-medium text-cyan-soft underline decoration-cyan-glow/40 underline-offset-4 hover:decoration-cyan-glow">
                    SecureBank Enterprise Lab
                  </a>
                  , is a nine-stage simulation of a banking environment — from traffic analysis and
                  hardened Linux servers to threat modeling, a vulnerable banking app, pentest reports,
                  SIEM monitoring, incident response and a DevSecOps pipeline.
                </p>
                <p>
                  I'm still early in my journey, and that's exactly where the growth is. Right now that
                  means writing security documentation, hardening servers, analyzing traffic, and
                  sharpening the engineering fundamentals — C/C++, Python, Git, systems — that every
                  serious security career is built on.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {["Secure systems", "Networking", "Linux", "Threat modeling", "Pentesting", "SIEM", "Incident response", "DevSecOps"].map(
                  (t) => (
                    <span
                      key={t}
                      className="rounded-full border border-edge px-3 py-1 font-mono text-[0.7rem] text-muted transition-colors duration-300 hover:border-cyan-glow/40 hover:text-cyan-soft"
                    >
                      {t}
                    </span>
                  ),
                )}
              </div>
            </div>
          </Reveal>

          {/* Approach + current focus */}
          <div className="flex flex-col gap-6">
            <Reveal from="left" delay={0.05}>
              <div className="glass rounded-2xl p-6">
                <h3 className="mb-5 flex items-center gap-2.5 font-display text-base font-semibold text-body">
                  <Cpu className="h-4.5 w-4.5 text-cyan-glow" aria-hidden="true" />
                  How I work
                </h3>
                <ul className="space-y-4">
                  {APPROACH.map((item) => (
                    <li key={item.title} className="flex gap-3.5">
                      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-cyan-glow/25 bg-cyan-glow/[0.08]">
                        <item.icon className="h-4 w-4 text-cyan-glow" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-body">{item.title}</p>
                        <p className="mt-0.5 text-[0.84rem] leading-relaxed text-muted">{item.text}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal from="left" delay={0.12}>
              <div className="glow-border relative overflow-hidden rounded-2xl bg-ink/80 p-6">
                <div className="absolute inset-0 bg-grid-fine opacity-60" aria-hidden="true" />
                <div className="relative">
                  <h3 className="mb-4 flex items-center gap-2.5 font-display text-base font-semibold text-body">
                    <Terminal className="h-4.5 w-4.5 text-cyan-glow" aria-hidden="true" />
                    Currently deepening
                  </h3>
                  <motion.ul className="space-y-2.5 font-mono text-[0.82rem] text-muted">
                    {["DevSecOps pipelines", "SIEM & log correlation", "Incident response", "Pentesting methodology", "Secure architecture design"].map(
                      (item, i) => (
                        <motion.li
                          key={item}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 + i * 0.08 }}
                          className="flex items-center gap-2.5"
                        >
                          <span className="text-cyan-glow">$</span> {item}
                          <span className="h-3.5 w-[7px] animate-blink bg-cyan-glow/70" aria-hidden="true" />
                        </motion.li>
                      ),
                    )}
                  </motion.ul>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.15} className="mt-8">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-edge bg-panel/40 px-6 py-5">
            <div className="flex items-center gap-3">
              <Compass className="h-5 w-5 text-cyan-glow" aria-hidden="true" />
              <p className="text-sm text-muted">
                <span className="font-semibold text-body">Where I'm headed:</span> from security builder to
                security engineer — designing, securing and defending real systems.
              </p>
            </div>
            <a
              href="#journey"
              className="font-mono text-xs text-cyan-soft transition-colors hover:text-cyan-glow"
            >
              view the journey →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
