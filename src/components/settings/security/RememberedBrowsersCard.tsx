"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export function RememberedBrowsersCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Remembered browsers</CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant="outline" className="text-slate-700 border-slate-300 hover:bg-slate-50">
          Forget all remembered browsers
          <Trash2 className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
}
