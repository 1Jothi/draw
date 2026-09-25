import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui-kit/PageHeader";
import { Section } from "@/components/ui-kit/Section";
import { Stagger, staggerChild } from "@/components/motion/Reveal";
import { motion } from "motion/react";
import { ReviewCard } from "@/components/cards/ReviewCard";
import { Testimonials } from "@/components/sections/Testimonials";
import { useSiteContent } from "@/store/site-content";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Client Reviews & Testimonials | Drawvax Infotech" },
      {
        name: "description",
        content:
          "Read verified client reviews of Drawvax Infotech and leave your own. Client satisfaction is our signature.",
      },
      { property: "og:title", content: "Client Reviews | Drawvax Infotech" },
      { property: "og:description", content: "What our clients say about working with Drawvax Infotech." },
    ],
  }),
  component: ReviewsPage,
});

function ReviewsPage() {
  const { content } = useSiteContent();
  const approved = content.reviews.filter((review) => review.status === "approved");
  const average = approved.length
    ? (approved.reduce((sum, review) => sum + review.rating, 0) / approved.length).toFixed(1)
    : "—";

  return (
    <>
      <PageHeader
        eyebrow="Reviews"
        title={
          <>
            Rated <span className="gradient-text">{average}/5</span> by our clients
          </>
        }
        subtitle="Every review below comes from a real engagement. New reviews are published after a quick verification."
      />
      <Testimonials />
      <Section>
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {approved.map((review) => (
            <motion.div key={review.id} variants={staggerChild}>
              <ReviewCard review={review} />
            </motion.div>
          ))}
        </Stagger>
      </Section>
    </>
  );
}
