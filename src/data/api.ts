/**
 * Data layer — the only place the front end talks to the backend.
 * Public reads are allowed for everyone; writes are restricted to the admin
 * by database access rules (the checks here are only for UX).
 */
import { supabase } from "@/integrations/supabase/client";
import {
  defaultContent,
  type CmsContent,
  type CmsKey,
  type Lead,
  type NewsPost,
  type Review,
} from "./content";

type ReviewRow = {
  id: string;
  name: string;
  company: string;
  rating: number;
  comment: string;
  full_story: string;
  status: string;
  created_at: string;
  avatar_url: string;
  company_logo_url: string;
  sort_order: number;
};

const toReview = (r: ReviewRow): Review => ({
  id: r.id,
  name: r.name,
  company: r.company,
  rating: r.rating,
  comment: r.comment,
  fullStory: r.full_story,
  status: r.status as Review["status"],
  createdAt: r.created_at,
  avatar: r.avatar_url,
  companyLogo: r.company_logo_url,
  sortOrder: r.sort_order,
});

type NewsRow = {
  id: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  image: string;
  published_at: string;
};

const toNews = (n: NewsRow): NewsPost => ({
  id: n.id,
  title: n.title,
  excerpt: n.excerpt,
  body: n.body,
  category: n.category,
  image: n.image,
  publishedAt: n.published_at,
});

function fail(error: { message: string } | null) {
  if (error) throw new Error(error.message);
}

export const api = {
  /* ------------------------------ site content ------------------------------ */
  async getContent(): Promise<CmsContent> {
    const { data, error } = await supabase.from("site_content").select("key, value");
    fail(error);
    const merged: CmsContent = { ...defaultContent };
    for (const row of data ?? []) {
      const key = row.key as CmsKey;
      if (!(key in defaultContent)) continue;
      const def = defaultContent[key];
      // Objects merge over defaults so newly added fields still get a value.
      (merged as Record<string, unknown>)[key] = Array.isArray(def)
        ? row.value
        : { ...(def as object), ...(row.value as object) };
    }
    return merged;
  },

  async saveSection<K extends CmsKey>(key: K, value: CmsContent[K]) {
    const { error } = await supabase
      .from("site_content")
      .upsert({ key, value: value as never, updated_at: new Date().toISOString() });
    fail(error);
  },

  /* --------------------------------- reviews -------------------------------- */
  async getReviews(): Promise<Review[]> {
    // RLS returns only approved reviews to visitors; admins see all.
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    fail(error);
    return (data ?? []).map(toReview);
  },

  async submitReview(input: { name: string; company: string; rating: number; comment: string }) {
    const { error } = await supabase.from("reviews").insert({ ...input, status: "pending" });
    fail(error);
  },

  async saveReview(review: Omit<Review, "createdAt"> & { isNew?: boolean }) {
    const row = {
      name: review.name,
      company: review.company,
      rating: review.rating,
      comment: review.comment,
      full_story: review.fullStory,
      status: review.status,
      avatar_url: review.avatar ?? "",
      company_logo_url: review.companyLogo ?? "",
      sort_order: review.sortOrder ?? 0,
    };
    const { error } = review.isNew
      ? await supabase.from("reviews").insert(row)
      : await supabase.from("reviews").update(row).eq("id", review.id);
    fail(error);
  },

  async deleteReview(id: string) {
    const { error } = await supabase.from("reviews").delete().eq("id", id);
    fail(error);
  },

  /* ----------------------------------- news --------------------------------- */
  async getNews(): Promise<NewsPost[]> {
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .order("published_at", { ascending: false });
    fail(error);
    return (data ?? []).map(toNews);
  },

  async saveNews(post: Omit<NewsPost, "id"> & { id?: string }) {
    const row = {
      title: post.title,
      excerpt: post.excerpt,
      body: post.body,
      category: post.category,
      image: post.image,
      published_at: post.publishedAt,
    };
    const { error } = post.id
      ? await supabase.from("news").update(row).eq("id", post.id)
      : await supabase.from("news").insert(row);
    fail(error);
  },

  async deleteNews(id: string) {
    const { error } = await supabase.from("news").delete().eq("id", id);
    fail(error);
  },

  /* ----------------------------------- leads -------------------------------- */
  async submitLead(input: { source: Lead["source"]; name: string; email: string; phone?: string; message: string }) {
    const { error } = await supabase.from("leads").insert({ ...input, phone: input.phone ?? "" });
    fail(error);
  },

  async getLeads(): Promise<Lead[]> {
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });
    fail(error);
    return (data ?? []).map((l) => ({
      id: l.id,
      source: l.source as Lead["source"],
      name: l.name,
      email: l.email,
      phone: l.phone,
      message: l.message,
      createdAt: l.created_at,
    }));
  },

  async deleteLead(id: string) {
    const { error } = await supabase.from("leads").delete().eq("id", id);
    fail(error);
  },

  /* ----------------------------------- media -------------------------------- */
  async uploadMedia(file: File): Promise<string> {
    const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);
    if (!allowedTypes.has(file.type) || file.size > 5 * 1024 * 1024) {
      throw new Error("Choose a JPEG, PNG, WebP, or AVIF image under 5 MB.");
    }
    const ext = file.type.split("/")[1] ?? "img";
    const path = `${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from("media").upload(path, file, {
      contentType: file.type,
      cacheControl: "31536000",
    });
    fail(error);
    return supabase.storage.from("media").getPublicUrl(path).data.publicUrl;
  },

  async listMedia() {
    const { data, error } = await supabase.storage.from("media").list("", {
      limit: 100,
      sortBy: { column: "created_at", order: "desc" },
    });
    fail(error);
    return (data ?? []).filter((file) => file.name && !file.id?.endsWith("/"));
  },

  getMediaUrl(path: string): string {
    return supabase.storage.from("media").getPublicUrl(path).data.publicUrl;
  },

  async deleteMedia(path: string) {
    const { error } = await supabase.storage.from("media").remove([path]);
    fail(error);
  },

  /* ----------------------------------- auth --------------------------------- */
  async signIn(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    fail(error);
  },

  async signUp(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/login` },
    });
    fail(error);
    return { needsConfirmation: !data.session };
  },

  async signOut() {
    await supabase.auth.signOut();
  },

  /** Check the authenticated user's database-assigned role. */
  async checkAdmin(): Promise<boolean> {
    const { data: authData, error: authError } = await supabase.auth.getUser();
    if (authError || !authData.user) return false;

    const { data, error } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", authData.user.id)
      .eq("role", "admin")
      .maybeSingle();

    return !error && data?.role === "admin";
  },

  async adminExists(): Promise<boolean> {
    const { data } = await supabase.rpc("admin_exists");
    return Boolean(data);
  },

  async getUsers() {
    const { data: profiles, error: profileError } = await supabase
      .from("profiles")
      .select("user_id, email, created_at")
      .order("created_at", { ascending: false });
    fail(profileError);
    const { data: roles, error: roleError } = await supabase.from("user_roles").select("user_id, role");
    fail(roleError);
    const adminIds = new Set((roles ?? []).filter((entry) => entry.role === "admin").map((entry) => entry.user_id));
    return (profiles ?? []).map((profile) => ({ ...profile, isAdmin: adminIds.has(profile.user_id) }));
  },

  async setUserAdmin(userId: string, enabled: boolean) {
    if (enabled) {
      const { error } = await supabase.from("user_roles").insert({ user_id: userId, role: "admin" });
      if (error && error.code !== "23505") fail(error);
      return;
    }
    const { error } = await supabase
      .from("user_roles")
      .delete()
      .eq("user_id", userId)
      .eq("role", "admin");
    fail(error);
  },
};
