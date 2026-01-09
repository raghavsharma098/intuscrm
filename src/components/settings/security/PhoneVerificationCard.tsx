"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Pencil } from "lucide-react";

export function PhoneVerificationCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Phone based verification</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-start justify-between border-b border-slate-100 pb-6">
          <div className="space-y-1">
            <h4 className="text-sm font-medium text-slate-900">How do you want to receive your 2FA code?</h4>
            <p className="text-slate-500">Text message</p>
          </div>
          <Button variant="ghost" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 h-auto p-0 px-2 font-medium">
            <Pencil className="w-4 h-4 mr-2" />
            Edit
          </Button>
        </div>

        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-slate-900">Phone number</h4>
             <p className="text-slate-500">+91XXXXXX2917</p>
             <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Verified
             </span>
          </div>
          <Button variant="ghost" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 h-auto p-0 px-2 font-medium">
            <Pencil className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
