import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui-kit/PageHeader";
import { Section } from "@/components/ui-kit/Section";
import { Stagger } from "@/components/motion/Reveal";
import { ClientCard } from "@/components/cards/ClientCard";
import { useSiteContent } from "@/store/site-content";
import { useState } from "react";

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
  const [region, setRegion] = useState<"all" | "domestic" | "international">("all");
  const clients = content.clients
    .filter((client) => client.enabled !== false && (region === "all" || client.region === region))
    .sort((first, second) => (first.sortOrder ?? 0) - (second.sortOrder ?? 0));

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
        <div className="mb-6 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter clients by region">
          {(["all", "domestic", "international"] as const).map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setRegion(value)}
              aria-pressed={region === value}
              className={region === value ? "gradient-accent min-h-11 rounded-xl px-4 text-sm font-semibold text-primary-foreground" : "glass-soft min-h-11 rounded-xl px-4 text-sm text-muted-foreground"}
            >
              {value === "all" ? "All clients" : value === "domestic" ? "India" : "International"}
            </button>
          ))}
        </div>
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {clients.map((client) => (
            <ClientCard key={client.id} client={client} />
          ))}
        </Stagger>
      </Section>
    </>
  );
}
