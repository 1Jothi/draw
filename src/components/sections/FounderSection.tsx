import { motion } from "motion/react";
import { Linkedin, Mail, Quote } from "lucide-react";
import { Section } from "@/components/ui-kit/Section";
import { useSiteContent } from "@/store/site-content";

export function FounderSection() {
  const { content } = useSiteContent();
  const founder = content.founder;

  return (
    <Section id="founder">
      <motion.div
        initial={{ opacity: 0, y: 46, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="glass grid gap-10 rounded-[2rem] p-6 sm:p-10 lg:grid-cols-[minmax(0,22rem)_1fr] lg:items-center"
      >
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="group relative mx-auto w-full max-w-sm"
        >
          <div className="gradient-accent absolute -inset-1 rounded-[1.6rem] opacity-40 blur-lg transition-opacity duration-500 group-hover:opacity-90" />
          <img
            src={founder.photo}
            alt={`${founder.name}, ${founder.title}`}
            loading="lazy"
            width={912}
            height={1104}
            className="relative aspect-[4/5] w-full rounded-[1.5rem] object-cover"
          />
        </motion.div>

        <div>
          <span className="glass-soft inline-flex rounded-full px-4 py-1.5 text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Meet the Founder
          </span>
          <h2 className="mt-5 font-display text-3xl font-bold sm:text-4xl">{founder.name}</h2>
          <p className="mt-1 text-sm font-medium gradient-text">{founder.title}</p>
          <p className="mt-5 leading-relaxed text-muted-foreground">{founder.bio}</p>

          <div className="glass-soft mt-6 rounded-2xl p-5">
            <Quote className="size-5 text-primary" />
            <p className="mt-2 font-display text-lg leading-snug font-medium">“{founder.quote}”</p>
            <p className="mt-2 text-xs text-muted-foreground">— {founder.name}</p>
          </div>

          <div className="mt-6 flex gap-3">
            <motion.a
              whileHover={{ y: -4, scale: 1.05 }}
              href={founder.linkedin}
              target="_blank"
              rel="noreferrer"
              className="glass-soft inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium"
            >
              <Linkedin className="size-4 text-primary" /> LinkedIn
            </motion.a>
            <motion.a
              whileHover={{ y: -4, scale: 1.05 }}
              href={`mailto:${founder.email}`}
              className="glass-soft inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium"
            >
              <Mail className="size-4 text-primary" /> {founder.email}
            </motion.a>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
