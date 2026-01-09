"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MAIN_NAVIGATION } from "@/config/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ChevronLeft, ChevronRight, LayoutDashboard } from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<'develop' | 'monitor'>('develop');

  const developItems = MAIN_NAVIGATION.filter(item => 
    ['Dashboard', 'Inbox', 'Campaigns', 'Leads (CRM)', 'Sales', 'Voice & OTP'].includes(item.title)
  );
  
  const monitorItems = MAIN_NAVIGATION.filter(item => 
    ['Analytics', 'Billing & Wallet', 'Helpdesk', 'Admin & Settings'].includes(item.title)
  );

  const items = activeTab === 'develop' ? developItems : monitorItems;

  return (
    <aside className={cn(
      "bg-[#121C2D] h-screen fixed left-0 top-0 flex flex-col z-10 hidden md:flex transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="h-20 flex items-center px-4 border-b border-white/10">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <LayoutDashboard className="h-5 w-5 text-[#0263E0]" />
            <span className="text-white/90 text-sm font-semibold">Account Dashboard</span>
          </div>
        )}
      </div>

      {/* Tab Switcher */}
      {!collapsed && (
        <div className="px-2 py-4 flex gap-1">
          <button
            onClick={() => setActiveTab('develop')}
            className={cn(
              "flex-1 px-4 py-2 text-sm font-medium rounded transition-colors",
              activeTab === 'develop'
                ? "bg-[#0D122B] text-white border border-white/20"
                : "text-white/60 hover:text-white/90 hover:bg-white/5"
            )}
          >
            Develop
          </button>
          <button
            onClick={() => setActiveTab('monitor')}
            className={cn(
              "flex-1 px-4 py-2 text-sm font-medium rounded transition-colors",
              activeTab === 'monitor'
                ? "bg-[#0D122B] text-white border border-white/20"
                : "text-white/60 hover:text-white/90 hover:bg-white/5"
            )}
          >
            Monitor
          </button>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-2 px-2">
        <ul className="space-y-0.5">
          {items.map((item) => {
            const isActive = pathname.startsWith(item.path);
            
            return (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded transition-all relative group",
                    isActive
                      ? "bg-white/10 text-white border-l-2 border-[#0263E0]"
                      : "text-white/70 hover:bg-white/5 hover:text-white border-l-2 border-transparent"
                  )}
                  title={collapsed ? item.title : undefined}
                >
                  <item.icon className={cn("h-5 w-5 flex-shrink-0", isActive ? "text-[#0263E0]" : "text-white/70")} />
                  {!collapsed && <span>{item.title}</span>}
                  
                  {/* Tooltip for collapsed state */}
                  {collapsed && (
                    <div className="absolute left-full ml-2 px-3 py-2 bg-[#0D122B] text-white text-sm rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
                      {item.title}
                    </div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Collapse Button */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center p-2 text-white/70 hover:text-white hover:bg-white/5 rounded transition-colors"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </button>
      </div>
    </aside>
  );
}
