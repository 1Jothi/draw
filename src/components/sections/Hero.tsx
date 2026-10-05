import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { SLOGAN } from "@/data/content";
import { useSiteContent } from "@/store/site-content";
import { isLovableAppUrl } from "@/lib/utils";

export function Hero() {
  const { content } = useSiteContent();
  const { settings } = content;
  const words = settings.heroHeadline.split(" ").filter(Boolean);

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-20">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <motion.span
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-soft inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase"
        >
          <Sparkles className="size-3.5 text-primary" />
          {settings.heroEyebrow}
        </motion.span>

        <h1 className="mt-7 max-w-4xl font-display text-[2.2rem] sm:text-5xl leading-[1.05] font-bold tracking-tight md:text-6xl lg:text-7xl">
          {words.map((word, index) => (
            <motion.span
              key={`${word}-${index}`}
              initial={{ opacity: 0, y: 34, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.15 + index * 0.09, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mr-[0.28em] inline-block"
            >
              {index >= words.length - 2 ? (
                <span className="gradient-text">{word}</span>
              ) : (
                word
              )}
            </motion.span>
          ))}
        </h1>

        {/* Mandatory slogan — locked */}
        <motion.p
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 font-display text-2xl font-semibold sm:text-3xl"
        >
          <span className="gradient-text">{SLOGAN}</span>
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
          {!isLovableAppUrl(settings.heroButtonLink) ? (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
              {settings.heroButtonLink.startsWith("https://") ? (
                <a href={settings.heroButtonLink} target="_blank" rel="noreferrer" className="gradient-accent glow-ring inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-primary-foreground">
                  {settings.heroButtonText} <ArrowRight className="size-4" />
                </a>
              ) : (
                <Link
                  to={settings.heroButtonLink as never}
                  className="gradient-accent glow-ring inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-primary-foreground"
                >
                  {settings.heroButtonText} <ArrowRight className="size-4" />
                </Link>
              )}
            </motion.div>
          ) : null}
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
