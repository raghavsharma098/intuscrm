"use client";

import { CheckCircle2, BarChart3, MessageSquare, Users, Phone, Zap } from "lucide-react";
import Link from "next/link";

export function ModularSolutions() {
  const modules = [
    {
      icon: BarChart3,
      label: "Dashboard",
      description: "Real-time insights and analytics",
    },
    {
      icon: MessageSquare,
      label: "Unified Inbox",
      description: "Centralized communication hub",
    },
    {
      icon: Users,
      label: "Lead Management",
      description: "Track and nurture leads",
    },
    {
      icon: Zap,
      label: "Sales Pipeline",
      description: "Streamline sales workflows",
    },
    {
      icon: Phone,
      label: "Voice & OTP",
      description: "SMS and voice automation",
    },
    {
      icon: BarChart3,
      label: "Analytics",
      description: "Deep insights into your data",
    },
  ];

  const benefits = [
    "Unified customer view",
    "Automated workflows",
    "Real-time collaboration",
    "Advanced analytics",
  ];

  return (
    <section className="relative overflow-hidden bg-white py-20 lg:py-32">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-100/50 to-purple-100/50 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-100/50 to-cyan-100/50 rounded-full blur-3xl -z-10" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left column - Text */}
          <div className="relative pt-4">
            <p className="text-sm font-semibold text-indigo-600 mb-4">All-in-One Platform</p>

            <h2 className="text-4xl lg:text-5xl font-bold leading-tight text-slate-900 mb-8">
              Everything you need to manage relationships
            </h2>

            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              Intus One CRM brings together all the tools your team needs to manage customers, close deals, and drive growth. No more switching between apps.
            </p>

            {/* Benefits list */}
            <div className="space-y-4 mb-10">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                  <span className="text-slate-700 font-medium">{benefit}</span>
                </div>
              ))}
            </div>

            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-full transition-all"
            >
              Explore all modules
              <span className="text-lg">→</span>
            </Link>
          </div>

          {/* Right column - Grid of modules */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {modules.map((module) => {
              const Icon = module.icon;
              return (
                <div
                  key={module.label}
                  className="group relative p-6 bg-slate-50 rounded-2xl border border-slate-200 hover:border-indigo-300 transition-all hover:shadow-lg hover:-translate-y-1"
                >
                  {/* Icon badge */}
                  <div className="mb-4 w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center group-hover:from-indigo-600 group-hover:to-purple-600 transition-all">
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {module.label}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {module.description}
                  </p>

                  {/* Hover accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-2xl -z-10 group-hover:from-indigo-500/20 group-hover:to-purple-500/20 transition-all" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
