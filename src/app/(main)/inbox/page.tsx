"use client";

import { useState } from "react";
import { Search, MessageCircle, Phone, Mail, Send } from "lucide-react";
import { useAsync } from "@/lib/hooks/useAsync";
import { InboxService } from "@/services/inbox";
import { Thread, MessageChannel } from "@/lib/types";

export default function InboxPage() {
  const [channel, setChannel] = useState<MessageChannel | "all">("all");
  const [selectedThread, setSelectedThread] = useState<string | null>(null);
  const { data: threads, loading, setData: setThreads } = useAsync<Thread[]>(() => InboxService.listThreads(channel === "all" ? undefined : channel));
  const [reply, setReply] = useState("");

  const activeThread = threads?.find((t) => t.id === selectedThread);

  async function sendReply() {
    if (!selectedThread || !reply.trim()) return;
    await InboxService.sendMessage(selectedThread, reply.trim());
    const updated = await InboxService.getThread(selectedThread);
    if (updated) {
      setThreads((prev) => (prev ?? []).map((t) => (t.id === selectedThread ? updated : t)));
    }
    setReply("");
  }

  async function markRead(threadId: string) {
    await InboxService.markRead(threadId);
    const updated = await InboxService.getThread(threadId);
    if (updated) {
      setThreads((prev) => (prev ?? []).map((t) => (t.id === threadId ? updated : t)));
    }
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] border border-gray-200 dark:border-white/10 rounded-lg overflow-hidden">
      <div className="w-80 border-r border-gray-200 dark:border-white/10 flex flex-col bg-gray-50 dark:bg-slate-900/50">
        <div className="p-4 border-b border-gray-200 dark:border-white/10 space-y-4">
          <h2 className="font-semibold">Inbox</h2>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search messages..."
              className="w-full pl-9 h-9 text-sm rounded-md border border-gray-300 bg-white"
            />
          </div>
          <div className="flex gap-2">
            <ChannelButton icon={MessageCircle} label="All" active={channel === "all"} onClick={() => setChannel("all")} />
            <ChannelButton icon={MessageCircle} label="WhatsApp" active={channel === "whatsapp"} onClick={() => setChannel("whatsapp")} />
            <ChannelButton icon={Mail} label="Email" active={channel === "email"} onClick={() => setChannel("email")} />
            <ChannelButton icon={Phone} label="SMS" active={channel === "sms"} onClick={() => setChannel("sms")} />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="p-4 space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 bg-gray-200 dark:bg-white/10 rounded animate-pulse" />
              ))}
            </div>
          ) : (
            <div>
              {(threads ?? []).map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setSelectedThread(t.id);
                    if (t.unreadCount > 0) markRead(t.id);
                  }}
                  className={`w-full p-4 border-b border-gray-100 dark:border-white/5 text-left hover:bg-white dark:hover:bg-slate-800/50 ${selectedThread === t.id ? "bg-white dark:bg-slate-800/50" : ""}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium truncate">{t.contactName ?? t.contact}</span>
                        {t.unreadCount > 0 && <span className="px-1.5 py-0.5 text-xs bg-indigo-600 text-white rounded-full">{t.unreadCount}</span>}
                      </div>
                      <div className="text-xs text-gray-500 mt-1 truncate">{t.lastMessage}</div>
                    </div>
                    <div className="text-xs text-gray-400 ml-2">{formatTime(t.lastMessageAt)}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        {!activeThread ? (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <MessageCircle className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <div className="text-sm">Select a conversation to view messages</div>
            </div>
          </div>
        ) : (
          <>
            <div className="p-4 border-b border-gray-200 dark:border-white/10 bg-white dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{activeThread.contactName ?? activeThread.contact}</div>
                  <div className="text-xs text-gray-500 capitalize">{activeThread.channel}</div>
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 dark:bg-slate-900/30">
              {activeThread.messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.direction === "outbound" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-md px-4 py-2 rounded-lg ${msg.direction === "outbound" ? "bg-indigo-600 text-white" : "bg-white dark:bg-slate-800 border border-gray-200 dark:border-white/10"}`}>
                    <div className="text-sm">{msg.body}</div>
                    <div className={`text-xs mt-1 ${msg.direction === "outbound" ? "text-indigo-100" : "text-gray-500"}`}>{formatTime(msg.createdAt)}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-200 dark:border-white/10 bg-white dark:bg-slate-900">
              <div className="flex gap-2">
                <input
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendReply()}
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-2 rounded border border-gray-300 bg-white text-sm"
                />
                <button onClick={sendReply} className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700">
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function ChannelButton({ icon: Icon, label, active, onClick }: { icon: any; label: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`flex items-center gap-1 px-2 py-1 rounded text-xs border ${active ? "bg-indigo-600 text-white border-indigo-600" : "border-gray-300"}`}>
      <Icon className="h-3 w-3" />
      <span className="hidden md:inline">{label}</span>
    </button>
  );
}

function formatTime(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return `${Math.floor(diff / 60000)}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return d.toLocaleDateString();
}
