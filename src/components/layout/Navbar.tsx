import { AnimatePresence, motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { Bell, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useSiteContent } from "@/store/site-content";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/clients", label: "Clients" },
  { to: "/reviews", label: "Reviews" },
  { to: "/news", label: "News" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const { content } = useSiteContent();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState(false);
  const latest = content.news[0];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Latest-update toast, once per browser session.
  useEffect(() => {
    if (sessionStorage.getItem("drawvax.newsToast") === "seen") return;
    const timer = setTimeout(() => setToast(true), 3500);
    return () => clearTimeout(timer);
  }, []);

  const dismissToast = () => {
    setToast(false);
    sessionStorage.setItem("drawvax.newsToast", "seen");
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[90] transition-all duration-500",
        scrolled ? "py-2" : "py-4",
      )}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "flex items-center justify-between rounded-2xl px-4 py-3 transition-all duration-500",
            scrolled ? "glass" : "border border-transparent",
          )}
        >
          <Link to="/" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
            <motion.span
              whileHover={{ rotate: 12, scale: 1.08 }}
              className="gradient-accent grid size-10 place-items-center rounded-xl font-display text-lg font-bold text-primary-foreground"
            >
              D
            </motion.span>
            <span className="leading-tight">
              <span className="block font-display text-base font-bold tracking-tight sm:text-lg">
                {content.settings.companyName}
              </span>
              {/* Mandatory slogan — always contains "Client Satisfaction" */}
              <span className="hidden text-[11px] tracking-wide text-muted-foreground sm:block">
                {content.settings.slogan}
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="group relative px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                activeProps={{ className: "text-foreground" }}
                activeOptions={{ exact: link.to === "/" }}
              >
                {link.label}
                <span className="gradient-accent absolute inset-x-3 -bottom-0.5 h-px origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/news"
              aria-label="News and updates"
              className="glass-soft relative grid size-10 place-items-center rounded-xl text-foreground"
            >
              <Bell className="size-4.5" />
              <motion.span
                className="absolute top-2 right-2 size-2 rounded-full bg-accent"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.6, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </Link>
            <Link
              to="/contact"
              className="gradient-accent hidden rounded-xl px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105 sm:inline-flex"
            >
              Get a Quote
            </Link>
            <button
              type="button"
              aria-label="Toggle menu"
              onClick={() => setOpen((value) => !value)}
              className="glass-soft grid size-10 place-items-center rounded-xl lg:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </motion.nav>

        <AnimatePresence>
          {open ? (
            <motion.div
              initial={{ opacity: 0, x: 40, height: 0 }}
              animate={{ opacity: 1, x: 0, height: "auto" }}
              exit={{ opacity: 0, x: 40, height: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="glass mt-2 overflow-hidden rounded-2xl lg:hidden"
            >
              <div className="flex flex-col p-3">
                {links.map((link, index) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * index }}
                  >
                    <Link
                      to={link.to}
                      onClick={() => setOpen(false)}
                      className="block rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
                      activeProps={{ className: "bg-secondary text-foreground" }}
                      activeOptions={{ exact: link.to === "/" }}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      {/* Latest company update popup */}
      <AnimatePresence>
        {toast && latest ? (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.94 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="glass fixed top-24 right-4 z-[95] w-[min(21rem,calc(100vw-2rem))] rounded-2xl p-4"
          >
            <div className="flex items-start gap-3">
              <span className="gradient-accent mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg text-primary-foreground">
                <Bell className="size-4" />
              </span>
              <div className="min-w-0">
                <p className="text-[11px] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
                  Latest update
                </p>
                <p className="mt-1 text-sm font-semibold">{latest.title}</p>
                <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{latest.excerpt}</p>
                <Link
                  to="/news"
                  onClick={dismissToast}
                  className="mt-2 inline-block text-xs font-semibold gradient-text"
                >
                  Read all updates →
                </Link>
              </div>
              <button
                type="button"
                aria-label="Dismiss update"
                onClick={dismissToast}
                className="ml-auto rounded-md p-1 text-muted-foreground hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
