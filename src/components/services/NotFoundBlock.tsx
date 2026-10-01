import { Link } from "@tanstack/react-router";

export function NotFoundBlock() {
  return (
    <div className="mx-auto max-w-md px-5 pt-40 pb-24 text-center">
      <h1 className="font-display text-3xl font-bold">Service not found</h1>
      <p className="mt-3 text-sm text-muted-foreground">It may have been renamed or removed.</p>
      <Link to="/services" className="gradient-accent mt-6 inline-flex rounded-xl px-5 py-3 text-sm font-semibold text-primary-foreground">
        Back to services
      </Link>
    </div>
  );
}
