import { createFileRoute } from "@tanstack/react-router";
import { AboutSection } from "@/components/sections/AboutSection";
import { FounderSection } from "@/components/sections/FounderSection";
import { PageHeader } from "@/components/ui-kit/PageHeader";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Drawvax Infotech — Our Story & Team" },
      {
        name: "description",
        content:
          "Eight years, 240+ projects and one obsession: client satisfaction. Meet the studio and the founder behind Drawvax Infotech.",
      },
      { property: "og:title", content: "About Drawvax Infotech" },
      {
        property: "og:description",
        content: "The story, process and people behind Drawvax Infotech.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title={
          <>
            We build with care, and we <span className="gradient-text">finish what we start</span>
          </>
        }
        subtitle="Drawvax Infotech is a team of engineers, designers and marketers who believe great software is equal parts craft and accountability."
      />
      <AboutSection />
      <FounderSection />
    </>
  );
}
