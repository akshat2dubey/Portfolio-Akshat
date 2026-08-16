import { lazy, Suspense, useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { Github, Linkedin, Mail, ArrowDown, Activity, ShieldCheck } from "lucide-react";
import { ButtonLink } from "../ui/ButtonLink";
import { scrollToId } from "../../lib/scroll";
import { SITE } from "../../data/site";
import profileImg from "../../assets/profile.jpg";

const HeroScene = lazy(() => import("../three/HeroScene"));

export function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Mouse parallax (desktop only).
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 20 });
  const sy = useSpring(my, { stiffness: 50, damping: 20 });

  const portraitX = useTransform(sx, (v) => v * -14);
  const portraitY = useTransform(sy, (v) => v * -14);
  const chipX = useTransform(sx, (v) => v * -26);
  const chipY = useTransform(sy, (v) => v * -26);
  const glowX = useTransform(sx, (v) => v * 24);
  const glowY = useTransform(sy, (v) => v * 24);

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, mx, my]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden pt-24 pb-16"
    >
      {/* Layered background */}
      <div className="absolute inset-0 bg-grid noise" aria-hidden="true" />
      <motion.div
        aria-hidden="true"
        className="absolute -left-40 top-1/4 h-[480px] w-[480px] rounded-full blur-[130px]"
        style={{
          background: "radial-gradient(circle, rgba(14,116,144,0.35), transparent 65%)",
          x: glowX,
          y: glowY,
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(79,70,229,0.22), transparent 65%)" }}
      />
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>

      {/* Content */}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Left — identity */}
        <div className="order-2 flex flex-col items-start lg:order-1">
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-cyan-glow/25 bg-cyan-glow/[0.07] px-4 py-1.5 font-mono text-xs text-cyan-soft"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-glow opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-glow" />
            </span>
            CSE Student — Cybersecurity Focus
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-body sm:text-6xl xl:text-7xl"
          >
            Akshat
            <br />
            <span className="text-gradient">Dubey</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="mt-5 font-mono text-sm text-cyan-soft/90 sm:text-base"
          >
            Cybersecurity Enthusiast <span className="text-faint">•</span> CSE Student{" "}
            <span className="text-faint">•</span> Security Builder
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="mt-5 max-w-xl text-[1.02rem] leading-relaxed text-muted"
          >
            {SITE.tagline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.34 }}
            className="mt-9 flex flex-wrap items-center gap-3.5"
          >
            <ButtonLink href="#projects" variant="primary" className="px-6 py-3">
              View My Work
            </ButtonLink>
            <ButtonLink href={SITE.github} external variant="outline" ariaLabel="Open GitHub profile">
              <Github className="h-4 w-4" aria-hidden="true" /> GitHub
            </ButtonLink>
            <ButtonLink href={SITE.linkedin} external variant="outline" ariaLabel="Open LinkedIn profile">
              <Linkedin className="h-4 w-4" aria-hidden="true" /> LinkedIn
            </ButtonLink>
            <ButtonLink href="#contact" variant="ghost" className="px-4">
              <Mail className="h-4 w-4" aria-hidden="true" /> Contact
            </ButtonLink>
          </motion.div>

          {/* Mono metadata strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[0.72rem] text-faint"
          >
            <span className="flex items-center gap-2">
              <ShieldCheck className="h-3.5 w-3.5 text-cyan-glow/70" aria-hidden="true" />
              secure systems · networking · linux
            </span>
            <span className="hidden h-3 w-px bg-edge sm:inline-block" aria-hidden="true" />
            <span className="flex items-center gap-2">
              <Activity className="h-3.5 w-3.5 text-cyan-glow/70" aria-hidden="true" />
              building: SecureBank Enterprise Lab
            </span>
          </motion.div>
        </div>

        {/* Right — portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="order-1 flex justify-center lg:order-2"
        >
          <motion.div
            style={reduce ? undefined : { x: portraitX, y: portraitY }}
            className="relative portrait-halo flex items-center justify-center rounded-full p-10 sm:p-14"
          >
            {/* Rotating dashed orbit rings */}
            <div
              className="absolute inset-0 animate-spin-slow rounded-full border border-dashed border-cyan-glow/25"
              aria-hidden="true"
            />
            <div
              className="absolute inset-6 animate-spin-rev rounded-full border border-dashed border-blue-glow/20"
              aria-hidden="true"
            />
            {/* Pulsing rings */}
            <div className="absolute inset-0 animate-pulse-ring rounded-full border border-cyan-glow/40" aria-hidden="true" />
            <div
              className="absolute inset-0 animate-pulse-ring rounded-full border border-cyan-glow/30"
              style={{ animationDelay: "1.6s" }}
              aria-hidden="true"
            />

            {/* Photo */}
            <div className="glow-border relative h-56 w-56 overflow-hidden rounded-full border border-cyan-glow/30 bg-panel sm:h-72 sm:w-72 lg:h-80 lg:w-80">
              <img
                src={profileImg}
                alt="Portrait of Akshat Dubey"
                width={640}
                height={640}
                fetchPriority="high"
                className="h-full w-full object-cover"
              />
              {/* subtle scan line */}
              <div
                className="pointer-events-none absolute inset-x-0 h-16 animate-scan bg-gradient-to-b from-transparent via-cyan-glow/10 to-transparent"
                aria-hidden="true"
              />
            </div>

            {/* Floating chips */}
            <motion.div
              style={reduce ? undefined : { x: chipX, y: chipY }}
              className="glass-strong absolute -left-4 top-10 flex items-center gap-2.5 rounded-xl px-4 py-3 shadow-[0_10px_40px_rgba(0,0,0,0.5)] sm:-left-10"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-glow/15">
                <ShieldCheck className="h-4 w-4 text-cyan-glow" aria-hidden="true" />
              </span>
              <span className="text-left">
                <span className="block font-mono text-[0.62rem] uppercase tracking-wider text-faint">Building</span>
                <span className="block text-xs font-semibold text-body">SecureBank Enterprise Lab</span>
              </span>
            </motion.div>

            <motion.div
              style={reduce ? undefined : { x: chipX, y: chipY }}
              className="glass-strong absolute -right-2 bottom-12 flex items-center gap-2.5 rounded-xl px-4 py-3 shadow-[0_10px_40px_rgba(0,0,0,0.5)] sm:-right-8"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-glow/15">
                <Activity className="h-4 w-4 text-violet-glow" aria-hidden="true" />
              </span>
              <span className="text-left">
                <span className="block font-mono text-[0.62rem] uppercase tracking-wider text-faint">Focus</span>
                <span className="block text-xs font-semibold text-body">DevSecOps · SIEM · IR</span>
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <button
        onClick={() => scrollToId("about")}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-faint transition-colors hover:text-cyan-soft md:flex"
        aria-label="Scroll to About section"
      >
        scroll
        <ArrowDown className="h-3.5 w-3.5 animate-bounce" aria-hidden="true" />
      </button>
    </section>
  );
}
