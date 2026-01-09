"use client";

import { useState } from "react";
import { SettingsSidebar } from "@/components/settings/layout/SettingsSidebar";
import { SettingsHeader } from "@/components/settings/layout/SettingsHeader";
import { cn } from "@/lib/utils";

export function SettingsShell({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <SettingsSidebar isCollapsed={isCollapsed} onToggle={() => setIsCollapsed(!isCollapsed)} />
      <div 
        className={cn(
            "flex flex-col min-h-screen transition-all duration-300 ease-in-out",
            isCollapsed ? "pl-20" : "pl-64"
        )}
      >
        <SettingsHeader />
        <main className="flex-1 p-8 overflow-x-hidden">
          <div className="max-w-5xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
