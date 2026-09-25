import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui-kit/PageHeader";
import { Section } from "@/components/ui-kit/Section";
import { Stagger } from "@/components/motion/Reveal";
import { ClientCard } from "@/components/cards/ClientCard";
import { useSiteContent } from "@/store/site-content";

export const Route = createFileRoute("/clients")({
  head: () => ({
    meta: [
      { title: "Our Clients | Drawvax Infotech" },
      {
        name: "description",
        content:
          "The brands and teams Drawvax Infotech partners with across fintech, retail, healthcare, logistics and consumer goods.",
      },
      { property: "og:title", content: "Our Clients | Drawvax Infotech" },
      { property: "og:description", content: "Long-term partnerships built on delivery, not promises." },
    ],
  }),
  component: ClientsPage,
});

function ClientsPage() {
  const { content } = useSiteContent();

  return (
    <>
      <PageHeader
        eyebrow="Clients"
        title={
          <>
            Partnerships that <span className="gradient-text">keep renewing</span>
          </>
        }
        subtitle="Hover any card to see how we work together. Most of our clients have been with us for more than two years."
      />
      <Section>
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {content.clients.map((client) => (
            <ClientCard key={client.id} client={client} />
          ))}
        </Stagger>
      </Section>
    </>
  );
}
