"use client";

import { Transaction, WalletBalance } from "@/lib/types";

const LS_KEYS = {
  wallet: "intuscrm.wallet",
  transactions: "intuscrm.transactions",
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
  const wallet = getFromLS<WalletBalance | null>(LS_KEYS.wallet, null);
  if (!wallet) {
    setToLS(LS_KEYS.wallet, { balance: 100.0, currency: "USD", updatedAt: nowISO() } as WalletBalance);
  }
  const txns = getFromLS<Transaction[]>(LS_KEYS.transactions, []);
  if (txns.length === 0) {
    const seeded: Transaction[] = [
      { id: "txn_1", type: "credit", amount: 100.0, description: "Initial credit", createdAt: nowISO() },
    ];
    setToLS(LS_KEYS.transactions, seeded);
  }
}

function delay(ms = 300) { return new Promise((res) => setTimeout(res, ms)); }

export const BillingService = {
  async getWallet(): Promise<WalletBalance> {
    ensureSeed();
    const wallet = getFromLS<WalletBalance>(LS_KEYS.wallet, { balance: 0, currency: "USD", updatedAt: nowISO() });
    await delay();
    return wallet;
  },

  async listTransactions(): Promise<Transaction[]> {
    ensureSeed();
    const txns = getFromLS<Transaction[]>(LS_KEYS.transactions, []);
    await delay();
    return txns.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  },

  async recharge(amount: number): Promise<WalletBalance> {
    ensureSeed();
    const wallet = getFromLS<WalletBalance>(LS_KEYS.wallet, { balance: 0, currency: "USD", updatedAt: nowISO() });
    const nextWallet: WalletBalance = { ...wallet, balance: wallet.balance + amount, updatedAt: nowISO() };
    setToLS(LS_KEYS.wallet, nextWallet);
    const txns = getFromLS<Transaction[]>(LS_KEYS.transactions, []);
    const newTxn: Transaction = { id: `txn_${Math.random().toString(36).slice(2, 10)}`, type: "credit", amount, description: "Wallet recharge", createdAt: nowISO() };
    setToLS(LS_KEYS.transactions, [newTxn, ...txns]);
    await delay();
    return nextWallet;
  },
};
