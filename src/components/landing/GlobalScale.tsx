import { Globe, Zap, Server, Shield } from "lucide-react";

export function GlobalScale() {
  return (
    <div className="relative py-24 sm:py-32 overflow-hidden">
      
      {/* Background with Skew - Parallel to the section below for flow */}
      <div className="absolute inset-x-0 top-0 bottom-0 transform skew-y-6 origin-top-left -z-20 bg-[#0a2540] -my-32 scale-y-125 w-full"></div>
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 z-0 opacity-10" 
           style={{ backgroundImage: 'radial-gradient(#425466 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="max-w-[1080px] mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Text Content */}
            <div>
                <h4 className="text-[#00d4ff] font-bold text-[15px] mb-6 tracking-wide uppercase">Global scale</h4>
                <h2 className="text-[36px] sm:text-[42px] font-bold leading-tight mb-6 text-white">
                    The backbone for <br/> global commerce
                </h2>
                <p className="text-[#adbdcc] text-[17px] leading-relaxed mb-12 max-w-lg">
                    Stripe makes moving money as simple, borderless, and programmable as the rest of the internet. Our teams are based in offices around the world and we process hundreds of billions of dollars each year for ambitious businesses of all sizes.
                </p>
                
                <div className="grid grid-cols-2 gap-x-8 gap-y-10">
                    <div className="border-l border-[#00d4ff] pl-4">
                        <div className="text-2xl font-bold text-white mb-1">500M+</div>
                        <p className="text-[14px] text-[#adbdcc]">API requests per day</p>
                    </div>
                    <div className="border-l border-[#00d4ff] pl-4">
                        <div className="text-2xl font-bold text-white mb-1">99.999%</div>
                        <p className="text-[14px] text-[#adbdcc]">Historical uptime</p>
                    </div>
                    <div className="border-l border-[#00d4ff] pl-4">
                        <div className="text-2xl font-bold text-white mb-1">47+</div>
                        <p className="text-[14px] text-[#adbdcc]">Countries with local routing</p>
                    </div>
                    <div className="border-l border-[#00d4ff] pl-4">
                        <div className="text-2xl font-bold text-white mb-1">135+</div>
                        <p className="text-[14px] text-[#adbdcc]">Currencies supported</p>
                    </div>
                </div>
            </div>
            
            {/* Globe Visualization Placeholder */}
            <div className="relative h-[400px] w-full flex items-center justify-center">
                <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px]">
                     {/* Abstract Globe with CSS/SVG */}
                     <svg viewBox="0 0 400 400" className="w-full h-full animate-spin-slow" style={{ animationDuration: '60s' }}>
                        <defs>
                            <linearGradient id="globe-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#0a2540" />
                                <stop offset="50%" stopColor="#1b2738" />
                                <stop offset="100%" stopColor="#0a2540" />
                            </linearGradient>
                        </defs>
                        <circle cx="200" cy="200" r="180" fill="url(#globe-gradient)" stroke="#2e3f53" strokeWidth="1" />
                        
                        {/* Longitude Lines */}
                        <ellipse cx="200" cy="200" rx="60" ry="180" fill="none" stroke="#2e3f53" strokeWidth="1" className="opacity-50" />
                        <ellipse cx="200" cy="200" rx="120" ry="180" fill="none" stroke="#2e3f53" strokeWidth="1" className="opacity-50" />
                        <path d="M200 20 L200 380" stroke="#2e3f53" strokeWidth="1" className="opacity-50" />

                        {/* Latitude Lines */}
                        <ellipse cx="200" cy="200" rx="180" ry="60" fill="none" stroke="#2e3f53" strokeWidth="1" className="opacity-50" />
                        <ellipse cx="200" cy="200" rx="180" ry="120" fill="none" stroke="#2e3f53" strokeWidth="1" className="opacity-50" />
                        <path d="M20 200 L380 200" stroke="#2e3f53" strokeWidth="1" className="opacity-50" />
                        
                        {/* Glowing Dots (Servers) */}
                        <circle cx="150" cy="150" r="4" fill="#00d4ff" className="animate-ping" style={{ animationDuration: '3s' }} />
                        <circle cx="150" cy="150" r="2" fill="#fff" />
                        
                        <circle cx="280" cy="180" r="4" fill="#635bff" className="animate-ping" style={{ animationDuration: '4s' }} />
                        <circle cx="280" cy="180" r="2" fill="#fff" />

                        <circle cx="180" cy="280" r="4" fill="#00d4ff" className="animate-ping" style={{ animationDuration: '5s' }} />
                        <circle cx="180" cy="280" r="2" fill="#fff" />
                     </svg>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
