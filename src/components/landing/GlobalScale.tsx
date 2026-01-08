import { Globe, ShieldCheck, Zap } from "lucide-react";

export function GlobalScale() {
  return (
    <div className="bg-slate-900 py-32 text-white overflow-hidden relative"> 
      {/* Background World Map Placeholder */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="h-full w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900 via-slate-900 to-slate-900"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
                <h4 className="text-cyan-400 font-semibold mb-4">Global scale</h4>
                <h2 className="text-4xl font-bold tracking-tight mb-6 leading-tight">
                    The backbone for <br/> global commerce
                </h2>
                <p className="text-slate-400 text-lg leading-relaxed mb-12">
                    Intus One makes moving messages as easy and programmable as packets of data. Our teams are based in offices around the world and we process hundreds of millions of messages each year for ambitious businesses of all sizes.
                </p>
                
                <div className="grid grid-cols-2 gap-8">
                    <div>
                        <div className="text-3xl font-bold text-white mb-2">500M+</div>
                        <p className="text-sm text-slate-400">API requests per day</p>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-white mb-2">99.999%</div>
                        <p className="text-sm text-slate-400">Historical uptime</p>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-white mb-2">47+</div>
                        <p className="text-sm text-slate-400">Countries with local routing</p>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-white mb-2">135+</div>
                        <p className="text-sm text-slate-400">Currencies supported</p>
                    </div>
                </div>
            </div>
            
            <div className="relative h-[400px] w-full border-l border-slate-800 pl-10 hidden lg:flex flex-col justify-center space-y-12">
                <div className="flex gap-4 items-start">
                    <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400">
                        <Zap className="w-6 h-6" />
                    </div>
                    <div>
                        <h4 className="font-semibold text-white mb-2">Fastest Integration</h4>
                        <p className="text-sm text-slate-400">Get up and running in minutes with our modern APIs.</p>
                    </div>
                </div>
                 <div className="flex gap-4 items-start">
                    <div className="p-3 bg-green-500/10 rounded-lg text-green-400">
                        <ShieldCheck className="w-6 h-6" />
                    </div>
                     <div>
                        <h4 className="font-semibold text-white mb-2">Enterprise Grade</h4>
                        <p className="text-sm text-slate-400">SOC2 compliant, GDPR ready, and bank-grade encryption.</p>
                    </div>
                </div>
                 <div className="flex gap-4 items-start">
                    <div className="p-3 bg-purple-500/10 rounded-lg text-purple-400">
                        <Globe className="w-6 h-6" />
                    </div>
                     <div>
                        <h4 className="font-semibold text-white mb-2">Global Routing</h4>
                        <p className="text-sm text-slate-400">Intelligent routing across best-in-class carriers.</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
