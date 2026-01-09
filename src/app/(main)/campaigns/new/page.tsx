"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CampaignMessage, Channel, Schedule } from "@/lib/types";
import { CampaignService } from "@/services/campaigns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const channels: { key: Channel; label: string; desc: string }[] = [
  { key: "sms", label: "SMS", desc: "Best for short, urgent updates" },
  { key: "email", label: "Email", desc: "Rich content, long-form, and branding" },
  { key: "whatsapp", label: "WhatsApp", desc: "Conversational messaging with media" },
];

export default function NewCampaignPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [channel, setChannel] = useState<Channel>("sms");
  const [audiences, setAudiences] = useState<{ id: string; name: string }[]>([]);
  const [audienceId, setAudienceId] = useState("");
  const [message, setMessage] = useState<CampaignMessage>({ body: "" });
  const [schedule, setSchedule] = useState<Schedule>({ type: "now" });
  const [submitting, setSubmitting] = useState(false);

  useMemo(() => {
    // load audiences once
    CampaignService.listAudiences().then((list) => {
      setAudiences(list.map((a) => ({ id: a.id, name: a.name })));
      if (list[0]) setAudienceId(list[0].id);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const disableNext = useMemo(() => {
    if (step === 1) return !name.trim();
    if (step === 2) return !audienceId;
    if (step === 3) {
      if (channel === "email") return !message.subject?.trim() || !message.body.trim();
      return !message.body.trim();
    }
    if (step === 4) return schedule.type === "scheduled" && !schedule.scheduledAt;
    return false;
  }, [step, name, audienceId, message, schedule, channel]);

  async function handleSubmit() {
    setSubmitting(true);
    try {
      const created = await CampaignService.createCampaign({
        name,
        channel,
        audienceId,
        message,
        schedule,
      });
      router.replace(`/campaigns/${created.id}`);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Create Campaign</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Step {step} of 5</CardTitle>
              <CardDescription>Define the essentials of your campaign</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {step === 1 && (
                <div className="space-y-4">
                  <label className="block text-sm font-medium">Campaign name</label>
                  <input
                    className="w-full rounded-md border border-gray-300 bg-white/90 dark:bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., New Year Promo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <div>
                    <label className="block text-sm font-medium mb-2">Channel</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {channels.map((c) => (
                        <button
                          key={c.key}
                          type="button"
                          onClick={() => setChannel(c.key)}
                          className={`text-left border rounded-lg p-3 transition ${
                            channel === c.key
                              ? "border-blue-500 bg-blue-50 dark:bg-blue-500/10"
                              : "border-gray-300 hover:bg-gray-50 dark:hover:bg-white/5"
                          }`}
                        >
                          <div className="font-medium">{c.label}</div>
                          <div className="text-xs text-gray-500">{c.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <label className="block text-sm font-medium">Audience</label>
                  <select
                    className="w-full rounded-md border border-gray-300 bg-white/90 dark:bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                    value={audienceId}
                    onChange={(e) => setAudienceId(e.target.value)}
                  >
                    {audiences.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  {channel === "email" && (
                    <div>
                      <label className="block text-sm font-medium">Subject</label>
                      <input
                        className="w-full rounded-md border border-gray-300 bg-white/90 dark:bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Subject"
                        value={message.subject ?? ""}
                        onChange={(e) => setMessage({ ...message, subject: e.target.value })}
                      />
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium">Message</label>
                    <textarea
                      rows={6}
                      className="w-full rounded-md border border-gray-300 bg-white/90 dark:bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={channel === "sms" ? "Your SMS content..." : "Write your message..."}
                      value={message.body}
                      onChange={(e) => setMessage({ ...message, body: e.target.value })}
                    />
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <label className="inline-flex items-center gap-2">
                      <input
                        type="radio"
                        name="schedule"
                        checked={schedule.type === "now"}
                        onChange={() => setSchedule({ type: "now" })}
                      />
                      <span>Send now</span>
                    </label>
                    <label className="inline-flex items-center gap-2">
                      <input
                        type="radio"
                        name="schedule"
                        checked={schedule.type === "scheduled"}
                        onChange={() =>
                          setSchedule({ type: "scheduled", scheduledAt: new Date().toISOString(), timezone: Intl.DateTimeFormat().resolvedOptions().timeZone })
                        }
                      />
                      <span>Schedule</span>
                    </label>
                  </div>
                  {schedule.type === "scheduled" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium">Date & time</label>
                        <input
                          type="datetime-local"
                          className="w-full rounded-md border border-gray-300 bg-white/90 dark:bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                          value={schedule.scheduledAt ? toLocalInputValue(schedule.scheduledAt) : ""}
                          onChange={(e) => {
                            const v = e.target.value ? new Date(e.target.value).toISOString() : undefined;
                            setSchedule((s) => ({ ...s, scheduledAt: v }));
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Timezone</label>
                        <input
                          className="w-full rounded-md border border-gray-300 bg-white/90 dark:bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                          value={schedule.timezone ?? Intl.DateTimeFormat().resolvedOptions().timeZone}
                          onChange={(e) => setSchedule((s) => ({ ...s, timezone: e.target.value }))}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {step === 5 && (
                <div className="space-y-3 text-sm">
                  <div className="font-medium">Review</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <PreviewItem label="Name" value={name} />
                    <PreviewItem label="Channel" value={channel.toUpperCase()} />
                    <PreviewItem label="Audience" value={audiences.find((a) => a.id === audienceId)?.name ?? "-"} />
                    <PreviewItem
                      label="Schedule"
                      value={
                        schedule.type === "now"
                          ? "Send now"
                          : `Scheduled: ${new Date(schedule.scheduledAt || "").toLocaleString()} (${schedule.timezone || ""})`
                      }
                    />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Message</div>
                    {channel === "email" && (
                      <div className="mb-1"><span className="text-gray-500">Subject:</span> {message.subject}</div>
                    )}
                    <pre className="whitespace-pre-wrap rounded-md border border-gray-200 dark:border-white/10 p-3 text-sm bg-gray-50 dark:bg-white/5">{message.body}</pre>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 disabled:opacity-50"
              disabled={step === 1 || submitting}
            >
              Back
            </button>
            {step < 5 ? (
              <button
                type="button"
                onClick={() => setStep((s) => Math.min(5, s + 1))}
                className="px-4 py-2 rounded-md bg-gradient-to-r from-[#3245ff] to-[#48c9ff] text-white disabled:opacity-50"
                disabled={disableNext || submitting}
              >
                Next
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="px-4 py-2 rounded-md bg-gradient-to-r from-[#3245ff] to-[#48c9ff] text-white disabled:opacity-50"
                disabled={submitting}
              >
                {submitting ? "Creating..." : "Create Campaign"}
              </button>
            )}
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tips</CardTitle>
              <CardDescription>Best practices for higher engagement</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
              <ul className="list-disc pl-5 space-y-1">
                <li>Keep SMS under 160 chars when possible.</li>
                <li>Personalize email subject lines for better opens.</li>
                <li>Schedule to audience local time zones.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function toLocalInputValue(iso: string) {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  const yyyy = d.getFullYear();
  const mm = pad(d.getMonth() + 1);
  const dd = pad(d.getDate());
  const hh = pad(d.getHours());
  const mi = pad(d.getMinutes());
  return `${yyyy}-${mm}-${dd}T${hh}:${mi}`;
}

function PreviewItem({ label, value }: { label: string; value?: string }) {
  return (
    <div className="rounded-md border border-gray-200 dark:border-white/10 p-3 bg-white/70 dark:bg-white/5">
      <div className="text-xs text-gray-500 mb-1">{label}</div>
      <div className="text-sm">{value || "-"}</div>
    </div>
  );
}
