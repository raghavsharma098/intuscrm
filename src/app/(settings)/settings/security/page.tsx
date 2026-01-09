"use client";

import { PhoneVerificationCard } from "@/components/settings/security/PhoneVerificationCard";
import { RememberedBrowsersCard } from "@/components/settings/security/RememberedBrowsersCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function SecurityPage() {
  return (
    <>
      <div className="flex justify-end">
        <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50">
          <Plus className="w-4 h-4 mr-2" />
          Add authentication app
        </Button>
      </div>

      <div className="space-y-6">
        <PhoneVerificationCard />
        <RememberedBrowsersCard />
      </div>
    </>
  );
}
