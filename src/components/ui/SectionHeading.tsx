import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: SectionHeadingProps) {
  const alignCls = align === "center" ? "items-center text-center" : "items-start text-left";
  return (
    <Reveal className={`flex flex-col gap-4 ${alignCls} mb-14`}>
      <span className="eyebrow flex items-center gap-3">
        <span className="inline-block h-px w-8 bg-cyan-glow/60" aria-hidden="true" />
        {eyebrow}
        {align === "center" && (
          <span className="inline-block h-px w-8 bg-cyan-glow/60" aria-hidden="true" />
        )}
      </span>
      <h2 className="font-display text-3xl font-bold tracking-tight text-body sm:text-4xl lg:text-[2.6rem]">
        {title}
      </h2>
      {subtitle && <p className="max-w-2xl text-[0.98rem] leading-relaxed text-muted">{subtitle}</p>}
    </Reveal>
  );
}
