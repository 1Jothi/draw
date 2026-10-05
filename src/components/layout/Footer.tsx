import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Instagram, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
import { SLOGAN } from "@/data/content";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { useSiteContent } from "@/store/site-content";
import { api } from "@/data/api";
import drawvaxLogo from "@/assets/drawvax-logo.jpg";
import { isLovableAppUrl } from "@/lib/utils";

export function Footer() {
  const { content } = useSiteContent();
  const [email, setEmail] = useState("");

  const subscribe = async (event: FormEvent) => {
    event.preventDefault();
    if (!email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    try {
      await api.submitLead({ source: "Contact form", name: "Newsletter subscriber", email: email.trim().slice(0, 255), message: "Newsletter signup" });
    } catch {
      toast.error("Couldn't subscribe right now. Please try again.");
      return;
    }
    toast.success("You're subscribed. Welcome to the Drawvax list.");
    setEmail("");
  };

  return (
    <footer className="relative mt-10 overflow-hidden border-t border-border/60">
      <motion.div
        aria-hidden
        className="gradient-accent absolute inset-x-0 top-0 h-px"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
      <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-3">
              <img
                src={drawvaxLogo}
                alt="Drawvax Infotech logo"
                className="h-10 w-auto shrink-0 rounded-lg object-contain"
              />
              <span className="font-display text-lg font-bold">{content.contact.legalName}</span>
            </div>
            {/* Mandatory slogan */}
            <p className="mt-4 font-display text-xl font-semibold gradient-text">
              {SLOGAN}
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
              A front-end engineering and digital growth studio helping businesses in India and Kuwait grow.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <img
                src={content.founder.photo}
                alt={content.founder.name}
                loading="lazy"
                className="size-9 shrink-0 rounded-full object-cover"
              />
              <p className="text-xs text-muted-foreground">
                Built & led by <span className="font-semibold text-foreground">{content.founder.name}</span>
              </p>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {[
                { label: "LinkedIn", url: content.contact.linkedin, Icon: Linkedin },
                { label: "Instagram", url: content.contact.instagram, Icon: Instagram },
              ]
                .filter((social) => social.url && !isLovableAppUrl(social.url))
                .map(({ label, url, Icon }) => (
                  <motion.a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    whileHover={{ y: -4, scale: 1.06 }}
                    className="glass-soft grid size-10 place-items-center rounded-xl text-muted-foreground hover:text-foreground"
                  >
                    <Icon className="size-4" />
                  </motion.a>
                ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold tracking-[0.16em] uppercase">Company</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              {[
                { to: "/about", label: "About" },
                { to: "/portfolio", label: "Portfolio" },
                { to: "/clients", label: "Clients" },
                { to: "/reviews", label: "Reviews" },
                { to: "/news", label: "News" },
                { to: "/contact", label: "Contact" },
                { to: "/login", label: "Sign in" },
              ].map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="transition-colors hover:text-foreground">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold tracking-[0.16em] uppercase">Services</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              {content.services.map((category) => (
                <li key={category.id}>
                  <Link
                    to="/services/$category"
                    params={{ category: category.slug }}
                    className="transition-colors hover:text-foreground"
                  >
                    {category.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold tracking-[0.16em] uppercase">Get in touch</h4>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                {content.contact.address}
              </li>
              <li className="flex gap-2.5">
                <Phone className="size-4 shrink-0 text-primary" />
                {content.contact.phone}
              </li>
              <li className="flex min-w-0 gap-2.5">
                <Mail className="size-4 shrink-0 text-primary" />
                <span className="break-all">{content.contact.email}</span>
              </li>
            </ul>
            <form onSubmit={subscribe} className="glass-soft mt-5 flex items-center gap-2 rounded-xl p-1.5">
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Your email"
                aria-label="Email for newsletter"
                className="w-full bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground"
              />
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                className="gradient-accent grid size-9 shrink-0 place-items-center rounded-lg text-primary-foreground"
                aria-label="Subscribe"
              >
                <Send className="size-4" />
              </motion.button>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© 2026 {content.contact.legalName}. All rights reserved.</p>
          <p className="font-semibold gradient-text">{SLOGAN}</p>
        </div>
      </div>
    </footer>
  );
}
