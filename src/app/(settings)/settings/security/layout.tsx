"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function SecurityLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  const TABS = [
    { name: "Two factor authentication", href: "/settings/security" },
    { name: "Social sign in", href: "/settings/security/social-sign-in" },
  ];

  return (
    <div className="animate-in fade-in duration-500 space-y-8">
         <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-6">Security</h1>
            
            <div className="border-b border-slate-200">
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                {TABS.map((tab) => {
                    // Active if:
                    // 1. Exact match
                    // 2. We are on /social-sign-in and tab is social sign in
                    // 3. We are on /settings/security (root) and tab is 2FA
                    const isActive = tab.href === "/settings/security" 
                        ? pathname === "/settings/security"
                        : pathname.startsWith(tab.href);

                    return (
                      <Link
                        key={tab.name}
                        href={tab.href}
                        className={cn(
                          "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors",
                          isActive
                            ? "border-blue-600 text-blue-600"
                            : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                        )}
                      >
                        {tab.name}
                      </Link>
                    );
                })}
              </nav>
            </div>
        </div>

        {children}
    </div>
  );
}
