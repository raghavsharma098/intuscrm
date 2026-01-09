"use client";

import { Search, Bell, HelpCircle, Grid3x3, ChevronDown, User } from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-20 px-6 flex items-center justify-between">
      <div className="flex items-center gap-6">
        {/* Logo/Home */}
        <Link href="/dashboard" className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-slate-200 hover:bg-slate-50 transition-colors">
          <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{
            background: 'linear-gradient(135deg, #3245ff 0%, #48c9ff 100%)'
          }}>
            I
          </div>
          <span className="text-sm font-semibold text-slate-700">Intus Home</span>
        </Link>

        {/* Account Selector */}
        <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50 rounded transition-colors">
          <span>My first Intus account</span>
          <ChevronDown className="h-4 w-4 text-slate-400" />
        </button>

        {/* Trial Info */}
        <div className="flex items-center gap-2 text-sm">
          <span className="text-slate-600">Trial:</span>
          <span className="font-semibold text-emerald-600">$15.50</span>
          <Link href="/billing" className="text-[#0263E0] font-medium hover:underline">
            Upgrade
          </Link>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Jump to..."
            className="w-80 pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0263E0] focus:border-transparent placeholder:text-slate-400"
          />
        </div>

        {/* Admin Dropdown */}
        <button className="flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900">
          <span>Admin</span>
          <ChevronDown className="h-4 w-4" />
        </button>

        {/* Notifications */}
        <button className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Help */}
        <button className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded transition-colors">
          <HelpCircle className="h-5 w-5" />
        </button>

        {/* Grid Menu */}
        <button className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded transition-colors">
          <Grid3x3 className="h-5 w-5" />
        </button>

        {/* User Menu */}
        <button className="flex items-center gap-2 p-2 hover:bg-slate-50 rounded transition-colors">
          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
            <User className="h-5 w-5 text-slate-600" />
          </div>
          <ChevronDown className="h-4 w-4 text-slate-600" />
        </button>
      </div>
    </header>
  );
}
