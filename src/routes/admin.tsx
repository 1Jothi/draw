import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Lock, LogOut, Plus, RotateCcw, Trash2 } from "lucide-react";
import { useState, type FormEvent, type ReactNode } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/ui-kit/PageHeader";
import { Section } from "@/components/ui-kit/Section";
import { isValidSlogan, useSiteContent } from "@/store/site-content";
import { api } from "@/data/api";
import { SLOGAN_REQUIRED_PHRASE } from "@/data/content";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Panel | Drawvax Infotech" },
      { name: "description", content: "Internal content management for the Drawvax Infotech website." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Admin Panel | Drawvax Infotech" },
      { property: "og:description", content: "Internal content management." },
    ],
  }),
  component: AdminPage,
});

const tabs = [
  "Homepage",
  "Founder",
  "Services",
  "Portfolio",
  "Clients",
  "Reviews",
  "News",
  "Contact",
  "Leads",
] as const;
type Tab = (typeof tabs)[number];

/* --------------------------------- shared --------------------------------- */

function Field({
  label,
  value,
  onChange,
  textarea,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  textarea?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-xs tracking-[0.14em] text-muted-foreground uppercase">{label}</span>
      {textarea ? (
        <textarea
          value={value}
          rows={4}
          onChange={(event) => onChange(event.target.value)}
          className="mt-2 w-full resize-none rounded-xl bg-input/60 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      ) : (
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="mt-2 w-full rounded-xl bg-input/60 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      )}
    </label>
  );
}

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35 }}
      className="glass rounded-3xl p-6"
    >
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="mt-5 space-y-4">{children}</div>
    </motion.div>
  );
}

function RowActions({ onDelete }: { onDelete: () => void }) {
  return (
    <button
      type="button"
      onClick={onDelete}
      className="glass-soft grid size-9 place-items-center rounded-xl text-destructive"
      aria-label="Delete"
    >
      <Trash2 className="size-4" />
    </button>
  );
}

/* ---------------------------------- page ---------------------------------- */

function AdminPage() {
  const store = useSiteContent();
  const [tab, setTab] = useState<Tab>("Homepage");

  if (!store.isAdmin) return <AdminLogin />;

  return (
    <>
      <PageHeader
        eyebrow="Admin"
        title={
          <>
            Content <span className="gradient-text">control room</span>
          </>
        }
        subtitle="Changes are stored locally in your browser. TODO: connect each action to your backend API."
      />
      <Section>
        <div className="mb-6 flex flex-wrap items-center gap-2">
          {tabs.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setTab(item)}
              className={
                tab === item
                  ? "gradient-accent rounded-xl px-4 py-2 text-sm font-semibold text-primary-foreground"
                  : "glass-soft rounded-xl px-4 py-2 text-sm text-muted-foreground hover:text-foreground"
              }
            >
              {item}
            </button>
          ))}
          <div className="ml-auto flex gap-2">
            <button
              type="button"
              onClick={() => {
                store.resetContent();
                toast.success("Content reset to defaults.");
              }}
              className="glass-soft inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm"
            >
              <RotateCcw className="size-4" /> Reset
            </button>
            <button
              type="button"
              onClick={store.logout}
              className="glass-soft inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm"
            >
              <LogOut className="size-4" /> Log out
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <div key={tab}>
            {tab === "Homepage" && <HomepagePanel />}
            {tab === "Founder" && <FounderPanel />}
            {tab === "Services" && <ServicesPanel />}
            {tab === "Portfolio" && <PortfolioPanel />}
            {tab === "Clients" && <ClientsPanel />}
            {tab === "Reviews" && <ReviewsPanel />}
            {tab === "News" && <NewsPanel />}
            {tab === "Contact" && <ContactPanel />}
            {tab === "Leads" && <LeadsPanel />}
          </div>
        </AnimatePresence>
      </Section>
    </>
  );
}

/* --------------------------------- login ---------------------------------- */

function AdminLogin() {
  const { login } = useSiteContent();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    // TODO: connect to backend — replace with real authentication + session handling
    const result = await api.adminLogin(email, password);
    if (result.ok) {
      login();
      toast.success("Welcome back.");
    } else {
      toast.error(result.message ?? "Login failed.");
    }
  };

  return (
    <div className="flex min-h-[100svh] items-center justify-center px-5 pt-28 pb-16">
      <motion.form
        onSubmit={submit}
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="glass w-full max-w-md rounded-3xl p-8"
      >
        <span className="gradient-accent grid size-12 place-items-center rounded-2xl text-primary-foreground">
          <Lock className="size-5" />
        </span>
        <h1 className="mt-5 font-display text-2xl font-bold">Admin sign in</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Demo access only — any email with a 4+ character password works. TODO: connect to backend
          auth.
        </p>
        <div className="mt-6 space-y-3">
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            className="w-full rounded-xl bg-input/60 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            className="w-full rounded-xl bg-input/60 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="gradient-accent w-full rounded-xl py-3.5 text-sm font-semibold text-primary-foreground"
          >
            Sign in
          </motion.button>
        </div>
      </motion.form>
    </div>
  );
}

/* --------------------------------- panels --------------------------------- */

function HomepagePanel() {
  const { content, updateSettings } = useSiteContent();
  const [slogan, setSlogan] = useState(content.settings.slogan);
  const [headline, setHeadline] = useState(content.settings.heroHeadlineWords.join(" "));
  const [sub, setSub] = useState(content.settings.heroSubheading);
  const [aboutTitle, setAboutTitle] = useState(content.settings.aboutTitle);
  const [aboutBody, setAboutBody] = useState(content.settings.aboutBody);

  const save = () => {
    if (!isValidSlogan(slogan)) {
      toast.error(`The slogan must include the phrase "${SLOGAN_REQUIRED_PHRASE}".`);
      return;
    }
    // TODO: connect to backend — PUT /api/settings
    updateSettings({
      slogan,
      heroHeadlineWords: headline.split(" ").filter(Boolean),
      heroSubheading: sub,
      aboutTitle,
      aboutBody,
    });
    toast.success("Homepage content updated.");
  };

  return (
    <Panel title="Homepage & slogan">
      <Field label={`Slogan (must contain "${SLOGAN_REQUIRED_PHRASE}")`} value={slogan} onChange={setSlogan} />
      <Field label="Hero headline" value={headline} onChange={setHeadline} />
      <Field label="Hero subheading" value={sub} onChange={setSub} textarea />
      <Field label="About title" value={aboutTitle} onChange={setAboutTitle} />
      <Field label="About body" value={aboutBody} onChange={setAboutBody} textarea />
      <SaveButton onClick={save} />
    </Panel>
  );
}

function SaveButton({ onClick, label = "Save changes" }: { onClick: () => void; label?: string }) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="gradient-accent rounded-xl px-6 py-3 text-sm font-semibold text-primary-foreground"
    >
      {label}
    </motion.button>
  );
}

function FounderPanel() {
  const { content, updateFounder } = useSiteContent();
  const [draft, setDraft] = useState(content.founder);

  return (
    <Panel title="Founder section">
      <Field label="Name" value={draft.name} onChange={(name) => setDraft({ ...draft, name })} />
      <Field label="Title" value={draft.title} onChange={(title) => setDraft({ ...draft, title })} />
      <Field label="Photo URL" value={draft.photo} onChange={(photo) => setDraft({ ...draft, photo })} />
      <Field label="Bio" value={draft.bio} onChange={(bio) => setDraft({ ...draft, bio })} textarea />
      <Field label="Quote" value={draft.quote} onChange={(quote) => setDraft({ ...draft, quote })} />
      <Field label="LinkedIn" value={draft.linkedin} onChange={(linkedin) => setDraft({ ...draft, linkedin })} />
      <Field label="Email" value={draft.email} onChange={(email) => setDraft({ ...draft, email })} />
      <SaveButton
        onClick={() => {
          // TODO: connect to backend — PUT /api/founder
          updateFounder(draft);
          toast.success("Founder section updated.");
        }}
      />
    </Panel>
  );
}

function ServicesPanel() {
  const { content, upsertService, removeService } = useSiteContent();
  const [title, setTitle] = useState("");
  const [short, setShort] = useState("");

  return (
    <Panel title="Services">
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="New service title" value={title} onChange={setTitle} />
        <Field label="Short description" value={short} onChange={setShort} />
      </div>
      <SaveButton
        label="Add service"
        onClick={() => {
          if (!title.trim()) {
            toast.error("Add a title first.");
            return;
          }
          // TODO: connect to backend — POST /api/services
          upsertService({
            id: `s-${Date.now()}`,
            slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
            title,
            icon: "Sparkles",
            short: short || "New service offering.",
            description: short || "New service offering.",
            media: content.services[0]?.media ?? "",
            features: ["Feature one", "Feature two"],
            benefits: ["Benefit one"],
            priceFrom: "$1,000",
          });
          setTitle("");
          setShort("");
          toast.success("Service added.");
        }}
      />
      <ul className="mt-4 space-y-2">
        {content.services.map((service) => (
          <li key={service.id} className="glass-soft flex items-center gap-3 rounded-xl p-3">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">{service.title}</p>
              <p className="truncate text-xs text-muted-foreground">{service.short}</p>
            </div>
            <RowActions onDelete={() => removeService(service.id)} />
          </li>
        ))}
      </ul>
    </Panel>
  );
}

function PortfolioPanel() {
  const { content, upsertPortfolio, removePortfolio } = useSiteContent();
  const [title, setTitle] = useState("");
  const [client, setClient] = useState("");

  return (
    <Panel title="Portfolio">
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Project title" value={title} onChange={setTitle} />
        <Field label="Client" value={client} onChange={setClient} />
      </div>
      <SaveButton
        label="Add project"
        onClick={() => {
          if (!title.trim()) {
            toast.error("Add a project title.");
            return;
          }
          // TODO: connect to backend — POST /api/portfolio
          upsertPortfolio({
            id: `p-${Date.now()}`,
            title,
            client: client || "Confidential",
            category: "Web",
            image: content.portfolio[0]?.image ?? "",
            description: "New project added from the admin panel.",
            tech: ["React", "Tailwind"],
            year: String(new Date().getFullYear()),
          });
          setTitle("");
          setClient("");
          toast.success("Project added.");
        }}
      />
      <ul className="mt-4 space-y-2">
        {content.portfolio.map((item) => (
          <li key={item.id} className="glass-soft flex items-center gap-3 rounded-xl p-3">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">{item.title}</p>
              <p className="text-xs text-muted-foreground">
                {item.client} · {item.category}
              </p>
            </div>
            <RowActions onDelete={() => removePortfolio(item.id)} />
          </li>
        ))}
      </ul>
    </Panel>
  );
}

function ClientsPanel() {
  const { content, upsertClient, removeClient } = useSiteContent();
  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("");

  return (
    <Panel title="Clients">
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Client name" value={name} onChange={setName} />
        <Field label="Industry" value={industry} onChange={setIndustry} />
      </div>
      <SaveButton
        label="Add client"
        onClick={() => {
          if (!name.trim()) {
            toast.error("Add a client name.");
            return;
          }
          // TODO: connect to backend — POST /api/clients
          upsertClient({
            id: `c-${Date.now()}`,
            name,
            industry: industry || "General",
            logoText: name.toUpperCase().slice(0, 8),
            details: "Added from the admin panel.",
            collaboration: "Collaboration details to be added.",
            since: String(new Date().getFullYear()),
          });
          setName("");
          setIndustry("");
          toast.success("Client added.");
        }}
      />
      <ul className="mt-4 space-y-2">
        {content.clients.map((client) => (
          <li key={client.id} className="glass-soft flex items-center gap-3 rounded-xl p-3">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">{client.name}</p>
              <p className="text-xs text-muted-foreground">{client.industry}</p>
            </div>
            <RowActions onDelete={() => removeClient(client.id)} />
          </li>
        ))}
      </ul>
    </Panel>
  );
}

function ReviewsPanel() {
  const { content, setReviewStatus, removeReview, addReview } = useSiteContent();

  return (
    <Panel title="Reviews moderation">
      <SaveButton
        label="Add a review manually"
        onClick={() => {
          // TODO: connect to backend — POST /api/reviews
          addReview({
            id: `r-${Date.now()}`,
            name: "New reviewer",
            company: "Company",
            rating: 5,
            comment: "Edit this review text in your backend once connected.",
            avatar: "NR",
            status: "approved",
            date: new Date().toISOString().slice(0, 10),
          });
          toast.success("Review added.");
        }}
      />
      <ul className="space-y-2">
        {content.reviews.map((review) => (
          <li key={review.id} className="glass-soft rounded-xl p-4">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm font-medium">
                {review.name} · {review.company}
              </p>
              <span
                className={
                  review.status === "approved"
                    ? "rounded-full bg-primary/20 px-2.5 py-0.5 text-[11px]"
                    : "rounded-full bg-gold/20 px-2.5 py-0.5 text-[11px] text-gold"
                }
              >
                {review.status}
              </span>
              <span className="text-xs text-muted-foreground">{review.rating}★</span>
              <div className="ml-auto flex gap-2">
                <button
                  type="button"
                  onClick={() => setReviewStatus(review.id, "approved")}
                  className="glass-soft rounded-lg px-3 py-1.5 text-xs"
                >
                  Approve
                </button>
                <button
                  type="button"
                  onClick={() => setReviewStatus(review.id, "pending")}
                  className="glass-soft rounded-lg px-3 py-1.5 text-xs"
                >
                  Reject
                </button>
                <RowActions onDelete={() => removeReview(review.id)} />
              </div>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{review.comment}</p>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

function NewsPanel() {
  const { content, upsertNews, removeNews } = useSiteContent();
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");

  return (
    <Panel title="News & updates">
      <Field label="Title" value={title} onChange={setTitle} />
      <Field label="Excerpt" value={excerpt} onChange={setExcerpt} textarea />
      <motion.button
        type="button"
        whileHover={{ scale: 1.02 }}
        onClick={() => {
          if (!title.trim()) {
            toast.error("Add a title.");
            return;
          }
          // TODO: connect to backend — POST /api/news (also drives the header popup)
          upsertNews({
            id: `n-${Date.now()}`,
            title,
            date: new Date().toISOString().slice(0, 10),
            tag: "Announcement",
            excerpt: excerpt || "New update from Drawvax Infotech.",
            body: excerpt || "New update from Drawvax Infotech.",
          });
          setTitle("");
          setExcerpt("");
          toast.success("Update published.");
        }}
        className="gradient-accent inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-primary-foreground"
      >
        <Plus className="size-4" /> Publish update
      </motion.button>
      <ul className="mt-4 space-y-2">
        {content.news.map((post) => (
          <li key={post.id} className="glass-soft flex items-center gap-3 rounded-xl p-3">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">{post.title}</p>
              <p className="text-xs text-muted-foreground">{post.date}</p>
            </div>
            <RowActions onDelete={() => removeNews(post.id)} />
          </li>
        ))}
      </ul>
    </Panel>
  );
}

function ContactPanel() {
  const { content, updateContact } = useSiteContent();
  const [draft, setDraft] = useState(content.contact);

  return (
    <Panel title="Contact details">
      <Field label="Address" value={draft.address} onChange={(address) => setDraft({ ...draft, address })} />
      <Field label="Phone" value={draft.phone} onChange={(phone) => setDraft({ ...draft, phone })} />
      <Field label="Email" value={draft.email} onChange={(email) => setDraft({ ...draft, email })} />
      <Field label="Business hours" value={draft.hours} onChange={(hours) => setDraft({ ...draft, hours })} />
      <Field
        label="Map search query"
        value={draft.mapQuery}
        onChange={(mapQuery) => setDraft({ ...draft, mapQuery })}
      />
      {draft.socials.map((social, index) => (
        <Field
          key={social.label}
          label={`${social.label} URL`}
          value={social.url}
          onChange={(url) =>
            setDraft({
              ...draft,
              socials: draft.socials.map((entry, i) => (i === index ? { ...entry, url } : entry)),
            })
          }
        />
      ))}
      <SaveButton
        onClick={() => {
          // TODO: connect to backend — PUT /api/contact-details
          updateContact(draft);
          toast.success("Contact details updated.");
        }}
      />
    </Panel>
  );
}

function LeadsPanel() {
  const { content } = useSiteContent();

  return (
    <Panel title="Form submissions & chatbot leads">
      <ul className="space-y-2">
        {content.leads.map((lead) => (
          <li key={lead.id} className="glass-soft rounded-xl p-4">
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span className="rounded-full bg-primary/20 px-2.5 py-0.5 text-foreground">{lead.source}</span>
              <span>{lead.date}</span>
            </div>
            <p className="mt-2 text-sm font-medium">
              {lead.name} · {lead.email}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{lead.message}</p>
          </li>
        ))}
      </ul>
    </Panel>
  );
}
