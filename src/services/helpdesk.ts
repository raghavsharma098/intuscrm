"use client";

import { CreateTicketInput, Ticket, TicketPriority, TicketStatus, PagedResult } from "@/lib/types";

const LS_KEYS = {
  tickets: "intuscrm.tickets",
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
  const tickets = getFromLS<Ticket[]>(LS_KEYS.tickets, []);
  if (tickets.length === 0) {
    const now = nowISO();
    const seeded: Ticket[] = [
      {
        id: "tkt_001",
        ticketNumber: "TKT-1234",
        subject: "Cannot send campaigns",
        description: "Getting error when trying to send a campaign to my audience.",
        priority: "high",
        status: "in-progress",
        customerName: "John Doe",
        assignedTo: "Admin",
        createdAt: now,
        updatedAt: now,
      },
      {
        id: "tkt_002",
        ticketNumber: "TKT-1235",
        subject: "Billing question",
        description: "Need clarification on my invoice charges.",
        priority: "medium",
        status: "open",
        customerName: "Jane Smith",
        assignedTo: "Admin",
        createdAt: now,
        updatedAt: now,
      },
    ];
    setToLS(LS_KEYS.tickets, seeded);
  }
}

function delay(ms = 350) {
  return new Promise((res) => setTimeout(res, ms));
}

export const HelpdeskService = {
  async listTickets(page = 1, pageSize = 10, status?: TicketStatus): Promise<PagedResult<Ticket>> {
    ensureSeed();
    const items = getFromLS<Ticket[]>(LS_KEYS.tickets, []);
    const filtered = status ? items.filter((t) => t.status === status) : items;
    const start = (page - 1) * pageSize;
    await delay();
    return { items: filtered.slice(start, start + pageSize), page, pageSize, total: filtered.length };
  },

  async getTicket(id: string): Promise<Ticket | undefined> {
    ensureSeed();
    const items = getFromLS<Ticket[]>(LS_KEYS.tickets, []);
    await delay();
    return items.find((t) => t.id === id);
  },

  async createTicket(input: CreateTicketInput): Promise<Ticket> {
    ensureSeed();
    const items = getFromLS<Ticket[]>(LS_KEYS.tickets, []);
    const now = nowISO();
    const newTicket: Ticket = {
      id: `tkt_${Math.random().toString(36).slice(2, 10)}`,
      ticketNumber: `TKT-${1236 + items.length}`,
      subject: input.subject,
      description: input.description,
      priority: input.priority,
      status: "open",
      customerName: input.customerName,
      assignedTo: "Admin",
      createdAt: now,
      updatedAt: now,
    };
    const next = [newTicket, ...items];
    setToLS(LS_KEYS.tickets, next);
    await delay();
    return newTicket;
  },
};
