import { OrgSettings, Member, CreateMemberInput, Integration, UserRole } from "@/lib/types";

const ORG_KEY = "intus:admin:org";
const MEMBERS_KEY = "intus:admin:members";
const INTEGRATIONS_KEY = "intus:admin:integrations";

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
  const org = load<OrgSettings | null>(ORG_KEY, null);
  if (!org) {
    save(ORG_KEY, {
      name: "Intus One",
      domain: "intus.one",
      timezone: "UTC",
      emailFrom: "noreply@intus.one",
    } as OrgSettings);
  }
  const members = load<Member[]>(MEMBERS_KEY, []);
  if (members.length === 0) {
    const now = new Date().toISOString();
    save(MEMBERS_KEY, [
      { id: "u1", name: "Owner", email: "owner@intus.one", role: "owner", createdAt: now },
      { id: "u2", name: "Admin", email: "admin@intus.one", role: "admin", createdAt: now },
      { id: "u3", name: "Agent", email: "agent@intus.one", role: "agent", createdAt: now },
    ]);
  }
  const integrations = load<Integration[]>(INTEGRATIONS_KEY, []);
  if (integrations.length === 0) {
    save(INTEGRATIONS_KEY, [
      { id: "twilio", name: "Twilio", enabled: true, description: "SMS, Voice, WhatsApp" },
      { id: "sendgrid", name: "SendGrid", enabled: false, description: "Transactional Email" },
      { id: "whatsapp", name: "WhatsApp Business", enabled: true, description: "WhatsApp API" },
    ]);
  }
}

export const AdminService = {
  async getOrg(): Promise<OrgSettings> {
    seed();
    return load<OrgSettings>(ORG_KEY, { name: "", timezone: "UTC" });
  },
  async updateOrg(payload: OrgSettings): Promise<OrgSettings> {
    save(ORG_KEY, payload);
    return payload;
  },
  async listMembers(): Promise<Member[]> {
    seed();
    return load<Member[]>(MEMBERS_KEY, []);
  },
  async addMember(input: CreateMemberInput): Promise<Member> {
    const members = load<Member[]>(MEMBERS_KEY, []);
    const member: Member = {
      id: `m_${Date.now()}`,
      name: input.name,
      email: input.email,
      role: input.role ?? "agent",
      createdAt: new Date().toISOString(),
    };
    members.push(member);
    save(MEMBERS_KEY, members);
    return member;
  },
  async updateRole(id: string, role: UserRole): Promise<Member | undefined> {
    const members = load<Member[]>(MEMBERS_KEY, []);
    const idx = members.findIndex((m) => m.id === id);
    if (idx >= 0) {
      members[idx].role = role;
      save(MEMBERS_KEY, members);
      return members[idx];
    }
    return undefined;
  },
  async removeMember(id: string): Promise<boolean> {
    const members = load<Member[]>(MEMBERS_KEY, []);
    const next = members.filter((m) => m.id !== id);
    save(MEMBERS_KEY, next);
    return next.length < members.length;
  },
  async listIntegrations(): Promise<Integration[]> {
    seed();
    return load<Integration[]>(INTEGRATIONS_KEY, []);
  },
  async toggleIntegration(id: string): Promise<Integration | undefined> {
    const integrations = load<Integration[]>(INTEGRATIONS_KEY, []);
    const idx = integrations.findIndex((i) => i.id === id);
    if (idx >= 0) {
      integrations[idx].enabled = !integrations[idx].enabled;
      save(INTEGRATIONS_KEY, integrations);
      return integrations[idx];
    }
    return undefined;
  },
};
