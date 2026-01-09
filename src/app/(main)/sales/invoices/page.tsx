"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SalesService } from "@/services/sales";
import { Invoice, InvoiceStatus } from "@/lib/types";

const statuses: { key: InvoiceStatus; label: string }[] = [
  { key: "draft", label: "Draft" },
  { key: "sent", label: "Sent" },
  { key: "paid", label: "Paid" },
  { key: "overdue", label: "Overdue" },
  { key: "cancelled", label: "Cancelled" },
];

export default function InvoicesPage() {
  const router = useRouter();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<InvoiceStatus | undefined>(undefined);

  useEffect(() => {
    let active = true;
    setLoading(true);
    SalesService.listInvoices(1, 100).then((res) => {
      if (!active) return;
      setInvoices(res.items);
      setLoading(false);
    });
    return () => { active = false; };
  }, []);

  const filtered = status ? invoices.filter((inv) => inv.status === status) : invoices;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Invoices</h1>
        <button
          onClick={() => router.push("/sales/invoices/new")}
          className="px-4 py-2 rounded-md bg-gradient-to-r from-[#3245ff] to-[#48c9ff] text-white"
        >
          New Invoice
        </button>
      </div>

      <div className="flex items-center gap-2 text-sm">
        <button
          className={`px-3 py-1.5 rounded-md border ${!status ? "border-blue-500 text-blue-600" : "border-gray-300 text-gray-600"}`}
          onClick={() => setStatus(undefined)}
        >
          All
        </button>
        {statuses.map((s) => (
          <button
            key={s.key}
            className={`px-3 py-1.5 rounded-md border ${status === s.key ? "border-blue-500 text-blue-600" : "border-gray-300 text-gray-600"}`}
            onClick={() => setStatus(s.key)}
          >
            {s.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-4 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-gray-200 dark:bg-white/10 rounded-md" />
          ))}
        </div>
      ) : (
        <div className="overflow-hidden border border-gray-200 dark:border-white/10 rounded-lg">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-white/5 text-gray-600">
              <tr>
                <th className="text-left p-3">Invoice #</th>
                <th className="text-left p-3">Customer</th>
                <th className="text-left p-3">Total</th>
                <th className="text-left p-3">Due Date</th>
                <th className="text-left p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((inv) => (
                <tr key={inv.id} className="border-t border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5">
                  <td className="p-3 text-blue-600 font-medium">{inv.invoiceNumber}</td>
                  <td className="p-3">{inv.customerName}</td>
                  <td className="p-3">${inv.total.toFixed(2)}</td>
                  <td className="p-3">{new Date(inv.dueDate).toLocaleDateString()}</td>
                  <td className="p-3">
                    <span className={statusBadge(inv.status)}>{inv.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function statusBadge(s: InvoiceStatus) {
  switch (s) {
    case "draft":
      return "px-2 py-1 rounded bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-200";
    case "sent":
      return "px-2 py-1 rounded bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300";
    case "paid":
      return "px-2 py-1 rounded bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-300";
    case "overdue":
      return "px-2 py-1 rounded bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-300";
    case "cancelled":
      return "px-2 py-1 rounded bg-gray-200 text-gray-600 dark:bg-white/10 dark:text-gray-300";
  }
}
