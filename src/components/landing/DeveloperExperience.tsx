import Link from "next/link";
import { ChevronRight, Terminal } from "lucide-react";

export function DeveloperExperience() {
  return (
    <section className="relative py-24 sm:py-32">
      
      {/* Background Wrapper to manage layers */}
      <div className="absolute inset-0 z-0 pointer-events-none">
          
          {/* Main Dark Blue Background */}
          <div className="absolute inset-x-0 top-0 bottom-0 bg-[#0a2540] transform -skew-y-6 origin-top-left -my-16 h-[calc(100%+8rem)]"></div>
          
      </div>

      <div className="max-w-[1080px] mx-auto px-4 sm:px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            {/* Left Column: Text Content */}
            <div>
                <h4 className="text-[#00d4ff] font-bold text-[15px] mb-6 tracking-wide uppercase">Designed for developers</h4>
                <h2 className="text-[36px] sm:text-[42px] font-bold leading-tight mb-6 text-white">
                  Ship faster with powerful and easy-to-use APIs
                </h2>
                <p className="text-[#adbdcc] text-[17px] leading-relaxed mb-8 max-w-lg">
                  Save engineering time with unified payments functionality. We obsess over the maze of gateways, payments rails, and financial institutions that make up the global economic landscape so that your teams can build what you need on one platform.
                </p>
                <div className="flex items-center gap-4">
                     <Link 
                        href="/docs" 
                        className="group inline-flex items-center justify-center bg-[#00d4ff] text-[#0a2540] font-medium px-5 py-[6px] rounded-full transition-all hover:bg-white text-[15px]"
                      >
                        Read the docs
                        <ChevronRight className="w-3 h-3 ml-2 stroke-[3]" />
                      </Link>
                </div>
            </div>

            {/* Right Column: Code Editor Visual */}
            <div className="relative">
                {/* Code Window */}
                <div className="bg-[#1b2738] rounded-lg shadow-2xl overflow-hidden font-mono text-sm border border-[#2e3f53]">
                    {/* Fake Window Header */}
                    <div className="bg-[#0f1722] px-4 py-2 flex items-center justify-between border-b border-[#2e3f53]">
                         <div className="flex gap-2">
                             <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
                             <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
                             <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
                         </div>
                    </div>
                    
                    {/* Code Content */}
                    <div className="p-6 text-[#adbdcc] overflow-x-auto">
                        <div className="mb-4">
                            <span className="text-[#c490ff]">const</span> stripe = <span className="text-[#80e9ff]">require</span>(<span className="text-[#a5d6ff]">'stripe'</span>)(<span className="text-[#a5d6ff]">'sk_test_BQokikJ0vBi2Hl4...'</span>);
                        </div>
                        <div className="mb-1">
                             <span className="text-[#c490ff]">await</span> stripe.paymentIntents.<span className="text-[#80e9ff]">create</span>({'{'}
                        </div>
                         <div className="pl-4">
                             amount: <span className="text-[#ffca58]">2000</span>,
                        </div>
                        <div className="pl-4">
                             currency: <span className="text-[#a5d6ff]">'usd'</span>
                        </div>
                         <div className="mb-4">
                             {'}'});
                        </div>
                    </div>

                    {/* Terminal Window Overlay at Bottom */}
                    <div className="bg-[#0a1017] border-t border-[#2e3f53] p-4 text-xs font-mono">
                         <div className="flex items-center justify-between text-[#4f5b66] mb-2 uppercase text-[10px] tracking-wider">
                             <span>Terminal</span>
                             <span>server.js</span>
                         </div>
                         <div className="text-white space-y-1">
                             <div className="flex gap-2">
                                <span className="text-[#80e9ff]">$</span>
                                <span>node server.js && stripe listen</span>
                             </div>
                             <div className="text-[#a5d6ff]">&gt; Ready! Waiting for requests...</div>
                             <div className="flex gap-2 text-[#4f5b66]">
                                 <span>2026-01-04 22:58:59</span>
                                 <span className="text-[#00d4ff] font-bold">[200]</span>
                                 <span className="text-white">payment_intent.created</span>
                             </div>
                             <div className="flex gap-2 text-[#4f5b66]">
                                 <span>2026-01-04 22:59:00</span>
                                 <span className="text-[#00d4ff] font-bold">[200]</span>
                                 <span className="text-white">charge.succeeded</span>
                             </div>
                              <div className="flex gap-2 text-[#4f5b66]">
                                 <span>2026-01-04 22:59:00</span>
                                 <span className="text-[#00d4ff] font-bold">[200]</span>
                                 <span className="text-white">payment_intent.succeeded</span>
                             </div>
                         </div>
                    </div>
                </div>
            </div>
        </div>

        {/* 4-Column Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 border-t border-[#ffffff1a] pt-12">
            
            {/* Feature 1 */}
            <div>
               <div className="mb-4 text-[#80e9ff]">
                   {/* Simplified Stack Icon */}
                   <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 16 4-2-4-2-4 2 4 2Z"/><path d="m6 16 4-2-4-2-4 2 4 2Z"/><path d="m12 21 4-2-4-2-4 2 4 2Z"/><path d="m12 13 4-2-4-2-4 2 4 2Z"/></svg>
               </div>
               <h3 className="font-bold text-white text-[15px] mb-2 flex items-center">
                   <span className="w-[3px] h-4 bg-[#00d4ff] mr-3 rounded-full"></span> 
                   Use Stripe with your stack
               </h3>
               <p className="text-[#adbdcc] text-[15px] leading-relaxed mb-3">
                 We offer client and server libraries in everything from React and PHP to .NET and iOS.
               </p>
               <Link href="#" className="group inline-flex items-center text-[#00d4ff] text-[15px] font-medium hover:text-white transition-colors">
                  See libraries
                  <ChevronRight className="w-3 h-3 ml-1 stroke-[3] transition-transform group-hover:translate-x-1" />
               </Link>
            </div>

            {/* Feature 2 */}
            <div>
                <div className="mb-4 text-[#80e9ff]">
                    {/* Simplified AI Icon */}
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
                </div>
               <h3 className="font-bold text-white text-[15px] mb-2 flex items-center">
                   <span className="w-[3px] h-4 bg-[#00d4ff] mr-3 rounded-full"></span> 
                   Build AI agents
               </h3>
               <p className="text-[#adbdcc] text-[15px] leading-relaxed mb-3">
                 Create agents that can manage money and handle support tasks using the Stripe API.
               </p>
               <Link href="#" className="group inline-flex items-center text-[#00d4ff] text-[15px] font-medium hover:text-white transition-colors">
                  View docs
                  <ChevronRight className="w-3 h-3 ml-1 stroke-[3] transition-transform group-hover:translate-x-1" />
               </Link>
            </div>

            {/* Feature 3 */}
            <div>
                 <div className="mb-4 text-[#80e9ff]">
                    {/* Simplified Integration Icon */}
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="8" height="8" x="2" y="2" rx="2"/><rect width="8" height="8" x="14" y="2" rx="2"/><rect width="8" height="8" x="2" y="14" rx="2"/><rect width="8" height="8" x="14" y="14" rx="2"/></svg>
                </div>
               <h3 className="font-bold text-white text-[15px] mb-2 flex items-center">
                   <span className="w-[3px] h-4 bg-[#00d4ff] mr-3 rounded-full"></span> 
                   Explore pre-built integrations
               </h3>
               <p className="text-[#adbdcc] text-[15px] leading-relaxed mb-3">
                 Connect Stripe to over a hundred tools including Adobe, Salesforce, and Xero.
               </p>
               <Link href="#" className="group inline-flex items-center text-[#00d4ff] text-[15px] font-medium hover:text-white transition-colors">
                  Browse App Marketplace
                  <ChevronRight className="w-3 h-3 ml-1 stroke-[3] transition-transform group-hover:translate-x-1" />
               </Link>
            </div>

            {/* Feature 4 */}
            <div>
                 <div className="mb-4 text-[#80e9ff]">
                     {/* Simplified App Icon */}
                     <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 7h10"/><path d="M7 12h10"/><path d="M7 17h10"/></svg>
                </div>
               <h3 className="font-bold text-white text-[15px] mb-2 flex items-center">
                   <span className="w-[3px] h-4 bg-[#00d4ff] mr-3 rounded-full"></span> 
                   Build on Stripe Apps
               </h3>
               <p className="text-[#adbdcc] text-[15px] leading-relaxed mb-3">
                 Create an app just for your team or for the millions of businesses on Stripe.
               </p>
               <Link href="#" className="group inline-flex items-center text-[#00d4ff] text-[15px] font-medium hover:text-white transition-colors">
                  Learn about Apps
                  <ChevronRight className="w-3 h-3 ml-1 stroke-[3] transition-transform group-hover:translate-x-1" />
               </Link>
            </div>

        </div>

      </div>
    </section>
  );
}
