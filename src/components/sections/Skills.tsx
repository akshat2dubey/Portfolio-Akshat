import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { iconFor } from "../ui/Icon";
import { SKILL_CATEGORIES, CURRENT_FOCUS } from "../../data/skills";

export function Skills() {
  return (
    <section id="skills" className="relative py-24 sm:py-32">
      {/* backdrop glow */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 h-[360px] w-[720px] -translate-x-1/2 rounded-full blur-[140px]"
        style={{ background: "radial-gradient(circle, rgba(34,211,238,0.10), transparent 70%)" }}
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="// skills"
          title="Skills & expertise, built through practice"
          subtitle="Everything here is a label for real work — not a claim of mastery. I'm building depth by applying these in projects like SecureBank."
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {SKILL_CATEGORIES.map((cat, i) => {
            const Icon = iconFor(cat.icon);
            return (
              <Reveal key={cat.id} delay={i * 0.06} className={i === 0 ? "md:col-span-2 xl:col-span-1" : ""}>
                <motion.article
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="group glass relative h-full overflow-hidden rounded-2xl p-6"
                >
                  <div
                    className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-grid-fine"
                    aria-hidden="true"
                  />
                  <div className="relative">
                    <div className="mb-5 flex items-center gap-3.5">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-glow/30 bg-cyan-glow/10 transition-shadow duration-300 group-hover:shadow-[0_0_22px_rgba(34,211,238,0.35)]">
                        <Icon className="h-5 w-5 text-cyan-glow" aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="font-display text-[1.02rem] font-semibold text-body">{cat.title}</h3>
                        <p className="text-xs text-faint">{cat.blurb}</p>
                      </div>
                    </div>

                    <ul className="flex flex-wrap gap-2">
                      {cat.skills.map((skill) => (
                        <li key={skill}>
                          <span className="inline-flex items-center gap-1.5 rounded-md border border-edge bg-white/[0.03] px-2.5 py-1.5 text-[0.78rem] text-muted transition-all duration-300 hover:border-cyan-glow/45 hover:bg-cyan-glow/[0.07] hover:text-cyan-soft">
                            <span className="h-1 w-1 rounded-full bg-cyan-glow/60" aria-hidden="true" />
                            {skill}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.article>
              </Reveal>
            );
          })}

          {/* Current focus card */}
          <Reveal delay={0.3}>
            <motion.article
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="glow-border relative flex h-full flex-col justify-between overflow-hidden rounded-2xl bg-ink/80 p-6"
            >
              <div className="relative">
                <div className="mb-5 flex items-center gap-3.5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-violet-glow/35 bg-violet-glow/10">
                    <Sparkles className="h-5 w-5 text-violet-glow" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-display text-[1.02rem] font-semibold text-body">Current focus</h3>
                    <p className="text-xs text-faint">Where the next few months of reps go</p>
                  </div>
                </div>
                <ul className="space-y-2.5">
                  {CURRENT_FOCUS.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-[0.84rem] text-muted">
                      <span className="font-mono text-xs text-violet-glow">▸</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="mt-6 border-t border-edge pt-4 font-mono text-[0.72rem] leading-relaxed text-faint">
                // growth mindset: proficiency is earned through shipped projects, not labels
              </p>
            </motion.article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
