import { motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { SITE } from "../../data/site";

function ConnectCard({
  icon: Icon,
  title,
  subtitle,
  cta,
  href,
  accent,
  delay,
}: {
  icon: typeof Github;
  title: string;
  subtitle: string;
  cta: string;
  href: string;
  accent: "cyan" | "blue";
  delay: number;
}) {
  const accentCls =
    accent === "cyan"
      ? "border-cyan-glow/30 bg-cyan-glow/10 group-hover:shadow-[0_0_28px_rgba(34,211,238,0.35)]"
      : "border-blue-glow/30 bg-blue-glow/10 group-hover:shadow-[0_0_28px_rgba(96,165,250,0.35)]";
  const iconCls = accent === "cyan" ? "text-cyan-glow" : "text-blue-glow";
  return (
    <Reveal delay={delay} className="h-full">
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
        className="group glass relative block h-full overflow-hidden rounded-2xl p-7"
      >
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-grid-fine"
          aria-hidden="true"
        />
        <div className="relative flex h-full flex-col">
          <div className="flex items-start justify-between">
            <span
              className={`flex h-12 w-12 items-center justify-center rounded-xl border transition-shadow duration-300 ${accentCls}`}
            >
              <Icon className={`h-6 w-6 ${iconCls}`} aria-hidden="true" />
            </span>
            <ArrowUpRight
              className="h-5 w-5 text-faint transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-cyan-soft"
              aria-hidden="true"
            />
          </div>
          <h3 className="mt-5 font-display text-xl font-semibold text-body">{title}</h3>
          <p className="mt-1.5 flex-1 text-[0.88rem] leading-relaxed text-muted">{subtitle}</p>
          <span
            className={`mt-6 inline-flex items-center gap-2 font-semibold ${
              accent === "cyan" ? "text-cyan-soft" : "text-blue-glow"
            }`}
          >
            {cta}
            <span
              className="h-px w-8 bg-current opacity-50 transition-all duration-300 group-hover:w-14"
              aria-hidden="true"
            />
          </span>
        </div>
      </motion.a>
    </Reveal>
  );
}

export function Contact() {
  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 h-[360px] w-[760px] -translate-x-1/2 rounded-full blur-[140px]"
        style={{ background: "radial-gradient(circle, rgba(34,211,238,0.10), transparent 70%)" }}
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="// contact"
          title="Let's connect"
          subtitle="Whether it's a security discussion, a project idea, or an internship opportunity — I'd love to hear from you."
        />

        <div className="grid gap-6 md:grid-cols-2">
          <ConnectCard
            icon={Github}
            title="GitHub"
            subtitle="Where the code lives. Follow along as SecureBank's stages and new security projects ship."
            cta="View GitHub"
            href={SITE.github}
            accent="cyan"
            delay={0}
          />
          <ConnectCard
            icon={Linkedin}
            title="LinkedIn"
            subtitle="Where I share my learning path, projects and security interests with the community."
            cta="Connect with me on LinkedIn"
            href={SITE.linkedin}
            accent="blue"
            delay={0.08}
          />
        </div>

        <Reveal delay={0.14}>
          <div className="glass mt-6 flex flex-col items-center justify-between gap-6 rounded-2xl p-7 sm:flex-row sm:p-8">
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-edge-strong bg-white/[0.04]">
                <Mail className="h-5 w-5 text-cyan-glow" aria-hidden="true" />
              </span>
              <div>
                <p className="font-display text-base font-semibold text-body">Prefer email?</p>
                <p className="text-sm text-muted">I read everything — drop me a line.</p>
              </div>
            </div>
            <a
              href={`mailto:${SITE.email}?subject=Hello%20from%20your%20portfolio`}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500/90 to-blue-500/90 px-6 py-3 text-sm font-semibold text-[#03131a] transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.45)]"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              Email me
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-8 flex items-center justify-center gap-2 text-center font-mono text-xs text-faint">
            <MapPin className="h-3.5 w-3.5 text-cyan-glow/70" aria-hidden="true" />
            {SITE.location} · open to remote security roles & internships
          </p>
        </Reveal>
      </div>
    </section>
  );
}
