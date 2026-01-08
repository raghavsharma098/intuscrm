"use client";

import { useState } from "react";
import { ArrowRight, FileText } from "lucide-react";
import Image from "next/image";

type CompanyKey = "amazon" | "maersk" | "twilio";

interface CompanyConfig {
  heroBg: string;
  heroOverlay: string;
  stats: { value: string; label: string }[];
  products: { name: string; bubble: string }[];
  headline: string;
  description: string;
  tag: string;
  cta: string;
  logoName: string;
  cardHeadline: string;
}

const COMPANY_DATA: Record<CompanyKey, CompanyConfig> = {
  amazon: {
    tag: "Enterprise reinvention",
    headline: "Bring agility to your enterprise",
    description:
      "Quickly build great payments experiences, improve performance, expand into new markets, and engage customers with subscriptions and marketplaces. Get expert integration guidance from our professional services team and certified partners, and connect Stripe to Salesforce, SAP, and more through the Stripe App Marketplace.",
    cta: "Explore Stripe for enterprises",
    logoName: "amazon",
    cardHeadline: "See how Amazon simplified cross-border payments with Stripe",
    stats: [
      { value: "5+", label: "Amazon businesses on Stripe including Prime, Audible, and Amazon Pay." },
      { value: "50+", label: "Payment methods available on Stripe" },
    ],
    products: [
      { name: "Payments", bubble: "bg-[#635bff]" },
      { name: "Connect", bubble: "bg-[#00d4ff]" },
    ],
    heroBg:
      "linear-gradient(180deg, rgba(227,160,52,0.82) 0%, rgba(227,160,52,0.82) 100%), url('https://images.unsplash.com/photo-1582719471137-c3967ffb1c34?auto=format&fit=crop&w=1600&q=80')",
    heroOverlay: "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.2) 100%)",
  },
  maersk: {
    tag: "Enterprise reinvention",
    headline: "Bring agility to your enterprise",
    description:
      "Quickly build great payments experiences, improve performance, expand into new markets, and engage customers with subscriptions and marketplaces. Get expert integration guidance from our professional services team and certified partners, and connect Stripe to Salesforce, SAP, and more through the Stripe App Marketplace.",
    cta: "Explore Stripe for enterprises",
    logoName: "MAERSK",
    cardHeadline: "See how Maersk tapped into new technology to make it easier to ship around the world",
    stats: [
      { value: "130", label: "Countries in logistics network" },
      { value: "$10+", label: "Billion worth of goods moved around the world each year" },
    ],
    products: [
      { name: "Payments", bubble: "bg-[#635bff]" },
      { name: "Connect", bubble: "bg-[#00d4ff]" },
    ],
    heroBg:
      "linear-gradient(180deg, rgba(14,165,233,0.68) 0%, rgba(14,165,233,0.68) 100%), url('https://images.unsplash.com/photo-1504274066651-8d31a536b11a?auto=format&fit=crop&w=1600&q=80')",
    heroOverlay: "linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.18) 100%)",
  },
  twilio: {
    tag: "Enterprise reinvention",
    headline: "Bring agility to your enterprise",
    description:
      "Quickly build great payments experiences, improve performance, expand into new markets, and engage customers with subscriptions and marketplaces. Get expert integration guidance from our professional services team and certified partners, and connect Stripe to Salesforce, SAP, and more through the Stripe App Marketplace.",
    cta: "Explore Stripe for enterprises",
    logoName: "twilio",
    cardHeadline: "See how Twilio powers global communications with secure payments",
    stats: [
      { value: "190+", label: "Countries supported by Twilio's platform" },
      { value: "Millions", label: "Developers building on Twilio" },
    ],
    products: [
      { name: "Payments", bubble: "bg-[#635bff]" },
      { name: "Billing", bubble: "bg-[#10b981]" },
    ],
    heroBg:
      "linear-gradient(180deg, rgba(242,47,70,0.76) 0%, rgba(242,47,70,0.76) 100%), url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1600&q=80')",
    heroOverlay: "linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.2) 100%)",
  },
};

const LOGO_URL = "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg";

export function CustomerStories() {
  const [active, setActive] = useState<CompanyKey>("maersk");
  const company = COMPANY_DATA[active];

  return (
    <section className="relative bg-white py-20">
      <style>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
      <div className="max-w-6xl mx-auto px-6">
        {/* Top section - full width */}
        <div className="max-w-3xl mb-20">
          <span className="text-sm font-semibold text-[#3245ff] uppercase tracking-wide">
            {company.tag}
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#0a2540] leading-tight mt-4 mb-6">
            {company.headline}
          </h2>
          <p className="text-[15px] text-[#425466] leading-8 mb-8">
            {company.description.split("professional services")[0]}
            <a className="text-[#3245ff] font-semibold ml-1" href="#">professional services</a>
            {" team and "}
            <a className="text-[#3245ff] font-semibold" href="#">certified partners</a>
            {", and connect Stripe to Salesforce, SAP, and more through the "}
            <a className="text-[#3245ff] font-semibold" href="#">Stripe App Marketplace</a>.
          </p>
          <button className="inline-flex items-center gap-2 bg-[#635bff] text-white px-6 py-3 rounded-full text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-200">
            {company.cta}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Stats and Card section - 2 column parallel */}
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-16 items-start mb-20">
          {/* Left column - Stats */}
          <div className="space-y-8 overflow-hidden">
            <div className="space-y-6 border-l-4 border-[#3245ff] pl-6 transition-all duration-500 ease-out"
              style={{
                animation: `slideInLeft 0.6s ease-out`,
              }}>
              {company.stats.map((stat) => (
                <div key={stat.value} className="space-y-2">
                  <div className="text-[28px] font-bold text-[#0a2540]">{stat.value}</div>
                  <p className="text-[#425466] text-sm leading-6">{stat.label}</p>
                </div>
              ))}
              <div className="space-y-3 pt-4">
                <p className="text-xs uppercase tracking-[0.08em] text-[#0a2540] font-bold">
                  Products used
                </p>
                <div className="flex flex-col gap-3">
                  {company.products.map((product) => (
                    <div key={product.name} className="flex items-center gap-3">
                      <span className={`w-2.5 h-2.5 rounded-full ${product.bubble}`} />
                      <span className="text-sm font-semibold text-[#0a2540]">{product.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Hero card */}
          <div className="space-y-6 flex flex-col overflow-hidden">
            <div
              className="relative rounded-2xl overflow-hidden shadow-2xl h-[350px] transition-all duration-700 ease-out"
              style={{
                backgroundImage: company.heroBg,
                backgroundSize: "cover",
                backgroundPosition: "center",
                animation: `slideInRight 0.6s ease-out`,
              }}
            >
              <div
                className="absolute inset-0"
                style={{ background: company.heroOverlay }}
              />
              <div className="relative p-8 flex flex-col justify-between h-full text-white">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2.5 bg-white/20 px-3.5 py-2 rounded-full backdrop-blur">
                    <div className="w-7 h-7 rounded-full bg-white/25 flex items-center justify-center">
                      <span className="text-base font-black">✶</span>
                    </div>
                    <span className="font-semibold text-sm">{company.logoName}</span>
                  </div>
                  <FileText className="w-6 h-6 opacity-95" />
                </div>
                <div className="text-white font-semibold text-2xl leading-snug max-w-lg drop-shadow">
                  {company.cardHeadline}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Logo row - centered below both columns */}
        <div className="flex justify-center">
          <div className="flex items-center justify-center gap-30 w-full max-w-4xl py-8 border-t border-slate-200">
            {([
                { key: "bmw" as const, name: "BMW", interactive: false },
                { key: "amazon" as const, name: "Amazon", interactive: true },
                { key: "maersk" as const, name: "Maersk", interactive: true },
                { key: "twilio" as const, name: "Twilio", interactive: true },
              ]).map((item) => (
                <button
                  key={item.key}
                  disabled={!item.interactive}
                  onClick={() => item.interactive && setActive(item.key as CompanyKey)}
                  className={`relative transition-all duration-300 hover:scale-110 ${
                    item.interactive
                      ? active === item.key
                        ? "opacity-100 scale-105"
                        : "opacity-50 hover:opacity-75"
                      : "opacity-30 cursor-not-allowed"
                  }`}
                >
                  <Image
                    src={LOGO_URL}
                    alt={item.name}
                    width={100}
                    height={40}
                    className="h-10 w-auto object-contain"
                  />
                  {item.interactive && active === item.key && (
                    <div className="absolute -bottom-3 left-0 right-0 h-0.5 bg-[#3245ff] rounded-full" />
                  )}
                </button>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
