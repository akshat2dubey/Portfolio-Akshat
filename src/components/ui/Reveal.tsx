import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Direction the content travels from */
  from?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  className?: string;
  once?: boolean;
}

const OFFSET: Record<NonNullable<RevealProps["from"]>, { x: number; y: number }> = {
  up: { x: 0, y: 28 },
  down: { x: 0, y: -28 },
  left: { x: 32, y: 0 },
  right: { x: -32, y: 0 },
  none: { x: 0, y: 0 },
};

export function Reveal({
  children,
  from = "up",
  delay = 0,
  className,
  once = true,
}: RevealProps) {
  const reduce = useReducedMotion();
  const offset = reduce ? { x: 0, y: 0 } : OFFSET[from];

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: "-60px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
