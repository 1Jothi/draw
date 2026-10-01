import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui-kit/PageHeader";
import { Section } from "@/components/ui-kit/Section";
import { Stagger } from "@/components/motion/Reveal";
import { HierarchyCard } from "@/components/cards/ServiceCard";
import { Breadcrumbs } from "@/components/services/Breadcrumbs";
import { useSiteContent } from "@/store/site-content";
import { NotFoundBlock } from "@/components/services/NotFoundBlock";

export const Route = createFileRoute("/services/$category/")({
  head: () => ({
    meta: [
      { title: "Service Category | Drawvax Infotech" },
      { name: "description", content: "Browse sub-categories of Drawvax Infotech services." },
      { property: "og:title", content: "Service Category | Drawvax Infotech" },
      { property: "og:description", content: "Browse sub-categories of Drawvax Infotech services." },
    ],
  }),
  component: CategoryPage,
});

function CategoryPage() {
  const { category: slug } = Route.useParams();
  const { content } = useSiteContent();
  const category = content.services.find((c) => c.slug === slug);
  if (!category) return <NotFoundBlock />;

  return (
    <>
      <PageHeader eyebrow="Services" title={<span className="gradient-text">{category.title}</span>} subtitle={category.short} />
      <Section>
        <Breadcrumbs items={[{ label: "Services", to: "/services" }, { label: category.title }]} />
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {category.subcategories.map((sub) => (
            <HierarchyCard
              key={sub.id}
              icon={category.icon}
              title={sub.title}
              text={sub.short}
              meta={`${sub.services.length} services`}
              link={
                <Link
                  to="/services/$category/$sub"
                  params={{ category: category.slug, sub: sub.slug }}
                  className="after:absolute after:inset-0"
                >
                  View services
                </Link>
              }
            />
          ))}
        </Stagger>
      </Section>
    </>
  );
}
