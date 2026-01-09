import { Card, CardContent } from "@/components/ui/card";
import { HelpCircle, ExternalLink } from "lucide-react";
import Link from "next/link";

export function SupportCard() {
  return (
    <Card className="mt-6">
      <CardContent className="flex items-center justify-between p-6">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-slate-900" />
          <span className="font-semibold text-slate-900">Need support?</span>
        </div>
        <Link 
          href="#" 
          className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-md text-slate-700 hover:bg-slate-50 transition-colors text-sm font-medium"
        >
          IntusOne help center
          <ExternalLink className="h-3 w-3" />
        </Link>
      </CardContent>
    </Card>
  );
}
