import { createFileRoute, Navigate, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Lock, LogOut, Plus, Trash2 } from "lucide-react";
import { useEffect, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/ui-kit/PageHeader";
import { Section } from "@/components/ui-kit/Section";
import { useSiteContent } from "@/store/site-content";
import { api } from "@/data/api";
import { slugify } from "@/data/content";

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
  "Statistics",
  "Process",
  "Founder",
  "Services",
  "Portfolio",
  "Clients",
  "International Clients",
  "Reviews",
  "News",
  "Contact",
  "Leads",
  "Media",
  "Users",
] as const;
type Tab = (typeof tabs)[number];

/* --------------------------------- shared --------------------------------- */

function Field({
  label,
  value,
  onChange,
  textarea,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  textarea?: boolean;
  type?: "text" | "number" | "email" | "url" | "tel" | "date";
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
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="mt-2 w-full rounded-xl bg-input/60 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      )}
    </label>
  );
}

function ImageField({
  label,
  value,
  onChange,
  showUrl = true,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  showUrl?: boolean;
}) {
  const [uploading, setUploading] = useState(false);

  const upload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    event.currentTarget.value = "";
    if (!file) return;
    setUploading(true);
    try {
      onChange(await api.uploadMedia(file));
      toast.success("Image uploaded.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Image upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      {showUrl ? <Field label={`${label} URL`} value={value} onChange={onChange} type="url" /> : null}
      {value ? <img src={value} alt={`${label} preview`} loading="lazy" className="h-28 max-w-full rounded-lg object-contain" /> : null}
      <label className="inline-flex min-h-11 cursor-pointer items-center rounded-lg px-3 text-sm text-primary hover:bg-primary/10">
        {uploading ? "Uploading…" : `Upload ${label.toLowerCase()}`}
        <input type="file" accept="image/jpeg,image/png,image/webp,image/avif" onChange={(event) => void upload(event)} disabled={uploading} className="sr-only" />
      </label>
    </div>
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
      onClick={() => {
        if (window.confirm("Are you sure you want to delete this item?")) onDelete();
      }}
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
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  if (pathname === "/admin/login") return <Outlet />;
  if (!store.authReady) {
    return <div className="flex min-h-[60svh] items-center justify-center px-4 text-muted-foreground">Checking access…</div>;
  }
  if (!store.isAdmin) return <Navigate to="/admin/login" />;

  return (
    <>
      <PageHeader
        eyebrow="Admin"
        title={
          <>
            Content <span className="gradient-text">control room</span>
          </>
        }
        subtitle={`Signed in as ${store.userEmail ?? "admin"}. Changes are saved to the site database.`}
      />
      <Section>
        <div className="grid gap-4 lg:grid-cols-[13rem_minmax(0,1fr)]">
          <div className="min-w-0 lg:row-span-2">
            <details className="glass-soft rounded-xl p-3 lg:hidden">
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-2 text-sm font-semibold">
                Sections <span className="truncate text-primary">{tab}</span>
              </summary>
              <nav aria-label="Admin sections" className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {tabs.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={(event) => {
                      setTab(item);
                      event.currentTarget.closest("details")?.removeAttribute("open");
                    }}
                    className={tab === item ? "gradient-accent min-h-11 rounded-lg px-3 text-left text-xs font-semibold text-primary-foreground" : "glass min-h-11 rounded-lg px-3 text-left text-xs text-muted-foreground"}
                  >
                    {item}
                  </button>
                ))}
              </nav>
            </details>
            <nav aria-label="Admin sections" className="hidden gap-1 lg:grid">
              {tabs.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setTab(item)}
                  aria-current={tab === item ? "page" : undefined}
                  className={tab === item ? "gradient-accent min-h-11 rounded-lg px-3 text-left text-sm font-semibold text-primary-foreground" : "glass-soft min-h-11 rounded-lg px-3 text-left text-sm text-muted-foreground hover:text-foreground"}
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => void api.signOut()}
              className="glass-soft inline-flex min-h-11 items-center gap-2 rounded-xl px-4 py-2 text-sm"
            >
              <LogOut className="size-4" /> Log out
            </button>
          </div>
          <div className="min-w-0 lg:col-start-2 lg:row-start-2">
            <AnimatePresence mode="wait">
              <div key={tab}>
            {tab === "Homepage" && <HomepagePanel />}
            {tab === "Statistics" && <StatisticsPanel />}
            {tab === "Process" && <ProcessPanel />}
            {tab === "Founder" && <FounderPanel />}
            {tab === "Services" && <ServicesPanel />}
            {tab === "Portfolio" && <PortfolioPanel />}
            {tab === "Clients" && <ClientsPanel region="domestic" />}
            {tab === "International Clients" && <ClientsPanel region="international" />}
            {tab === "Reviews" && <ReviewsPanel />}
            {tab === "News" && <NewsPanel />}
            {tab === "Contact" && <ContactPanel />}
            {tab === "Leads" && <LeadsPanel />}
            {tab === "Media" && <MediaPanel />}
            {tab === "Users" && <UsersPanel />}
              </div>
            </AnimatePresence>
          </div>
        </div>
      </Section>
    </>
  );
}

/* --------------------------------- login ---------------------------------- */

export function AdminLogin() {
  const store = useSiteContent();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (store.isAdmin) void navigate({ to: "/admin" });
  }, [navigate, store.isAdmin]);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      await api.signIn(email, password);
      if (!(await api.checkAdmin())) {
        await api.signOut();
        toast.error("This account does not have admin access.");
        return;
      }
      toast.success("Welcome back.");
      await navigate({ to: "/admin" });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Login failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-[100svh] items-center justify-center px-5 pt-28 pb-16">
      <motion.form
        onSubmit={(event) => void submit(event)}
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
          Sign in with an administrator account provisioned for this site.
        </p>
        <div className="mt-6 space-y-3">
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            autoComplete="username"
            required
            className="w-full rounded-xl bg-input/60 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            autoComplete="current-password"
            required
            className="w-full rounded-xl bg-input/60 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={submitting}
            className="gradient-accent w-full rounded-xl py-3.5 text-sm font-semibold text-primary-foreground disabled:opacity-60"
          >
            {submitting ? "Signing in…" : "Sign in"}
          </motion.button>
        </div>
      </motion.form>
    </div>
  );
}

/* --------------------------------- panels --------------------------------- */

function HomepagePanel() {
  const { content, saveSection } = useSiteContent();
  const [eyebrow, setEyebrow] = useState(content.settings.heroEyebrow);
  const [headline, setHeadline] = useState(content.settings.heroHeadline);
  const [sub, setSub] = useState(content.settings.heroSubheading);
  const [buttonText, setButtonText] = useState(content.settings.heroButtonText);
  const [buttonLink, setButtonLink] = useState(content.settings.heroButtonLink);
  const [aboutTitle, setAboutTitle] = useState(content.settings.aboutTitle);
  const [aboutBody, setAboutBody] = useState(content.settings.aboutBody);
  const [ctaHeadline, setCtaHeadline] = useState(content.settings.ctaHeadline);
  const [ctaText, setCtaText] = useState(content.settings.ctaText);

  const save = async () => {
    if (!headline.trim() || !buttonText.trim() || !(buttonLink.startsWith("/") || buttonLink.startsWith("https://"))) {
      toast.error("Add a headline, button label, and a relative or HTTPS link.");
      return;
    }
    try {
      await saveSection("settings", {
        ...content.settings,
        heroEyebrow: eyebrow.trim(),
        heroHeadline: headline.trim(),
        heroSubheading: sub,
        heroButtonText: buttonText.trim(),
        heroButtonLink: buttonLink.trim(),
        aboutTitle,
        aboutBody,
        ctaHeadline,
        ctaText,
      });
      toast.success("Homepage content updated.");
    } catch {
      toast.error("Could not save homepage content.");
    }
  };

  return (
    <Panel title="Homepage">
      <Field label="Hero eyebrow" value={eyebrow} onChange={setEyebrow} />
      <Field label="Hero headline" value={headline} onChange={setHeadline} />
      <Field label="Hero subheading" value={sub} onChange={setSub} textarea />
      <div className="grid gap-3 sm:grid-cols-2"><Field label="Hero button text" value={buttonText} onChange={setButtonText} /><Field label="Hero button link" value={buttonLink} onChange={setButtonLink} /></div>
      <Field label="About title" value={aboutTitle} onChange={setAboutTitle} />
      <Field label="About body" value={aboutBody} onChange={setAboutBody} textarea />
      <Field label="Call-to-action headline" value={ctaHeadline} onChange={setCtaHeadline} />
      <Field label="Call-to-action text" value={ctaText} onChange={setCtaText} textarea />
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

function StatisticsPanel() {
  const { content, saveSection } = useSiteContent();
  const [draft, setDraft] = useState(content.settings);

  const save = async () => {
    if ([draft.yearsExperience, draft.projectsCompleted, draft.teamTotal].some((value) => value < 0)) {
      toast.error("Statistics cannot be negative.");
      return;
    }
    try {
      await saveSection("settings", draft);
      toast.success("Statistics updated.");
    } catch {
      toast.error("Could not save statistics.");
    }
  };

  return (
    <Panel title="Statistics">
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Years experience" type="number" value={String(draft.yearsExperience)} onChange={(value) => setDraft({ ...draft, yearsExperience: Number(value) || 0 })} />
        <Field label="Projects completed" type="number" value={String(draft.projectsCompleted)} onChange={(value) => setDraft({ ...draft, projectsCompleted: Number(value) || 0 })} />
        <Field label="Ongoing projects" value={draft.ongoingProjects} onChange={(ongoingProjects) => setDraft({ ...draft, ongoingProjects })} />
        <Field label="Team total" type="number" value={String(draft.teamTotal)} onChange={(value) => setDraft({ ...draft, teamTotal: Number(value) || 0 })} />
      </div>
      <div className="space-y-3">
        <h3 className="text-sm font-semibold">Team breakdown</h3>
        {draft.teamBreakdown.map((member, index) => (
          <div key={`${member.label}-${index}`} className="grid gap-3 sm:grid-cols-[1fr_8rem_auto] sm:items-end">
            <Field
              label="Role"
              value={member.label}
              onChange={(label) => setDraft({
                ...draft,
                teamBreakdown: draft.teamBreakdown.map((row, rowIndex) => rowIndex === index ? { ...row, label } : row),
              })}
            />
            <Field
              label="Count"
              value={member.count}
              onChange={(count) => setDraft({
                ...draft,
                teamBreakdown: draft.teamBreakdown.map((row, rowIndex) => rowIndex === index ? { ...row, count } : row),
              })}
            />
            <button
              type="button"
              onClick={() => setDraft({ ...draft, teamBreakdown: draft.teamBreakdown.filter((_, rowIndex) => rowIndex !== index) })}
              className="min-h-11 rounded-lg px-3 text-sm text-destructive hover:bg-destructive/10"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => setDraft({ ...draft, teamBreakdown: [...draft.teamBreakdown, { label: "New role", count: "0" }] })}
          className="glass-soft min-h-11 rounded-lg px-4 text-sm"
        >
          Add team role
        </button>
      </div>
      <SaveButton onClick={() => void save()} />
    </Panel>
  );
}

function ProcessPanel() {
  const { content, saveSection } = useSiteContent();
  const [steps, setSteps] = useState(content.process);

  const update = (index: number, key: keyof (typeof steps)[number], value: string) => {
    setSteps((current) => current.map((step, stepIndex) => stepIndex === index ? { ...step, [key]: value } : step));
  };

  const move = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= steps.length) return;
    setSteps((current) => {
      const reordered = [...current];
      const currentStep = reordered[index];
      const targetStep = reordered[target];
      if (!currentStep || !targetStep) return current;
      reordered[index] = targetStep;
      reordered[target] = currentStep;
      return reordered;
    });
  };

  const save = async () => {
    if (steps.some((step) => !step.label.trim() || !step.title.trim())) {
      toast.error("Each process step needs a label and title.");
      return;
    }
    try {
      await saveSection("process", steps);
      toast.success("Process steps updated.");
    } catch {
      toast.error("Could not save process steps.");
    }
  };

  return (
    <Panel title="Process steps">
      {steps.map((step, index) => (
        <div key={`${step.step}-${index}`} className="glass-soft grid gap-3 rounded-xl p-4 sm:grid-cols-2">
          <Field label="Step number" value={step.step} onChange={(value) => update(index, "step", value)} />
          <Field label="Label" value={step.label} onChange={(value) => update(index, "label", value)} />
          <Field label="Title" value={step.title} onChange={(value) => update(index, "title", value)} />
          <Field label="Description" value={step.text} onChange={(value) => update(index, "text", value)} textarea />
          <div className="flex flex-wrap gap-2 sm:col-span-2">
            <button type="button" disabled={index === 0} onClick={() => move(index, -1)} className="glass-soft min-h-10 rounded-lg px-3 text-sm disabled:opacity-40">Move up</button>
            <button type="button" disabled={index === steps.length - 1} onClick={() => move(index, 1)} className="glass-soft min-h-10 rounded-lg px-3 text-sm disabled:opacity-40">Move down</button>
            <button
              type="button"
              onClick={() => {
                if (window.confirm(`Delete process step ${step.step}?`)) setSteps((current) => current.filter((_, stepIndex) => stepIndex !== index));
              }}
              className="min-h-10 rounded-lg px-3 text-sm text-destructive hover:bg-destructive/10"
            >
              Delete step
            </button>
          </div>
        </div>
      ))}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setSteps((current) => [...current, { step: String(current.length + 1).padStart(2, "0"), label: "New step", title: "Step title", text: "" }])}
          className="glass-soft min-h-11 rounded-lg px-4 text-sm"
        >
          Add step
        </button>
        <SaveButton onClick={() => void save()} />
      </div>
    </Panel>
  );
}

function FounderPanel() {
  const { content, updateFounder } = useSiteContent();
  const [draft, setDraft] = useState(content.founder);

  return (
    <Panel title="Founder section">
      <Field label="Name" value={draft.name} onChange={(name) => setDraft({ ...draft, name })} />
      <Field label="Title" value={draft.title} onChange={(title) => setDraft({ ...draft, title })} />
      <ImageField label="Founder photo" value={draft.photo} onChange={(photo) => setDraft({ ...draft, photo })} />
      <Field label="Bio" value={draft.bio} onChange={(bio) => setDraft({ ...draft, bio })} textarea />
      <Field label="Tagline" value={draft.highlight} onChange={(highlight) => setDraft({ ...draft, highlight })} />
      <Field label="Quote" value={draft.quote} onChange={(quote) => setDraft({ ...draft, quote })} />
      <Field label="LinkedIn" value={draft.linkedin} onChange={(linkedin) => setDraft({ ...draft, linkedin })} />
      <Field label="Email" value={draft.email} onChange={(email) => setDraft({ ...draft, email })} />
      <Field label="Phone" type="tel" value={draft.phone} onChange={(phone) => setDraft({ ...draft, phone })} />
      <Field label="Website" type="url" value={draft.website} onChange={(website) => setDraft({ ...draft, website })} />
      <Field label="Credit" value={draft.credit} onChange={(credit) => setDraft({ ...draft, credit })} textarea />
      <SaveButton
        onClick={() => void updateFounder(draft).then(() => toast.success("Founder section updated."), () => toast.error("Could not save founder details."))}
      />
    </Panel>
  );
}

function ServicesPanel() {
  const { content, upsertService, removeService } = useSiteContent();
  type Category = (typeof content.services)[number];
  type Subcategory = Category["subcategories"][number];
  type Service = Subcategory["services"][number];
  const [draft, setDraft] = useState<Category | null>(content.services[0] ?? null);
  const [isNew, setIsNew] = useState(false);

  const startNew = () => {
    setDraft({ id: `cat-${Date.now()}`, slug: "", title: "", icon: "Sparkles", short: "", media: "", subcategories: [] });
    setIsNew(true);
  };

  const save = async () => {
    if (!draft?.title.trim()) {
      toast.error("Add a service category title.");
      return;
    }
    try {
      await upsertService({ ...draft, slug: slugify(draft.title) });
      setIsNew(false);
      toast.success("Services saved.");
    } catch {
      toast.error("Could not save services.");
    }
  };

  const updateSubcategory = (id: string, key: keyof Subcategory, value: string) => {
    setDraft((current) => current ? {
      ...current,
      subcategories: current.subcategories.map((item) => item.id === id ? { ...item, [key]: value, ...(key === "title" ? { slug: slugify(value) } : {}) } : item),
    } : current);
  };

  const updateService = (subcategoryId: string, serviceId: string, key: keyof Service, value: string) => {
    setDraft((current) => current ? {
      ...current,
      subcategories: current.subcategories.map((subcategory) => subcategory.id === subcategoryId
        ? { ...subcategory, services: subcategory.services.map((service) => service.id === serviceId ? { ...service, [key]: value, ...(key === "title" ? { slug: slugify(value) } : {}) } : service) }
        : subcategory),
    } : current);
  };

  return (
    <Panel title="Services">
      <div className="flex flex-wrap gap-2">
        {content.services.map((category) => (
          <button key={category.id} type="button" onClick={() => { setDraft(category); setIsNew(false); }} className={draft?.id === category.id ? "gradient-accent min-h-11 rounded-lg px-3 text-sm text-primary-foreground" : "glass-soft min-h-11 rounded-lg px-3 text-sm"}>{category.title}</button>
        ))}
        <button type="button" onClick={startNew} className="glass-soft min-h-11 rounded-lg px-3 text-sm">Add category</button>
      </div>
      {draft ? (
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Category title" value={draft.title} onChange={(title) => setDraft({ ...draft, title, slug: slugify(title) })} />
            <Field label="Icon name" value={draft.icon} onChange={(icon) => setDraft({ ...draft, icon })} />
            <Field label="Short description" value={draft.short} onChange={(short) => setDraft({ ...draft, short })} textarea />
            <ImageField label="Category image" value={draft.media} onChange={(media) => setDraft({ ...draft, media })} />
          </div>
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-sm font-semibold">Sub-categories and services</h3>
              <button type="button" onClick={() => setDraft({ ...draft, subcategories: [...draft.subcategories, { id: `sub-${Date.now()}`, slug: "new-subcategory", title: "New sub-category", short: "", services: [] }] })} className="glass-soft min-h-10 rounded-lg px-3 text-sm">Add sub-category</button>
            </div>
            {draft.subcategories.map((subcategory) => (
              <div key={subcategory.id} className="glass-soft min-w-0 space-y-3 rounded-xl p-3 sm:p-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Sub-category title" value={subcategory.title} onChange={(value) => updateSubcategory(subcategory.id, "title", value)} />
                  <Field label="Description" value={subcategory.short} onChange={(value) => updateSubcategory(subcategory.id, "short", value)} />
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-muted-foreground">Services</span>
                  <button type="button" onClick={() => setDraft({ ...draft, subcategories: draft.subcategories.map((item) => item.id === subcategory.id ? { ...item, services: [...item.services, { id: `service-${Date.now()}`, slug: "new-service", title: "New service", short: "", description: "", media: "", features: [] }] } : item) })} className="glass min-h-10 rounded-lg px-3 text-sm">Add service</button>
                </div>
                {subcategory.services.map((service) => (
                  <div key={service.id} className="grid min-w-0 gap-3 border-t border-border/60 pt-3 sm:grid-cols-2">
                    <Field label="Service title" value={service.title} onChange={(value) => updateService(subcategory.id, service.id, "title", value)} />
                    <Field label="Short description" value={service.short} onChange={(value) => updateService(subcategory.id, service.id, "short", value)} />
                    <Field label="Description" value={service.description} onChange={(value) => updateService(subcategory.id, service.id, "description", value)} textarea />
                    <ImageField label="Service image" value={service.media} onChange={(media) => updateService(subcategory.id, service.id, "media", media)} />
                    <button type="button" onClick={() => setDraft({ ...draft, subcategories: draft.subcategories.map((item) => item.id === subcategory.id ? { ...item, services: item.services.filter((entry) => entry.id !== service.id) } : item) })} className="min-h-10 justify-self-start text-sm text-destructive">Delete service</button>
                  </div>
                ))}
                <button type="button" onClick={() => { if (window.confirm(`Delete ${subcategory.title}?`)) setDraft({ ...draft, subcategories: draft.subcategories.filter((item) => item.id !== subcategory.id) }); }} className="min-h-10 text-sm text-destructive">Delete sub-category</button>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <SaveButton onClick={() => void save()} label={isNew ? "Add category" : "Save category"} />
            {!isNew ? <RowActions onDelete={() => void removeService(draft.id).then(() => { setDraft(content.services.find((item) => item.id !== draft.id) ?? null); toast.success("Category deleted."); }, () => toast.error("Could not delete category."))} /> : null}
          </div>
        </div>
      ) : <p className="text-sm text-muted-foreground">No service categories yet.</p>}
    </Panel>
  );
}

function PortfolioPanel() {
  const { content, upsertPortfolio, removePortfolio } = useSiteContent();
  type Project = (typeof content.portfolio)[number];
  const makeDraft = (): Project => ({
    id: `p-${Date.now()}`,
    title: "",
    client: "",
    category: "Web",
    image: "",
    video: "",
    gallery: [],
    description: "",
    tech: [],
    year: String(new Date().getFullYear()),
    url: "",
    published: true,
    sortOrder: content.portfolio.length,
  });
  const [draft, setDraft] = useState<Project>(makeDraft);
  const [isNew, setIsNew] = useState(true);

  const save = async () => {
    if (!draft.title.trim() || !draft.client.trim()) {
      toast.error("Project title and client are required.");
      return;
    }
    try {
      await upsertPortfolio({ ...draft, title: draft.title.trim(), client: draft.client.trim() });
      setIsNew(false);
      toast.success("Project saved.");
    } catch {
      toast.error("Could not save project.");
    }
  };

  return (
    <Panel title="Portfolio">
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={() => { setDraft(makeDraft()); setIsNew(true); }} className="glass-soft min-h-11 rounded-lg px-4 text-sm">Add project</button>
        {content.portfolio.map((item) => (
          <button key={item.id} type="button" onClick={() => { setDraft(item); setIsNew(false); }} className={draft.id === item.id && !isNew ? "gradient-accent min-h-11 rounded-lg px-3 text-sm text-primary-foreground" : "glass-soft min-h-11 rounded-lg px-3 text-sm"}>{item.title || "Untitled project"}</button>
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Project title" value={draft.title} onChange={(title) => setDraft({ ...draft, title })} />
        <Field label="Client" value={draft.client} onChange={(client) => setDraft({ ...draft, client })} />
        <Field label="Category" value={draft.category} onChange={(category) => setDraft({ ...draft, category })} />
        <Field label="Year" value={draft.year} onChange={(year) => setDraft({ ...draft, year })} />
        <Field label="Project URL" type="url" value={draft.url ?? ""} onChange={(url) => setDraft({ ...draft, url })} />
        <Field label="Display order" type="number" value={String(draft.sortOrder ?? 0)} onChange={(value) => setDraft({ ...draft, sortOrder: Number(value) || 0 })} />
      </div>
      <ImageField label="Project image" value={draft.image} onChange={(image) => setDraft({ ...draft, image })} />
      <Field label="Description" value={draft.description} onChange={(description) => setDraft({ ...draft, description })} textarea />
      <Field label="Technology tags (comma separated)" value={draft.tech.join(", ")} onChange={(value) => setDraft({ ...draft, tech: value.split(",").map((tag) => tag.trim()).filter(Boolean) })} />
      <label className="flex min-h-11 items-center gap-3 text-sm"><input type="checkbox" checked={draft.published !== false} onChange={(event) => setDraft({ ...draft, published: event.target.checked })} /> Published on website</label>
      <div className="flex flex-wrap gap-2">
        <SaveButton onClick={() => void save()} label={isNew ? "Add project" : "Save project"} />
        {!isNew ? <RowActions onDelete={() => void removePortfolio(draft.id).then(() => { setDraft(makeDraft()); setIsNew(true); toast.success("Project deleted."); }, () => toast.error("Could not delete project."))} /> : null}
      </div>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {content.portfolio.map((item) => (
          <li key={item.id} className="glass-soft flex min-w-0 items-center gap-3 rounded-xl p-3">
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

function ClientsPanel({ region }: { region: "domestic" | "international" }) {
  const { content, upsertClient, removeClient } = useSiteContent();
  type ClientEntry = (typeof content.clients)[number];
  const makeDraft = (): ClientEntry => ({
    id: `c-${Date.now()}`,
    name: "",
    industry: "",
    region,
    logo: "",
    details: "",
    collaboration: "",
    since: String(new Date().getFullYear()),
    website: "",
    enabled: true,
    sortOrder: content.clients.filter((client) => client.region === region).length,
  });
  const [draft, setDraft] = useState<ClientEntry>(makeDraft);
  const [isNew, setIsNew] = useState(true);
  const clients = content.clients.filter((client) => client.region === region);

  const save = async () => {
    if (!draft.name.trim() || !draft.industry.trim()) {
      toast.error("Client name and industry are required.");
      return;
    }
    try {
      await upsertClient({ ...draft, name: draft.name.trim(), region });
      setIsNew(false);
      toast.success("Client saved.");
    } catch {
      toast.error("Could not save client.");
    }
  };

  return (
    <Panel title={region === "domestic" ? "Clients in India" : "International clients"}>
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={() => { setDraft(makeDraft()); setIsNew(true); }} className="glass-soft min-h-11 rounded-lg px-4 text-sm">Add client</button>
        {clients.map((client) => (
          <button key={client.id} type="button" onClick={() => { setDraft(client); setIsNew(false); }} className={draft.id === client.id && !isNew ? "gradient-accent min-h-11 rounded-lg px-3 text-sm text-primary-foreground" : "glass-soft min-h-11 rounded-lg px-3 text-sm"}>{client.name}</button>
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Client name" value={draft.name} onChange={(name) => setDraft({ ...draft, name })} />
        <Field label="Industry" value={draft.industry} onChange={(industry) => setDraft({ ...draft, industry })} />
        <Field label="Website" type="url" value={draft.website ?? ""} onChange={(website) => setDraft({ ...draft, website })} />
        <Field label="Partner since" value={draft.since} onChange={(since) => setDraft({ ...draft, since })} />
        <Field label="Display order" type="number" value={String(draft.sortOrder ?? 0)} onChange={(value) => setDraft({ ...draft, sortOrder: Number(value) || 0 })} />
      </div>
      <ImageField label="Client logo" value={draft.logo} onChange={(logo) => setDraft({ ...draft, logo })} />
      <Field label="Description" value={draft.details} onChange={(details) => setDraft({ ...draft, details })} textarea />
      <Field label="Collaboration details" value={draft.collaboration} onChange={(collaboration) => setDraft({ ...draft, collaboration })} textarea />
      <label className="flex min-h-11 items-center gap-3 text-sm"><input type="checkbox" checked={draft.enabled !== false} onChange={(event) => setDraft({ ...draft, enabled: event.target.checked })} /> Visible on website</label>
      <div className="flex flex-wrap gap-2">
        <SaveButton onClick={() => void save()} label={isNew ? "Add client" : "Save client"} />
        {!isNew ? <RowActions onDelete={() => void removeClient(draft.id).then(() => { setDraft(makeDraft()); setIsNew(true); toast.success("Client deleted."); }, () => toast.error("Could not delete client."))} /> : null}
      </div>
      <ul className="mt-4 space-y-2">
        {clients.map((client) => (
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
  const store = useSiteContent();
  const [draft, setDraft] = useState<(typeof store.reviews)[number]>({ id: "", name: "", company: "", rating: 5, comment: "", fullStory: "", status: "pending", createdAt: new Date().toISOString(), avatar: "", companyLogo: "", sortOrder: store.reviews.length });

  const reset = () => setDraft({ id: "", name: "", company: "", rating: 5, comment: "", fullStory: "", status: "pending", createdAt: new Date().toISOString() });
  const save = async () => {
    if (!draft.name.trim() || !draft.company.trim() || !draft.comment.trim()) {
      toast.error("Reviewer, company, and testimonial text are required.");
      return;
    }
    try {
      const review = { ...draft, id: draft.id || `r-${Date.now()}`, createdAt: draft.createdAt || new Date().toISOString() };
      if (draft.id) await store.updateReview(review);
      else await store.addReview(review);
      toast.success("Testimonial saved.");
      reset();
    } catch {
      toast.error("Could not save testimonial.");
    }
  };

  return (
    <Panel title="Testimonials">
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Client name" value={draft.name} onChange={(name) => setDraft({ ...draft, name })} />
        <Field label="Company" value={draft.company} onChange={(company) => setDraft({ ...draft, company })} />
        <Field label="Rating (1–5)" type="number" value={String(draft.rating)} onChange={(value) => setDraft({ ...draft, rating: Math.max(1, Math.min(5, Number(value) || 1)) })} />
        <Field label="Display order" type="number" value={String(draft.sortOrder ?? 0)} onChange={(value) => setDraft({ ...draft, sortOrder: Number(value) || 0 })} />
        <label className="block text-xs text-muted-foreground">Publication status
          <select value={draft.status} onChange={(event) => setDraft({ ...draft, status: event.target.value as typeof draft.status })} className="mt-2 min-h-11 w-full rounded-lg bg-input/60 px-3 text-sm text-foreground">
            <option value="pending">Draft / pending</option><option value="approved">Published</option><option value="rejected">Unpublished</option>
          </select>
        </label>
        <div className="sm:col-span-2"><Field label="Testimonial" value={draft.comment} onChange={(comment) => setDraft({ ...draft, comment })} textarea /></div>
        <div className="sm:col-span-2"><Field label="Full story" value={draft.fullStory} onChange={(fullStory) => setDraft({ ...draft, fullStory })} textarea /></div>
        <ImageField label="Client photo" value={draft.avatar ?? ""} onChange={(avatar) => setDraft({ ...draft, avatar })} />
        <ImageField label="Company logo" value={draft.companyLogo ?? ""} onChange={(companyLogo) => setDraft({ ...draft, companyLogo })} />
      </div>
      <div className="flex flex-wrap gap-2"><SaveButton onClick={() => void save()} label={draft.id ? "Save testimonial" : "Add testimonial"} />{draft.id ? <button type="button" onClick={reset} className="glass-soft min-h-11 rounded-lg px-4 text-sm">Cancel edit</button> : null}</div>
      <ul className="space-y-2">
        {store.reviews.map((review) => (
          <li key={review.id} className="glass-soft min-w-0 rounded-xl p-4">
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
                <button type="button" onClick={() => setDraft(review)} className="glass-soft min-h-10 rounded-lg px-3 text-xs">Edit</button>
                <button
                  type="button"
                  onClick={() => void store.setReviewStatus(review.id, "approved").then(() => toast.success("Testimonial published."), () => toast.error("Could not publish testimonial."))}
                  className="glass-soft rounded-lg px-3 py-1.5 text-xs"
                >
                  Approve
                </button>
                <button
                  type="button"
                  onClick={() => void store.setReviewStatus(review.id, "rejected").then(() => toast.success("Testimonial unpublished."), () => toast.error("Could not update testimonial."))}
                  className="glass-soft rounded-lg px-3 py-1.5 text-xs"
                >
                  Reject
                </button>
                <RowActions onDelete={() => void store.removeReview(review.id).then(() => toast.success("Testimonial deleted."), () => toast.error("Could not delete testimonial."))} />
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
  const store = useSiteContent();
  const { upsertNews, removeNews } = store;
  const makeDraft = () => ({ id: "", title: "", excerpt: "", body: "", category: "Announcement", image: "", publishedAt: new Date().toISOString() });
  const [draft, setDraft] = useState(makeDraft);
  const save = async () => {
    if (!draft.title.trim()) {
      toast.error("Add a title.");
      return;
    }
    try {
      await upsertNews({ ...draft, id: draft.id || `n-${Date.now()}`, title: draft.title.trim() });
      toast.success("News update saved.");
      setDraft(makeDraft());
    } catch {
      toast.error("Could not save news update.");
    }
  };

  return (
    <Panel title="News & updates">
      <Field label="Title" value={draft.title} onChange={(title) => setDraft({ ...draft, title })} />
      <div className="grid gap-3 sm:grid-cols-2"><Field label="Category" value={draft.category} onChange={(category) => setDraft({ ...draft, category })} /><Field label="Published date" type="date" value={draft.publishedAt.slice(0, 10)} onChange={(value) => setDraft({ ...draft, publishedAt: value ? new Date(`${value}T12:00:00.000Z`).toISOString() : draft.publishedAt })} /></div>
      <ImageField label="News image" value={draft.image} onChange={(image) => setDraft({ ...draft, image })} />
      <Field label="Excerpt" value={draft.excerpt} onChange={(excerpt) => setDraft({ ...draft, excerpt })} textarea />
      <Field label="Article body" value={draft.body} onChange={(body) => setDraft({ ...draft, body })} textarea />
      <div className="flex flex-wrap gap-2"><SaveButton onClick={() => void save()} label={draft.id ? "Save update" : "Publish update"} />{draft.id ? <button type="button" onClick={() => setDraft(makeDraft())} className="glass-soft min-h-11 rounded-lg px-4 text-sm">Cancel edit</button> : null}</div>
      <ul className="mt-4 space-y-2">
        {store.news.map((post) => (
          <li key={post.id} className="glass-soft flex items-center gap-3 rounded-xl p-3">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">{post.title}</p>
              <p className="text-xs text-muted-foreground">{post.publishedAt.slice(0, 10)}</p>
            </div>
            <button type="button" onClick={() => setDraft(post)} className="glass-soft min-h-10 rounded-lg px-3 text-xs">Edit</button>
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
      <Field label="Legal business name" value={draft.legalName} onChange={(legalName) => setDraft({ ...draft, legalName })} />
      <Field label="Address" value={draft.address} onChange={(address) => setDraft({ ...draft, address })} textarea />
      <Field label="Phone" type="tel" value={draft.phone} onChange={(phone) => setDraft({ ...draft, phone })} />
      <Field label="Email" type="email" value={draft.email} onChange={(email) => setDraft({ ...draft, email })} />
      <Field label="Business hours" value={draft.hours} onChange={(hours) => setDraft({ ...draft, hours })} />
      <Field
        label="Map search query"
        value={draft.mapQuery}
        onChange={(mapQuery) => setDraft({ ...draft, mapQuery })}
      />
      <Field label="LinkedIn URL" type="url" value={draft.linkedin} onChange={(linkedin) => setDraft({ ...draft, linkedin })} />
      <Field label="Instagram URL" type="url" value={draft.instagram} onChange={(instagram) => setDraft({ ...draft, instagram })} />
      <SaveButton
        onClick={() => void updateContact(draft).then(() => toast.success("Contact details updated."), () => toast.error("Could not save contact details."))}
      />
    </Panel>
  );
}

function LeadsPanel() {
  const { leads } = useSiteContent();

  return (
    <Panel title="Form submissions & chatbot leads">
      <ul className="space-y-2">
        {leads.map((lead) => (
          <li key={lead.id} className="glass-soft rounded-xl p-4">
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span className="rounded-full bg-primary/20 px-2.5 py-0.5 text-foreground">{lead.source}</span>
              <span>{lead.createdAt.slice(0, 10)}</span>
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

function MediaPanel() {
  const [files, setFiles] = useState<Awaited<ReturnType<typeof api.listMedia>>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    void api.listMedia().then((result) => {
      if (active) setFiles(result);
    }).catch(() => {
      if (active) toast.error("Could not load media library.");
    }).finally(() => {
      if (active) setLoading(false);
    });
    return () => { active = false; };
  }, []);

  const remove = async (name: string) => {
    if (!window.confirm(`Delete ${name} from the media library?`)) return;
    try {
      await api.deleteMedia(name);
      setFiles((current) => current.filter((file) => file.name !== name));
      toast.success("Image deleted.");
    } catch {
      toast.error("Could not delete image.");
    }
  };

  return (
    <Panel title="Media library">
      <ImageField label="Image" value="" showUrl={false} onChange={(url) => {
        const name = url.split("/").pop();
        if (!name) return;
        void api.listMedia().then(setFiles);
      }} />
      {loading ? <p className="text-sm text-muted-foreground">Loading images…</p> : null}
      {!loading && files.length === 0 ? <p className="text-sm text-muted-foreground">No uploaded images yet.</p> : null}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
        {files.map((file) => (
          <article key={file.name} className="glass-soft min-w-0 rounded-xl p-3">
            <img src={api.getMediaUrl(file.name)} alt={file.name} loading="lazy" className="aspect-square w-full rounded-lg object-contain" />
            <p className="mt-2 break-all text-xs text-muted-foreground">{file.name}</p>
            <button type="button" onClick={() => void navigator.clipboard.writeText(api.getMediaUrl(file.name)).then(() => toast.success("Image URL copied."), () => toast.error("Could not copy image URL."))} className="mt-2 min-h-10 text-sm text-primary hover:underline">Copy image URL</button>
            <button type="button" onClick={() => void remove(file.name)} className="mt-2 min-h-10 text-sm text-destructive hover:underline">Delete image</button>
          </article>
        ))}
      </div>
    </Panel>
  );
}

function UsersPanel() {
  const [users, setUsers] = useState<Awaited<ReturnType<typeof api.getUsers>>>([]);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    try {
      setUsers(await api.getUsers());
    } catch {
      toast.error("Could not load user accounts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { void refresh(); }, []);

  const toggleAdmin = async (userId: string, isAdmin: boolean) => {
    try {
      await api.setUserAdmin(userId, !isAdmin);
      await refresh();
      toast.success(isAdmin ? "Administrator access removed." : "Administrator access granted.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not update account role.");
    }
  };

  return (
    <Panel title="User accounts">
      {loading ? <p className="text-sm text-muted-foreground">Loading accounts…</p> : null}
      {!loading && users.length === 0 ? <p className="text-sm text-muted-foreground">No accounts found.</p> : null}
      <ul className="space-y-2">
        {users.map((user) => (
          <li key={user.user_id} className="glass-soft flex min-w-0 flex-wrap items-center gap-3 rounded-xl p-3">
            <div className="min-w-0 flex-1">
              <p className="break-all text-sm font-medium">{user.email}</p>
              <p className="text-xs text-muted-foreground">Created {user.created_at.slice(0, 10)}</p>
            </div>
            <span className="rounded-full bg-primary/15 px-3 py-1 text-xs">{user.isAdmin ? "Admin" : "User"}</span>
            <button type="button" onClick={() => void toggleAdmin(user.user_id, user.isAdmin)} className="glass-soft min-h-10 rounded-lg px-3 text-xs">
              {user.isAdmin ? "Remove admin" : "Make admin"}
            </button>
          </li>
        ))}
      </ul>
    </Panel>
  );
}
