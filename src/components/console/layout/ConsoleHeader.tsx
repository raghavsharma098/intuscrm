"use client";

import { Bell, HelpCircle, Grid, User } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function ConsoleHeader() {
  return (
    <header className="h-16 bg-slate-900 text-white border-b border-slate-800 flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center gap-4 ml-6">
        <Link href="/console" className="flex items-center gap-2">
            <span className="text-white font-bold text-lg tracking-tight">IntusOne</span>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm text-slate-300">Admin</span>
        <button className="text-slate-300 hover:text-white relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full border-2 border-slate-900"></span>
        </button>
        <button className="text-slate-300 hover:text-white">
          <HelpCircle className="h-5 w-5" />
        </button>
        <button className="text-slate-300 hover:text-white">
          <Grid className="h-5 w-5" />
        </button>
        <button className="flex items-center gap-2 text-slate-300 hover:text-white">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
                <User className="h-4 w-4" />
            </div>
        </button>
      </div>
    </header>
  );
}
