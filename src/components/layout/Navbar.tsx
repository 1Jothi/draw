import { AnimatePresence, motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { Bell, LogIn, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useSiteContent } from "@/store/site-content";
import { cn } from "@/lib/utils";
import { SLOGAN } from "@/data/content";
import drawvaxLogo from "@/assets/drawvax-logo.jpg";

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
  const { content, news } = useSiteContent();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState(false);
  const latest = news[0];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Latest-update popup: shown for each new post, dismissible per session.
  useEffect(() => {
    if (!latest) return;
    if (sessionStorage.getItem("drawvax.newsToast") === latest.id) return;
    const timer = setTimeout(() => setToast(true), 3000);
    return () => clearTimeout(timer);
  }, [latest]);

  const dismissToast = () => {
    setToast(false);
    if (latest) sessionStorage.setItem("drawvax.newsToast", latest.id);
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
            "flex items-center justify-between gap-3 rounded-2xl px-3 py-3 sm:px-4 transition-all duration-500",
            scrolled ? "glass" : "border border-transparent",
          )}
        >
          <Link to="/" className="group flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
            <motion.img
              whileHover={{ rotate: 8, scale: 1.04 }}
              src={drawvaxLogo}
              alt="Drawvax Infotech logo"
              className="h-10 w-auto shrink-0 rounded-lg object-contain"
            />
            <span className="min-w-0 leading-tight">
              <span className="block font-display text-base font-bold tracking-tight sm:text-lg">
                {content.settings.companyName}
              </span>
              {/* Mandatory slogan — always contains "Client Satisfaction" */}
              <span className="hidden text-[11px] font-medium tracking-wide gradient-text sm:block">
                {SLOGAN}
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

          <div className="flex shrink-0 items-center gap-2">
            <Link
              to="/login"
              aria-label="Sign in"
              title="Sign in"
              className="glass-soft inline-flex min-h-10 items-center gap-2 rounded-xl px-3 text-sm font-medium text-foreground"
            >
              <LogIn className="size-4" />
              <span className="hidden sm:inline">Sign in</span>
            </Link>
            <Link
              to="/news"
              aria-label="News and updates"
              className="glass-soft relative grid size-10 place-items-center rounded-xl text-foreground"
            >
              <Bell className="size-4.5" />
              {latest ? <motion.span
                className="absolute top-2 right-2 size-2 rounded-full bg-accent"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.6, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              /> : null}
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
                <motion.div
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 }}
                >
                  <Link
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-4 py-3 text-sm font-semibold text-primary hover:bg-secondary"
                  >
                    Sign in
                  </Link>
                </motion.div>
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
