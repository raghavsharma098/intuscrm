import Link from "next/link";
import { Send, MapPin, Globe } from "lucide-react";

const FOOTER_LINKS = {
  products: [
    { label: "Unified Inbox", href: "/inbox" },
    { label: "Campaigns", href: "/campaigns" },
    { label: "CRM & Leads", href: "/leads" },
    { label: "Billing", href: "/billing" },
    { label: "Voice & OTP", href: "/voice" },
    { label: "Helpdesk", href: "/helpdesk" },
  ],
  useCases: [
    { label: "SaaS", href: "#" },
    { label: "E-commerce", href: "#" },
    { label: "Marketplaces", href: "#" },
    { label: "Embedded Finance", href: "#" },
    { label: "Crypto", href: "#" },
    { label: "Creator Economy", href: "#" },
  ],
  resources: [
    { label: "Support Center", href: "#" },
    { label: "API Reference", href: "#" },
    { label: "Guides", href: "#" },
    { label: "Customer Stories", href: "#" },
    { label: "Partners", href: "#" },
  ],
  company: [
    { label: "Jobs", href: "#" },
    { label: "Newsroom", href: "#" },
    { label: "Intus One Ecosystem", href: "#" },
    { label: "Contact Sales", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[#f6f9fc] pt-24 pb-12 border-t border-slate-200">
      <div className="max-w-[1080px] mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 mb-20 text-sm">
          {/* Products Column */}
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Products</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.products.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-slate-600 hover:text-slate-900 font-medium transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Use Cases Column */}
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Use Cases</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.useCases.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-slate-600 hover:text-slate-900 font-medium transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Resources</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.resources.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-slate-600 hover:text-slate-900 font-medium transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Company</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-slate-600 hover:text-slate-900 font-medium transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <h4 className="font-bold text-slate-900 mb-4">Location</h4>
              <div className="flex items-center gap-2 text-slate-600 font-medium cursor-pointer hover:text-slate-900">
                 <MapPin className="w-4 h-4" />
                 <span>India (English)</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col md:flex-row items-center gap-6">
             <div className="font-bold text-slate-900 text-lg tracking-tight select-none flex items-center gap-2">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                  <Send className="w-4 h-4 ml-[-2px] mt-[2px]" />
                </div>
                Intus One
             </div>
             <p className="text-sm text-slate-500">
                © {new Date().getFullYear()} Intus One.
             </p>
          </div>
          
          <div className="flex gap-6 text-sm text-slate-500 font-medium">
             <Link href="#" className="hover:text-slate-900">Privacy & Terms</Link>
             <Link href="#" className="hover:text-slate-900">Sitemap</Link>
             <Link href="#" className="hover:text-slate-900 flex items-center gap-2">
                <Globe className="w-4 h-4" />
                English
             </Link>
          </div>
        </div>
        
        {/* Stripe-like background decoration for depth (Optional but adds the feel) */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-50 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] [mask-image:linear-gradient(to_bottom,transparent,white)]"></div>
      </div>
    </footer>
  );
}
