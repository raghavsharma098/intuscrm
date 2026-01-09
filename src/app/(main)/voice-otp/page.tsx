"use client";

import { useState } from "react";
import { useAsync } from "@/lib/hooks/useAsync";
import { ApiKey, VoiceOtpLog } from "@/lib/types";
import { VoiceOtpService } from "@/services/voiceOtp";

export default function VoiceOtpPage() {
  const { data: keys, loading: loadingKeys, setData: setKeys } = useAsync<ApiKey[]>(() => VoiceOtpService.listKeys());
  const [logType, setLogType] = useState<"all" | "voice" | "otp">("all");
  const { data: logs, loading: loadingLogs, setData: setLogs } = useAsync<VoiceOtpLog[]>(() => VoiceOtpService.listLogs(1, 50, logType === "all" ? undefined : logType));
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState("");

  async function handleCreate() {
    if (!newName.trim()) return;
    const created = await VoiceOtpService.createKey(newName.trim());
    setKeys([...(keys ?? []), created]);
    setNewName("");
    setShowCreate(false);
  }

  async function handleToggle(id: string) {
    const updated = await VoiceOtpService.toggleKeyActive(id);
    if (!updated) return;
    setKeys((prev) => (prev ?? []).map((k) => (k.id === id ? updated : k)));
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this API key?")) return;
    const ok = await VoiceOtpService.deleteKey(id);
    if (ok) setKeys((prev) => (prev ?? []).filter((k) => k.id !== id));
  }

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-semibold">Voice & OTP</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="rounded-lg border border-gray-200 dark:border-white/10">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-white/10">
            <div>
              <div className="text-base font-medium">API Keys</div>
              <div className="text-xs text-gray-500">Manage keys used in Voice/OTP API</div>
            </div>
            <button
              onClick={() => setShowCreate(true)}
              className="px-3 py-2 rounded-md bg-indigo-600 text-white text-sm hover:bg-indigo-700"
            >
              New Key
            </button>
          </div>
          <div className="p-4">
            {loadingKeys ? (
              <div className="h-24 bg-gray-100 dark:bg-white/5 animate-pulse rounded" />
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-500">
                      <th className="py-2">Name</th>
                      <th className="py-2">Key</th>
                      <th className="py-2">Status</th>
                      <th className="py-2">Created</th>
                      <th className="py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(keys ?? []).map((k) => (
                      <tr key={k.id} className="border-t border-gray-100 dark:border-white/5">
                        <td className="py-2 font-medium">{k.name}</td>
                        <td className="py-2 font-mono text-xs">{k.key}</td>
                        <td className="py-2">
                          <span className={`px-2 py-1 rounded text-xs ${k.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                            {k.active ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="py-2 text-gray-500 text-xs">{new Date(k.createdAt).toLocaleString()}</td>
                        <td className="py-2 space-x-2">
                          <button onClick={() => handleToggle(k.id)} className="px-2 py-1 text-xs rounded border border-gray-300 hover:bg-gray-50">
                            {k.active ? "Disable" : "Enable"}
                          </button>
                          <button onClick={() => handleDelete(k.id)} className="px-2 py-1 text-xs rounded border border-red-300 text-red-600 hover:bg-red-50">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 dark:border-white/10">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-white/10">
            <div>
              <div className="text-base font-medium">Logs</div>
              <div className="text-xs text-gray-500">Recent calls and OTP messages</div>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={logType}
                onChange={(e) => setLogType(e.target.value as any)}
                className="px-2 py-1 text-sm rounded border border-gray-300 bg-white"
              >
                <option value="all">All</option>
                <option value="voice">Voice</option>
                <option value="otp">OTP</option>
              </select>
            </div>
          </div>
          <div className="p-4">
            {loadingLogs ? (
              <div className="h-24 bg-gray-100 dark:bg-white/5 animate-pulse rounded" />
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-500">
                      <th className="py-2">Type</th>
                      <th className="py-2">To</th>
                      <th className="py-2">Status</th>
                      <th className="py-2">Duration</th>
                      <th className="py-2">Cost</th>
                      <th className="py-2">Time</th>
                      <th className="py-2">Message ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(logs ?? []).map((l) => (
                      <tr key={l.id} className="border-t border-gray-100 dark:border-white/5">
                        <td className="py-2 capitalize">{l.type}</td>
                        <td className="py-2">{l.to}</td>
                        <td className="py-2">
                          <span className={`px-2 py-1 rounded text-xs ${statusColor(l.status)}`}>{l.status}</span>
                        </td>
                        <td className="py-2">{l.type === "voice" ? `${l.duration ?? 0}s` : "-"}</td>
                        <td className="py-2">${(l.cost ?? 0).toFixed(2)}</td>
                        <td className="py-2 text-xs text-gray-500">{new Date(l.createdAt).toLocaleString()}</td>
                        <td className="py-2 text-xs font-mono">{l.messageId ?? "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {showCreate && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
          <div className="bg-white dark:bg-slate-900 rounded-lg w-full max-w-md p-6 border border-gray-200 dark:border-white/10">
            <div className="text-lg font-medium mb-4">Create API Key</div>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600">Name</label>
                <input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g., Production Key"
                  className="mt-1 w-full px-3 py-2 rounded border border-gray-300 bg-white"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button onClick={() => setShowCreate(false)} className="px-3 py-2 rounded border border-gray-300">Cancel</button>
                <button onClick={handleCreate} className="px-3 py-2 rounded bg-indigo-600 text-white">Create</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function statusColor(status: string) {
  switch (status) {
    case "delivered":
      return "bg-green-100 text-green-700";
    case "failed":
      return "bg-red-100 text-red-700";
    case "sent":
      return "bg-blue-100 text-blue-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}
