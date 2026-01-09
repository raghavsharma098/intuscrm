"use client";

import { CreateInvoiceInput, Invoice, InvoiceStatus, PagedResult, Quotation, CreateQuotationInput, QuotationStatus } from "@/lib/types";

const LS_KEYS = {
  invoices: "intuscrm.invoices",
  quotations: "intuscrm.quotations",
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
  const invoices = getFromLS<Invoice[]>(LS_KEYS.invoices, []);
  if (invoices.length === 0) {
    const now = nowISO();
    const seeded: Invoice[] = [
      {
        id: "inv_001",
        invoiceNumber: "INV-0042",
        customerId: "cust_acme",
        customerName: "Acme Corp",
        status: "paid",
        items: [
          { id: "item_1", description: "Professional Services - Q4", quantity: 1, unitPrice: 2450, total: 2450 },
        ],
        subtotal: 2450,
        tax: 0,
        total: 2450,
        dueDate: new Date(Date.now() - 86400000 * 7).toISOString(),
        createdAt: now,
        updatedAt: now,
      },
      {
        id: "inv_002",
        invoiceNumber: "INV-0043",
        customerId: "cust_widgets",
        customerName: "Widgets.io",
        status: "sent",
        items: [
          { id: "item_2", description: "Monthly Subscription - Jan 2026", quantity: 1, unitPrice: 199, total: 199 },
        ],
        subtotal: 199,
        tax: 19.9,
        total: 218.9,
        dueDate: new Date(Date.now() + 86400000 * 14).toISOString(),
        createdAt: now,
        updatedAt: now,
      },
    ];
    setToLS(LS_KEYS.invoices, seeded);
  }

  const quotations = getFromLS<Quotation[]>(LS_KEYS.quotations, []);
  if (quotations.length === 0) {
    const now = nowISO();
    const seeded: Quotation[] = [
      {
        id: "qt_001",
        quotationNumber: "QT-0001",
        customerId: "cust_widget",
        customerName: "Widget.io",
        status: "sent",
        items: [
          { id: "qtitem_1", description: "SMS Campaign Setup", quantity: 1, unitPrice: 500, total: 500 },
          { id: "qtitem_2", description: "WhatsApp Integration", quantity: 1, unitPrice: 1500, total: 1500 },
        ],
        subtotal: 2000,
        tax: 200,
        total: 2200,
        validUntil: new Date(Date.now() + 86400000 * 30).toISOString(),
        createdAt: now,
        updatedAt: now,
      },
      {
        id: "qt_002",
        quotationNumber: "QT-0002",
        customerId: "cust_tech",
        customerName: "TechStart Inc",
        status: "draft",
        items: [
          { id: "qtitem_3", description: "Voice API Premium", quantity: 100, unitPrice: 50, total: 5000 },
        ],
        subtotal: 5000,
        tax: 500,
        total: 5500,
        validUntil: new Date(Date.now() + 86400000 * 14).toISOString(),
        createdAt: now,
        updatedAt: now,
      },
    ];
    setToLS(LS_KEYS.quotations, seeded);
  }
}

function delay(ms = 350) {
  return new Promise((res) => setTimeout(res, ms));
}

export const SalesService = {
  async listInvoices(page = 1, pageSize = 10, status?: InvoiceStatus): Promise<PagedResult<Invoice>> {
    ensureSeed();
    const items = getFromLS<Invoice[]>(LS_KEYS.invoices, []);
    const filtered = status ? items.filter((inv) => inv.status === status) : items;
    const start = (page - 1) * pageSize;
    await delay();
    return { items: filtered.slice(start, start + pageSize), page, pageSize, total: filtered.length };
  },

  async getInvoice(id: string): Promise<Invoice | undefined> {
    ensureSeed();
    const items = getFromLS<Invoice[]>(LS_KEYS.invoices, []);
    await delay();
    return items.find((inv) => inv.id === id);
  },

  async createInvoice(input: CreateInvoiceInput): Promise<Invoice> {
    ensureSeed();
    const items = getFromLS<Invoice[]>(LS_KEYS.invoices, []);
    const now = nowISO();
    const invoiceItems = input.items.map((it, idx) => ({
      id: `item_${Math.random().toString(36).slice(2, 6)}`,
      description: it.description,
      quantity: it.quantity,
      unitPrice: it.unitPrice,
      total: it.quantity * it.unitPrice,
    }));
    const subtotal = invoiceItems.reduce((sum, it) => sum + it.total, 0);
    const tax = subtotal * 0.1; // simple 10% tax
    const newInvoice: Invoice = {
      id: `inv_${Math.random().toString(36).slice(2, 10)}`,
      invoiceNumber: `INV-${String(items.length + 44).padStart(4, "0")}`,
      customerId: input.customerId,
      customerName: input.customerName,
      status: "draft",
      items: invoiceItems,
      subtotal,
      tax,
      total: subtotal + tax,
      dueDate: input.dueDate,
      createdAt: now,
      updatedAt: now,
    };
    const next = [newInvoice, ...items];
    setToLS(LS_KEYS.invoices, next);
    await delay();
    return newInvoice;
  },

  async listQuotations(page = 1, pageSize = 10, status?: QuotationStatus): Promise<PagedResult<Quotation>> {
    ensureSeed();
    const items = getFromLS<Quotation[]>(LS_KEYS.quotations, []);
    const filtered = status ? items.filter((qt) => qt.status === status) : items;
    const start = (page - 1) * pageSize;
    await delay();
    return { items: filtered.slice(start, start + pageSize), page, pageSize, total: filtered.length };
  },

  async getQuotation(id: string): Promise<Quotation | undefined> {
    ensureSeed();
    const items = getFromLS<Quotation[]>(LS_KEYS.quotations, []);
    await delay();
    return items.find((qt) => qt.id === id);
  },

  async createQuotation(input: CreateQuotationInput): Promise<Quotation> {
    ensureSeed();
    const items = getFromLS<Quotation[]>(LS_KEYS.quotations, []);
    const now = nowISO();
    const quotationItems = input.items.map((it, idx) => ({
      id: `qtitem_${Math.random().toString(36).slice(2, 6)}`,
      description: it.description,
      quantity: it.quantity,
      unitPrice: it.unitPrice,
      total: it.quantity * it.unitPrice,
    }));
    const subtotal = quotationItems.reduce((sum, it) => sum + it.total, 0);
    const tax = subtotal * 0.1;
    const newQuotation: Quotation = {
      id: `qt_${Math.random().toString(36).slice(2, 10)}`,
      quotationNumber: `QT-${String(items.length + 1).padStart(4, "0")}`,
      customerId: input.customerId,
      customerName: input.customerName,
      status: "draft",
      items: quotationItems,
      subtotal,
      tax,
      total: subtotal + tax,
      validUntil: input.validUntil,
      createdAt: now,
      updatedAt: now,
    };
    const next = [newQuotation, ...items];
    setToLS(LS_KEYS.quotations, next);
    await delay();
    return newQuotation;
  },

  async updateQuotationStatus(id: string, status: QuotationStatus): Promise<Quotation | undefined> {
    const items = getFromLS<Quotation[]>(LS_KEYS.quotations, []);
    const idx = items.findIndex((qt) => qt.id === id);
    if (idx >= 0) {
      items[idx].status = status;
      items[idx].updatedAt = nowISO();
      setToLS(LS_KEYS.quotations, items);
      return items[idx];
    }
    return undefined;
  },
};
