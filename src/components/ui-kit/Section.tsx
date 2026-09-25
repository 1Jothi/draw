import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";

export function Section({
  id,
  children,
  className,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("section-pad relative", className)}>
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" ? "mx-auto text-center" : "text-left")}>
      {eyebrow ? (
        <Reveal direction="up">
          <span className="glass-soft inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
            <span className="gradient-accent size-1.5 rounded-full" />
            {eyebrow}
          </span>
        </Reveal>
      ) : null}
      <Reveal direction="up" delay={0.08}>
        <h2 className="mt-5 text-3xl leading-[1.1] font-bold text-balance sm:text-4xl md:text-5xl">
          {title}
        </h2>
      </Reveal>
      {subtitle ? (
        <Reveal direction="up" delay={0.16}>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">{subtitle}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
