import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

type Crumb = { label: string; to?: string; params?: Record<string, string> };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground sm:text-sm">
      {items.map((item, index) => (
        <span key={`${item.label}-${index}`} className="inline-flex min-w-0 items-center gap-1.5">
          {index > 0 ? <ChevronRight className="size-3.5 shrink-0" /> : null}
          {item.to ? (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            <Link to={item.to as any} params={item.params as any} className="truncate hover:text-foreground">
              {item.label}
            </Link>
          ) : (
            <span className="truncate text-foreground">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
