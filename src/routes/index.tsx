import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/sections/Hero";
import { AboutSection } from "@/components/sections/AboutSection";
import { FounderSection } from "@/components/sections/FounderSection";
import { Testimonials } from "@/components/sections/Testimonials";
import { Section, SectionHeading } from "@/components/ui-kit/Section";
import { Stagger } from "@/components/motion/Reveal";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { NewsCard } from "@/components/cards/NewsCard";
import { useSiteContent } from "@/store/site-content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Drawvax Infotech — Client Satisfaction is Our Signature" },
      {
        name: "description",
        content:
          "Front-end development, UI/UX design, SEO and digital marketing from Drawvax Infotech. Premium, fast, animated digital experiences.",
      },
      { property: "og:title", content: "Drawvax Infotech — Client Satisfaction is Our Signature" },
      {
        property: "og:description",
        content: "A front-end engineering and digital growth studio building interfaces that convert.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const { content } = useSiteContent();

  return (
    <>
      <Hero />
      <AboutSection />
      <FounderSection />

      <Section id="services">
        <SectionHeading
          eyebrow="What we do"
          title={
            <>
              Services built to make you <span className="gradient-text">unmissable</span>
            </>
          }
          subtitle="Strategy, design, engineering and growth under one roof — so nothing gets lost between teams."
        />
        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {content.services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </Stagger>
      </Section>

      <Testimonials />

      <Section id="news">
        <SectionHeading
          eyebrow="News & Updates"
          title={
            <>
              Latest from the <span className="gradient-text">studio</span>
            </>
          }
        />
        <Stagger className="mt-12 grid gap-5 md:grid-cols-2">
          {content.news.slice(0, 2).map((post) => (
            <NewsCard key={post.id} post={post} />
          ))}
        </Stagger>
        <div className="mt-8 text-center">
          <Link to="/news" className="glass inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold">
            All updates <ArrowRight className="size-4 text-primary" />
          </Link>
        </div>
      </Section>

      <Section>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="glass relative overflow-hidden rounded-[2rem] px-6 py-16 text-center sm:px-12"
        >
          <div
            aria-hidden
            className="absolute inset-0 opacity-25"
            style={{ background: "var(--gradient-accent)" }}
          />
          <div className="relative">
            <h2 className="font-display text-3xl font-bold text-balance sm:text-5xl">
              Let's build something your users remember
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Tell us about your project and we'll come back with a plan, a timeline and a fixed quote
              within two business days.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} className="mt-8 inline-block">
              <Link
                to="/contact"
                className="gradient-accent glow-ring inline-flex items-center gap-2 rounded-xl px-7 py-4 text-sm font-semibold text-primary-foreground"
              >
                Get a Free Quote <ArrowRight className="size-4" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </Section>
    </>
  );
}
