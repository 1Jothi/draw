import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { useSiteContent } from "@/store/site-content";

export function Hero() {
  const { content } = useSiteContent();
  const { settings } = content;

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <motion.span
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-soft inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase"
        >
          <Sparkles className="size-3.5 text-primary" />
          Front-end development & digital growth
        </motion.span>

        <h1 className="mt-7 max-w-4xl font-display text-[2.6rem] leading-[1.05] font-bold tracking-tight sm:text-6xl lg:text-7xl">
          {settings.heroHeadlineWords.map((word, index) => (
            <motion.span
              key={`${word}-${index}`}
              initial={{ opacity: 0, y: 34, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.15 + index * 0.09, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mr-[0.28em] inline-block"
            >
              {index >= settings.heroHeadlineWords.length - 2 ? (
                <span className="gradient-text">{word}</span>
              ) : (
                word
              )}
            </motion.span>
          ))}
        </h1>

        {/* Mandatory slogan — always contains "Client Satisfaction" */}
        <motion.p
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 font-display text-2xl font-semibold sm:text-3xl"
        >
          <span className="gradient-text">{settings.slogan}</span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15, duration: 0.7 }}
          className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          {settings.heroSubheading}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.35, type: "spring", stiffness: 220, damping: 18 }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
            <Link
              to="/portfolio"
              className="gradient-accent glow-ring inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-primary-foreground"
            >
              View Our Work <ArrowRight className="size-4" />
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
            <Link
              to="/contact"
              className="glass inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold"
            >
              <Play className="size-4 text-primary" /> Get a Free Quote
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.55, duration: 0.7 }}
          className="mt-14 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {content.settings.stats.map((stat) => (
            <div key={stat.label} className="glass-soft rounded-2xl px-4 py-4">
              <p className="font-display text-2xl font-bold gradient-text">
                {stat.value}
                {stat.suffix}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        aria-hidden
        className="absolute bottom-8 left-1/2 hidden h-12 w-6 -translate-x-1/2 rounded-full border border-border md:block"
      >
        <motion.span
          className="mx-auto mt-2 block size-1.5 rounded-full bg-primary"
          animate={{ y: [0, 18, 0], opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}
