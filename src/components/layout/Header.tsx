export function Header() {
  return (
    <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-20 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        {/* Mobile menu trigger could go here */}
        <h2 className="text-sm font-medium text-slate-500">Overview</h2>
      </div>
      
      <div className="flex items-center gap-4">
        {/* Search, Notifications, etc. */}
      </div>
    </header>
  );
}
