import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Section, SectionHeading } from "@/components/ui-kit/Section";
import { ReviewCard, Stars } from "@/components/cards/ReviewCard";
import { Reveal } from "@/components/motion/Reveal";
import { useSiteContent } from "@/store/site-content";
import { api } from "@/data/api";

export function Testimonials({ withForm = true }: { withForm?: boolean }) {
  const { content, addReview } = useSiteContent();
  const approved = content.reviews.filter((review) => review.status === "approved");
  const [index, setIndex] = useState(0);
  const [form, setForm] = useState({ name: "", company: "", rating: 5, comment: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (approved.length < 2) return;
    const timer = setInterval(() => setIndex((value) => (value + 1) % approved.length), 6000);
    return () => clearInterval(timer);
  }, [approved.length]);

  const current = approved[index % Math.max(approved.length, 1)];

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!form.name.trim() || form.comment.trim().length < 10) {
      toast.error("Add your name and a comment of at least 10 characters.");
      return;
    }
    // TODO: connect to backend — new reviews should be stored as "pending" for moderation
    const review = await api.submitReview(form);
    addReview(review);
    setSubmitted(true);
    setForm({ name: "", company: "", rating: 5, comment: "" });
    toast.success("Thank you! Your review is pending approval.");
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <Section id="reviews">
      <SectionHeading
        eyebrow="Client Reviews"
        title={
          <>
            What our clients say about <span className="gradient-text">working with us</span>
          </>
        }
        subtitle="Real feedback from the teams we build with. Every project ends with the same question: are you genuinely satisfied?"
      />

      <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <div className="relative min-h-[18rem]">
          <AnimatePresence mode="wait">
            {current ? (
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <ReviewCard review={current} />
              </motion.div>
            ) : null}
          </AnimatePresence>
          <div className="mt-5 flex items-center gap-3">
            <button
              type="button"
              aria-label="Previous review"
              onClick={() => setIndex((value) => (value - 1 + approved.length) % approved.length)}
              className="glass-soft grid size-10 place-items-center rounded-xl"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Next review"
              onClick={() => setIndex((value) => (value + 1) % approved.length)}
              className="glass-soft grid size-10 place-items-center rounded-xl"
            >
              <ChevronRight className="size-4" />
            </button>
            <div className="ml-2 flex gap-1.5">
              {approved.map((review, dotIndex) => (
                <span
                  key={review.id}
                  className={
                    dotIndex === index
                      ? "gradient-accent h-1.5 w-6 rounded-full"
                      : "h-1.5 w-1.5 rounded-full bg-muted-foreground/40"
                  }
                />
              ))}
            </div>
          </div>
        </div>

        {withForm ? (
          <Reveal direction="right">
            <form onSubmit={submit} className="glass rounded-3xl p-6">
              <h3 className="text-lg font-semibold">Leave a Review</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Reviews appear publicly once our team approves them.
              </p>
              <div className="mt-5 space-y-3">
                <input
                  value={form.name}
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                  placeholder="Your name"
                  className="w-full rounded-xl bg-input/60 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
                <input
                  value={form.company}
                  onChange={(event) => setForm({ ...form, company: event.target.value })}
                  placeholder="Company (optional)"
                  className="w-full rounded-xl bg-input/60 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">Rating</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <motion.button
                        key={value}
                        type="button"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setForm({ ...form, rating: value })}
                        aria-label={`${value} stars`}
                      >
                        <Stars rating={form.rating >= value ? 1 : 0} className="w-4" />
                      </motion.button>
                    ))}
                  </div>
                </div>
                <textarea
                  value={form.comment}
                  onChange={(event) => setForm({ ...form, comment: event.target.value })}
                  placeholder="Tell us about your experience"
                  rows={4}
                  className="w-full resize-none rounded-xl bg-input/60 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="gradient-accent w-full rounded-xl py-3 text-sm font-semibold text-primary-foreground"
                >
                  Submit Review
                </motion.button>
              </div>
              <AnimatePresence>
                {submitted ? (
                  <motion.p
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="mt-4 rounded-xl bg-primary/15 px-4 py-3 text-center text-sm font-medium"
                  >
                    ✓ Received — pending approval
                  </motion.p>
                ) : null}
              </AnimatePresence>
            </form>
          </Reveal>
        ) : null}
      </div>
    </Section>
  );
}
