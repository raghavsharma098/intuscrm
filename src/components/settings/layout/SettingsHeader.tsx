"use client";

import { Bell, HelpCircle, Grid, User } from "lucide-react";
import Link from "next/link";

export function SettingsHeader() {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <Link 
            href="/console"
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-md text-slate-700 hover:bg-slate-50 transition-colors text-sm font-medium"
        >
            <div className="w-4 h-4 rounded-full bg-slate-900 flex items-center justify-center text-[10px] text-white font-bold">I</div>
            IntusOne Home
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm text-slate-500">Admin</span>
        <button className="text-slate-500 hover:text-slate-700 relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <button className="text-slate-500 hover:text-slate-700">
          <HelpCircle className="h-5 w-5" />
        </button>
        <button className="text-slate-500 hover:text-slate-700">
          <Grid className="h-5 w-5" />
        </button>
        <button className="h-8 w-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-200">
            <User className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
