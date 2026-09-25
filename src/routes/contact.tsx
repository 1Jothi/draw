import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/ui-kit/PageHeader";
import { Section } from "@/components/ui-kit/Section";
import { Reveal } from "@/components/motion/Reveal";
import { useSiteContent } from "@/store/site-content";
import { api } from "@/data/api";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Drawvax Infotech — Get a Free Quote" },
      {
        name: "description",
        content:
          "Talk to Drawvax Infotech about your web, design, SEO or marketing project. We reply within two business hours.",
      },
      { property: "og:title", content: "Contact Drawvax Infotech" },
      { property: "og:description", content: "Tell us about your project and get a fixed quote." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { content, addLead } = useSiteContent();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!form.name.trim() || !form.email.includes("@") || form.message.trim().length < 10) {
      toast.error("Please add your name, a valid email and a short message.");
      return;
    }
    setBusy(true);
    // TODO: connect to backend — POST the contact enquiry and trigger a notification email
    const lead = await api.submitContact(form);
    addLead(lead);
    setBusy(false);
    setSent(true);
    setForm({ name: "", email: "", phone: "", message: "" });
    toast.success("Message sent — we'll reply within two business hours.");
  };

  const details = [
    { icon: MapPin, label: "Studio", value: content.contact.address },
    { icon: Phone, label: "Phone", value: content.contact.phone },
    { icon: Mail, label: "Email", value: content.contact.email },
    { icon: Clock, label: "Hours", value: content.contact.hours },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Tell us what you're <span className="gradient-text">building</span>
          </>
        }
        subtitle="Share a few details and we'll come back with a plan, a timeline and a fixed quote within two business days."
      />

      <Section>
        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <Reveal direction="left">
            <form onSubmit={submit} className="glass rounded-3xl p-7">
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  value={form.name}
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                  placeholder="Full name"
                  className="w-full rounded-xl bg-input/60 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
                <input
                  value={form.email}
                  onChange={(event) => setForm({ ...form, email: event.target.value })}
                  placeholder="Email address"
                  className="w-full rounded-xl bg-input/60 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <input
                value={form.phone}
                onChange={(event) => setForm({ ...form, phone: event.target.value })}
                placeholder="Phone (optional)"
                className="mt-4 w-full rounded-xl bg-input/60 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
              <textarea
                value={form.message}
                onChange={(event) => setForm({ ...form, message: event.target.value })}
                placeholder="What would you like to build?"
                rows={6}
                className="mt-4 w-full resize-none rounded-xl bg-input/60 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={busy}
                className="gradient-accent mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold text-primary-foreground disabled:opacity-60"
              >
                {busy ? "Sending..." : "Send message"} <Send className="size-4" />
              </motion.button>

              <AnimatePresence>
                {sent ? (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="mt-4 rounded-xl bg-primary/15 px-4 py-3 text-center text-sm font-medium"
                  >
                    ✓ Thanks! Your message is on its way to our team.
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </form>
          </Reveal>

          <Reveal direction="right">
            <div className="space-y-4">
              <div className="glass grid gap-4 rounded-3xl p-7 sm:grid-cols-2">
                {details.map((detail) => (
                  <div key={detail.label}>
                    <span className="gradient-accent grid size-10 place-items-center rounded-xl text-primary-foreground">
                      <detail.icon className="size-4.5" />
                    </span>
                    <p className="mt-3 text-xs tracking-[0.16em] text-muted-foreground uppercase">
                      {detail.label}
                    </p>
                    <p className="mt-1 text-sm">{detail.value}</p>
                  </div>
                ))}
              </div>

              <div className="glass flex flex-wrap gap-2 rounded-3xl p-5">
                {content.contact.socials.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ y: -4, scale: 1.05 }}
                    className="glass-soft rounded-xl px-4 py-2.5 text-sm font-medium"
                  >
                    {social.label}
                  </motion.a>
                ))}
              </div>

              <div className="glass overflow-hidden rounded-3xl">
                <iframe
                  title="Drawvax Infotech location"
                  loading="lazy"
                  className="h-64 w-full border-0 grayscale-[35%]"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(content.contact.mapQuery)}&output=embed`}
                />
              </div>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
