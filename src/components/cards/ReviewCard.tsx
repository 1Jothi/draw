import { Star } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Review } from "@/data/content";

export function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    <div className={cn("flex gap-0.5", className)} aria-label={`${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((value) => (
        <Star
          key={value}
          className={cn(
            "size-4",
            value <= rating ? "fill-gold text-gold" : "text-muted-foreground/40",
          )}
        />
      ))}
    </div>
  );
}

export function ReviewCard({ review }: { review: Review }) {
  const [expanded, setExpanded] = useState(false);
  const initials = review.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const hasStory = review.fullStory && review.fullStory !== review.comment;

  return (
    <div className="glass flex h-full min-w-0 flex-col rounded-3xl p-4 sm:p-5 lg:p-6">
      <Stars rating={review.rating} />
      <p className="mt-4 flex-1 break-words leading-relaxed text-muted-foreground">
        “{expanded && hasStory ? review.fullStory : review.comment}”
      </p>
      {hasStory ? (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-3 self-start text-xs font-semibold gradient-text"
        >
          {expanded ? "Show less" : "Read full story"}
        </button>
      ) : null}
      <div className="mt-6 flex min-w-0 items-center gap-3">
        {review.avatar ? (
          <img
            src={review.avatar}
            alt={`${review.name}`}
            loading="lazy"
            className="size-11 shrink-0 rounded-full object-cover"
          />
        ) : (
          <span className="gradient-accent grid size-11 shrink-0 place-items-center rounded-full text-sm font-bold text-primary-foreground">
            {initials}
          </span>
        )}
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{review.name}</p>
          <p className="truncate text-xs text-muted-foreground">{review.company}</p>
        </div>
        {review.companyLogo ? (
          <img
            src={review.companyLogo}
            alt={`${review.company} logo`}
            loading="lazy"
            className="ml-auto max-h-8 max-w-20 object-contain"
          />
        ) : null}
      </div>
    </div>
  );
}
