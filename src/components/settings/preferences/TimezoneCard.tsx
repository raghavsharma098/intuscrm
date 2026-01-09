"use client";

import { useState, useRef, useEffect } from "react";
import { Info, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Mock data to match the visual style of the screenshot
const TIMEZONE_GROUPS = [
  {
    label: "UTC+14:00",
    zones: ["Pacific/Kiritimati"]
  },
  {
    label: "UTC+13:00",
    zones: [
      "Pacific/Apia",
      "Pacific/Enderbury",
      "Pacific/Fakaofo", 
      "Pacific/Tongatapu"
    ]
  },
  {
    label: "UTC+12:45",
    zones: ["Pacific/Chatham"]
  },
  {
    label: "UTC+12:00",
    zones: [
      "Pacific/Auckland",
      "Pacific/Fiji",
      "Asia/Kamchatka"
    ]
  },
  {
    label: "UTC+05:30",
    zones: [
      "Asia/Kolkata",
      "Asia/Colombo"
    ]
  },
  {
    label: "UTC+00:00",
    zones: [
      "UTC",
      "Europe/London",
      "Europe/Dublin",
      "Europe/Lisbon"
    ]
  },
  {
     label: "UTC-05:00",
     zones: [
        "America/New_York",
        "America/Toronto",
        "America/Havana"
     ]
  },
    {
     label: "UTC-08:00",
     zones: [
        "America/Los_Angeles",
        "America/Vancouver",
        "America/Tijuana"
     ]
  }
];

export function TimezoneCard() {
  const [timezone, setTimezone] = useState("Asia/Kolkata");
  const [isOpen, setIsOpen] = useState(false);
  const [filteredGroups, setFilteredGroups] = useState(TIMEZONE_GROUPS);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (term: string) => {
    setTimezone(term);
    if (!term) {
        setFilteredGroups(TIMEZONE_GROUPS);
        return;
    }
    
    const lowerTerm = term.toLowerCase();
    const filtered = TIMEZONE_GROUPS.map(group => ({
        ...group,
        zones: group.zones.filter(z => z.toLowerCase().includes(lowerTerm))
    })).filter(group => group.zones.length > 0);
    
    setFilteredGroups(filtered);
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm h-full">
      <h3 className="text-lg font-medium text-slate-900 mb-4">
        IntusOne Console Timezone
      </h3>
      
      <p className="text-sm text-slate-600 mb-4">
        Select the timezone you&apos;d like to use to display dates and times.
      </p>

      <div className="mb-6 relative" ref={wrapperRef}>
        <div className="relative">
            <input
                type="text"
                value={timezone}
                onClick={() => setIsOpen(true)}
                onChange={(e) => {
                    handleSearch(e.target.value);
                    setIsOpen(true);
                }}
                className={cn(
                    "w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                    isOpen && "ring-2 ring-blue-500 border-transparent rounded-b-none"
                )}
            />
        </div>
        
        {isOpen && (
            <div className="absolute z-20 w-full bg-white border border-t-0 border-slate-300 rounded-b-md shadow-lg max-h-60 overflow-y-auto">
                {filteredGroups.length === 0 ? (
                    <div className="px-4 py-2 text-sm text-slate-500">No timezones found</div>
                ) : (
                    filteredGroups.map((group) => (
                        <div key={group.label}>
                            <div className="bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-900 border-b border-slate-100">
                                {group.label}
                            </div>
                            {group.zones.map((zone) => (
                                <div
                                    key={zone}
                                    onClick={() => {
                                        setTimezone(zone);
                                        setIsOpen(false);
                                    }}
                                    className="px-8 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 cursor-pointer"
                                >
                                    {zone}
                                </div>
                            ))}
                        </div>
                    ))
                )}
            </div>
        )}
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-md p-4 mb-6 flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-blue-900">
          This setting does not affect API responses or the Billing section.
        </p>
      </div>

      <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6">
        Save
      </Button>
    </div>
  );
}
