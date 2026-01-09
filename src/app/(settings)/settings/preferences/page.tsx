import { TimezoneCard } from "@/components/settings/preferences/TimezoneCard";
import { StatusEmailsCard } from "@/components/settings/preferences/StatusEmailsCard";

export default function PreferencesPage() {
  return (
    <div className="space-y-6 max-w-6xl">
      <h1 className="text-2xl font-semibold text-slate-900">
        IntusOne console preferences
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <TimezoneCard />
        <StatusEmailsCard />
      </div>
    </div>
  );
}
