import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function LowCodeOptions() {
  return (
    <section className="bg-[#f6f9fc] py-24 border-t border-slate-200">
      <div className="max-w-[1080px] mx-auto px-4 sm:px-6">
        <div className="mb-16 max-w-2xl">
          <h4 className="text-[#00d4ff] font-bold text-[15px] mb-4 tracking-wide uppercase">Launch with ease</h4>
          <h2 className="text-[32px] sm:text-[36px] font-bold text-[#0a2540] mb-6 tracking-tight leading-tight">
            Low- and no-code options for<br />
            getting started
          </h2>
          <p className="text-[17px] text-[#425466] leading-relaxed font-medium">
            If you'd like to use Stripe for your business but don't have developers on staff, no problem. We have a few options depending on your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Atlas / Incorporate */}
            <div className="flex flex-col group/card p-4 rounded-xl transition-all duration-300 shadow-sm hover:shadow-lg bg-white">
                <div className="bg-[#f6f9fc] rounded-lg h-48 mb-6 relative overflow-hidden flex items-center justify-center">
                     {/* Illustration: Atlas */}
                     <svg width="240" height="190" viewBox="0 0 240 190" fill="none" className="transition-transform duration-300 group-hover/card:scale-90">
                        {/* Browser/Window Shell */}
                        <rect x="40" y="30" width="160" height="130" rx="4" fill="white" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.05))"/>
                        <rect x="40" y="30" width="40" height="130" fill="#f6f9fc" rx="4" />
                        <rect x="190" y="30" width="10" height="130" fill="#fff" /> {/* Mask right rounded corner of sidebar if needed, simplified by overlay */}
                        
                        {/* Sidebar Items */}
                        <g> {/* Logic simulation in SVG */}
                          <circle cx="60" cy="50" r="8" fill="#e3e8ee"/>
                          <rect x="52" y="70" width="16" height="4" rx="2" fill="#cbd4db"/>
                          <rect x="52" y="80" width="16" height="4" rx="2" fill="#cbd4db"/>
                          <rect x="52" y="90" width="16" height="4" rx="2" fill="#cbd4db"/>
                        </g>

                        {/* Main Content */}
                        <text x="95" y="55" fontFamily="sans-serif" fontSize="10" fontWeight="bold" fill="#0a2540">RocketRides, Inc.</text>
                        <circle cx="210" cy="140" r="20" fill="#32d74b" opacity="0.2"/>
                        <circle cx="210" cy="140" r="12" fill="#32d74b"/>
                        <path d="M206 140 l3 3 l5 -5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>

                         {/* Status Lines */}
                         <rect x="95" y="70" width="80" height="6" rx="3" fill="#f0f2f5"/>
                         <rect x="95" y="85" width="60" height="6" rx="3" fill="#f0f2f5"/>
                         <rect x="95" y="100" width="70" height="6" rx="3" fill="#f0f2f5"/>
                     </svg>
                </div>
                
                <div className="transform transition-transform duration-300 group-hover/card:-translate-y-3">
                  <h3 className="font-bold text-[#0a2540] text-[19px] mb-3">Incorporate your company</h3>
                  <p className="text-[#425466] text-[15px] leading-relaxed mb-4">
                      Form a legal entity, issue stock, and start accepting payments.
                  </p>
                  <div className="relative h-6 mt-1">
                     <Link href="#" className="absolute left-0 top-0 inline-flex items-center text-[#635bff] text-[15px] font-medium hover:text-[#0a2540] opacity-0 translate-y-2 transition-all duration-300 group-hover/card:opacity-100 group-hover/card:translate-y-0">
                      Learn about Atlas
                      <ChevronRight className="w-3 h-3 ml-1 stroke-[3] transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
            </div>

            {/* Card 2: Payment Links / Validate */}
            <div className="flex flex-col group/card p-4 rounded-xl transition-all duration-300 shadow-sm hover:shadow-lg bg-white">
                <div className="bg-[#f6f9fc] rounded-lg h-48 mb-6 relative overflow-hidden flex items-center justify-center">
                     {/* Illustration: Payment Link */}
                     <svg width="240" height="190" viewBox="0 0 240 190" fill="none" className="transition-transform duration-300 group-hover/card:scale-90">
                         {/* Phone/Mobile View */}
                         <rect x="80" y="20" width="80" height="150" rx="8" fill="white" filter="drop-shadow(0 4px 12px rgba(0,0,0,0.08))" stroke="#e6ebf1" strokeWidth="1"/>
                         
                         {/* Header */}
                         <rect x="80" y="20" width="80" height="40" rx="8" fill="#f6f9fc"/> 
                         <rect x="80" y="50" width="80" height="10" fill="#f6f9fc"/> {/* Cover bottom radius */}
                         <circle cx="120" cy="40" r="12" fill="#635bff"/>
                         
                         {/* Payment Form Lines */}
                         <rect x="90" y="70" width="60" height="4" rx="2" fill="#e6ebf1"/>
                         <rect x="90" y="80" width="40" height="4" rx="2" fill="#e6ebf1"/>
                         
                         <rect x="90" y="100" width="60" height="20" rx="4" fill="#635bff" opacity="0.1"/>
                         <text x="103" y="113" fontFamily="sans-serif" fontSize="6" fontWeight="bold" fill="#635bff">Pay $20.00</text>
                         
                         {/* Floating Elements (QR) */}
                         <rect x="150" y="110" width="40" height="40" rx="4" fill="white" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.1))"/>
                         <rect x="155" y="115" width="30" height="30" fill="#0a2540"/>
                         <rect x="157" y="117" width="10" height="10" fill="white"/>
                         <rect x="173" y="117" width="10" height="10" fill="white"/>
                         <rect x="157" y="133" width="10" height="10" fill="white"/>
                     </svg>
                </div>
                
                <div className="transform transition-transform duration-300 group-hover/card:-translate-y-3">
                  <h3 className="font-bold text-[#0a2540] text-[19px] mb-3">Validate your idea</h3>
                  <p className="text-[#425466] text-[15px] leading-relaxed mb-4">
                      Test your product idea by launching payments with little to no code.
                  </p>
                  <div className="relative h-6 mt-1">
                    <Link href="#" className="absolute left-0 top-0 inline-flex items-center text-[#635bff] text-[15px] font-medium hover:text-[#0a2540] opacity-0 translate-y-2 transition-all duration-300 group-hover/card:opacity-100 group-hover/card:translate-y-0">
                      Try Payment Links
                      <ChevronRight className="w-3 h-3 ml-1 stroke-[3] transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
            </div>

             {/* Card 3: Billing / Pricing */}
             <div className="flex flex-col group/card p-4 rounded-xl transition-all duration-300 shadow-sm hover:shadow-lg bg-white">
                <div className="bg-[#f6f9fc] rounded-lg h-48 mb-6 relative overflow-hidden flex items-center justify-center">
                    {/* Illustration: Chart */}
                    <svg width="240" height="190" viewBox="0 0 240 190" fill="none" className="transition-transform duration-300 group-hover/card:scale-90">
                        {/* Card Background */}
                        <rect x="30" y="40" width="180" height="110" rx="6" fill="white" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.05))"/>
                        
                        {/* Header Text */}
                         <text x="45" y="65" fontSize="8" fontWeight="bold" fill="#8898aa" fontFamily="sans-serif">Cloud token</text>
                         <text x="45" y="85" fontSize="12" fontWeight="bold" fill="#0a2540" fontFamily="sans-serif">$2,120.00</text>
                         <text x="140" y="85" fontSize="12" fontWeight="bold" fill="#32d74b" fontFamily="sans-serif">98.4%</text>

                         {/* Bar Chart */}
                         <line x1="45" y1="130" x2="195" y2="130" stroke="#e6ebf1" strokeWidth="1"/>
                         
                         <rect x="50" y="105" width="12" height="25" rx="1" fill="#32d74b"/>
                         <rect x="70" y="115" width="12" height="15" rx="1" fill="#32d74b" opacity="0.6"/>
                         <rect x="90" y="100" width="12" height="30" rx="1" fill="#32d74b"/>
                         <rect x="110" y="110" width="12" height="20" rx="1" fill="#32d74b" opacity="0.6"/>
                         <rect x="130" y="95" width="12" height="35" rx="1" fill="#32d74b"/>
                         <rect x="150" y="105" width="12" height="25" rx="1" fill="#32d74b" opacity="0.6"/>
                         <rect x="170" y="90" width="12" height="40" rx="1" fill="#32d74b"/>
                    </svg>
                </div>
                
                <div className="transform transition-transform duration-300 group-hover/card:-translate-y-3">
                  <h3 className="font-bold text-[#0a2540] text-[19px] mb-3">Launch any pricing model</h3>
                  <p className="text-[#425466] text-[15px] leading-relaxed mb-4">
                      Offer usage-based billing to charge customers based on how much they use.
                  </p>
                  <div className="relative h-6 mt-1">
                    <Link href="#" className="absolute left-0 top-0 inline-flex items-center text-[#635bff] text-[15px] font-medium hover:text-[#0a2540] opacity-0 translate-y-2 transition-all duration-300 group-hover/card:opacity-100 group-hover/card:translate-y-0">
                      Explore Billing
                      <ChevronRight className="w-3 h-3 ml-1 stroke-[3] transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
