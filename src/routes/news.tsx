import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui-kit/PageHeader";
import { Section } from "@/components/ui-kit/Section";
import { Stagger } from "@/components/motion/Reveal";
import { NewsCard } from "@/components/cards/NewsCard";
import { useSiteContent } from "@/store/site-content";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News & Updates | Drawvax Infotech" },
      {
        name: "description",
        content:
          "Announcements, launches and milestones from the Drawvax Infotech studio — new services, client projects and team news.",
      },
      { property: "og:title", content: "News & Updates | Drawvax Infotech" },
      { property: "og:description", content: "The latest from the Drawvax Infotech studio." },
    ],
  }),
  component: NewsPage,
});

function NewsPage() {
  const { news, loading } = useSiteContent();

  return (
    <>
      <PageHeader
        eyebrow="News & Updates"
        title={
          <>
            What's happening at <span className="gradient-text">Drawvax</span>
          </>
        }
        subtitle="Launches, new services and team milestones. The most recent entry also powers the update popup in the header."
      />
      <Section>
        <Stagger className="grid gap-6 md:grid-cols-2">
          {news.map((post) => (
            <NewsCard key={post.id} post={post} />
          ))}
        </Stagger>
        {!loading && news.length === 0 ? (
          <p className="glass-soft mx-auto max-w-lg rounded-2xl px-5 py-8 text-center text-sm text-muted-foreground">
            No updates yet — check back soon.
          </p>
        ) : null}
      </Section>
    </>
  );
}
