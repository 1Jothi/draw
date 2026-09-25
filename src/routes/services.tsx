import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui-kit/PageHeader";
import { Section } from "@/components/ui-kit/Section";
import { Stagger } from "@/components/motion/Reveal";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { useSiteContent } from "@/store/site-content";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Web, UI/UX, SEO & Marketing | Drawvax Infotech" },
      {
        name: "description",
        content:
          "Web development, UI/UX design, digital marketing, SEO, app development and brand identity from Drawvax Infotech.",
      },
      { property: "og:title", content: "Services | Drawvax Infotech" },
      {
        property: "og:description",
        content: "Strategy, design, engineering and growth under one roof.",
      },
    ],
  }),
  component: ServicesLayout,
});

function ServicesLayout() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const isDetail = pathname !== "/services" && pathname !== "/services/";

  // Child service-detail routes render through <Outlet />.
  if (isDetail) return <Outlet />;

  return <ServicesIndex />;
}

function ServicesIndex() {
  const { content } = useSiteContent();

  return (
    <>
      <PageHeader
        eyebrow="Services"
        title={
          <>
            Everything you need to launch, <span className="gradient-text">and keep growing</span>
          </>
        }
        subtitle="Six core capabilities, one accountable team. Pick a service to see how we work, what you get and what it costs."
      />
      <Section>
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {content.services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </Stagger>
      </Section>
    </>
  );
}
