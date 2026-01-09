"use client";

import { CreateLeadInput, Lead, LeadStatus, PagedResult } from "@/lib/types";

const LS_KEYS = {
  leads: "intuscrm.leads",
};

function nowISO() {
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

function ensureSeed() {
  const leads = getFromLS<Lead[]>(LS_KEYS.leads, []);
  if (leads.length === 0) {
    const seeded: Lead[] = [
      {
        id: "lead_amy",
        name: "Amy Johnson",
        email: "amy@example.com",
        phone: "+1 555 0102",
        company: "Acme Co",
        status: "qualified",
        source: "Website",
        owner: "Admin",
        createdAt: nowISO(),
        updatedAt: nowISO(),
        notes: "Requested a demo; interested in campaigns module.",
      },
      {
        id: "lead_ben",
        name: "Ben Carter",
        email: "ben@widgets.io",
        phone: "+1 555 0134",
        company: "Widgets.io",
        status: "contacted",
        source: "Import",
        owner: "Admin",
        createdAt: nowISO(),
        updatedAt: nowISO(),
      },
    ];
    setToLS(LS_KEYS.leads, seeded);
  }
}

function delay(ms = 350) {
  return new Promise((res) => setTimeout(res, ms));
}

export const LeadsService = {
  async listLeads(page = 1, pageSize = 10, status?: LeadStatus): Promise<PagedResult<Lead>> {
    ensureSeed();
    const items = getFromLS<Lead[]>(LS_KEYS.leads, []);
    const filtered = status ? items.filter((l) => l.status === status) : items;
    const start = (page - 1) * pageSize;
    await delay();
    return { items: filtered.slice(start, start + pageSize), page, pageSize, total: filtered.length };
  },

  async getLead(id: string): Promise<Lead | undefined> {
    ensureSeed();
    const items = getFromLS<Lead[]>(LS_KEYS.leads, []);
    await delay();
    return items.find((l) => l.id === id);
  },

  async createLead(input: CreateLeadInput): Promise<Lead> {
    ensureSeed();
    const items = getFromLS<Lead[]>(LS_KEYS.leads, []);
    const newLead: Lead = {
      id: `lead_${Math.random().toString(36).slice(2, 10)}`,
      name: input.name,
      email: input.email,
      phone: input.phone,
      company: input.company,
      status: input.status ?? "new",
      source: input.source ?? "Website",
      owner: "Admin",
      createdAt: nowISO(),
      updatedAt: nowISO(),
    };
    const next = [newLead, ...items];
    setToLS(LS_KEYS.leads, next);
    await delay();
    return newLead;
  },

  async updateLead(id: string, patch: Partial<Lead>): Promise<Lead | undefined> {
    ensureSeed();
    const items = getFromLS<Lead[]>(LS_KEYS.leads, []);
    const idx = items.findIndex((l) => l.id === id);
    if (idx === -1) return undefined;
    const updated: Lead = { ...items[idx], ...patch, updatedAt: nowISO() };
    items[idx] = updated;
    setToLS(LS_KEYS.leads, items);
    await delay();
    return updated;
  },
};
