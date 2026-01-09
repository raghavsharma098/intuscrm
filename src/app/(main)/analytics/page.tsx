"use client";

import { useMemo } from "react";
import { useAsync } from "@/lib/hooks/useAsync";
import { Campaign } from "@/lib/types";
import { CampaignService } from "@/services/campaigns";

export default function AnalyticsPage() {
  const { data, loading } = useAsync(() => CampaignService.listCampaigns(1, 100));
  const campaigns = (data?.items ?? []) as Campaign[];

  const metrics = useMemo(() => {
    const init = { total: 0, sent: 0, delivered: 0, failed: 0, opens: 0, clicks: 0 };
    for (const c of campaigns) {
      init.total += 1;
      init.sent += c.metrics?.sent ?? 0;
      init.delivered += c.metrics?.delivered ?? 0;
      init.failed += c.metrics?.failed ?? 0;
      init.opens += c.metrics?.opens ?? 0;
      init.clicks += c.metrics?.clicks ?? 0;
    }
    return init;
  }, [campaigns]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Analytics</h1>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-gray-200 dark:bg-white/10 rounded-md" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard label="Campaigns" value={metrics.total} />
          <StatCard label="Delivered" value={metrics.delivered} />
          <StatCard label="Failed" value={metrics.failed} />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SimpleLineChart title="Delivery Over Time" data={[metrics.sent, metrics.delivered, metrics.failed]} labels={["Sent", "Delivered", "Failed"]} />
        <SimpleBarChart title="Engagement" data={[metrics.opens, metrics.clicks]} labels={["Opens", "Clicks"]} />
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-gray-200 dark:border-white/10 p-6">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-3xl font-semibold mt-2">{value.toLocaleString()}</div>
    </div>
  );
}

function ChartPlaceholder({ title }: { title: string }) {
  return (
    <div className="rounded-lg border border-gray-200 dark:border-white/10 p-6">
      <div className="text-sm text-gray-500 mb-2">{title}</div>
      <div className="h-48 bg-gray-100 dark:bg-white/5 rounded-md flex items-center justify-center text-gray-400 text-sm">
        Chart will render here (backend later)
      </div>
    </div>
  );
}

function SimpleLineChart({ title, data, labels }: { title: string; data: number[]; labels: string[] }) {
  const max = Math.max(...data, 1);
  return (
    <div className="rounded-lg border border-gray-200 dark:border-white/10 p-6">
      <div className="text-sm text-gray-500 mb-4">{title}</div>
      <div className="h-48 flex items-end gap-4">
        {data.map((v, i) => {
          const height = (v / max) * 100;
          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <div className="text-xs font-medium">{v.toLocaleString()}</div>
              <div className="w-full bg-indigo-600 rounded-t" style={{ height: `${height}%` }} />
              <div className="text-xs text-gray-500">{labels[i]}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SimpleBarChart({ title, data, labels }: { title: string; data: number[]; labels: string[] }) {
  const max = Math.max(...data, 1);
  return (
    <div className="rounded-lg border border-gray-200 dark:border-white/10 p-6">
      <div className="text-sm text-gray-500 mb-4">{title}</div>
      <div className="h-48 flex flex-col justify-around">
        {data.map((v, i) => {
          const width = (v / max) * 100;
          return (
            <div key={i} className="flex items-center gap-3">
              <div className="text-xs text-gray-500 w-16">{labels[i]}</div>
              <div className="flex-1 bg-gray-100 dark:bg-white/5 rounded h-8 relative">
                <div className="bg-green-600 h-full rounded" style={{ width: `${width}%` }} />
              </div>
              <div className="text-xs font-medium w-16 text-right">{v.toLocaleString()}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
