import Link from "next/link";
import { ArrowRight, ChevronRight, Menu } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  return (
    <nav className="absolute top-0 left-0 right-0 z-50 pt-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-white text-2xl font-bold tracking-tight">
            IntusOne
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-white/90">
            <Link href="#" className="hover:text-white transition-colors">Products</Link>
            <Link href="#" className="hover:text-white transition-colors">Solutions</Link>
            <Link href="#" className="hover:text-white transition-colors">Developers</Link>
            <Link href="#" className="hover:text-white transition-colors">Resources</Link>
            <Link href="#" className="hover:text-white transition-colors">Pricing</Link>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-sm font-medium text-white/90 hover:text-white hidden sm:block">
            Sign in
          </Link>
          <Link 
            href="/dashboard" 
            className="text-sm font-semibold bg-white text-slate-900 hover:bg-white/90 px-5 py-2 rounded-full transition-all flex items-center gap-1 group shadow-sm"
          >
            Contact sales
            <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <button className="md:hidden text-white">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>
  );
}
