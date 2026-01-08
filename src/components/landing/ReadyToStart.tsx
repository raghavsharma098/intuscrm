import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function ReadyToStart() {
  return (
    <section className="relative bg-[#f6f9fc] pt-24 pb-48 overflow-hidden border-t border-slate-200">
        
      {/* Background Decor - Removed per request */}
      {/* 
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
         ... vectors removed ...
      </div> 
      */}

       {/* Grid Background Lines */}
       <div className="absolute inset-x-0 top-0 h-full max-w-[1080px] mx-auto pointer-events-none z-0 px-4 sm:px-6" aria-hidden="true">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 h-full gap-8">
            <div className="hidden lg:block border-r border-slate-200 border-dashed h-full"></div>
            <div className="hidden lg:block border-r border-slate-200 border-dashed h-full"></div>
            <div className="hidden lg:block border-r border-slate-200 border-dashed h-full"></div>
            {/* Last column */}
          </div>
       </div>

      <div className="max-w-[1080px] mx-auto px-4 sm:px-6 relative z-30">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-start">
          
          {/* Column 1 & 2 combined: CTA Text */}
          <div className="col-span-1 lg:col-span-2 lg:pr-12">
            <h2 className="text-[26px] sm:text-[28px] font-bold text-[#0a2540] mb-6 tracking-tight">
              Ready to get started?
            </h2>
            <p className="text-[17px] text-[#425466] mb-8 max-w-sm leading-relaxed font-medium">
              Create an account instantly to get started or contact us to design a custom package for your business.
            </p>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <Link 
                href="/dashboard" 
                className="group inline-flex items-center justify-center bg-[#635bff] text-white font-medium px-5 py-[6px] rounded-full transition-all hover:bg-[#4b45c2] text-[15px]"
              >
                Start now
                <ChevronRight className="w-3 h-3 ml-2 stroke-[3]" />
              </Link>
              <Link 
                href="/contact" 
                className="group inline-flex items-center text-[#635bff] font-medium hover:text-[#0a2540] transition-colors text-[15px]"
              >
                Contact sales
                <ChevronRight className="w-3 h-3 ml-2 stroke-[3] transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Column 3: Feature 1 - Pricing */}
          <div className="col-span-1 lg:pl-8 relative">
             <div className="mb-5 relative h-10 w-10">
                {/* Fixed Pricing Icon to match Stripe Tag with Swing only on Front Tag */}
                 <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="drop-shadow-sm overflow-visible">
                  <g transform="rotate(180, 20, 20)">
                      {/* Back Tag (Cyan) - Static, Taller, Aligned with Front */}
                      <g>
                         <path d="M12 4H24C25.1046 4 26 4.89543 26 6V29L17 38L8 29V6C8 4.89543 8.89543 4 10 4Z" fill="#80e9ff"/>
                      </g>
                      {/* Front Tag (Blue) - Swinging, Taller */}
                      <g className="animate-swing" style={{ transformOrigin: '17px 32px' }}>
                          <path d="M12 4H24C25.1046 4 26 4.89543 26 6V29L17 38L8 29V6C8 4.89543 8.89543 4 10 4Z" fill="#635bff"/>
                          {/* Circle near pointed end (local y~32) */}
                          <circle cx="17" cy="32" r="2.5" fill="white"/>
                      </g>
                  </g>
                </svg>
             </div>
             
             <div className="relative z-30"> 
                <h3 className="font-bold text-[#0a2540] text-[15px] mb-2 antialiased">
                    Always know what you pay
                </h3>
                 {/* 
                    Grid Alignment Fix: 
                    Grid Gap = 32px (gap-8)
                    Padding Left = 32px (pl-8)
                    Total distance from content to line (which is at right of prev col) = 64px.
                    
                    However, the background grid lines I drew are:
                    <div className="border-r ..."> which is at the Right of the column.
                    
                    Col 2 Border Right matches the position we want.
                    Distance = 32px (Gap) + 32px (Padding) = 64px roughly.
                    Let's use -left-[64px] (minus line width).
                 */}
                <span className="hidden lg:block absolute -left-[65px] top-[2px] w-[2px] h-5 bg-[#635bff]"></span>


                <p className="text-[#425466] text-[15px] leading-relaxed mb-3 antialiased">
                  Integrated per-transaction pricing with no hidden fees.
                </p>
                <Link href="/pricing" className="group inline-flex items-center text-[#635bff] text-[15px] font-medium hover:text-[#0a2540]">
                  Pricing details
                  <ChevronRight className="w-3 h-3 ml-1 stroke-[3] transition-transform group-hover:translate-x-1" />
                </Link>
             </div>
          </div>

          {/* Column 4: Feature 2 - Integration */}
          <div className="col-span-1 lg:pl-8 relative">
             <div className="mb-5 relative h-10 w-10">
                {/* Fixed Integration Icon - Static */}
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-sm overflow-visible">
                   <g>
                      <rect x="16" y="2" width="18" height="24" rx="4" fill="#80e9ff" transform="translate(-2, 0)"/>
                   </g>
                   <g>
                      <rect x="10" y="6" width="18" height="24" rx="4" fill="#635bff"/>
                       {/* Code Brackets */}
                      <path d="M15 16L13 18L15 20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M23 16L25 18L23 20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                       {/* Window Control Dots */}
                      <circle cx="14" cy="10" r="1.5" fill="white" fillOpacity="0.5"/>
                      <circle cx="18" cy="10" r="1.5" fill="white" fillOpacity="0.5"/>
                   </g>
                </svg>
             </div>

             <div className="relative z-30">
                 {/* Alignment Fix: Same logic, -65px */}
                <span className="hidden lg:block absolute -left-[65px] top-[2px] w-[2px] h-5 bg-[#635bff]"></span>
                
                <h3 className="font-bold text-[#0a2540] text-[15px] mb-2 antialiased">Start your integration</h3>
                <p className="text-[#425466] text-[15px] leading-relaxed mb-3 antialiased">
                  Get up and running with Intus One in as little as 10 minutes.
                </p>
                <Link href="/docs" className="group inline-flex items-center text-[#635bff] text-[15px] font-medium hover:text-[#0a2540]">
                  API reference
                  <ChevronRight className="w-3 h-3 ml-1 stroke-[3] transition-transform group-hover:translate-x-1" />
                </Link>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
