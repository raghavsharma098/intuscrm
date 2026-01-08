import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-slate-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Products</h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li><Link href="#" className="hover:text-slate-900">Unified Inbox</Link></li>
              <li><Link href="#" className="hover:text-slate-900">Campaigns</Link></li>
              <li><Link href="#" className="hover:text-slate-900">CRM & Leads</Link></li>
              <li><Link href="#" className="hover:text-slate-900">Billing</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Resources</h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li><Link href="#" className="hover:text-slate-900">Documentation</Link></li>
              <li><Link href="#" className="hover:text-slate-900">API Reference</Link></li>
              <li><Link href="#" className="hover:text-slate-900">Blog</Link></li>
              <li><Link href="#" className="hover:text-slate-900">Community</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-slate-600">
               <li><Link href="#" className="hover:text-slate-900">About Us</Link></li>
               <li><Link href="#" className="hover:text-slate-900">Customers</Link></li>
               <li><Link href="#" className="hover:text-slate-900">Careers</Link></li>
            </ul>
          </div>
           <div>
            <h4 className="font-bold text-slate-900 mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-slate-600">
               <li><Link href="#" className="hover:text-slate-900">Sales</Link></li>
               <li><Link href="#" className="hover:text-slate-900">Support</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            © 2026 Intus One. All rights reserved.
          </p>
          <div className="flex gap-6">
             <div className="w-6 h-6 bg-slate-200 rounded-full"></div>
             <div className="w-6 h-6 bg-slate-200 rounded-full"></div>
             <div className="w-6 h-6 bg-slate-200 rounded-full"></div>
          </div>
        </div>
      </div>
    </footer>
  );
}
