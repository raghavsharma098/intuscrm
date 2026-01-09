"use client";

import { Audience, Campaign, CreateCampaignInput, PagedResult } from "@/lib/types";

// Client-side placeholder service using localStorage.
// Later, swap implementations to real API calls without changing consumers.

const LS_KEYS = {
  campaigns: "intuscrm.campaigns",
  audiences: "intuscrm.audiences",
};

function safeNowISO() {
  return new Date().toISOString();
}

function getFromLS<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function setToLS<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
}

// Seed minimal demo data if empty
function ensureSeed() {
  const audiences = getFromLS<Audience[]>(LS_KEYS.audiences, []);
  if (audiences.length === 0) {
    const seeded: Audience[] = [
      { id: "aud_default", name: "All Contacts", description: "Every contact in CRM", size: 12450, createdAt: safeNowISO() },
      { id: "aud_warm", name: "Warm Leads", description: "Leads with last activity < 30 days", size: 1842, createdAt: safeNowISO() },
    ];
    setToLS(LS_KEYS.audiences, seeded);
  }

  const campaigns = getFromLS<Campaign[]>(LS_KEYS.campaigns, []);
  if (campaigns.length === 0) {
    const now = safeNowISO();
    const seeded: Campaign[] = [
      {
        id: "cmp_welcome",
        name: "Welcome Series",
        channel: "email",
        audienceId: "aud_default",
        message: { subject: "Welcome to Intus One", body: "Glad you're here!", mediaUrl: undefined },
        schedule: { type: "now" },
        status: "completed",
        createdAt: now,
        updatedAt: now,
        metrics: { sent: 12000, delivered: 11850, failed: 150, opens: 8450, clicks: 2140 },
      },
      {
        id: "cmp_flash",
        name: "Flash SMS Promo",
        channel: "sms",
        audienceId: "aud_warm",
        message: { body: "48h offer: Upgrade and save 30%" },
        schedule: { type: "scheduled", scheduledAt: new Date(Date.now() + 86400000).toISOString(), timezone: Intl.DateTimeFormat().resolvedOptions().timeZone },
        status: "scheduled",
        createdAt: now,
        updatedAt: now,
        metrics: { sent: 0, delivered: 0, failed: 0 },
      },
    ];
    setToLS(LS_KEYS.campaigns, seeded);
  }
}

export const CampaignService = {
  async listCampaigns(page = 1, pageSize = 10): Promise<PagedResult<Campaign>> {
    ensureSeed();
    const items = getFromLS<Campaign[]>(LS_KEYS.campaigns, []);
    const start = (page - 1) * pageSize;
    const pageItems = items.slice(start, start + pageSize);
    await delay();
    return { items: pageItems, page, pageSize, total: items.length };
  },

  async getCampaign(id: string): Promise<Campaign | undefined> {
    ensureSeed();
    const items = getFromLS<Campaign[]>(LS_KEYS.campaigns, []);
    await delay();
    return items.find((c) => c.id === id);
  },

  async createCampaign(input: CreateCampaignInput): Promise<Campaign> {
    ensureSeed();
    const items = getFromLS<Campaign[]>(LS_KEYS.campaigns, []);
    const now = safeNowISO();
    const newCamp: Campaign = {
      id: `cmp_${Math.random().toString(36).slice(2, 10)}`,
      name: input.name,
      channel: input.channel,
      audienceId: input.audienceId,
      message: input.message,
      schedule: input.schedule,
      status: input.schedule.type === "now" ? "running" : "scheduled",
      createdAt: now,
      updatedAt: now,
      metrics: { sent: 0, delivered: 0, failed: 0 },
    };
    const next = [newCamp, ...items];
    setToLS(LS_KEYS.campaigns, next);
    await delay();
    return newCamp;
  },

  async updateCampaign(id: string, patch: Partial<Campaign>): Promise<Campaign | undefined> {
    ensureSeed();
    const items = getFromLS<Campaign[]>(LS_KEYS.campaigns, []);
    const idx = items.findIndex((c) => c.id === id);
    if (idx === -1) return undefined;
    const updated: Campaign = { ...items[idx], ...patch, updatedAt: safeNowISO() };
    items[idx] = updated;
    setToLS(LS_KEYS.campaigns, items);
    await delay();
    return updated;
  },

  async listAudiences(): Promise<Audience[]> {
    ensureSeed();
    const audiences = getFromLS<Audience[]>(LS_KEYS.audiences, []);
    await delay();
    return audiences;
  },

  async createAudience(input: Pick<Audience, "name" | "description"> & { size?: number }): Promise<Audience> {
    ensureSeed();
    const audiences = getFromLS<Audience[]>(LS_KEYS.audiences, []);
    const newAud: Audience = {
      id: `aud_${Math.random().toString(36).slice(2, 10)}`,
      name: input.name,
      description: input.description,
      size: input.size ?? 0,
      createdAt: safeNowISO(),
    };
    const next = [newAud, ...audiences];
    setToLS(LS_KEYS.audiences, next);
    await delay();
    return newAud;
  },
};

function delay(ms = 400) {
  return new Promise((res) => setTimeout(res, ms));
}
