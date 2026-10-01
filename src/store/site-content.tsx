/**
 * Site content store — loads live content from the backend and exposes
 * admin mutations. Visitors see defaults instantly, then live data.
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
import { supabase } from "@/integrations/supabase/client";
import { api } from "@/data/api";
import {
  defaultContent,
  type CmsContent,
  type CmsKey,
  type Client,
  type Lead,
  type NewsPost,
  type PortfolioItem,
  type Review,
} from "@/data/content";

const hasSupabaseConfig = Boolean(
  (import.meta.env["VITE_SUPABASE_URL"] || process.env["SUPABASE_URL"]) &&
    (import.meta.env["VITE_SUPABASE_PUBLISHABLE_KEY"] || process.env["SUPABASE_PUBLISHABLE_KEY"]),
);

type Ctx = {
  content: CmsContent;
  reviews: Review[];
  news: NewsPost[];
  leads: Lead[];
  loading: boolean;
  isAdmin: boolean;
  userEmail: string | null;
  authReady: boolean;
  saveSection: <K extends CmsKey>(key: K, value: CmsContent[K]) => Promise<void>;
  updateFounder: (value: CmsContent["founder"]) => Promise<void>;
  updateContact: (value: CmsContent["contact"]) => Promise<void>;
  upsertService: (value: CmsContent["services"][number]) => Promise<void>;
  removeService: (id: string) => Promise<void>;
  upsertPortfolio: (value: PortfolioItem) => Promise<void>;
  removePortfolio: (id: string) => Promise<void>;
  upsertClient: (value: Client) => Promise<void>;
  removeClient: (id: string) => Promise<void>;
  addReview: (value: Review) => Promise<void>;
  updateReview: (value: Review) => Promise<void>;
  setReviewStatus: (id: string, status: Review["status"]) => Promise<void>;
  removeReview: (id: string) => Promise<void>;
  upsertNews: (value: NewsPost) => Promise<void>;
  removeNews: (id: string) => Promise<void>;
  reloadReviews: () => Promise<void>;
  reloadNews: () => Promise<void>;
  reloadLeads: () => Promise<void>;
};

const SiteContentContext = createContext<Ctx | null>(null);

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<CmsContent>(defaultContent);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [news, setNews] = useState<NewsPost[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [authReady, setAuthReady] = useState(false);

  const reloadReviews = useCallback(async () => {
    try {
      setReviews(await api.getReviews());
    } catch (error) {
      console.error(error);
    }
  }, []);

  const reloadNews = useCallback(async () => {
    try {
      setNews(await api.getNews());
    } catch (error) {
      console.error(error);
    }
  }, []);

  const reloadLeads = useCallback(async () => {
    try {
      setLeads(await api.getLeads());
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    if (!hasSupabaseConfig) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    Promise.allSettled([api.getContent(), api.getReviews(), api.getNews()]).then(([c, r, n]) => {
      if (cancelled) return;
      if (c.status === "fulfilled") setContent(c.value);
      if (r.status === "fulfilled") setReviews(r.value);
      if (n.status === "fulfilled") setNews(n.value);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!hasSupabaseConfig) {
      setAuthReady(true);
      return;
    }

    const resolve = async (email: string | null) => {
      setUserEmail(email);
      const admin = email ? await api.checkAdmin() : false;
      setIsAdmin(admin);
      setAuthReady(true);
      // Admins can see pending reviews — refetch with the new permissions.
      if (admin) {
        reloadReviews();
        reloadLeads();
      } else {
        setLeads([]);
      }
    };
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT" || event === "INITIAL_SESSION") {
        // Defer so Supabase finishes its own state update first.
        setTimeout(() => resolve(session?.user.email ?? null), 0);
      }
    });
    return () => data.subscription.unsubscribe();
  }, [reloadLeads, reloadReviews]);

  const saveSection = useCallback(async <K extends CmsKey>(key: K, value: CmsContent[K]) => {
    await api.saveSection(key, value);
    setContent((current) => ({ ...current, [key]: value }));
  }, []);

  const updateFounder = useCallback(
    (value: CmsContent["founder"]) => saveSection("founder", value),
    [saveSection],
  );
  const updateContact = useCallback(
    (value: CmsContent["contact"]) => saveSection("contact", value),
    [saveSection],
  );
  const upsertService = useCallback(
    (value: CmsContent["services"][number]) =>
      saveSection(
        "services",
        content.services.some((item) => item.id === value.id)
          ? content.services.map((item) => (item.id === value.id ? value : item))
          : [...content.services, value],
      ),
    [content.services, saveSection],
  );
  const removeService = useCallback(
    (id: string) => saveSection("services", content.services.filter((item) => item.id !== id)),
    [content.services, saveSection],
  );
  const upsertPortfolio = useCallback(
    (value: PortfolioItem) =>
      saveSection(
        "portfolio",
        content.portfolio.some((item) => item.id === value.id)
          ? content.portfolio.map((item) => (item.id === value.id ? value : item))
          : [...content.portfolio, value],
      ),
    [content.portfolio, saveSection],
  );
  const removePortfolio = useCallback(
    (id: string) => saveSection("portfolio", content.portfolio.filter((item) => item.id !== id)),
    [content.portfolio, saveSection],
  );
  const upsertClient = useCallback(
    (value: Client) =>
      saveSection(
        "clients",
        content.clients.some((item) => item.id === value.id)
          ? content.clients.map((item) => (item.id === value.id ? value : item))
          : [...content.clients, value],
      ),
    [content.clients, saveSection],
  );
  const removeClient = useCallback(
    (id: string) => saveSection("clients", content.clients.filter((item) => item.id !== id)),
    [content.clients, saveSection],
  );
  const addReview = useCallback(async (value: Review) => {
    await api.saveReview({ ...value, isNew: true });
    await reloadReviews();
  }, [reloadReviews]);
  const updateReview = useCallback(async (value: Review) => {
    await api.saveReview(value);
    await reloadReviews();
  }, [reloadReviews]);
  const setReviewStatus = useCallback(async (id: string, status: Review["status"]) => {
    const review = reviews.find((item) => item.id === id);
    if (!review) return;
    await api.saveReview({ ...review, status });
    await reloadReviews();
  }, [reloadReviews, reviews]);
  const removeReview = useCallback(async (id: string) => {
    await api.deleteReview(id);
    await reloadReviews();
  }, [reloadReviews]);
  const upsertNews = useCallback(async (value: NewsPost) => {
    await api.saveNews({ ...value, id: value.id });
    await reloadNews();
  }, [reloadNews]);
  const removeNews = useCallback(async (id: string) => {
    await api.deleteNews(id);
    await reloadNews();
  }, [reloadNews]);

  const value = useMemo<Ctx>(
    () => ({
      content,
      reviews,
      news,
      leads,
      loading,
      isAdmin,
      userEmail,
      authReady,
      saveSection,
      updateFounder,
      updateContact,
      upsertService,
      removeService,
      upsertPortfolio,
      removePortfolio,
      upsertClient,
      removeClient,
      addReview,
      updateReview,
      setReviewStatus,
      removeReview,
      upsertNews,
      removeNews,
      reloadReviews,
      reloadNews,
      reloadLeads,
    }),
    [
      content,
      reviews,
      news,
      leads,
      loading,
      isAdmin,
      userEmail,
      authReady,
      saveSection,
      updateFounder,
      updateContact,
      upsertService,
      removeService,
      upsertPortfolio,
      removePortfolio,
      upsertClient,
      removeClient,
      addReview,
      updateReview,
      setReviewStatus,
      removeReview,
      upsertNews,
      removeNews,
      reloadReviews,
      reloadNews,
      reloadLeads,
    ],
  );

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>;
}

export function useSiteContent() {
  const ctx = useContext(SiteContentContext);
  if (!ctx) throw new Error("useSiteContent must be used inside <SiteContentProvider>");
  return ctx;
}

export const approvedReviews = (reviews: Review[]) => reviews.filter((r) => r.status === "approved");
