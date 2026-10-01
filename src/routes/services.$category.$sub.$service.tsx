import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import { PageHeader } from "@/components/ui-kit/PageHeader";
import { Section } from "@/components/ui-kit/Section";
import { Breadcrumbs } from "@/components/services/Breadcrumbs";
import { NotFoundBlock } from "@/components/services/NotFoundBlock";
import { useSiteContent } from "@/store/site-content";

export const Route = createFileRoute("/services/$category/$sub/$service")({
  head: () => ({
    meta: [
      { title: "Service Details | Drawvax Infotech" },
      { name: "description", content: "What's included, how we work and how to get started with Drawvax Infotech." },
      { property: "og:title", content: "Service Details | Drawvax Infotech" },
      { property: "og:description", content: "What's included and how to get started." },
    ],
  }),
  component: ServiceDetail,
});

const isVideo = (url: string) => /\.(mp4|webm|mov)(\?|$)/i.test(url);

function ServiceDetail() {
  const params = Route.useParams();
  const { content } = useSiteContent();
  const category = content.services.find((c) => c.slug === params.category);
  const sub = category?.subcategories.find((s) => s.slug === params.sub);
  const service = sub?.services.find((s) => s.slug === params.service);
  if (!category || !sub || !service) return <NotFoundBlock />;

  return (
    <>
      <PageHeader eyebrow={sub.title} title={<span className="gradient-text">{service.title}</span>} subtitle={service.short} />
      <Section>
        <Breadcrumbs
          items={[
            { label: "Services", to: "/services" },
            { label: category.title, to: "/services/$category", params: { category: category.slug } },
            { label: sub.title, to: "/services/$category/$sub", params: { category: category.slug, sub: sub.slug } },
            { label: service.title },
          ]}
        />
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass min-w-0 rounded-3xl p-6 sm:p-8"
          >
            {service.media ? (
              isVideo(service.media) ? (
                <video src={service.media} controls preload="none" playsInline className="mb-6 aspect-video w-full rounded-2xl object-cover" />
              ) : (
                <img src={service.media} alt={service.title} loading="lazy" decoding="async" className="mb-6 aspect-video w-full rounded-2xl object-cover" />
              )
            ) : null}
            <h2 className="font-display text-2xl font-bold">Overview</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">{service.description}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass min-w-0 rounded-3xl p-6 sm:p-8"
          >
            <h2 className="font-display text-xl font-bold">What's included</h2>
            <ul className="mt-4 space-y-3">
              {service.features.map((feature) => (
                <li key={feature} className="flex gap-3 text-sm text-muted-foreground">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" /> {feature}
                </li>
              ))}
            </ul>
            <Link
              to="/contact"
              className="gradient-accent mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-primary-foreground"
            >
              Discuss this service <ArrowRight className="size-4" />
            </Link>
          </motion.div>
        </div>
      </Section>
    </>
  );
}
