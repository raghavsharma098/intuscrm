"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useAsync } from "@/lib/hooks/useAsync";
import { Campaign } from "@/lib/types";
import { CampaignService } from "@/services/campaigns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useMemo, useState } from "react";

export default function CampaignDetailPage() {
  const params = useParams();
  const id = (params?.id as string) || "";
  const { data, loading } = useAsync(() => CampaignService.getCampaign(id), [id]);
  const [tab, setTab] = useState<"overview" | "recipients" | "content" | "schedule">("overview");

  const camp = data as Campaign | undefined;

  const statusStyle = useMemo(() => {
    switch (camp?.status) {
      case "completed":
        return "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-300";
      case "running":
        return "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300";
      case "scheduled":
        return "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300";
      case "paused":
        return "bg-gray-200 text-gray-700 dark:bg-white/10 dark:text-gray-200";
      case "failed":
        return "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-200";
    }
  }, [camp?.status]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{camp?.name || "Campaign"}</h1>
          <div className="text-sm text-gray-500">ID: {id}</div>
        </div>
        <Link href="/campaigns" className="text-sm text-blue-600 hover:underline">Back to Campaigns</Link>
      </div>

      <div className="flex items-center gap-2 text-sm">
        <span className={`px-2 py-1 rounded ${statusStyle}`}>{camp?.status}</span>
        <span className="text-gray-500">Channel: {camp?.channel.toUpperCase()}</span>
        <span className="text-gray-500">Updated: {camp ? new Date(camp.updatedAt).toLocaleString() : "-"}</span>
      </div>

      <div className="border-b border-gray-200 dark:border-white/10 flex gap-4 text-sm">
        {[
          { k: "overview", l: "Overview" },
          { k: "recipients", l: "Recipients" },
          { k: "content", l: "Content" },
          { k: "schedule", l: "Schedule" },
        ].map((t) => (
          <button
            key={t.k}
            onClick={() => setTab(t.k as any)}
            className={`px-3 py-2 -mb-px border-b-2 transition ${
              tab === t.k ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {t.l}
          </button>
        ))}
      </div>

      {loading && <SkeletonDetail />}

      {!loading && camp && (
        <div className="space-y-6">
          {tab === "overview" && <OverviewTab camp={camp} />}
          {tab === "recipients" && <RecipientsTab camp={camp} />}
          {tab === "content" && <ContentTab camp={camp} />}
          {tab === "schedule" && <ScheduleTab camp={camp} />}
        </div>
      )}
    </div>
  );
}

function SkeletonDetail() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-28 rounded-lg bg-gray-200 dark:bg-white/10" />
      ))}
      <div className="md:col-span-2 h-64 rounded-lg bg-gray-200 dark:bg-white/10" />
      <div className="h-64 rounded-lg bg-gray-200 dark:bg-white/10" />
    </div>
  );
}

function OverviewTab({ camp }: { camp: Campaign }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Delivery</CardTitle>
          <CardDescription>Messages status</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-3 text-center">
          <Metric label="Sent" value={camp.metrics?.sent ?? 0} />
          <Metric label="Delivered" value={camp.metrics?.delivered ?? 0} />
          <Metric label="Failed" value={camp.metrics?.failed ?? 0} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Engagement</CardTitle>
          <CardDescription>Email only</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-3 text-center">
          <Metric label="Opens" value={camp.metrics?.opens ?? 0} />
          <Metric label="Clicks" value={camp.metrics?.clicks ?? 0} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Audience</CardTitle>
          <CardDescription>Target segment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm">ID: {camp.audienceId}</div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Message</CardTitle>
          <CardDescription>Content preview</CardDescription>
        </CardHeader>
        <CardContent>
          {camp.channel === "email" && camp.message.subject && (
            <div className="mb-2 text-sm"><span className="text-gray-500">Subject:</span> {camp.message.subject}</div>
          )}
          <pre className="whitespace-pre-wrap rounded-md border border-gray-200 dark:border-white/10 p-3 text-sm bg-gray-50 dark:bg-white/5">{camp.message.body}</pre>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Schedule</CardTitle>
          <CardDescription>Execution time</CardDescription>
        </CardHeader>
        <CardContent className="text-sm space-y-1">
          <div>Type: {camp.schedule.type}</div>
          {camp.schedule.type === "scheduled" && (
            <>
              <div>At: {camp.schedule.scheduledAt ? new Date(camp.schedule.scheduledAt).toLocaleString() : "-"}</div>
              <div>TZ: {camp.schedule.timezone || "-"}</div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function RecipientsTab({ camp }: { camp: Campaign }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recipients</CardTitle>
        <CardDescription>Audience: {camp.audienceId}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-gray-500">Recipient listing will be powered by backend. For now, managed via audience size and filters.</div>
      </CardContent>
    </Card>
  );
}

function ContentTab({ camp }: { camp: Campaign }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Content</CardTitle>
        <CardDescription>Original message</CardDescription>
      </CardHeader>
      <CardContent>
        {camp.channel === "email" && camp.message.subject && (
          <div className="mb-2 text-sm"><span className="text-gray-500">Subject:</span> {camp.message.subject}</div>
        )}
        <pre className="whitespace-pre-wrap rounded-md border border-gray-200 dark:border-white/10 p-3 text-sm bg-gray-50 dark:bg-white/5">{camp.message.body}</pre>
      </CardContent>
    </Card>
  );
}

function ScheduleTab({ camp }: { camp: Campaign }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Schedule</CardTitle>
        <CardDescription>Delivery timing</CardDescription>
      </CardHeader>
      <CardContent className="text-sm space-y-1">
        <div>Type: {camp.schedule.type}</div>
        {camp.schedule.type === "scheduled" && (
          <>
            <div>At: {camp.schedule.scheduledAt ? new Date(camp.schedule.scheduledAt).toLocaleString() : "-"}</div>
            <div>Timezone: {camp.schedule.timezone || "-"}</div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-md border border-gray-200 dark:border-white/10 p-3">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="text-xl font-semibold">{value.toLocaleString()}</div>
    </div>
  );
}
