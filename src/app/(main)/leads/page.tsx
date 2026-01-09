"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { LeadsService } from "@/services/leads";
import { Lead, LeadStatus } from "@/lib/types";

const statuses: { key: LeadStatus; label: string }[] = [
  { key: "new", label: "New" },
  { key: "contacted", label: "Contacted" },
  { key: "qualified", label: "Qualified" },
  { key: "lost", label: "Lost" },
];

export default function LeadsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const openOnLoad = searchParams.get("new") === "1";

  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<LeadStatus | undefined>(undefined);
  const [view, setView] = useState<"table" | "kanban">("table");
  const [showNew, setShowNew] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "" });

  useEffect(() => {
    let active = true;
    setLoading(true);
    LeadsService.listLeads(1, 100).then((res) => {
      if (!active) return;
      setLeads(res.items);
      setLoading(false);
    });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (openOnLoad) setShowNew(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openOnLoad]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return leads
      .filter((l) => !status || l.status === status)
      .filter((l) =>
        l.name.toLowerCase().includes(q) ||
        l.email?.toLowerCase().includes(q) ||
        l.company?.toLowerCase().includes(q) ||
        l.phone?.toLowerCase().includes(q)
      );
  }, [leads, query, status]);

  const grouped = useMemo(() => {
    const base: Record<LeadStatus, Lead[]> = {
      new: [],
      contacted: [],
      qualified: [],
      lost: [],
    };
    for (const l of filtered) base[l.status].push(l);
    return base;
  }, [filtered]);

  async function moveLead(id: string, nextStatus: LeadStatus) {
    const updated = await LeadsService.updateLead(id, { status: nextStatus });
    if (!updated) return;
    setLeads((prev) => prev.map((l) => (l.id === id ? updated : l)));
  }

  async function handleCreate() {
    const created = await LeadsService.createLead({ ...form });
    setLeads((prev) => [created, ...prev]);
    setShowNew(false);
    setForm({ name: "", email: "", phone: "", company: "" });
    router.replace("/leads");
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Leads</h1>
        <button
          onClick={() => setShowNew(true)}
          className="px-4 py-2 rounded-md bg-gradient-to-r from-[#3245ff] to-[#48c9ff] text-white"
        >
          New Lead
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <input
          placeholder="Search leads..."
          className="w-full md:w-80 rounded-md border border-gray-300 bg-white/90 dark:bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
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
        <div className="ml-auto flex items-center gap-2 text-sm">
          <button
            className={`px-3 py-1.5 rounded-md border ${view === "table" ? "border-blue-500 text-blue-600" : "border-gray-300 text-gray-600"}`}
            onClick={() => setView("table")}
          >
            Table
          </button>
          <button
            className={`px-3 py-1.5 rounded-md border ${view === "kanban" ? "border-blue-500 text-blue-600" : "border-gray-300 text-gray-600"}`}
            onClick={() => setView("kanban")}
          >
            Kanban
          </button>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-pulse">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-16 bg-gray-200 dark:bg-white/10 rounded-md" />
          ))}
        </div>
      ) : view === "table" ? (
        <div className="overflow-hidden border border-gray-200 dark:border-white/10 rounded-lg">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-white/5 text-gray-600">
              <tr>
                <th className="text-left p-3">Name</th>
                <th className="text-left p-3">Company</th>
                <th className="text-left p-3">Email</th>
                <th className="text-left p-3">Phone</th>
                <th className="text-left p-3">Status</th>
                <th className="text-left p-3">Source</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((l) => (
                <tr key={l.id} className="border-t border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5">
                  <td className="p-3">
                    <Link href={`/leads/${l.id}`} className="text-blue-600 hover:underline">{l.name}</Link>
                  </td>
                  <td className="p-3">{l.company || "-"}</td>
                  <td className="p-3">{l.email || "-"}</td>
                  <td className="p-3">{l.phone || "-"}</td>
                  <td className="p-3">
                    <span className={statusBadge(l.status)}>{l.status}</span>
                  </td>
                  <td className="p-3">{l.source || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {statuses.map((s) => (
            <div key={s.key} className="rounded-lg border border-gray-200 dark:border-white/10">
              <div className="px-3 py-2 text-sm font-medium bg-gray-50 dark:bg-white/5">{s.label}</div>
              <div className="p-3 space-y-3 min-h-[200px]">
                {grouped[s.key].map((l) => (
                  <div key={l.id} className="rounded-md border border-gray-200 dark:border-white/10 p-3 bg-white/80 dark:bg-white/5">
                    <div className="font-medium text-sm">
                      <Link href={`/leads/${l.id}`} className="text-blue-600 hover:underline">{l.name}</Link>
                    </div>
                    <div className="text-xs text-gray-500">{l.company || l.email || l.phone || "-"}</div>
                    <div className="mt-2 flex items-center gap-2">
                      {statuses
                        .filter((opt) => opt.key !== s.key)
                        .map((opt) => (
                          <button
                            key={opt.key}
                            className="px-2 py-1 rounded-md border border-gray-300 text-xs hover:bg-gray-50 dark:hover:bg-white/10"
                            onClick={() => moveLead(l.id, opt.key)}
                          >
                            Move to {opt.label}
                          </button>
                        ))}
                    </div>
                  </div>
                ))}
                {grouped[s.key].length === 0 && (
                  <div className="text-xs text-gray-500">No leads</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {showNew && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-lg rounded-lg bg-white dark:bg-[#0A0F1C] border border-gray-200 dark:border-white/10">
            <div className="p-4 border-b border-gray-200 dark:border-white/10 flex items-center justify-between">
              <div className="font-semibold">Create Lead</div>
              <button onClick={() => { setShowNew(false); router.replace('/leads'); }} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium">Full name</label>
                <input
                  className="w-full rounded-md border border-gray-300 bg-white/90 dark:bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium">Email</label>
                  <input
                    className="w-full rounded-md border border-gray-300 bg-white/90 dark:bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Phone</label>
                  <input
                    className="w-full rounded-md border border-gray-300 bg-white/90 dark:bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium">Company</label>
                <input
                  className="w-full rounded-md border border-gray-300 bg-white/90 dark:bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.company}
                  onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                />
              </div>
            </div>
            <div className="p-4 flex items-center justify-end gap-3 border-t border-gray-200 dark:border-white/10">
              <button
                type="button"
                onClick={() => { setShowNew(false); router.replace('/leads'); }}
                className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50 dark:hover:bg-white/5"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCreate}
                className="px-4 py-2 rounded-md bg-gradient-to-r from-[#3245ff] to-[#48c9ff] text-white disabled:opacity-50"
                disabled={!form.name.trim()}
              >
                Create Lead
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function statusBadge(s: LeadStatus) {
  switch (s) {
    case "new":
      return "px-2 py-1 rounded bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-200";
    case "contacted":
      return "px-2 py-1 rounded bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300";
    case "qualified":
      return "px-2 py-1 rounded bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-300";
    case "lost":
      return "px-2 py-1 rounded bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-300";
  }
}
