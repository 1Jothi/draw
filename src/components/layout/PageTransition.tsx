import { motion } from "motion/react";
import { useRouterState } from "@tanstack/react-router";
import { useLayoutEffect, type ReactNode } from "react";

/**
 * Lightweight route transition: the new page renders immediately (no exit
 * wait, so clicks feel instant) and always starts at the top.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return (
    <motion.main
      key={pathname}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full min-w-0"
    >
      {children}
    </motion.main>
  );
}
