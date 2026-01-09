import { ConsoleHeader } from "@/components/console/layout/ConsoleHeader";

export default function ConsoleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
      <ConsoleHeader />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
