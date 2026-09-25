import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { PageHeader } from "@/components/ui-kit/PageHeader";
import { Section, SectionHeading } from "@/components/ui-kit/Section";
import { Reveal, Stagger, staggerChild } from "@/components/motion/Reveal";
import { PortfolioCard } from "@/components/cards/PortfolioCard";
import { useSiteContent } from "@/store/site-content";
import { initialContent } from "@/data/content";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = initialContent.services.find((item) => item.slug === params.slug);
    if (!service) throw notFound();
    return { title: service.title, short: service.short };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Service not found" }, { name: "robots", content: "noindex" }] };
    }
    return {
      meta: [
        { title: `${loaderData.title} | Drawvax Infotech` },
        { name: "description", content: loaderData.short },
        { property: "og:title", content: `${loaderData.title} | Drawvax Infotech` },
        { property: "og:description", content: loaderData.short },
      ],
    };
  },
  component: ServiceDetail,
});

function ServiceDetail() {
  const { slug } = Route.useParams();
  const { content } = useSiteContent();
  const service = content.services.find((item) => item.slug === slug) ?? content.services[0];
  const related = content.portfolio.slice(0, 3);

  if (!service) return null;


  return (
    <>
      <PageHeader eyebrow={service.title} title={service.title} subtitle={service.description} />

      <Section>
        <Reveal direction="scale">
          <div className="glass overflow-hidden rounded-[2rem]">
            {/* Walkthrough media — swap for a <video> when a real clip is available. */}
            <img
              src={service.media}
              alt={`${service.title} walkthrough`}
              loading="lazy"
              className="aspect-[16/9] w-full object-cover"
            />
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <Reveal direction="left">
            <div className="glass h-full rounded-3xl p-7">
              <h3 className="text-xl font-semibold">What's included</h3>
              <ul className="mt-5 space-y-3">
                {service.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-sm text-muted-foreground">
                    <span className="gradient-accent mt-0.5 grid size-5 shrink-0 place-items-center rounded-full text-primary-foreground">
                      <Check className="size-3" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal direction="right">
            <div className="glass h-full rounded-3xl p-7">
              <h3 className="text-xl font-semibold">Why it matters</h3>
              <ul className="mt-5 space-y-4">
                {service.benefits.map((benefit) => (
                  <li key={benefit} className="glass-soft rounded-2xl px-4 py-3 text-sm">
                    {benefit}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-muted-foreground">
                Engagements start from{" "}
                <span className="font-semibold text-foreground">{service.priceFrom}</span>.
              </p>
              <motion.div whileHover={{ scale: 1.03 }} className="mt-5 inline-block">
                <Link
                  to="/contact"
                  className="gradient-accent inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-primary-foreground"
                >
                  Request a quote <ArrowRight className="size-4" />
                </Link>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Related work"
          title={
            <>
              Projects where this <span className="gradient-text">made the difference</span>
            </>
          }
        />
        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((item) => (
            <motion.div key={item.id} variants={staggerChild}>
              <PortfolioCard item={item} onOpen={() => undefined} />
            </motion.div>
          ))}
        </Stagger>
        <div className="mt-10 text-center">
          <Link to="/services" className="glass inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold">
            <ArrowLeft className="size-4 text-primary" /> All services
          </Link>
        </div>
      </Section>
    </>
  );
}
