import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { TiltCard } from "@/components/motion/TiltCard";
import type { PortfolioItem } from "@/data/content";

export function PortfolioCard({
  item,
  onOpen,
}: {
  item: PortfolioItem;
  onOpen: (item: PortfolioItem) => void;
}) {
  return (
    <motion.button
      type="button"
      layout
      onClick={() => onOpen(item)}
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="text-left"
    >
      <TiltCard intensity={7}>
        <div className="glass group relative overflow-hidden rounded-3xl">
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/25 to-transparent opacity-85" />
            <span className="glass-soft absolute top-4 left-4 rounded-full px-3 py-1 text-[11px] font-medium">
              {item.category}
            </span>
          </div>
          <div className="flex items-start justify-between gap-3 p-5">
            <div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                {item.client} · {item.year}
              </p>
            </div>
            <span className="gradient-accent grid size-9 shrink-0 place-items-center rounded-xl text-primary-foreground transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight className="size-4" />
            </span>
          </div>
        </div>
      </TiltCard>
    </motion.button>
  );
}
