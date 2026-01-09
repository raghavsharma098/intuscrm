import { Info } from "lucide-react";

export function InfoBanner() {
  return (
    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8 flex gap-4 rounded-r-md">
      <div className="flex-shrink-0">
        <Info className="h-5 w-5 text-blue-900" />
      </div>
      <div>
        <p className="text-sm font-medium text-blue-900">
          Your user settings is managed by your organization, Hardik's Organization
        </p>
        <p className="text-sm text-blue-700 mt-1">
          You have signed up using social connection.
        </p>
      </div>
    </div>
  );
}
