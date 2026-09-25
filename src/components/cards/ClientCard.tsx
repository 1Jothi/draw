import { motion } from "motion/react";
import { staggerChild } from "@/components/motion/Reveal";
import type { Client } from "@/data/content";

/** Flip card — hover (or tap on mobile) reveals collaboration details. */
export function ClientCard({ client }: { client: Client }) {
  return (
    <motion.div variants={staggerChild} className="group h-64 [perspective:1200px]">
      <div className="relative size-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus-within:[transform:rotateY(180deg)]">
        <div className="glass absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-3xl p-6 text-center [backface-visibility:hidden]">
          <span className="gradient-accent grid size-16 place-items-center rounded-2xl font-display text-lg font-bold text-primary-foreground">
            {client.name.slice(0, 1)}
          </span>
          <h3 className="text-lg font-semibold">{client.name}</h3>
          <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">{client.industry}</p>
          <p className="text-sm text-muted-foreground">{client.details}</p>
        </div>
        <div className="glass absolute inset-0 flex flex-col justify-center gap-3 rounded-3xl p-6 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <p className="text-xs font-semibold tracking-[0.18em] gradient-text uppercase">
            Collaboration
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">{client.collaboration}</p>
          <p className="text-xs text-muted-foreground">Partner since {client.since}</p>
        </div>
      </div>
    </motion.div>
  );
}
