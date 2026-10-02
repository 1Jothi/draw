import { defaultReviews } from "@/data/default-reviews";
import type { Review } from "@/data/content";

const reviewIdentity = (review: Review) =>
  `${review.name.trim().toLowerCase()}::${review.company.trim().toLowerCase()}`;

export function approvedReviews(reviews: Review[]) {
  const approved = reviews.filter((review) => review.status === "approved");
  const approvedByIdentity = new Map(approved.map((review) => [reviewIdentity(review), review]));
  const defaultIdentities = new Set(defaultReviews.map(reviewIdentity));
  const defaults = defaultReviews.map(
    (review) => approvedByIdentity.get(reviewIdentity(review)) ?? review,
  );
  const additional = approved.filter((review) => !defaultIdentities.has(reviewIdentity(review)));

  return [...defaults, ...additional];
}
