import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Info } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { TiltCard } from "../ui/TiltCard";
import { iconFor } from "../ui/Icon";
import { SECUREBANK_ARCHITECTURE, SECUREBANK_STAGES } from "../../data/securebank";

type Selection = { kind: "layer"; id: string } | { kind: "stage"; number: number };

export function SecureBank() {
  const [selection, setSelection] = useState<Selection>({ kind: "stage", number: 1 });

  const activeLayerId = useMemo(() => {
    if (selection.kind === "layer") return selection.id;
    const stage = SECUREBANK_STAGES.find((s) => s.number === selection.number)!;
    return (
      SECUREBANK_ARCHITECTURE.find((l) => l.stageNumbers.includes(stage.number))?.id ??
      SECUREBANK_ARCHITECTURE[0].id
    );
  }, [selection]);

  const activeLayer =
    SECUREBANK_ARCHITECTURE.find((l) => l.id === activeLayerId) ?? SECUREBANK_ARCHITECTURE[0];

  const selectedStage =
    selection.kind === "stage"
      ? SECUREBANK_STAGES.find((s) => s.number === selection.number)
      : undefined;

  const linkedStages = SECUREBANK_STAGES.filter((s) =>
    activeLayer.stageNumbers.includes(s.number),
  );

  return (
    <section id="securebank" className="relative py-24 sm:py-32">
      {/* backdrop */}
      <div
        aria-hidden="true"
        className="absolute right-0 top-24 h-[420px] w-[420px] rounded-full blur-[130px]"
        style={{ background: "radial-gradient(circle, rgba(14,116,144,0.25), transparent 70%)" }}
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="// securebank"
          title="SecureBank Enterprise Lab"
          subtitle="A single, realistic banking security environment — nine connected stages mapped to the architecture of a real enterprise. Click any layer or stage to inspect it."
        />

        {/* Architecture + detail */}
        <Reveal>
          <TiltCard max={3} className="glass glow-border relative overflow-hidden rounded-3xl">
            <div className="absolute inset-0 bg-grid-fine opacity-40" aria-hidden="true" />
            <div className="relative grid lg:grid-cols-[0.95fr_1.05fr]">
              {/* Pipeline */}
              <div className="border-b border-edge p-6 sm:p-8 lg:border-b-0 lg:border-r">
                <div className="mb-5 flex items-center justify-between">
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-faint">
                    Security architecture
                  </p>
                  <span className="hidden items-center gap-1.5 font-mono text-[0.65rem] text-faint sm:flex">
                    <Info className="h-3 w-3 text-cyan-glow/70" aria-hidden="true" /> click a node
                  </span>
                </div>

                <div className="flex flex-col">
                  {SECUREBANK_ARCHITECTURE.map((layer, i) => {
                    const Icon = iconFor(layer.icon);
                    const active = layer.id === activeLayerId;
                    return (
                      <div key={layer.id}>
                        <button
                          onClick={() => setSelection({ kind: "layer", id: layer.id })}
                          aria-pressed={active}
                          className={`group flex w-full items-center gap-4 rounded-xl border px-4 py-3 text-left transition-all duration-300 ${
                            active
                              ? "border-cyan-glow/50 bg-cyan-glow/[0.09] shadow-[0_0_24px_rgba(34,211,238,0.18)]"
                              : "border-edge bg-white/[0.02] hover:border-cyan-glow/30 hover:bg-white/[0.04]"
                          }`}
                        >
                          <span
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors duration-300 ${
                              active
                                ? "bg-cyan-glow/15 text-cyan-glow"
                                : "bg-white/[0.04] text-muted group-hover:text-cyan-soft"
                            }`}
                          >
                            <Icon className="h-5 w-5" aria-hidden="true" />
                          </span>
                          <span className="flex-1">
                            <span
                              className={`block text-[0.92rem] font-semibold transition-colors duration-300 ${
                                active ? "text-cyan-soft" : "text-body"
                              }`}
                            >
                              {layer.label}
                            </span>
                            <span className="mt-0.5 flex gap-1.5">
                              {layer.stageNumbers.length > 0 ? (
                                layer.stageNumbers.map((n) => (
                                  <span
                                    key={n}
                                    className={`rounded border px-1.5 py-px font-mono text-[0.6rem] ${
                                      active
                                        ? "border-cyan-glow/40 text-cyan-soft"
                                        : "border-edge text-faint"
                                    }`}
                                  >
                                    S{n}
                                  </span>
                                ))
                              ) : (
                                <span className="font-mono text-[0.6rem] text-faint">perimeter</span>
                              )}
                            </span>
                          </span>
                          {active && (
                            <motion.span
                              layoutId="layer-dot"
                              className="h-2 w-2 rounded-full bg-cyan-glow shadow-[0_0_10px_rgba(34,211,238,0.9)]"
                              aria-hidden="true"
                            />
                          )}
                        </button>

                        {/* Connector between layers */}
                        {i < SECUREBANK_ARCHITECTURE.length - 1 && (
                          <div className="relative mx-auto h-7 w-px bg-edge/70" aria-hidden="true">
                            <span className="absolute left-1/2 top-0 h-4 w-[3px] -translate-x-1/2 animate-flow-down rounded-full bg-cyan-glow/80 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Detail panel */}
              <div className="relative flex flex-col p-6 sm:p-8">
                <div className="mb-4 flex items-center justify-between">
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-faint">
                    Inspector
                  </p>
                  <span className="font-mono text-[0.68rem] text-faint">
                    {selectedStage ? `stage ${selectedStage.number}/9` : "layer view"}
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={selection.kind === "stage" ? `s${selection.number}` : `l-${selection.id}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                    className="flex flex-1 flex-col"
                  >
                    {selectedStage ? (
                      <>
                        <div className="flex items-center gap-3">
                          <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-glow/35 bg-cyan-glow/10">
                            {(() => {
                              const Icon = iconFor(selectedStage.icon);
                              return <Icon className="h-5 w-5 text-cyan-glow" aria-hidden="true" />;
                            })()}
                          </span>
                          <div>
                            <h3 className="font-display text-lg font-bold text-body">
                              {selectedStage.title}
                            </h3>
                            <span
                              className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-px font-mono text-[0.62rem] ${
                                selectedStage.status === "in-progress"
                                  ? "border-cyan-glow/40 bg-cyan-glow/10 text-cyan-soft"
                                  : "border-edge-strong bg-white/[0.04] text-muted"
                              }`}
                            >
                              <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
                              {selectedStage.statusLabel}
                            </span>
                          </div>
                        </div>
                        <p className="mt-4 text-[0.9rem] leading-relaxed text-muted">
                          {selectedStage.details}
                        </p>
                        <div className="mt-4">
                          <p className="mb-2 font-mono text-[0.62rem] uppercase tracking-wider text-faint">
                            Concepts
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {selectedStage.concepts.map((c) => (
                              <span
                                key={c}
                                className="rounded-md border border-cyan-glow/25 bg-cyan-glow/[0.06] px-2 py-1 text-[0.72rem] text-cyan-soft/85"
                              >
                                {c}
                              </span>
                            ))}
                          </div>
                        </div>
                        <p className="mt-5 border-t border-edge pt-4 font-mono text-[0.72rem] text-faint">
                          sits in the architecture at{" "}
                          <button
                            onClick={() => setSelection({ kind: "layer", id: activeLayer.id })}
                            className="text-cyan-soft underline decoration-cyan-glow/40 underline-offset-4 hover:text-cyan-glow"
                          >
                            {activeLayer.name}
                          </button>
                        </p>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center gap-3">
                          <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-glow/35 bg-cyan-glow/10">
                            {(() => {
                              const Icon = iconFor(activeLayer.icon);
                              return <Icon className="h-5 w-5 text-cyan-glow" aria-hidden="true" />;
                            })()}
                          </span>
                          <h3 className="font-display text-lg font-bold text-body">{activeLayer.name}</h3>
                        </div>
                        <p className="mt-4 text-[0.9rem] leading-relaxed text-muted">
                          {activeLayer.summary}
                        </p>
                        {linkedStages.length > 0 ? (
                          <div className="mt-5">
                            <p className="mb-2 font-mono text-[0.62rem] uppercase tracking-wider text-faint">
                              Powered by
                            </p>
                            <div className="flex flex-col gap-2">
                              {linkedStages.map((s) => (
                                <button
                                  key={s.number}
                                  onClick={() => setSelection({ kind: "stage", number: s.number })}
                                  className="group flex items-center gap-3 rounded-lg border border-edge bg-white/[0.02] px-3.5 py-2.5 text-left transition-colors duration-300 hover:border-cyan-glow/40 hover:bg-cyan-glow/[0.05]"
                                >
                                  <span className="font-mono text-[0.68rem] text-cyan-glow">
                                    S{s.number}
                                  </span>
                                  <span className="flex-1">
                                    <span className="block text-[0.84rem] font-medium text-body group-hover:text-cyan-soft">
                                      {s.name}
                                    </span>
                                    <span className="block text-[0.7rem] text-faint">{s.summary}</span>
                                  </span>
                                  <span
                                    className={`rounded-full border px-2 py-px font-mono text-[0.58rem] ${
                                      s.status === "in-progress"
                                        ? "border-cyan-glow/40 text-cyan-soft"
                                        : "border-edge text-faint"
                                    }`}
                                  >
                                    {s.statusLabel}
                                  </span>
                                </button>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <p className="mt-4 font-mono text-[0.72rem] text-faint">
                            entry point — every path into SecureBank crosses here.
                          </p>
                        )}
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>

                <div className="mt-auto pt-6">
                  <a
                    href="https://github.com/akshat2dubey"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-edge-strong px-4 py-2 text-xs font-medium text-muted transition-colors duration-300 hover:border-cyan-glow/50 hover:text-cyan-soft"
                  >
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    View on GitHub — repos landing as stages ship
                  </a>
                </div>
              </div>
            </div>
          </TiltCard>
        </Reveal>

        {/* Stage cards */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {SECUREBANK_STAGES.map((stage, i) => {
            const Icon = iconFor(stage.icon);
            const selected = selection.kind === "stage" && selection.number === stage.number;
            return (
              <Reveal key={stage.number} delay={i * 0.05}>
                <motion.button
                  whileHover={{ y: -4 }}
                  onClick={() => setSelection({ kind: "stage", number: stage.number })}
                  aria-pressed={selected}
                  className={`group relative w-full overflow-hidden rounded-2xl border p-5 text-left transition-colors duration-300 ${
                    selected
                      ? "border-cyan-glow/50 bg-cyan-glow/[0.07]"
                      : "border-edge bg-panel/40 hover:border-cyan-glow/35"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span
                      className={`font-mono text-2xl font-semibold ${
                        selected ? "text-cyan-glow" : "text-faint"
                      }`}
                    >
                      {String(stage.number).padStart(2, "0")}
                    </span>
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                        selected ? "bg-cyan-glow/15 text-cyan-glow" : "bg-white/[0.04] text-muted"
                      }`}
                    >
                      <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                    </span>
                  </div>
                  <h4 className="mt-3 font-display text-[0.98rem] font-semibold text-body">{stage.name}</h4>
                  <p className="mt-1.5 text-[0.78rem] leading-relaxed text-muted">{stage.summary}</p>
                  <span
                    className={`mt-3 inline-flex items-center gap-1.5 rounded-full border px-2 py-px font-mono text-[0.6rem] ${
                      stage.status === "in-progress"
                        ? "border-cyan-glow/40 bg-cyan-glow/10 text-cyan-soft"
                        : "border-edge-strong text-faint"
                    }`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
                    {stage.statusLabel}
                  </span>
                </motion.button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
