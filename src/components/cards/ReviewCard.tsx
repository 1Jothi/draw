import { Star } from "lucide-react";
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
  return (
    <div className="glass flex h-full flex-col rounded-3xl p-6">
      <Stars rating={review.rating} />
      <p className="mt-4 flex-1 leading-relaxed text-muted-foreground">“{review.comment}”</p>
      <div className="mt-6 flex items-center gap-3">
        <span className="gradient-accent grid size-11 place-items-center rounded-full text-sm font-bold text-primary-foreground">
          {review.avatar}
        </span>
        <div>
          <p className="text-sm font-semibold">{review.name}</p>
          <p className="text-xs text-muted-foreground">{review.company}</p>
        </div>
      </div>
    </div>
  );
}
