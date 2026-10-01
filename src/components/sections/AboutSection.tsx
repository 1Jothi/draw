import { animate, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Activity, ChevronDown } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui-kit/Section";
import { Reveal, Stagger, staggerChild } from "@/components/motion/Reveal";
import { getClientLogoUrl } from "@/data/content";
import { useSiteContent } from "@/store/site-content";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref} className="font-display text-3xl font-bold gradient-text sm:text-5xl">
      {display}
      {suffix}
    </span>
  );
}

export function AboutSection() {
  const { content } = useSiteContent();
  const { settings } = content;
  const [teamOpen, setTeamOpen] = useState(false);

  const stats = [
    { label: "Years Experience", value: settings.yearsExperience, suffix: "+" },
    { label: "Projects", value: settings.projectsCompleted, suffix: "" },
    { label: "Happy Clients", value: content.clients.length, suffix: "+" },
  ];

  return (
    <Section id="about">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-12">
        <div className="min-w-0">
          <SectionHeading
            align="left"
            eyebrow="About Drawvax"
            title={settings.aboutTitle}
            subtitle={settings.aboutBody}
          />
        </div>
        <div className="min-w-0">
          <Stagger className="grid grid-cols-2 gap-3 sm:gap-4">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={staggerChild}
                className="glass rounded-3xl p-4 text-center sm:p-6"
              >
                <Counter value={stat.value} suffix={stat.suffix} />
                <p className="mt-2 text-xs text-muted-foreground sm:text-sm">{stat.label}</p>
              </motion.div>
            ))}
            <motion.button
              type="button"
              variants={staggerChild}
              onClick={() => setTeamOpen((v) => !v)}
              onMouseEnter={() => setTeamOpen(true)}
              aria-expanded={teamOpen}
              className="glass rounded-3xl p-4 text-center sm:p-6"
            >
              <Counter value={settings.teamTotal} suffix="" />
              <p className="mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground sm:text-sm">
                Team Members
                <ChevronDown className={`size-3.5 transition-transform ${teamOpen ? "rotate-180" : ""}`} />
              </p>
            </motion.button>
          </Stagger>

          {/* Team structure — always visible on small screens, expandable card too */}
          <motion.div
            initial={false}
            animate={{ height: "auto", opacity: 1 }}
            className="glass-soft mt-3 rounded-2xl p-4 sm:mt-4"
          >
            <p className="text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">
              Team structure
            </p>
            <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {settings.teamBreakdown.map((row) => (
                <li key={row.label} className="rounded-xl bg-background/40 px-3 py-2 text-center">
                  <span className="block font-display text-lg font-bold gradient-text">{row.count}</span>
                  <span className="text-[11px] text-muted-foreground sm:text-xs">{row.label}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <div className="glass-soft mt-3 flex items-center gap-3 rounded-2xl px-4 py-3 sm:mt-4">
            <span className="relative grid size-8 shrink-0 place-items-center rounded-lg bg-primary/15 text-primary">
              <Activity className="size-4" />
            </span>
            <p className="text-sm text-muted-foreground">
              Currently <span className="font-semibold text-foreground">{settings.ongoingProjects}</span>{" "}
              ongoing projects
            </p>
          </div>
        </div>
      </div>

      {/* Client logo marquee */}
      <Reveal className="mt-20" direction="up">
        <p className="text-center text-xs font-semibold tracking-[0.22em] text-muted-foreground uppercase">
          Trusted by businesses in India & Kuwait
        </p>
        <div className="relative mt-6 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
          <div className="animate-marquee flex w-max gap-4">
            {[...content.clients, ...content.clients].map((client, index) => (
              <div
                key={`${client.id}-${index}`}
                className="glass-soft grid h-20 w-44 shrink-0 place-items-center rounded-2xl px-3 text-center text-xs font-semibold text-muted-foreground transition-all duration-300 hover:scale-105 hover:text-foreground sm:w-48"
              >
                {getClientLogoUrl(client.logo) ? (
                  <span className="block h-14 w-36 overflow-hidden rounded-xl bg-foreground p-1.5">
                    <img
                      src={getClientLogoUrl(client.logo)}
                      alt={`${client.name} logo`}
                      loading="lazy"
                      decoding="async"
                      className="block h-full w-full object-contain"
                    />
                  </span>
                ) : (
                  <span className="line-clamp-2">{client.name}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Process timeline */}
      <div className="mt-24">
        <SectionHeading
          eyebrow="Our Process"
          title={
            <>
              {content.process.length} steps from idea to <span className="gradient-text">impact</span>
            </>
          }
        />
        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {content.process.map((step) => (
            <motion.div key={step.step} variants={staggerChild} className="glass relative rounded-3xl p-6">
              <div className="flex items-baseline gap-3">
                <p className="flex items-baseline gap-2"><span className="font-display text-5xl font-bold text-primary/25">{step.step}</span><span className="text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">— {step.label}</span></p>
              </div>
              <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
              <span className="gradient-accent mt-5 block h-px w-full origin-left" />
            </motion.div>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}
