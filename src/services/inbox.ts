import { Thread, Message, MessageChannel } from "@/lib/types";

const THREADS_KEY = "intus:inbox:threads";

function load<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function save<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

function seed() {
  const threads = load<Thread[]>(THREADS_KEY, []);
  if (threads.length === 0) {
    const now = Date.now();
    const seeded: Thread[] = [
      {
        id: "t1",
        channel: "whatsapp",
        contact: "+919876543210",
        contactName: "Rajesh Kumar",
        lastMessage: "Thanks for the update!",
        lastMessageAt: new Date(now - 3600000).toISOString(),
        unreadCount: 1,
        messages: [
          { id: "m1", threadId: "t1", channel: "whatsapp", direction: "outbound", from: "support", to: "+919876543210", body: "Your order #1234 has been shipped.", createdAt: new Date(now - 7200000).toISOString(), read: true },
          { id: "m2", threadId: "t1", channel: "whatsapp", direction: "inbound", from: "+919876543210", to: "support", body: "Thanks for the update!", createdAt: new Date(now - 3600000).toISOString(), read: false },
        ],
      },
      {
        id: "t2",
        channel: "email",
        contact: "alice@example.com",
        contactName: "Alice Johnson",
        lastMessage: "Could you send the invoice?",
        lastMessageAt: new Date(now - 86400000).toISOString(),
        unreadCount: 0,
        messages: [
          { id: "m3", threadId: "t2", channel: "email", direction: "inbound", from: "alice@example.com", to: "billing@intus.one", body: "Could you send the invoice?", createdAt: new Date(now - 86400000).toISOString(), read: true },
          { id: "m4", threadId: "t2", channel: "email", direction: "outbound", from: "billing@intus.one", to: "alice@example.com", body: "Invoice attached.", createdAt: new Date(now - 82800000).toISOString(), read: true },
        ],
      },
      {
        id: "t3",
        channel: "sms",
        contact: "+15551234567",
        contactName: "John Doe",
        lastMessage: "Perfect, thanks!",
        lastMessageAt: new Date(now - 172800000).toISOString(),
        unreadCount: 0,
        messages: [
          { id: "m5", threadId: "t3", channel: "sms", direction: "outbound", from: "support", to: "+15551234567", body: "Your appointment is confirmed for 3 PM.", createdAt: new Date(now - 176400000).toISOString(), read: true },
          { id: "m6", threadId: "t3", channel: "sms", direction: "inbound", from: "+15551234567", to: "support", body: "Perfect, thanks!", createdAt: new Date(now - 172800000).toISOString(), read: true },
        ],
      },
    ];
    save(THREADS_KEY, seeded);
  }
}

export const InboxService = {
  async listThreads(channel?: MessageChannel): Promise<Thread[]> {
    seed();
    let threads = load<Thread[]>(THREADS_KEY, []);
    if (channel) threads = threads.filter((t) => t.channel === channel);
    return threads.sort((a, b) => new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime());
  },
  async getThread(id: string): Promise<Thread | undefined> {
    seed();
    const threads = load<Thread[]>(THREADS_KEY, []);
    return threads.find((t) => t.id === id);
  },
  async markRead(threadId: string): Promise<void> {
    const threads = load<Thread[]>(THREADS_KEY, []);
    const idx = threads.findIndex((t) => t.id === threadId);
    if (idx >= 0) {
      threads[idx].unreadCount = 0;
      threads[idx].messages.forEach((m) => (m.read = true));
      save(THREADS_KEY, threads);
    }
  },
  async sendMessage(threadId: string, body: string): Promise<Message | undefined> {
    const threads = load<Thread[]>(THREADS_KEY, []);
    const idx = threads.findIndex((t) => t.id === threadId);
    if (idx < 0) return undefined;
    const thread = threads[idx];
    const msg: Message = {
      id: `m_${Date.now()}`,
      threadId,
      channel: thread.channel,
      direction: "outbound",
      from: "support",
      to: thread.contact,
      body,
      createdAt: new Date().toISOString(),
      read: true,
    };
    thread.messages.push(msg);
    thread.lastMessage = body;
    thread.lastMessageAt = msg.createdAt;
    save(THREADS_KEY, threads);
    return msg;
  },
};
