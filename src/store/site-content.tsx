/**
 * Client-side content store.
 *
 * Holds the whole site content in React state so the Admin Panel can edit it
 * without a backend. Changes persist to localStorage for the session/browser.
 *
 * TODO: connect to backend — replace this provider's mutations with API calls
 * (see src/data/api.ts) and hydrate `content` from the server.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  SLOGAN_REQUIRED_PHRASE,
  initialContent,
  type Client,
  type ContactDetails,
  type Founder,
  type Lead,
  type NewsPost,
  type PortfolioItem,
  type Review,
  type Service,
  type SiteContent,
  type SiteSettings,
} from "@/data/content";

const STORAGE_KEY = "drawvax.content.v1";
const AUTH_KEY = "drawvax.admin.v1";

type Ctx = {
  content: SiteContent;
  isAdmin: boolean;
  login: () => void;
  logout: () => void;
  updateSettings: (patch: Partial<SiteSettings>) => void;
  updateFounder: (patch: Partial<Founder>) => void;
  updateContact: (patch: Partial<ContactDetails>) => void;
  upsertService: (item: Service) => void;
  removeService: (id: string) => void;
  upsertPortfolio: (item: PortfolioItem) => void;
  removePortfolio: (id: string) => void;
  upsertClient: (item: Client) => void;
  removeClient: (id: string) => void;
  addReview: (item: Review) => void;
  setReviewStatus: (id: string, status: Review["status"]) => void;
  removeReview: (id: string) => void;
  upsertNews: (item: NewsPost) => void;
  removeNews: (id: string) => void;
  addLead: (item: Lead) => void;
  resetContent: () => void;
};

const SiteContentContext = createContext<Ctx | null>(null);

/** The slogan must always contain the exact phrase "Client Satisfaction". */
export function isValidSlogan(slogan: string) {
  return slogan.includes(SLOGAN_REQUIRED_PHRASE);
}

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(initialContent);
  const [isAdmin, setIsAdmin] = useState(false);

  // Hydrate after mount so SSR and the first client render always match.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setContent({ ...initialContent, ...(JSON.parse(raw) as SiteContent) });
      setIsAdmin(localStorage.getItem(AUTH_KEY) === "1");
    } catch {
      /* ignore corrupted storage */
    }
  }, []);

  const persist = useCallback((next: SiteContent) => {
    setContent(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* storage may be unavailable */
    }
  }, []);

  const patch = useCallback(
    (fn: (current: SiteContent) => SiteContent) => {
      setContent((current) => {
        const next = fn(current);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {
          /* noop */
        }
        return next;
      });
    },
    [],
  );

  const upsert = <T extends { id: string }>(list: T[], item: T) =>
    list.some((entry) => entry.id === item.id)
      ? list.map((entry) => (entry.id === item.id ? item : entry))
      : [item, ...list];

  const value = useMemo<Ctx>(
    () => ({
      content,
      isAdmin,
      login: () => {
        setIsAdmin(true);
        try {
          localStorage.setItem(AUTH_KEY, "1");
        } catch {
          /* noop */
        }
      },
      logout: () => {
        setIsAdmin(false);
        try {
          localStorage.removeItem(AUTH_KEY);
        } catch {
          /* noop */
        }
      },
      // TODO: connect to backend — PUT /api/settings
      updateSettings: (p) =>
        patch((c) => {
          const slogan = p.slogan !== undefined && !isValidSlogan(p.slogan) ? c.settings.slogan : p.slogan;
          return { ...c, settings: { ...c.settings, ...p, ...(slogan ? { slogan } : {}) } };
        }),
      // TODO: connect to backend — PUT /api/founder
      updateFounder: (p) => patch((c) => ({ ...c, founder: { ...c.founder, ...p } })),
      // TODO: connect to backend — PUT /api/contact-details
      updateContact: (p) => patch((c) => ({ ...c, contact: { ...c.contact, ...p } })),
      // TODO: connect to backend — POST/PUT /api/services
      upsertService: (item) => patch((c) => ({ ...c, services: upsert(c.services, item) })),
      removeService: (id) => patch((c) => ({ ...c, services: c.services.filter((s) => s.id !== id) })),
      // TODO: connect to backend — POST/PUT /api/portfolio
      upsertPortfolio: (item) => patch((c) => ({ ...c, portfolio: upsert(c.portfolio, item) })),
      removePortfolio: (id) =>
        patch((c) => ({ ...c, portfolio: c.portfolio.filter((p2) => p2.id !== id) })),
      // TODO: connect to backend — POST/PUT /api/clients
      upsertClient: (item) => patch((c) => ({ ...c, clients: upsert(c.clients, item) })),
      removeClient: (id) => patch((c) => ({ ...c, clients: c.clients.filter((x) => x.id !== id) })),
      // TODO: connect to backend — POST /api/reviews
      addReview: (item) => patch((c) => ({ ...c, reviews: [item, ...c.reviews] })),
      setReviewStatus: (id, status) =>
        patch((c) => ({
          ...c,
          reviews: c.reviews.map((r) => (r.id === id ? { ...r, status } : r)),
        })),
      removeReview: (id) => patch((c) => ({ ...c, reviews: c.reviews.filter((r) => r.id !== id) })),
      // TODO: connect to backend — POST/PUT /api/news
      upsertNews: (item) => patch((c) => ({ ...c, news: upsert(c.news, item) })),
      removeNews: (id) => patch((c) => ({ ...c, news: c.news.filter((n) => n.id !== id) })),
      // TODO: connect to backend — POST /api/leads
      addLead: (item) => patch((c) => ({ ...c, leads: [item, ...c.leads] })),
      resetContent: () => persist(initialContent),
    }),
    [content, isAdmin, patch, persist],
  );

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>;
}

export function useSiteContent() {
  const ctx = useContext(SiteContentContext);
  if (!ctx) throw new Error("useSiteContent must be used inside <SiteContentProvider>");
  return ctx;
}
