import { useRef } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import { iconFor } from "../ui/Icon";
import { JOURNEY } from "../../data/journey";

export function Journey() {
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.72", "end 0.6"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 24 });

  return (
    <section id="journey" className="relative py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="absolute left-0 top-1/3 h-[400px] w-[400px] rounded-full blur-[130px]"
        style={{ background: "radial-gradient(circle, rgba(96,165,250,0.12), transparent 70%)" }}
      />
      <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="// journey"
          title="The security learning arc"
          subtitle="From first programs to designing secure architecture — each phase builds on the last, and the later stages are exactly what SecureBank is made of."
        />

        <div ref={trackRef} className="relative">
          {/* Rail */}
          <div
            className="absolute left-[19px] top-2 bottom-2 w-px bg-edge sm:left-1/2 sm:-translate-x-1/2"
            aria-hidden="true"
          />
          {!reduce && (
            <motion.div
              className="absolute left-[19px] top-2 bottom-2 w-px origin-top bg-gradient-to-b from-cyan-glow via-blue-glow to-violet-glow sm:left-1/2 sm:-translate-x-1/2"
              style={{ scaleY: progress }}
              aria-hidden="true"
            />
          )}

          <ol className="space-y-12">
            {JOURNEY.map((step, i) => {
              const Icon = iconFor(step.icon);
              const leftSide = i % 2 === 0;
              return (
                <li key={step.title} className="relative">
                  {/* Node */}
                  <span
                    className={`absolute left-[19px] top-1 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border sm:left-1/2 ${
                      step.current
                        ? "border-cyan-glow/60 bg-ink shadow-[0_0_18px_rgba(34,211,238,0.35)]"
                        : "border-edge-strong bg-ink"
                    }`}
                    aria-hidden="true"
                  >
                    <Icon
                      className={`h-4.5 w-4.5 ${step.current ? "text-cyan-glow" : "text-muted"}`}
                    />
                  </span>

                  <div
                    className={`ml-16 sm:ml-0 sm:w-[calc(50%-3.2rem)] ${
                      leftSide ? "sm:mr-auto sm:text-right" : "sm:ml-auto"
                    }`}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 22 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-70px" }}
                      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                      className={`glass rounded-2xl p-5 transition-colors duration-300 hover:border-cyan-glow/30 ${
                        step.current ? "glow-border" : ""
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <h3 className="font-display text-[1.02rem] font-semibold text-body">
                          {step.title}
                        </h3>
                        {step.current && (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-glow/40 bg-cyan-glow/10 px-2 py-px font-mono text-[0.6rem] text-cyan-soft">
                            <span className="relative flex h-1.5 w-1.5">
                              <span className="absolute h-full w-full animate-ping rounded-full bg-cyan-glow opacity-70" />
                              <span className="relative h-1.5 w-1.5 rounded-full bg-cyan-glow" />
                            </span>
                            in progress
                          </span>
                        )}
                      </div>
                      <p className="mt-1.5 text-[0.85rem] leading-relaxed text-muted">
                        {step.description}
                      </p>
                    </motion.div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
