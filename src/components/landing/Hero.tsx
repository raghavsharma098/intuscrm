import Link from "next/link";
import { ArrowRight, ChevronRight, Search, Menu } from "lucide-react";

export function Hero() {
  return (
    <div className="relative w-full bg-white overflow-hidden">
      {/* 
        --------------------------------------------------
        BACKGROUND: STRIPE MESH GRADIENT CANVAS (CSS APPROXIMATION)
        --------------------------------------------------
        Refined to match the specific color flow: Purple (Left) -> Pink (Center) -> Cyan (Right).
        The container is skewed to create the diagonal cut at the bottom.
      */}
      <div className="absolute inset-0 w-full h-[85vh] lg:h-[950px] bg-white z-0 transform -skew-y-6 origin-top-left -translate-y-20 overflow-hidden">
        {/* Base Mesh Layer */}
        <div className="absolute inset-0 w-full h-full bg-slate-50 opacity-100">
           {/* 1. Deep Purple/Blue (Top Left - Anchor) */}
           <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#6772e5] rounded-full mix-blend-multiply filter blur-[80px] opacity-90 animate-blob"></div>
           
           {/* 2. Vibrant Pink/Red (Center/Left - warmth) */}
           <div className="absolute top-[10%] left-[20%] w-[40vw] h-[40vw] bg-[#ff6b6b] rounded-full mix-blend-multiply filter blur-[80px] opacity-80 animate-blob animation-delay-2000"></div>
           
           {/* 3. Cyan/Teal (Top Right - Contrast) */}
           <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-[#24b47e] rounded-full mix-blend-multiply filter blur-[100px] opacity-50 animate-blob animation-delay-4000"></div>

           {/* 4. Soft Yellow/Orange (Bottom Left - Glow) */}
           <div className="absolute bottom-[0%] left-[10%] w-[40vw] h-[40vw] bg-[#fca3b7] rounded-full mix-blend-multiply filter blur-[100px] opacity-60"></div>

           {/* 5. Overlay Gradient to smooth transitions */}
           <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-white/60"></div>
        </div>
        
        {/* Grid Texture Overlay */}
        <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png')] opacity-10 mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 max-w-[1080px] mx-auto px-6 sm:px-6 lg:px-8 pt-32 pb-40 lg:pt-48 lg:pb-64">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-start">
          
          {/* 
            --------------------------------------------------
            LEFT COLUMN: TEXT CONTENT
            --------------------------------------------------
          */}
          <div className="max-w-[580px] pt-8">
            <h1 className="text-[60px] sm:text-[72px] lg:text-[94px] font-[800] tracking-[-0.03em] text-[#0a2540] mb-8 leading-[0.95]">
              Financial <br/>
              infrastructure <br/>
              to grow your <br/>
              revenue
            </h1>
            
            <p className="text-[18px] text-[#425466] mb-8 leading-[1.6] max-w-[480px] font-medium opacity-90">
              Join the millions of companies that use Intus One to accept payments online and in person, embed financial services, power custom revenue models, and build a more profitable business.
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              <Link 
                href="/dashboard" 
                className="bg-[#0a2540] hover:bg-[#0a2540]/90 text-white font-semibold rounded-full px-8 py-3 transition-all flex items-center gap-2 group text-[15px] shadow-[0_6px_20px_-6px_rgba(10,37,64,0.35)]"
              >
                Start now
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link 
                href="#" 
                className="text-[#0a2540] font-semibold hover:text-[#0a2540]/70 transition-colors flex items-center gap-2 group text-[15px]"
              >
                Contact sales
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* 
            --------------------------------------------------
            RIGHT COLUMN: DEVICE MOCKUPS
            --------------------------------------------------
          */}
          <div className="relative h-[800px] w-full hidden lg:block perspective-[1000px] select-none pointer-events-none -mr-[300px] -mt-[50px]">
             
             {/* 
               LAYER 1: DASHBOARD (Backdrop)
               Rotated significantly to create depth. Use a pale blue/gray background.
             */}
             <div className="absolute right-[-40px] top-[0px] w-[800px] h-[600px] bg-white rounded-xl shadow-[0_50px_100px_-20px_rgba(50,50,93,0.25),0_30px_60px_-30px_rgba(0,0,0,0.3)] overflow-hidden transform rotate-y-[-12deg] rotate-x-[6deg] scale-[0.85] border border-slate-200/60 transition-transform duration-1000">
                {/* Dashboard Nav */}
                <div className="h-14 border-b border-slate-100 flex items-center px-6 justify-between bg-white">
                   <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                         <div className="w-6 h-6 rounded bg-[#635bff] flex items-center justify-center text-white text-xs font-bold">R</div>
                         <span className="font-bold text-[#635bff] text-sm tracking-wide">ROCKET RIDES</span>
                      </div>
                      <span className="text-slate-300">/</span>
                      <span className="text-sm font-medium text-slate-500">Payments</span>
                   </div>
                   <div className="w-48 h-8 bg-slate-100 rounded flex items-center px-3 text-slate-400 text-xs gap-2">
                      <Search className="w-3 h-3" />
                      <span>Search...</span>
                   </div>
                </div>
                
                {/* Content */}
                <div className="p-8 bg-[#f7fafc] h-full">
                   <div className="flex justify-between items-end mb-8">
                      <div>
                         <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Total revenue</div>
                         <div className="flex items-baseline gap-3">
                            <span className="text-3xl font-bold text-[#0a2540]">$4,293.18</span>
                            <span className="text-xs font-semibold text-green-600 bg-green-100 px-1.5 py-0.5 rounded">+12.5%</span>
                         </div>
                      </div>
                      <div className="flex gap-2">
                         <div className="px-3 py-1.5 bg-white border border-slate-200 rounded text-xs font-medium text-slate-600 shadow-sm">Filter</div>
                         <div className="px-3 py-1.5 bg-white border border-slate-200 rounded text-xs font-medium text-slate-600 shadow-sm">Export</div>
                      </div>
                   </div>

                   <div className="flex gap-6 mb-8">
                     <div className="flex-1 bg-white p-4 rounded shadow-sm border border-slate-100">
                        <div className="text-xs font-semibold text-slate-500 mb-2">Volume</div>
                         {/* CSS Bar Chart */}
                        <div className="h-24 flex items-end justify-between gap-1 pt-4">
                           {[30, 45, 35, 60, 50, 75, 60, 80, 70, 90, 85, 95].map((h, i) => (
                              <div key={i} style={{ height: `${h}%` }} className="w-full bg-[#635bff] rounded-t-[2px] opacity-90 hover:opacity-100 transition-opacity"></div>
                           ))}
                        </div>
                     </div>
                     <div className="w-1/3 bg-white p-4 rounded shadow-sm border border-slate-100">
                        <div className="text-xs font-semibold text-slate-500 mb-2">Succcess</div>
                        <div className="h-24 flex items-center justify-center">
                           <div className="w-20 h-20 rounded-full border-4 border-[#635bff] border-t-transparent animate-spin-slow"></div>
                        </div>
                     </div>
                   </div>
                </div>
             </div>

             {/* 
               LAYER 2: PHONE (Foreground)
               Popping out, overlapping the dashboard.
               True-to-reference: Tall, sleek, white interface.
             */}
             <div className="absolute left-[80px] top-[60px] w-[300px] h-[600px] bg-white rounded-[40px] shadow-[0_50px_100px_-20px_rgba(50,50,93,0.35),0_30px_60px_-30px_rgba(0,0,0,0.6)] z-20 overflow-hidden transform translate-z-[100px] border-[6px] border-slate-900/5">
                {/* Status Bar */}
                <div className="flex justify-between px-6 pt-4 pb-2 items-center text-slate-900">
                    <span className="text-[12px] font-semibold">9:41</span>
                    <div className="flex gap-1.5">
                       <span className="h-2.5 w-2.5 bg-slate-900 rounded-full opacity-20"></span>
                       <span className="h-2.5 w-2.5 bg-slate-900 rounded-full opacity-20"></span>
                       <span className="h-2.5 w-2.5 bg-slate-900 rounded-full"></span>
                    </div>
                </div>

                {/* Cover Image Area */}
                <div className="px-6 py-6 pb-2 text-center">
                   <div className="w-20 h-24 mx-auto bg-gradient-to-br from-[#ffd54f] to-[#ff6f00] rounded-xl shadow-lg shadow-orange-500/30 mb-5 relative flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-white/90"></div>
                   </div>
                   <h3 className="text-lg font-bold text-slate-900 mb-1">Abstraction Magazine</h3>
                   <p className="text-slate-500 font-medium text-sm">$19.00 per month</p>
                </div>

                {/* Main Action */}
                <div className="px-6">
                   <button className="w-full bg-black text-white py-3 rounded-lg flex items-center justify-center gap-2 font-semibold text-[15px] hover:bg-slate-800 transition-colors shadow-lg">
                      <span></span> Pay
                   </button>
                   
                   <div className="relative text-center my-5">
                      <span className="relative z-10 bg-white px-2 text-[10px] font-bold text-slate-400 tracking-wider">OR PAY WITH CARD</span>
                      <div className="absolute top-1/2 left-0 w-full h-px bg-slate-100"></div>
                   </div>

                   {/* Inputs */}
                   <div className="space-y-3">
                      <div className="group">
                         <label className="text-[11px] font-bold text-slate-500 mb-1.5 block">Email</label>
                         <input type="text" defaultValue="j.appleseed@example.com" className="w-full p-2.5 text-sm font-medium text-slate-900 bg-white border border-slate-200 rounded-lg focus:border-[#635bff] focus:ring-1 focus:ring-[#635bff] outline-none transition-all shadow-sm group-hover:border-slate-300" />
                      </div>
                      
                      <div>
                         <label className="text-[11px] font-bold text-slate-500 mb-1.5 block">Card Information</label>
                         <div className="border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                            <div className="p-2.5 border-b border-slate-200 flex items-center justify-between bg-white">
                               <span className="font-medium text-sm text-slate-900">4242 4242 4242 4242</span>
                               <div className="w-6 h-4 bg-slate-100 rounded"></div>
                            </div>
                            <div className="flex bg-white">
                               <div className="flex-1 p-2.5 border-r border-slate-200">
                                  <span className="font-medium text-sm text-slate-900">MM / YY</span>
                               </div>
                               <div className="w-20 p-2.5">
                                  <span className="font-medium text-sm text-slate-900">CVC</span>
                               </div>
                            </div>
                         </div>
                      </div>

                      <div className="pt-2">
                        <button className="w-full bg-[#635bff] text-white py-3 rounded-lg font-bold text-[15px] shadow-[0_4px_14px_0_rgba(99,91,255,0.39)] hover:bg-[#544dc9] transition-transform active:scale-[0.98]">
                           Pay $19.00
                        </button>
                      </div>
                   </div>
                </div>

             </div>

          </div>
        </div>
      </div>
    </div>
  );
}
