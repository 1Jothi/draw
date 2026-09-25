import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  Code2,
  Megaphone,
  PenTool,
  Search,
  Smartphone,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { TiltCard } from "@/components/motion/TiltCard";
import { staggerChild } from "@/components/motion/Reveal";
import type { Service } from "@/data/content";

const icons: Record<string, LucideIcon> = {
  Code2,
  PenTool,
  Megaphone,
  Search,
  Smartphone,
  Sparkles,
};

export function ServiceCard({ service }: { service: Service }) {
  const Icon = icons[service.icon] ?? Sparkles;

  return (
    <motion.div variants={staggerChild}>
      <TiltCard className="h-full">
        <div className="glass group relative flex h-full flex-col overflow-hidden rounded-3xl p-6 transition-shadow duration-500 hover:shadow-[0_0_60px_-20px_color-mix(in_oklab,var(--primary)_75%,transparent)]">
          <div
            aria-hidden
            className="absolute -top-16 -right-16 size-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-60"
            style={{ background: "var(--gradient-accent)" }}
          />
          <motion.span
            whileHover={{ rotate: 8, scale: 1.08 }}
            className="gradient-accent grid size-12 place-items-center rounded-2xl text-primary-foreground"
          >
            <Icon className="size-5.5" />
          </motion.span>
          <h3 className="mt-5 text-xl font-semibold">{service.title}</h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{service.short}</p>
          <p className="mt-4 text-xs text-muted-foreground">
            From <span className="font-semibold text-foreground">{service.priceFrom}</span>
          </p>
          <Link
            to="/services/$slug"
            params={{ slug: service.slug }}
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold gradient-text"
          >
            Learn More <ArrowUpRight className="size-4 text-primary" />
          </Link>
        </div>
      </TiltCard>
    </motion.div>
  );
}
