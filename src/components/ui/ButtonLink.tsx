import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "outline";
  /** opens external links in a new tab safely */
  external?: boolean;
  className?: string;
  magnetic?: boolean;
  ariaLabel?: string;
}

const VARIANT_CLASSES: Record<NonNullable<ButtonLinkProps["variant"]>, string> = {
  primary:
    "bg-gradient-to-r from-cyan-500/90 to-blue-500/90 text-[#03131a] font-semibold shadow-[0_0_24px_rgba(34,211,238,0.35)] hover:shadow-[0_0_38px_rgba(34,211,238,0.55)] border border-cyan-300/40",
  outline:
    "glass text-body hover:border-cyan-glow/50 hover:text-cyan-soft border border-edge-strong",
  ghost:
    "text-muted hover:text-cyan-soft hover:bg-white/5 border border-transparent",
};

export function ButtonLink({
  href,
  children,
  variant = "outline",
  external = false,
  className = "",
  magnetic = true,
  ariaLabel,
}: ButtonLinkProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 16 });
  const sy = useSpring(y, { stiffness: 200, damping: 16 });

  function onMouseMove(e: MouseEvent<HTMLAnchorElement>) {
    if (!magnetic || reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * 0.18);
    y.set(dy * 0.22);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const classes = [
    "group relative inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm transition-colors duration-300 select-none",
    VARIANT_CLASSES[variant],
    className,
  ].join(" ");

  const externalProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <motion.a
      ref={ref}
      href={href}
      aria-label={ariaLabel}
      className={classes}
      style={reduce ? undefined : { x: sx, y: sy }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      {...externalProps}
    >
      {children}
      {external && (
        <ArrowUpRight
          className="h-4 w-4 opacity-70 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      )}
    </motion.a>
  );
}
