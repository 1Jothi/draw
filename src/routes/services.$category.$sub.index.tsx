import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui-kit/PageHeader";
import { Section } from "@/components/ui-kit/Section";
import { Stagger } from "@/components/motion/Reveal";
import { HierarchyCard } from "@/components/cards/ServiceCard";
import { Breadcrumbs } from "@/components/services/Breadcrumbs";
import { NotFoundBlock } from "@/components/services/NotFoundBlock";
import { useSiteContent } from "@/store/site-content";

export const Route = createFileRoute("/services/$category/$sub/")({
  head: () => ({
    meta: [
      { title: "Services List | Drawvax Infotech" },
      { name: "description", content: "Individual services offered by Drawvax Infotech in this area." },
      { property: "og:title", content: "Services List | Drawvax Infotech" },
      { property: "og:description", content: "Individual services offered by Drawvax Infotech." },
    ],
  }),
  component: SubCategoryPage,
});

function SubCategoryPage() {
  const { category: cSlug, sub: sSlug } = Route.useParams();
  const { content } = useSiteContent();
  const category = content.services.find((c) => c.slug === cSlug);
  const sub = category?.subcategories.find((s) => s.slug === sSlug);
  if (!category || !sub) return <NotFoundBlock />;

  return (
    <>
      <PageHeader eyebrow={category.title} title={<span className="gradient-text">{sub.title}</span>} subtitle={sub.short} />
      <Section>
        <Breadcrumbs
          items={[
            { label: "Services", to: "/services" },
            { label: category.title, to: "/services/$category", params: { category: category.slug } },
            { label: sub.title },
          ]}
        />
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sub.services.map((service) => (
            <HierarchyCard
              key={service.id}
              icon={category.icon}
              title={service.title}
              text={service.short}
              link={
                <Link
                  to="/services/$category/$sub/$service"
                  params={{ category: category.slug, sub: sub.slug, service: service.slug }}
                  className="after:absolute after:inset-0"
                >
                  Details
                </Link>
              }
            />
          ))}
        </Stagger>
      </Section>
    </>
  );
}
