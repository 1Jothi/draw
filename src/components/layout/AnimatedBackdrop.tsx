/** Ambient gradient blobs + grid used behind every page. Pure CSS, GPU-friendly. */
export function AnimatedBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      <div
        className="animate-blob absolute -top-40 -left-32 size-[34rem] rounded-full opacity-45 blur-[110px]"
        style={{ background: "var(--gradient-accent)" }}
      />
      <div
        className="animate-blob absolute top-1/3 -right-40 size-[38rem] rounded-full opacity-30 blur-[130px]"
        style={{ background: "var(--gradient-accent)", animationDelay: "-6s" }}
      />
      <div
        className="animate-blob absolute bottom-0 left-1/3 size-[30rem] rounded-full opacity-25 blur-[120px]"
        style={{ background: "var(--gradient-soft)", animationDelay: "-11s" }}
      />
      <div
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "linear-gradient(color-mix(in oklab, var(--foreground) 9%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklab, var(--foreground) 9%, transparent) 1px, transparent 1px)",
          backgroundSize: "68px 68px",
          maskImage: "radial-gradient(ellipse at 50% 0%, black 15%, transparent 72%)",
        }}
      />
    </div>
  );
}
