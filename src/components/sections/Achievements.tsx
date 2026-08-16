import { CheckCircle2, Flag, ShieldCheck } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { CURRENT_MILESTONES, FUTURE_GOALS } from "../../data/journey";

export function Achievements() {
  return (
    <section id="milestones" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="// milestones"
          title="Milestones — real, and clearly labeled"
          subtitle="No invented awards or certificates here. These are the milestones I've actually reached, followed by the goals I'm working toward."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Current milestones */}
          <Reveal from="right">
            <div className="glass relative h-full rounded-2xl p-7 sm:p-8">
              <div className="mb-6 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-glow/35 bg-cyan-glow/10">
                  <ShieldCheck className="h-5 w-5 text-cyan-glow" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-body">Reached so far</h3>
                  <p className="font-mono text-[0.68rem] text-faint">status: current</p>
                </div>
              </div>
              <ul className="space-y-3.5">
                {CURRENT_MILESTONES.map((m) => (
                  <li key={m} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-cyan-glow" aria-hidden="true" />
                    <span className="text-[0.92rem] leading-relaxed text-muted">{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Future goals */}
          <Reveal from="left" delay={0.08}>
            <div className="relative h-full rounded-2xl border border-dashed border-edge-strong bg-panel/30 p-7 sm:p-8">
              <div className="mb-6 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-violet-glow/35 bg-violet-glow/10">
                  <Flag className="h-5 w-5 text-violet-glow" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-body">Next up</h3>
                  <p className="font-mono text-[0.68rem] text-violet-glow">status: future goals</p>
                </div>
              </div>
              <ul className="space-y-3.5">
                {FUTURE_GOALS.map((g) => (
                  <li key={g} className="flex items-start gap-3">
                    <span
                      className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full border border-violet-glow/40"
                      aria-hidden="true"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-violet-glow/70" />
                    </span>
                    <span className="text-[0.92rem] leading-relaxed text-muted">{g}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-edge pt-4 font-mono text-[0.72rem] leading-relaxed text-faint">
                // listed as goals — not achievements — until they're done
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
