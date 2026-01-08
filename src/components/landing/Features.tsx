import { MessageSquare, LayoutDashboard, Megaphone, Check } from "lucide-react";

export function Features() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-20 max-w-2xl">
          <h2 className="text-blue-600 font-semibold mb-2">Modular solutions</h2>
          <h3 className="text-4xl font-bold tracking-tight text-slate-900 mb-6">
            A fully integrated suite of messaging and business products
          </h3>
          <p className="text-lg text-slate-600 leading-relaxed">
            Reduce costs, grow revenue, and run your business more efficiently on a fully integrated platform. Use Intus One to handle all your messaging related needs, manage revenue operations, and launch new business models.
          </p>
        </div>

        {/* Feature 1: Payments (Mapped to Inbox) */}
        <div className="grid lg:grid-cols-2 gap-16 mb-32 items-center">
          <div>
            <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-8">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Accept and manage messages, globally</h3>
            <p className="text-slate-600 mb-8 leading-relaxed">
               Unified inbox for SMS, WhatsApp, and Email. Increase engagement rates, manage conversations in one place, and reduce churn using our intelligent filtering.
            </p>
            <button className="text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-2 group">
              Start with Inbox <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="flex items-start gap-2">
                 <Check className="w-4 h-4 text-blue-600 mt-1" />
                 <span className="text-sm text-slate-600">WhatsApp Business API</span>
              </div>
              <div className="flex items-start gap-2">
                 <Check className="w-4 h-4 text-blue-600 mt-1" />
                 <span className="text-sm text-slate-600">Two-way SMS</span>
              </div>
            </div>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 shadow-lg rotate-1 transition-transform hover:rotate-0">
             {/* Mock UI */}
             <div className="bg-white rounded-lg shadow-sm border border-slate-100 p-4 space-y-4">
               <div className="flex gap-4 items-center">
                 <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                    <MessageSquare className="w-5 h-5" />
                 </div>
                 <div>
                   <div className="h-2 w-24 bg-slate-200 rounded mb-1"></div>
                   <div className="h-2 w-16 bg-slate-100 rounded"></div>
                 </div>
               </div>
               <div className="bg-slate-50 p-3 rounded text-sm text-slate-600">
                 Hi! I'd like to upgrade to the Enterprise plan.
               </div>
             </div>
          </div>
        </div>

        {/* Feature 2: Billing (Mapped to Recurring Revenue/CRM) */}
        <div className="grid lg:grid-cols-2 gap-16 mb-32 items-center">
           <div className="order-last lg:order-first bg-slate-50 border border-slate-200 rounded-xl p-8 shadow-lg -rotate-1 transition-transform hover:rotate-0">
             {/* Mock UI */}
             <div className="bg-white rounded-lg shadow-sm border border-slate-100 p-6">
                <div className="flex justify-between items-center mb-6">
                   <div className="font-semibold">Invoice #INV-2024-001</div>
                   <div className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">Paid</div>
                </div>
                <div className="space-y-3">
                   <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Enterprise Plan</span>
                      <span className="font-medium">$499.00</span>
                   </div>
                   <div className="flex justify-between text-sm">
                      <span className="text-slate-500">SMS Usage (5k)</span>
                      <span className="font-medium">$50.00</span>
                   </div>
                   <div className="border-t border-slate-100 pt-3 flex justify-between font-bold">
                      <span>Total</span>
                      <span>$549.00</span>
                   </div>
                </div>
             </div>
          </div>
          <div>
            <div className="h-12 w-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-8">
              <LayoutDashboard className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Capture recurring revenue</h3>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Manage flat rate, usage-based, and hybrid pricing models. Automate invoicing, maintain CRM records, and handle finance operations.
            </p>
            <button className="text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-2 group">
              Start with Billing <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>

        {/* Feature 3: Connect (Mapped to Campaigns) */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="h-12 w-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-8">
              <Megaphone className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Launch campaigns instantly</h3>
            <p className="text-slate-600 mb-8 leading-relaxed">
               Broadcast multi-channel campaigns to thousands of users. Integrate audience segmentation and analytics for better ROI.
            </p>
            <button className="text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-2 group">
              Start with Campaigns <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
           <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 shadow-lg rotate-1 transition-transform hover:rotate-0">
              {/* Mock UI */}
              <div className="relative">
                 <div className="absolute top-0 right-0 -m-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
                    Live
                 </div>
                 <div className="bg-white rounded-lg shadow-sm border border-slate-100 p-4 text-center">
                    <div className="text-3xl font-bold text-slate-900 mb-1">94%</div>
                    <div className="text-xs text-slate-500 uppercase tracking-wide">Open Rate</div>
                 </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
