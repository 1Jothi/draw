import { motion } from "motion/react";
import { CalendarDays } from "lucide-react";
import { staggerChild } from "@/components/motion/Reveal";
import type { NewsPost } from "@/data/content";

export function NewsCard({ post }: { post: NewsPost }) {
  return (
    <motion.article variants={staggerChild} className="glass overflow-hidden rounded-3xl">
      {post.image ? (
        <div className="aspect-[16/7] overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            loading="lazy"
            className="size-full object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>
      ) : null}
      <div className="p-6">
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span className="glass-soft rounded-full px-3 py-1 font-medium text-foreground">{post.tag}</span>
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="size-3.5" />
            {new Date(post.date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
        <h3 className="mt-3 text-xl font-semibold">{post.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground/80">{post.body}</p>
      </div>
    </motion.article>
  );
}
