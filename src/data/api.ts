/**
 * Mock API layer.
 *
 * Every function here is the ONLY place the front end touches "the server".
 * Swap these implementations for real fetch/SDK calls (Node, Supabase,
 * Firebase, Django, ...) and the whole application keeps working unchanged.
 */

import {
  initialContent,
  type Lead,
  type NewsPost,
  type Review,
  type SiteContent,
} from "./content";

const LATENCY = 350;

function delay<T>(value: T, ms = LATENCY): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export const api = {
  /** TODO: connect to backend — GET /api/content */
  async getContent(): Promise<SiteContent> {
    return delay(initialContent, 0);
  },

  /** TODO: connect to backend — POST /api/reviews (stored as "pending" for moderation) */
  async submitReview(input: Omit<Review, "id" | "status" | "date" | "avatar">): Promise<Review> {
    return delay({
      ...input,
      id: `r-${Date.now()}`,
      status: "pending" as const,
      date: new Date().toISOString().slice(0, 10),
      avatar: input.name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
    });
  },

  /** TODO: connect to backend — POST /api/contact (should also trigger a notification email) */
  async submitContact(input: {
    name: string;
    email: string;
    phone: string;
    message: string;
  }): Promise<Lead> {
    return delay({
      id: `l-${Date.now()}`,
      source: "Contact form" as const,
      name: input.name,
      email: input.email,
      message: input.message,
      date: new Date().toISOString().slice(0, 10),
    });
  },

  /** TODO: connect to backend — POST /api/leads from the chatbot conversation */
  async submitChatLead(input: { name: string; email: string; message: string }): Promise<Lead> {
    return delay({
      id: `l-${Date.now()}`,
      source: "Chatbot" as const,
      ...input,
      date: new Date().toISOString().slice(0, 10),
    });
  },

  /** TODO: connect to backend — POST /api/newsletter */
  async subscribe(email: string): Promise<{ ok: true }> {
    console.info("[mock] newsletter subscribe", email);
    return delay({ ok: true as const });
  },

  /** TODO: connect to backend — POST /api/auth/login with real credentials + session */
  async adminLogin(email: string, password: string): Promise<{ ok: boolean; message?: string }> {
    if (email.trim().length > 3 && password.length >= 4) return delay({ ok: true });
    return delay({ ok: false, message: "Enter any email and a password of at least 4 characters." });
  },

  /** TODO: connect to backend — PUT /api/news/:id etc. Admin mutations are local-only today. */
  async saveNews(post: NewsPost): Promise<NewsPost> {
    return delay(post);
  },
};
