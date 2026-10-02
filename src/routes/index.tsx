import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/sections/Hero";
import { AboutSection } from "@/components/sections/AboutSection";
import { FounderSection } from "@/components/sections/FounderSection";
import { Testimonials } from "@/components/sections/Testimonials";
import { Section, SectionHeading } from "@/components/ui-kit/Section";
import { Stagger } from "@/components/motion/Reveal";
import { CategoryLink, HierarchyCard } from "@/components/cards/ServiceCard";
import { POWER_TAGLINE, SLOGAN } from "@/data/content";
import { NewsCard } from "@/components/cards/NewsCard";
import { useSiteContent } from "@/store/site-content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Drawvax Infotech — Client Satisfaction. Company Satisfaction." },
      {
        name: "description",
        content:
          "Websites, apps, digital marketing, branding and manpower support from Drawvax Infotech — 5+ years, 130 projects, clients in India and Kuwait.",
      },
      { property: "og:title", content: "Drawvax Infotech — Client Satisfaction. Company Satisfaction." },
      {
        property: "og:description",
        content: "A front-end engineering and digital growth studio building interfaces that convert.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const { content, news, loading } = useSiteContent();

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
          subtitle="Technical services, marketing & creative, and manpower support — all under one roof."
        />
        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {content.services.map((category) => (
            <HierarchyCard
              key={category.id}
              icon={category.icon}
              title={category.title}
              text={category.short}
              meta={`${category.subcategories.length} sub-categories`}
              animatedIcon
              link={<CategoryLink slug={category.slug}>Explore</CategoryLink>}
            />
          ))}
        </Stagger>
      </Section>

      <Testimonials showPreview />

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
          {news.slice(0, 2).map((post) => (
            <NewsCard key={post.id} post={post} />
          ))}
        </Stagger>
        {!loading && news.length === 0 ? (
          <p className="glass-soft mx-auto mt-6 max-w-lg rounded-2xl px-5 py-6 text-center text-sm text-muted-foreground">
            Fresh updates from the studio are coming soon.
          </p>
        ) : null}
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
              {content.settings.ctaHeadline}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">{content.settings.ctaText}</p>
            <p className="mx-auto mt-5 max-w-xl font-display text-base font-semibold sm:text-lg">{POWER_TAGLINE}</p>
            <motion.div whileHover={{ scale: 1.05 }} className="mt-8 inline-block">
              <Link
                to="/contact"
                className="gradient-accent glow-ring inline-flex items-center gap-2 rounded-xl px-7 py-4 text-sm font-semibold text-primary-foreground"
              >
                Get a Free Quote <ArrowRight className="size-4" />
              </Link>
            </motion.div>
            <p className="mt-6 font-display text-lg font-semibold gradient-text sm:text-xl">{SLOGAN}</p>
          </div>
        </motion.div>
      </Section>
    </>
  );
}
