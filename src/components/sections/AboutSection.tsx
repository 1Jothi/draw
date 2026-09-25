import { animate, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Section, SectionHeading } from "@/components/ui-kit/Section";
import { Reveal, Stagger, staggerChild } from "@/components/motion/Reveal";
import { processSteps } from "@/data/content";
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
    <span ref={ref} className="font-display text-4xl font-bold gradient-text sm:text-5xl">
      {display}
      {suffix}
    </span>
  );
}

export function AboutSection() {
  const { content } = useSiteContent();

  return (
    <Section id="about">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeading
            align="left"
            eyebrow="About Drawvax"
            title={content.settings.aboutTitle}
            subtitle={content.settings.aboutBody}
          />
        </div>
        <Stagger className="grid grid-cols-2 gap-4">
          {content.settings.stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={staggerChild}
              className="glass rounded-3xl p-6 text-center"
            >
              <Counter value={stat.value} suffix={stat.suffix} />
              <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </Stagger>
      </div>

      {/* Client logo marquee */}
      <Reveal className="mt-20" direction="up">
        <p className="text-center text-xs font-semibold tracking-[0.22em] text-muted-foreground uppercase">
          Trusted by teams who care about detail
        </p>
        <div className="relative mt-6 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
          <div className="animate-marquee flex w-max gap-4">
            {[...content.clients, ...content.clients].map((client, index) => (
              <div
                key={`${client.id}-${index}`}
                className="glass-soft grid h-20 w-48 place-items-center rounded-2xl font-display text-sm font-bold tracking-[0.25em] text-muted-foreground transition-all duration-300 hover:scale-105 hover:text-foreground hover:shadow-[0_0_38px_-8px_color-mix(in_oklab,var(--primary)_60%,transparent)]"
              >
                {client.logoText}
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
              Four steps from idea to <span className="gradient-text">impact</span>
            </>
          }
        />
        <Stagger className="mt-12 grid gap-5 md:grid-cols-4">
          {processSteps.map((step) => (
            <motion.div key={step.step} variants={staggerChild} className="glass relative rounded-3xl p-6">
              <span className="font-display text-5xl font-bold text-primary/25">{step.step}</span>
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
