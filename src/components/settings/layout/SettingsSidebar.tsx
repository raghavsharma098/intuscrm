"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Shield, Settings, User, ChevronsLeft, ChevronsRight } from "lucide-react";

const SETTINGS_NAVIGATION = [
  {
    title: "Overview",
    path: "/settings",
    icon: User,
  },
  {
    title: "Security",
    path: "/settings/security",
    icon: Shield,
  },
  {
    title: "Preferences",
    path: "/settings/preferences",
    icon: Settings,
  },
];

interface SettingsSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export function SettingsSidebar({ isCollapsed, onToggle }: SettingsSidebarProps) {
  const pathname = usePathname();

  return (
    <aside 
      className={cn(
        "bg-slate-900 text-white h-screen fixed left-0 top-0 flex flex-col z-10 transition-all duration-300 ease-in-out",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      <div className={cn("flex items-center h-16 transition-all duration-300", isCollapsed ? "justify-center px-0" : "px-6")}>
        {isCollapsed ? (
             <Settings className="w-6 h-6 text-white" />
        ) : (
            <h1 className="text-lg font-medium text-white flex items-center gap-2 whitespace-nowrap overflow-hidden">
            <Settings className="w-5 h-5 flex-shrink-0" />
            User Settings
            </h1>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto py-4 overflow-x-hidden">
        <ul className="space-y-1 px-3">
          {SETTINGS_NAVIGATION.map((item) => {
            const isActive = pathname === item.path;
            
            return (
              <li key={item.path}>
                <Link
                  href={item.path}
                  title={isCollapsed ? item.title : undefined}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "bg-slate-800 text-white"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white",
                     isCollapsed && "justify-center px-2"
                  )}
                >
                  <item.icon className="h-4 w-4 flex-shrink-0" />
                  <span className={cn("whitespace-nowrap transition-opacity duration-300", isCollapsed ? "opacity-0 w-0 hidden" : "opacity-100")}>
                    {item.title}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-800 mt-auto flex justify-center pb-20">
        <button
          onClick={onToggle}
          className={cn(
            "flex items-center justify-center w-8 h-8 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors border border-slate-700"
          )}
        >
          {isCollapsed ? (
            <ChevronsRight className="w-4 h-4" />
          ) : (
            <ChevronsLeft className="w-4 h-4" />
          )}
        </button>
      </div>
    </aside>
  );
}
