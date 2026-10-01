import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui-kit/PageHeader";
import { Section } from "@/components/ui-kit/Section";
import { Stagger } from "@/components/motion/Reveal";
import { CategoryLink, HierarchyCard } from "@/components/cards/ServiceCard";
import { useSiteContent } from "@/store/site-content";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services | Drawvax Infotech" },
      {
        name: "description",
        content:
          "Technical services, non-technical marketing & creative services, and manpower & business support from Drawvax Infotech.",
      },
      { property: "og:title", content: "Services | Drawvax Infotech" },
      { property: "og:description", content: "Technical, non-technical and manpower services under one roof." },
    ],
  }),
  component: ServicesIndex,
});

function ServicesIndex() {
  const { content } = useSiteContent();
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title={
          <>
            Everything your business needs to <span className="gradient-text">grow</span>
          </>
        }
        subtitle="Choose a category to explore its sub-categories and individual services."
      />
      <Section>
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
    </>
  );
}
