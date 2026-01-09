"use client";

import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export function StatusEmailsCard() {
  return (
    <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm h-full">
      <h3 className="text-lg font-medium text-slate-900 mb-4">
        IntusOne status emails
      </h3>
      
      <p className="text-sm text-slate-600 mb-6 font-normal">
        Subscribe to receive status update via email for IntusOne services from{" "}
        <a href="#" className="text-blue-600 hover:underline inline-flex items-center gap-0.5">
          status.intusone.com <ExternalLink className="w-3 h-3" />
        </a>
        . We&apos;ll email you the details when the service is experiencing any problems
        on our end.
      </p>

      <Button variant="outline" className="text-slate-700 border-slate-300 hover:bg-slate-50 gap-2">
        Learn more about IntusOne statuses
        <ExternalLink className="w-4 h-4" />
      </Button>
    </div>
  );
}
