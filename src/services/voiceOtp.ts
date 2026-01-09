import { ApiKey, VoiceOtpLog, LogType } from "@/lib/types";

const KEYS_KEY = "intus:voiceOtp:keys";
const LOGS_KEY = "intus:voiceOtp:logs";

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
  const keys = load<ApiKey[]>(KEYS_KEY, []);
  if (keys.length === 0) {
    const now = new Date().toISOString();
    const seeded: ApiKey[] = [
      { id: "k1", name: "Primary", key: generateKey(), active: true, createdAt: now },
      { id: "k2", name: "Backup", key: generateKey(), active: false, createdAt: now },
    ];
    save(KEYS_KEY, seeded);
  }
  const logs = load<VoiceOtpLog[]>(LOGS_KEY, []);
  if (logs.length === 0) {
    const now = Date.now();
    const seeded: VoiceOtpLog[] = [
      { id: "l1", type: "voice", status: "delivered", to: "+15551234567", duration: 42, cost: 0.08, createdAt: new Date(now - 86400000).toISOString(), messageId: "msg-v-1" },
      { id: "l2", type: "otp", status: "sent", to: "+919876543210", cost: 0.02, createdAt: new Date(now - 43200000).toISOString(), messageId: "msg-o-1" },
      { id: "l3", type: "otp", status: "failed", to: "+447700900123", cost: 0.00, createdAt: new Date(now - 21600000).toISOString(), messageId: "msg-o-2" },
    ];
    save(LOGS_KEY, seeded);
  }
}

function generateKey() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let s = "";
  for (let i = 0; i < 32; i++) s += alphabet[Math.floor(Math.random() * alphabet.length)];
  return s;
}

export const VoiceOtpService = {
  async listKeys(): Promise<ApiKey[]> {
    seed();
    return load<ApiKey[]>(KEYS_KEY, []);
  },
  async createKey(name: string): Promise<ApiKey> {
    seed();
    const keys = load<ApiKey[]>(KEYS_KEY, []);
    const key: ApiKey = {
      id: `k_${Date.now()}`,
      name,
      key: generateKey(),
      active: true,
      createdAt: new Date().toISOString(),
    };
    keys.push(key);
    save(KEYS_KEY, keys);
    return key;
  },
  async toggleKeyActive(id: string): Promise<ApiKey | undefined> {
    seed();
    const keys = load<ApiKey[]>(KEYS_KEY, []);
    const idx = keys.findIndex((k) => k.id === id);
    if (idx >= 0) {
      keys[idx].active = !keys[idx].active;
      save(KEYS_KEY, keys);
      return keys[idx];
    }
    return undefined;
  },
  async deleteKey(id: string): Promise<boolean> {
    seed();
    const keys = load<ApiKey[]>(KEYS_KEY, []);
    const next = keys.filter((k) => k.id !== id);
    save(KEYS_KEY, next);
    return next.length < keys.length;
  },
  async listLogs(page = 1, pageSize = 20, type?: LogType): Promise<VoiceOtpLog[]> {
    seed();
    let logs = load<VoiceOtpLog[]>(LOGS_KEY, []);
    if (type) logs = logs.filter((l) => l.type === type);
    const start = (page - 1) * pageSize;
    return logs.slice(start, start + pageSize);
  },
};
