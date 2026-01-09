"use client";

import { useState } from "react";
import { useAsync } from "@/lib/hooks/useAsync";
import { AdminService } from "@/services/admin";
import { Integration, Member, OrgSettings, UserRole } from "@/lib/types";

export default function AdminPage() {
  const [tab, setTab] = useState<"org" | "team" | "integrations" | "security">("org");
  const { data: org, setData: setOrg } = useAsync<OrgSettings>(() => AdminService.getOrg());
  const { data: members, setData: setMembers } = useAsync<Member[]>(() => AdminService.listMembers());
  const { data: integrations, setData: setIntegrations } = useAsync<Integration[]>(() => AdminService.listIntegrations());
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState<UserRole>("agent");

  async function saveOrg(next: OrgSettings) {
    const updated = await AdminService.updateOrg(next);
    setOrg(updated);
  }

  async function addMember() {
    if (!newName.trim() || !newEmail.trim()) return;
    const created = await AdminService.addMember({ name: newName.trim(), email: newEmail.trim(), role: newRole });
    setMembers([...(members ?? []), created]);
    setShowAdd(false);
    setNewName("");
    setNewEmail("");
    setNewRole("agent");
  }

  async function changeRole(id: string, role: UserRole) {
    const updated = await AdminService.updateRole(id, role);
    if (updated) setMembers((prev) => (prev ?? []).map((m) => (m.id === id ? updated : m)));
  }

  async function removeMember(id: string) {
    if (!confirm("Remove this member?")) return;
    const ok = await AdminService.removeMember(id);
    if (ok) setMembers((prev) => (prev ?? []).filter((m) => m.id !== id));
  }

  async function toggleIntegration(id: string) {
    const updated = await AdminService.toggleIntegration(id);
    if (updated) setIntegrations((prev) => (prev ?? []).map((i) => (i.id === id ? updated : i)));
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Admin & Settings</h1>

      <div className="flex gap-2">
        {[
          { id: "org", label: "Organization" },
          { id: "team", label: "Team" },
          { id: "integrations", label: "Integrations" },
          { id: "security", label: "Security" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id as any)}
            className={`px-3 py-2 rounded border ${tab === t.id ? "bg-indigo-600 text-white border-indigo-600" : "border-gray-300"}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "org" && org && (
        <div className="rounded-lg border border-gray-200 dark:border-white/10 p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Organization Name">
              <input
                className="w-full px-3 py-2 rounded border border-gray-300"
                value={org.name}
                onChange={(e) => setOrg({ ...(org as OrgSettings), name: e.target.value })}
              />
            </Field>
            <Field label="Domain">
              <input
                className="w-full px-3 py-2 rounded border border-gray-300"
                value={org.domain ?? ""}
                onChange={(e) => setOrg({ ...(org as OrgSettings), domain: e.target.value })}
              />
            </Field>
            <Field label="Timezone">
              <input
                className="w-full px-3 py-2 rounded border border-gray-300"
                value={org.timezone ?? ""}
                onChange={(e) => setOrg({ ...(org as OrgSettings), timezone: e.target.value })}
              />
            </Field>
            <Field label="Email From">
              <input
                className="w-full px-3 py-2 rounded border border-gray-300"
                value={org.emailFrom ?? ""}
                onChange={(e) => setOrg({ ...(org as OrgSettings), emailFrom: e.target.value })}
              />
            </Field>
          </div>
          <div className="flex justify-end">
            <button onClick={() => saveOrg(org as OrgSettings)} className="px-4 py-2 rounded bg-indigo-600 text-white">Save Changes</button>
          </div>
        </div>
      )}

      {tab === "team" && (
        <div className="rounded-lg border border-gray-200 dark:border-white/10 p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <div className="text-base font-medium">Team Members</div>
              <div className="text-xs text-gray-500">Manage user roles and access</div>
            </div>
            <button onClick={() => setShowAdd(true)} className="px-3 py-2 rounded bg-indigo-600 text-white">Add Member</button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500">
                  <th className="py-2">Name</th>
                  <th className="py-2">Email</th>
                  <th className="py-2">Role</th>
                  <th className="py-2">Joined</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {(members ?? []).map((m) => (
                  <tr key={m.id} className="border-t border-gray-100 dark:border-white/5">
                    <td className="py-2 font-medium">{m.name}</td>
                    <td className="py-2">{m.email}</td>
                    <td className="py-2">
                      <select value={m.role} onChange={(e) => changeRole(m.id, e.target.value as UserRole)} className="px-2 py-1 border border-gray-300 rounded text-sm">
                        {(["owner", "admin", "agent", "viewer"] as UserRole[]).map((r) => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </select>
                    </td>
                    <td className="py-2 text-xs text-gray-500">{new Date(m.createdAt).toLocaleDateString()}</td>
                    <td className="py-2">
                      <button onClick={() => removeMember(m.id)} className="px-2 py-1 text-xs rounded border border-red-300 text-red-600 hover:bg-red-50">Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "integrations" && (
        <div className="rounded-lg border border-gray-200 dark:border-white/10 p-6 space-y-3">
          <div className="text-base font-medium mb-2">Integrations</div>
          {(integrations ?? []).map((i) => (
            <div key={i.id} className="flex items-center justify-between p-3 rounded border border-gray-200 dark:border-white/10">
              <div>
                <div className="font-medium">{i.name}</div>
                <div className="text-xs text-gray-500">{i.description}</div>
              </div>
              <button onClick={() => toggleIntegration(i.id)} className={`px-3 py-2 rounded text-sm border ${i.enabled ? "bg-green-600 text-white border-green-600" : "border-gray-300"}`}>
                {i.enabled ? "Enabled" : "Enable"}
              </button>
            </div>
          ))}
        </div>
      )}

      {tab === "security" && (
        <div className="rounded-lg border border-gray-200 dark:border-white/10 p-6 space-y-4">
          <div className="text-base font-medium">Security</div>
          <div className="space-y-2">
            <Toggle label="Require 2FA for admins" />
            <Toggle label="Allow public signup" />
            <Toggle label="Enforce strong passwords" />
          </div>
          <div className="text-xs text-gray-500">Note: These are placeholders; backend enforcement will be added later.</div>
        </div>
      )}

      {showAdd && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
          <div className="bg-white dark:bg-slate-900 rounded-lg w-full max-w-md p-6 border border-gray-200 dark:border-white/10">
            <div className="text-lg font-medium mb-4">Add Member</div>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-600">Name</label>
                <input value={newName} onChange={(e) => setNewName(e.target.value)} className="mt-1 w-full px-3 py-2 rounded border border-gray-300" />
              </div>
              <div>
                <label className="text-sm text-gray-600">Email</label>
                <input value={newEmail} onChange={(e) => setNewEmail(e.target.value)} className="mt-1 w-full px-3 py-2 rounded border border-gray-300" />
              </div>
              <div>
                <label className="text-sm text-gray-600">Role</label>
                <select value={newRole} onChange={(e) => setNewRole(e.target.value as UserRole)} className="mt-1 w-full px-3 py-2 rounded border border-gray-300">
                  {(["owner", "admin", "agent", "viewer"] as UserRole[]).map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button onClick={() => setShowAdd(false)} className="px-3 py-2 rounded border border-gray-300">Cancel</button>
                <button onClick={addMember} className="px-3 py-2 rounded bg-indigo-600 text-white">Add</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-sm text-gray-600">{label}</div>
      {children}
    </div>
  );
}

function Toggle({ label }: { label: string }) {
  const [on, setOn] = useState(false);
  return (
    <div className="flex items-center justify-between">
      <div className="text-sm">{label}</div>
      <button onClick={() => setOn((v) => !v)} className={`px-3 py-2 rounded text-sm border ${on ? "bg-green-600 text-white border-green-600" : "border-gray-300"}`}>{on ? "On" : "Off"}</button>
    </div>
  );
}
