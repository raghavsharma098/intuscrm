"use client";

import { useState } from "react";
import { useAsync } from "@/lib/hooks/useAsync";
import { BillingService } from "@/services/billing";
import { WalletBalance, Transaction } from "@/lib/types";

export default function BillingPage() {
  const { data: wallet, loading: loadingWallet, setData: setWallet } = useAsync<WalletBalance>(() => BillingService.getWallet());
  const { data: txns, loading: loadingTxns, setData: setTxns } = useAsync<Transaction[]>(() => BillingService.listTransactions());
  const [showRecharge, setShowRecharge] = useState(false);
  const [amount, setAmount] = useState("");
  const loading = loadingWallet || loadingTxns;

  async function handleRecharge() {
    const amt = parseFloat(amount);
    if (!amt || amt <= 0) return;
    await BillingService.recharge(amt);
    const updated = await BillingService.getWallet();
    const updatedTxns = await BillingService.listTransactions();
    setWallet(updated);
    setTxns(updatedTxns);
    setAmount("");
    setShowRecharge(false);
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Billing</h1>
        <button
          onClick={() => setShowRecharge(true)}
          className="px-4 py-2 rounded-md bg-gradient-to-r from-[#3245ff] to-[#48c9ff] text-white"
        >
          Recharge Wallet
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-gray-200 dark:bg-white/10 rounded-md" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-lg border border-gray-200 dark:border-white/10 p-6">
            <div className="text-sm text-gray-500">Wallet Balance</div>
            <div className="text-3xl font-semibold mt-2">${wallet?.balance.toFixed(2)}</div>
            <div className="text-xs text-gray-500 mt-1">Updated {wallet ? new Date(wallet.updatedAt).toLocaleString() : "-"}</div>
          </div>
          <div className="rounded-lg border border-gray-200 dark:border-white/10 p-6">
            <div className="text-sm text-gray-500">Currency</div>
            <div className="text-xl font-semibold mt-2">{wallet?.currency || "USD"}</div>
            <div className="text-xs text-gray-500 mt-1">Default</div>
          </div>
          <div className="rounded-lg border border-gray-200 dark:border-white/10 p-6">
            <div className="text-sm text-gray-500">Transactions</div>
            <div className="text-3xl font-semibold mt-2">{(txns ?? []).length}</div>
            <div className="text-xs text-gray-500 mt-1">Recent activity</div>
          </div>
        </div>
      )}

      <div className="overflow-hidden border border-gray-200 dark:border-white/10 rounded-lg">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-white/5 text-gray-600">
            <tr>
              <th className="text-left p-3">Type</th>
              <th className="text-left p-3">Amount</th>
              <th className="text-left p-3">Description</th>
              <th className="text-left p-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {(txns ?? []).map((t) => (
              <tr key={t.id} className="border-t border-gray-200 dark:border-white/10">
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-xs ${t.type === "credit" ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-300" : "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-300"}`}>
                    {t.type}
                  </span>
                </td>
                <td className="p-3">${t.amount.toFixed(2)}</td>
                <td className="p-3">{t.description}</td>
                <td className="p-3">{new Date(t.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showRecharge && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-sm rounded-lg bg-white dark:bg-[#0A0F1C] border border-gray-200 dark:border-white/10">
            <div className="p-4 border-b border-gray-200 dark:border-white/10 flex items-center justify-between">
              <div className="font-semibold">Recharge Wallet</div>
              <button onClick={() => setShowRecharge(false)} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>
            <div className="p-4 space-y-4">
              <label className="block text-sm font-medium">Amount (USD)</label>
              <input
                type="number"
                className="w-full rounded-md border border-gray-300 bg-white/90 dark:bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="p-4 flex items-center justify-end gap-3 border-t border-gray-200 dark:border-white/10">
              <button
                type="button"
                onClick={() => setShowRecharge(false)}
                className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50 dark:hover:bg-white/5"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleRecharge}
                className="px-4 py-2 rounded-md bg-gradient-to-r from-[#3245ff] to-[#48c9ff] text-white disabled:opacity-50"
                disabled={!parseFloat(amount) || parseFloat(amount) <= 0}
              >
                Add Funds
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
