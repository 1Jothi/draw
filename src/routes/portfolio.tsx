import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "@/components/ui-kit/PageHeader";
import { Section } from "@/components/ui-kit/Section";
import { PortfolioCard } from "@/components/cards/PortfolioCard";
import { useSiteContent } from "@/store/site-content";
import { portfolioCategories, type PortfolioItem } from "@/data/content";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — Selected Work | Drawvax Infotech" },
      {
        name: "description",
        content:
          "Dashboards, storefronts, campaigns and brand systems delivered by Drawvax Infotech for clients across fintech, retail, health and logistics.",
      },
      { property: "og:title", content: "Portfolio | Drawvax Infotech" },
      { property: "og:description", content: "Selected web, marketing, SEO and branding projects." },
    ],
  }),
  component: PortfolioPage,
});

function PortfolioPage() {
  const { content } = useSiteContent();
  const [filter, setFilter] = useState<string>("All");
  const [active, setActive] = useState<PortfolioItem | null>(null);

  const items =
    filter === "All" ? content.portfolio : content.portfolio.filter((item) => item.category === filter);

  return (
    <>
      <PageHeader
        eyebrow="Portfolio"
        title={
          <>
            Work we're <span className="gradient-text">proud to sign</span>
          </>
        }
        subtitle="A selection of recent engagements. Click any project to see the detail, the stack and the outcome."
      />

      <Section>
        <div className="flex flex-wrap justify-center gap-2">
          {portfolioCategories.map((category) => (
            <motion.button
              key={category}
              type="button"
              onClick={() => setFilter(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className={
                filter === category
                  ? "gradient-accent rounded-xl px-5 py-2.5 text-sm font-semibold text-primary-foreground"
                  : "glass-soft rounded-xl px-5 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground"
              }
            >
              {category}
            </motion.button>
          ))}
        </div>

        <motion.div layout className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <PortfolioCard key={item.id} item={item} onOpen={setActive} />
            ))}
          </AnimatePresence>
        </motion.div>
      </Section>

      <AnimatePresence>
        {active ? (
          <motion.div
            className="fixed inset-0 z-[100] grid place-items-center bg-background/80 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 240, damping: 24 }}
              onClick={(event) => event.stopPropagation()}
              className="glass max-h-[86vh] w-full max-w-3xl overflow-y-auto rounded-[2rem]"
            >
              <div className="relative">
                <img src={active.image} alt={active.title} className="aspect-[16/9] w-full object-cover" />
                <button
                  type="button"
                  aria-label="Close"
                  onClick={() => setActive(null)}
                  className="glass absolute top-4 right-4 grid size-10 place-items-center rounded-xl"
                >
                  <X className="size-4" />
                </button>
              </div>
              <div className="p-7">
                <span className="glass-soft rounded-full px-3 py-1 text-xs">{active.category}</span>
                <h2 className="mt-4 font-display text-2xl font-bold sm:text-3xl">{active.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {active.client} · {active.year}
                </p>
                <p className="mt-5 leading-relaxed text-muted-foreground">{active.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {active.tech.map((tech) => (
                    <span key={tech} className="glass-soft rounded-lg px-3 py-1.5 text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
