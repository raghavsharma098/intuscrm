"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { HelpdeskService } from "@/services/helpdesk";
import { Ticket, TicketPriority, TicketStatus } from "@/lib/types";

const statuses: { key: TicketStatus; label: string }[] = [
  { key: "open", label: "Open" },
  { key: "in-progress", label: "In Progress" },
  { key: "resolved", label: "Resolved" },
  { key: "closed", label: "Closed" },
];

export default function HelpdeskPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const openOnLoad = searchParams.get("new") === "1";

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<TicketStatus | undefined>(undefined);
  const [showNew, setShowNew] = useState(false);
  const [form, setForm] = useState({ subject: "", description: "", priority: "medium" as TicketPriority, customerName: "" });

  useEffect(() => {
    let active = true;
    setLoading(true);
    HelpdeskService.listTickets(1, 100).then((res) => {
      if (!active) return;
      setTickets(res.items);
      setLoading(false);
    });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (openOnLoad) setShowNew(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openOnLoad]);

  const filtered = status ? tickets.filter((t) => t.status === status) : tickets;

  async function handleCreate() {
    const created = await HelpdeskService.createTicket(form);
    setTickets((prev) => [created, ...prev]);
    setShowNew(false);
    setForm({ subject: "", description: "", priority: "medium", customerName: "" });
    router.replace("/helpdesk");
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Helpdesk</h1>
        <button
          onClick={() => setShowNew(true)}
          className="px-4 py-2 rounded-md bg-gradient-to-r from-[#3245ff] to-[#48c9ff] text-white"
        >
          New Ticket
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
                <th className="text-left p-3">Ticket #</th>
                <th className="text-left p-3">Subject</th>
                <th className="text-left p-3">Customer</th>
                <th className="text-left p-3">Priority</th>
                <th className="text-left p-3">Status</th>
                <th className="text-left p-3">Assigned</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <tr key={t.id} className="border-t border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5">
                  <td className="p-3 text-blue-600 font-medium">{t.ticketNumber}</td>
                  <td className="p-3">{t.subject}</td>
                  <td className="p-3">{t.customerName || "-"}</td>
                  <td className="p-3">
                    <span className={priorityBadge(t.priority)}>{t.priority}</span>
                  </td>
                  <td className="p-3">
                    <span className={statusBadge(t.status)}>{t.status}</span>
                  </td>
                  <td className="p-3">{t.assignedTo || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showNew && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-lg rounded-lg bg-white dark:bg-[#0A0F1C] border border-gray-200 dark:border-white/10">
            <div className="p-4 border-b border-gray-200 dark:border-white/10 flex items-center justify-between">
              <div className="font-semibold">Create Ticket</div>
              <button onClick={() => { setShowNew(false); router.replace('/helpdesk'); }} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium">Subject</label>
                <input
                  className="w-full rounded-md border border-gray-300 bg-white/90 dark:bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.subject}
                  onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea
                  rows={4}
                  className="w-full rounded-md border border-gray-300 bg-white/90 dark:bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium">Customer Name</label>
                  <input
                    className="w-full rounded-md border border-gray-300 bg-white/90 dark:bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                    value={form.customerName}
                    onChange={(e) => setForm((f) => ({ ...f, customerName: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Priority</label>
                  <select
                    className="w-full rounded-md border border-gray-300 bg-white/90 dark:bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                    value={form.priority}
                    onChange={(e) => setForm((f) => ({ ...f, priority: e.target.value as TicketPriority }))}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="p-4 flex items-center justify-end gap-3 border-t border-gray-200 dark:border-white/10">
              <button
                type="button"
                onClick={() => { setShowNew(false); router.replace('/helpdesk'); }}
                className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50 dark:hover:bg-white/5"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCreate}
                className="px-4 py-2 rounded-md bg-gradient-to-r from-[#3245ff] to-[#48c9ff] text-white disabled:opacity-50"
                disabled={!form.subject.trim() || !form.description.trim()}
              >
                Create Ticket
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function priorityBadge(p: TicketPriority) {
  switch (p) {
    case "low":
      return "px-2 py-1 rounded bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-200";
    case "medium":
      return "px-2 py-1 rounded bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300";
    case "high":
      return "px-2 py-1 rounded bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300";
    case "urgent":
      return "px-2 py-1 rounded bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-300";
  }
}

function statusBadge(s: TicketStatus) {
  switch (s) {
    case "open":
      return "px-2 py-1 rounded bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-200";
    case "in-progress":
      return "px-2 py-1 rounded bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300";
    case "resolved":
      return "px-2 py-1 rounded bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-300";
    case "closed":
      return "px-2 py-1 rounded bg-gray-200 text-gray-600 dark:bg-white/10 dark:text-gray-300";
  }
}
