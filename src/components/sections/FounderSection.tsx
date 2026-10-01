import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Globe, Linkedin, Mail, Phone, Quote } from "lucide-react";
import { Section } from "@/components/ui-kit/Section";
import { useSiteContent } from "@/store/site-content";

function HighlightedBio({ bio, highlight }: { bio: string; highlight: string }) {
  if (!highlight) return <>{bio}</>;
  const index = bio.toLowerCase().indexOf(highlight.toLowerCase());
  if (index < 0) return <>{bio}</>;
  return (
    <>
      {bio.slice(0, index)}
      <strong className="font-semibold gradient-text">{bio.slice(index, index + highlight.length)}</strong>
      {bio.slice(index + highlight.length)}
    </>
  );
}

export function FounderSection() {
  const { content } = useSiteContent();
  const founder = content.founder;

  return (
    <Section id="founder">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="glass mx-auto flex w-full flex-col gap-8 rounded-[2rem] p-5 sm:p-8 lg:grid lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:items-center lg:gap-10 lg:p-10"
      >
        <div className="group relative mx-auto w-full max-w-[18rem] sm:max-w-xs lg:max-w-none">
          <div className="gradient-accent absolute -inset-1 rounded-[1.6rem] opacity-40 blur-lg transition-opacity duration-500 group-hover:opacity-90" />
          <img
            src={founder.photo}
            alt={`${founder.name}, ${founder.title}`}
            loading="lazy"
            decoding="async"
            width={912}
            height={1104}
            className="relative aspect-[4/5] w-full rounded-[1.5rem] object-cover object-top"
          />
        </div>

        <div className="min-w-0 text-center lg:text-left">
          <span className="glass-soft inline-flex rounded-full px-4 py-1.5 text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Meet the Founder
          </span>
          <h2 className="mt-5 font-display text-2xl font-bold break-words sm:text-4xl">{founder.name} 😊</h2>
          <p className="mt-1 text-sm font-medium gradient-text">{founder.title}</p>
          <div className="mt-5 space-y-3 text-left text-sm leading-relaxed text-muted-foreground sm:text-base">
            {founder.bio.split(/\n\s*\n/).map((para, i) => (
              <p key={i}>
                <HighlightedBio bio={para} highlight={founder.highlight} />
              </p>
            ))}
          </div>

          {founder.highlight ? (
            <div className="relative mt-6 overflow-hidden rounded-2xl p-[1.5px]" style={{ background: "var(--gradient-accent)" }}>
              <div className="rounded-[calc(1rem-1.5px)] bg-background/90 px-5 py-4 text-center">
                <p className="text-[11px] tracking-[0.2em] text-muted-foreground uppercase">Our motive</p>
                <p className="mt-1 font-display text-xl font-bold gradient-text sm:text-2xl">“{founder.highlight}”</p>
              </div>
            </div>
          ) : null}

          <div className="glass-soft mt-6 rounded-2xl p-5 text-left">
            <Quote className="size-5 text-primary" />
            <p className="mt-2 font-display text-lg leading-snug font-medium">“{founder.quote}”</p>
            <p className="mt-2 text-xs text-muted-foreground">— Santhosh</p>
          </div>

          <div className="mt-6 grid gap-2 sm:grid-cols-2">
            <a
              href={founder.linkedin}
              target="_blank"
              rel="noreferrer"
              className="glass-soft inline-flex min-w-0 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-transform hover:-translate-y-0.5"
            >
              <Linkedin className="size-4 shrink-0 text-primary" /> LinkedIn
            </a>
            <a
              href={`mailto:${founder.email}`}
              className="glass-soft inline-flex min-w-0 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-transform hover:-translate-y-0.5"
            >
              <Mail className="size-4 shrink-0 text-primary" /> <span className="truncate">{founder.email}</span>
            </a>
            <a
              href={`tel:${founder.phone.replace(/\s/g, "")}`}
              className="glass-soft inline-flex min-w-0 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-transform hover:-translate-y-0.5"
            >
              <Phone className="size-4 shrink-0 text-primary" /> <span className="truncate">{founder.phone}</span>
            </a>
            {founder.website ? (
              <a
                href={founder.website}
                target="_blank"
                rel="noreferrer"
                className="glass-soft inline-flex min-w-0 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-transform hover:-translate-y-0.5"
              >
                <Globe className="size-4 shrink-0 text-primary" /> <span className="truncate">Official website</span>
              </a>
            ) : null}
          </div>

          <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm lg:justify-start">
            <Link to="/portfolio" className="inline-flex items-center gap-1 font-semibold gradient-text">
              See Portfolio <ArrowRight className="size-4 text-primary" />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-1 font-semibold gradient-text">
              Contact Santhosh <ArrowRight className="size-4 text-primary" />
            </Link>
          </div>
          <p className="mt-4 text-xs text-muted-foreground italic">{founder.credit}</p>
        </div>
      </motion.div>
    </Section>
  );
}
