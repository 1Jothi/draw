import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  Briefcase,
  Code2,
  Megaphone,
  PenTool,
  Search,
  Smartphone,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import { TiltCard } from "@/components/motion/TiltCard";
import { staggerChild } from "@/components/motion/Reveal";

export const serviceIcons: Record<string, LucideIcon> = {
  Code2,
  PenTool,
  Megaphone,
  Search,
  Smartphone,
  Sparkles,
  Users,
  Briefcase,
};

/** Generic hierarchy card used for categories, sub-categories and services. */
export function HierarchyCard({
  icon = "Sparkles",
  title,
  text,
  meta,
  link,
  animatedIcon = false,
}: {
  icon?: string;
  title: string;
  text: string;
  meta?: string;
  link: ReactNode;
  animatedIcon?: boolean;
}) {
  const Icon = serviceIcons[icon] ?? Sparkles;
  return (
    <motion.div variants={staggerChild} className="min-w-0">
      <TiltCard className="h-full">
        <div className="glass group relative flex h-full flex-col overflow-hidden rounded-3xl p-6 transition-shadow duration-500 hover:shadow-[0_0_60px_-20px_color-mix(in_oklab,var(--primary)_75%,transparent)]">
          <div
            aria-hidden
            className="absolute -top-16 -right-16 size-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-60"
            style={{ background: "var(--gradient-accent)" }}
          />
          <motion.span
            {...(animatedIcon
              ? {
                  animate: { y: [0, -6, 0], rotate: [0, 6, 0] },
                  transition: { duration: 3.2, repeat: Infinity, ease: "easeInOut" as const },
                }
              : {})}
            className="gradient-accent grid size-12 place-items-center rounded-2xl text-primary-foreground"
          >
            <Icon className="size-5.5" />
          </motion.span>
          <h3 className="mt-5 text-xl font-semibold">{title}</h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
          {meta ? <p className="mt-4 text-xs text-muted-foreground">{meta}</p> : null}
          <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold gradient-text">
            {link} <ArrowUpRight className="size-4 text-primary" />
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

export function CategoryLink({ slug, children }: { slug: string; children: ReactNode }) {
  return (
    <Link to="/services/$category" params={{ category: slug }} className="after:absolute after:inset-0">
      {children}
    </Link>
  );
}
