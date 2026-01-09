"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { LeadsService } from "@/services/leads";
import { Lead } from "@/lib/types";

export default function LeadDetailPage() {
  const params = useParams();
  const id = (params?.id as string) || "";
  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    LeadsService.getLead(id).then((res) => {
      if (!active) return;
      setLead(res ?? null);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [id]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{lead?.name || "Lead"}</h1>
          <div className="text-sm text-gray-500">ID: {id}</div>
        </div>
        <Link href="/leads" className="text-sm text-blue-600 hover:underline">Back to Leads</Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 rounded-lg bg-gray-200 dark:bg-white/10" />
          ))}
          <div className="md:col-span-3 h-64 rounded-lg bg-gray-200 dark:bg-white/10" />
        </div>
      ) : lead ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-md border border-gray-200 dark:border-white/10 p-4">
              <div className="text-xs text-gray-500">Email</div>
              <div className="text-sm">{lead.email || '-'}</div>
            </div>
            <div className="rounded-md border border-gray-200 dark:border-white/10 p-4">
              <div className="text-xs text-gray-500">Phone</div>
              <div className="text-sm">{lead.phone || '-'}</div>
            </div>
            <div className="rounded-md border border-gray-200 dark:border-white/10 p-4">
              <div className="text-xs text-gray-500">Company</div>
              <div className="text-sm">{lead.company || '-'}</div>
            </div>
          </div>

          <div className="rounded-md border border-gray-200 dark:border-white/10 p-4">
            <div className="text-sm font-medium mb-2">Notes</div>
            <div className="text-sm whitespace-pre-wrap min-h-[80px]">{lead.notes || '—'}</div>
          </div>

          <div className="rounded-md border border-gray-200 dark:border-white/10 p-4">
            <div className="text-sm font-medium mb-2">Timeline</div>
            <div className="text-sm text-gray-500">Activity timeline will be powered by the backend later.</div>
          </div>
        </div>
      ) : (
        <div className="text-gray-500">Lead not found.</div>
      )}
    </div>
  );
}
