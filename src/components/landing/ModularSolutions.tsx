import { BarChart3, MessageSquare, Users, TrendingUp, Phone, Settings, Zap, LayoutDashboard } from "lucide-react";

const modules = [
  { name: "Dashboard", icon: LayoutDashboard, color: "from-blue-500 to-blue-600", description: "Real-time insights" },
  { name: "Unified Inbox", icon: MessageSquare, color: "from-purple-500 to-purple-600", description: "All messages in one place" },
  { name: "Lead Management", icon: Users, color: "from-green-500 to-green-600", description: "Track and nurture leads" },
  { name: "Sales Pipeline", icon: TrendingUp, color: "from-orange-500 to-orange-600", description: "Close deals faster" },
  { name: "Voice & OTP", icon: Phone, color: "from-cyan-500 to-cyan-600", description: "Smart communication" },
  { name: "Analytics", icon: BarChart3, color: "from-pink-500 to-pink-600", description: "Data-driven decisions" },
];

export function ModularSolutions() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left content */}
          <div className="relative">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 text-sm font-semibold px-4 py-2 rounded-full mb-6">
              <Zap className="w-4 h-4" />
              <span>All-in-One Platform</span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold leading-tight text-slate-900 mb-6">
              Everything you need to manage customer relationships
            </h2>
            
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              Intus One brings all your customer interactions, sales processes, and communication channels into a 
              single, unified platform. No more juggling between multiple tools—everything works together seamlessly.
            </p>

            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Seamless Integration</p>
                  <p className="text-slate-600 text-sm">All modules work together in perfect harmony</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Real-time Updates</p>
                  <p className="text-slate-600 text-sm">Stay informed with instant notifications and live data</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Scalable Architecture</p>
                  <p className="text-slate-600 text-sm">Grows with your business, from startup to enterprise</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right modules grid */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {modules.map((module, index) => (
                <div
                  key={module.name}
                  className="group relative bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-lg hover:border-blue-200 transition-all duration-300"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${module.color} flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    <module.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-1">{module.name}</h3>
                  <p className="text-sm text-slate-500">{module.description}</p>
                </div>
              ))}
            </div>

            {/* Decorative element */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-100 rounded-full blur-3xl opacity-50 -z-10" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-100 rounded-full blur-3xl opacity-50 -z-10" />
          </div>

        </div>
      </div>
    </section>
  );
}
