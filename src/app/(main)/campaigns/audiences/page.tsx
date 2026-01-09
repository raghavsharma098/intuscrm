"use client";

import { useEffect, useMemo, useState } from "react";
import { CampaignService } from "@/services/campaigns";
import { Audience } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AudiencesPage() {
  const [audiences, setAudiences] = useState<Audience[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNew, setShowNew] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    setLoading(true);
    CampaignService.listAudiences().then((list) => {
      setAudiences(list);
      setLoading(false);
    });
  }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return audiences.filter((a) => a.name.toLowerCase().includes(q) || a.description?.toLowerCase().includes(q));
  }, [audiences, query]);

  async function handleCreate() {
    const created = await CampaignService.createAudience({ name, description });
    setAudiences((prev) => [created, ...prev]);
    setShowNew(false);
    setName("");
    setDescription("");
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Audiences</h1>
        <button
          type="button"
          onClick={() => setShowNew(true)}
          className="px-4 py-2 rounded-md bg-gradient-to-r from-[#3245ff] to-[#48c9ff] text-white"
        >
          New Audience
        </button>
      </div>

      <div className="flex items-center gap-3">
        <input
          placeholder="Search audiences..."
          className="w-full md:w-80 rounded-md border border-gray-300 bg-white/90 dark:bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 rounded-lg bg-gray-200 dark:bg-white/10" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filtered.map((a) => (
            <Card key={a.id}>
              <CardHeader>
                <CardTitle className="text-base">{a.name}</CardTitle>
                <CardDescription>{a.description}</CardDescription>
              </CardHeader>
              <CardContent className="text-sm">
                <div className="text-gray-500">Size</div>
                <div className="text-xl font-semibold">{a.size.toLocaleString()}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {showNew && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-lg rounded-lg bg-white dark:bg-[#0A0F1C] border border-gray-200 dark:border-white/10">
            <div className="p-4 border-b border-gray-200 dark:border-white/10 flex items-center justify-between">
              <div className="font-semibold">Create Audience</div>
              <button onClick={() => setShowNew(false)} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  className="w-full rounded-md border border-gray-300 bg-white/90 dark:bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea
                  rows={3}
                  className="w-full rounded-md border border-gray-300 bg-white/90 dark:bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            <div className="p-4 flex items-center justify-end gap-3 border-t border-gray-200 dark:border-white/10">
              <button
                type="button"
                onClick={() => setShowNew(false)}
                className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50 dark:hover:bg-white/5"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCreate}
                className="px-4 py-2 rounded-md bg-gradient-to-r from-[#3245ff] to-[#48c9ff] text-white disabled:opacity-50"
                disabled={!name.trim()}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
