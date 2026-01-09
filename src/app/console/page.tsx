"use client";

import { Info, Copy, Globe, Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Account {
  id: string;
  name: string;
  role: string;
  sid: string;
  status: "Trial" | "Active" | "Suspended";
}

export default function ConsolePage() {
  const [user] = useState({ firstName: "Hardik" });
  const [accounts] = useState<Account[]>([
    {
      id: "1",
      name: "My first IntusOne account",
      role: "Owner",
      sid: "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", // Placeholder - Replace with actual SID from backend
      status: "Trial"
    }
  ]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="max-w-5xl mx-auto pt-24 pb-12 px-6">
      <h1 className="text-3xl font-medium text-slate-900 mb-8">
        Welcome back {user.firstName}!
      </h1>

      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-2xl font-medium text-slate-900 mb-2">
            Choose an Account
          </h2>
          <p className="text-slate-600 flex items-center gap-1.5 text-sm">
            Accounts are containers for your applications. How do I use accounts?
            <Info className="w-4 h-4 text-blue-600 cursor-help" />
          </p>
        </div>
        <Button variant="outline" className="gap-2 text-blue-600 border-blue-200 hover:bg-blue-50 font-medium">
            Create New Account
        </Button>
      </div>

      <div className="space-y-4 mb-12">
        {accounts.map((account) => (
          <div key={account.id} className="bg-white border border-slate-500 rounded-lg p-6 hover:shadow-md transition-shadow max-w-xl">
            <div className="mb-4">
                <Link href="/dashboard" className="text-xl font-medium text-blue-600 hover:underline">
                    {account.name}
                </Link>
            </div>
            
            <div className="space-y-2 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                    <span className="w-24 text-slate-500">Role:</span>
                    <span className="font-medium text-slate-900">{account.role}</span>
                </div>
                <div className="flex items-center gap-2 group">
                    <span className="w-24 text-slate-500">Account SID:</span>
                    <span className="font-mono text-slate-700">{account.sid}</span>
                    <button 
                        onClick={() => copyToClipboard(account.sid)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-600 hover:text-blue-700" 
                        title="Copy SID"
                    >
                        <Copy className="w-3.5 h-3.5" />
                    </button>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-24 text-slate-500">{account.status}</span>
                    <Info className="w-3.5 h-3.5 text-blue-600" />
                    {account.status === "Trial" && (
                        <Link href="#" className="text-blue-600 hover:underline">Upgrade</Link>
                    )}
                </div>
            </div>
          </div>
        ))}
      </div>

      <footer className="flex flex-col md:flex-row items-center justify-center gap-4 text-xs text-slate-500 mt-20 border-t border-transparent">
         <div className="flex items-center gap-2">
            <span>© 2026 IntusOne, Inc. All rights reserved.</span>
         </div>
         <div className="flex items-center gap-2">
             <Globe className="w-3.5 h-3.5" />
             <Link href="#" className="hover:underline">Privacy Policy</Link>
             <span>|</span>
             <Link href="#" className="hover:underline">Terms of Service</Link>
         </div>
      </footer>
    </div>
  );
}
