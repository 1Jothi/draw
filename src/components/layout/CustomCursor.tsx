import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

/** Glowing dot + trailing ring. Pointer-fine devices only. */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 220, damping: 24, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 220, damping: 24, mass: 0.5 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    const move = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      const target = event.target as HTMLElement | null;
      setActive(
        Boolean(
          target?.closest(
            'a, button, [role="button"], input, textarea, select, [data-cursor="hover"]',
          ),
        ),
      );
    };

    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[120] hidden md:block">
      <motion.div
        className="absolute size-2 rounded-full bg-primary"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: active ? 0.4 : 1, opacity: 1 }}
        transition={{ duration: 0.18 }}
      />
      <motion.div
        className="absolute rounded-full border border-primary/70"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: active ? 56 : 30,
          height: active ? 56 : 30,
          backgroundColor: active
            ? "color-mix(in oklab, var(--primary) 18%, transparent)"
            : "transparent",
          boxShadow: active
            ? "0 0 32px color-mix(in oklab, var(--primary) 55%, transparent)"
            : "0 0 14px color-mix(in oklab, var(--primary) 30%, transparent)",
        }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
      />
    </div>
  );
}
