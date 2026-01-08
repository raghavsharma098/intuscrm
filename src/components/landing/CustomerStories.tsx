"use client";

import { useState } from "react";
import { ArrowRight, FileText } from "lucide-react";

type CompanyKey = 'amazon' | 'bmw' | 'maersk' | 'twilio' | 'shopify' | 'salesforce' | 'google' | 'slack';

interface CompanyData {
  stats: {
    value: string;
    label: string;
  }[];
  products: {
    name: string;
    icon: React.ReactNode; 
  }[];
  cardData: {
    logo: React.ReactNode;
    text: string;
    bgColor: string;
    logoColor?: string; // Color for the logo in the bottom bar when active
    imageOverlay?: string;
  };
}

// Simple Logo Components
const LogoAmazon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 30" className={className} fill="currentColor">
    <path d="M68.6 10.3c-2.3 0-4.3.7-5.9 2.1l-.2-1.7h-4.6v14.7h4.9v-7.6c0-2.3 1.2-3.6 3.2-3.6 1.8 0 2.8 1.1 2.8 3v8.2h4.9v-9c0-3.6-2-6.1-5.1-6.1zm-32.9.2c-4.8 0-8.2 3.1-8.2 7.7s3.3 7.8 8.1 7.8c3 0 5.4-1.3 6.9-3.4l.2 2.9h4.4v-15h-4.9v2.1c-1.4-1.3-3.6-2.1-6.5-2.1zm.3 11.5c-2.3 0-4-1.7-4-4s1.7-4 4-4c2.3 0 4.1 1.7 4.1 4-0.1 2.3-1.8 4-4.1 4zm44.2-11.7c-2.3 0-4.3.7-5.9 2.1l-.2-1.7h-4.6v14.7h4.9v-7.6c0-2.3 1.2-3.6 3.2-3.6 1.8 0 2.8 1.1 2.8 3v8.2h4.9v-9c0-3.6-2-6.1-5.1-6.1zm-15.6 11.6c-1.2 1.4-3.1 2.1-5.1 2.6-.5.1-1.1.2-1.6.2-3.6 0-5.7-1.9-5.7-4.4 0-1.8 1.1-3.2 2.8-3.9 1.4-.6 3.2-.8 4.9-.8h4.6v6.3zm0-3.4h-4.2c-2.5 0-3.5.9-3.5 2 0 1 .8 1.6 2.1 1.6.5 0 .9-.1 1.4-.2 2.5-.5 4.3-2 4.3-5.3v1.9zm1.1-12h-4.9v3.3h-3.4v3.8h3.4v6c0 3.3 1.7 4.8 4.9 4.8h3.3v-3.7l-1.9-.1c-1.3-.1-1.5-.6-1.5-1.5v-5.6h3.4v-3.8h-3.4v-3.2zm-46.3 3.6h-4.9v11.4h4.9v-11.4zm-2.4-5.6c-1.6 0-2.9 1.2-2.9 2.7s1.3 2.7 2.9 2.7 2.9-1.2 2.9-2.7c0-1.6-1.3-2.7-2.9-2.7z" />
    <path d="M98.6 24.3c-2.7.4-5.2-.2-6.5-.5-1.8-.4-3.1-1.4-3.1-1.4l-.8 1.1s1.3 1.2 3.6 1.7c1.7.4 4.8.9 7.8-.1 1.2-.4 1.7-.8 1.7-.8l-2.7-2.2-.2 1.9c.1 0 .6.2 1.2.3.6.1 1.1.2 1.6.2 0 0-1 .4-2.6-.2z" />
  </svg>
);

const LogoBMW = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 40 40" className={className} fill="currentColor">
    <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2" fill="none" />
    <path d="M20 2v18h18A18 18 0 0 0 20 2z" fill="currentColor" opacity="0.8" />
    <path d="M20 38v-18H2A18 18 0 0 0 20 38z" fill="currentColor" opacity="0.8" />
  </svg>
);

const LogoMaersk = ({ className = "" }: { className?: string }) => (
   <svg viewBox="0 0 150 40" className={className} fill="currentColor">
      <path d="M4 20l16-16 16 16h-10v16h-12v-16h-10z" fill="currentColor" />
      <path d="M15 15l5-5 5 5v10l-5 5-5-5v-10z" fill="#fff" />
      <text x="45" y="28" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="bold" fontSize="22" fill="currentColor" letterSpacing="1">MAERSK</text>
   </svg>
);

const LogoTwilio = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 120 40" className={className} fill="currentColor">
    <g transform="translate(0, 0)">
        <circle cx="20" cy="20" r="5" />
        <circle cx="10" cy="20" r="4" opacity="0.7" />
        <circle cx="30" cy="20" r="4" opacity="0.7" />
        <circle cx="20" cy="10" r="4" opacity="0.7" />
        <circle cx="20" cy="30" r="4" opacity="0.7" />
    </g>
    <text x="45" y="27" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="bold" fontSize="22" fill="currentColor" letterSpacing="-0.5">twilio</text>
  </svg>
);

const LogoShopify = ({ className = "" }: { className?: string }) => (
    <svg viewBox="0 0 120 34" className={className} fill="currentColor">
        <path d="M21.9 10.3l-2.7-5.5c-0.2-0.4-0.6-0.6-1-0.5l-9.9 1.7c-0.4 0.1-0.8 0.4-0.8 0.8l-1.5 5.8c-0.3 1.2 0.3 2.5 1.5 2.8 1.2 0.3 2.5-0.3 2.8-1.5l0.7-2.6 4.7-0.8 1.4 2.8c-1.3 2.4-1.2 5.4 0.6 7.6l2.9 3.5c1.4 1.7 3.8 2.2 5.8 1.2 3.1-1.5 3.9-5.5 1.7-8.1l-6.2-7.2zM8.3 19.3c-1.5 0-2.8-1.2-2.8-2.8 0-1.5 1.2-2.8 2.8-2.8 1.5 0 2.8 1.2 2.8 2.8 0 1.5-1.2 2.8-2.8 2.8z" />
        <path d="M50.5 20.8c-1.2-0.6-1.7-2-1.2-3.2 0.3-0.6 0.8-1 1.4-1.1 0.6-0.1 1.2 0.2 1.7 0.7 0.9 1 2.3 1.5 3.7 1.2 0.8-0.2 1.4-0.8 1.5-1.6 0.1-0.6-0.1-1.2-0.6-1.6l-3.2-2.3c-1.8-1.3-2.6-3.6-2.1-5.7 0.6-2.5 2.7-4.3 5.3-4.5 2.2-0.2 4.4 0.7 5.8 2.4 0.8 1 0.7 2.5-0.3 3.3-1 0.8-2.5 0.7-3.3-0.3-0.6-0.7-1.4-1-2.3-0.9-0.8 0.1-1.5 0.7-1.6 1.5-0.1 0.4 0.1 0.8 0.4 1.1l3.3 2.3c3.1 2.3 3.9 6.5 1.9 9.7-1.6 2.5-4.4 3.7-7.2 3.2-2.6-0.5-4.8-2.1-5.9-4.5h2.7z" />
        <path d="M72.2 7.1h3.6v4h-3.6v-4zM72.2 13.9h3.6v12.4h-3.6v-12.4z" />
        <path d="M83.4 13.6c2.8-0.2 5.3 1.8 5.6 4.5v8.2h-3.6v-7.8c-0.1-1.3-1.1-2.2-2.4-2.1-1.3 0.1-2.2 1.2-2.1 2.5v7.5h-3.6v-12.4h3.6v1.4c1-1.4 2.6-2 4.1-1.8z" />
        <path d="M99.6 13.6c3.4 0 6.1 2.7 6.1 6.1s-2.7 6.1-6.1 6.1-6.1-2.7-6.1-6.1 2.7-6.1 6.1-6.1zM99.6 17c-1.5 0-2.7 1.2-2.7 2.7s1.2 2.7 2.7 2.7 2.7-1.2 2.7-2.7-1.2-2.7-2.7-2.7z" />
        <path d="M112.5 13.9v1.4c0.8-1.1 2.1-1.8 3.5-1.7 1.2 0.1 2.4 0.7 3.1 1.7v-1.4h3.6v12.4h-3.6v-1.4c-0.7 1-1.9 1.6-3.1 1.7-1.4 0.1-2.8-0.6-3.5-1.7v5.2h-3.6v-16.2h3.6zM116.3 17c-1.5 0-2.7 1.2-2.7 2.7s1.2 2.7 2.7 2.7 2.7-1.2 2.7-2.7-1.2-2.7-2.7-2.7z" />
    </svg>
);

const LogoSalesforce = ({ className = "" }: { className?: string }) => (
    <svg viewBox="0 0 140 60" className={className} fill="currentColor">
       {/* Shift unique cloud path left to make room for text */}
       <g transform="translate(-20, 5) scale(0.9)">
          <path d="M50 8c-6 0-11 3-14 8 -2 0-3-1-5-1 -7 0-12 5-12 12 0 1 0 2 0 3 -4 2-7 6-7 10 0 7 5 12 12 12h52c7 0 12-5 12-12 0-5-3-9-8-11 0-1 0-2 0-3 0-10-8-18-18-18 -5 0-9 2-12 6 -3-4-7-6-12-6z" />
       </g>
       {/* Text next to the cloud */}
       <text x="60" y="38" fontSize="20" fontWeight="bold" fontFamily="system-ui, -apple-system, sans-serif" fill="currentColor">salesforce</text>
    </svg>
);

const LogoSlack = ({ className = "" }: { className?: string }) => (
    <svg viewBox="0 0 100 40" className={className} >
         <g transform="translate(0, 0)">
            <path d="M10 17.5a2.5 2.5 0 0 1 2.5-2.5h2.5v2.5a2.5 2.5 0 1 1-5 0z" fill="#36C5F0"/>
            <path d="M15 15v-2.5a2.5 2.5 0 1 1 5 0v2.5a2.5 2.5 0 0 1-5 0z" fill="#2EB67D"/>
            <path d="M22.5 10a2.5 2.5 0 0 1 2.5 2.5v2.5h-2.5a2.5 2.5 0 1 1 0-5z" fill="#ECB22E"/>
            <path d="M25 15h2.5a2.5 2.5 0 1 1 0 5h-2.5a2.5 2.5 0 0 1 0-5z" fill="#E01E5A"/>
            <path d="M10 25h2.5a2.5 2.5 0 1 0 0-5h-2.5a2.5 2.5 0 0 0 0 5z" fill="#2EB67D"/>
            <path d="M15 25v2.5a2.5 2.5 0 1 0 5 0v-2.5a2.5 2.5 0 0 0-5 0z" fill="#36C5F0"/>
            <path d="M25 22.5 a2.5 2.5 0 0 0-2.5 2.5v2.5h2.5a2.5 2.5 0 1 0 0-5z" fill="#E01E5A"/>
            <path d="M22.5 25H25a2.5 2.5 0 1 1 0-5H22.5a2.5 2.5 0 0 1 0 5z" fill="#ECB22E"/>
         </g>
         <text x="36" y="27" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="bold" fontSize="22" fill="currentColor">slack</text>
    </svg>
);

const LogoGoogle = ({ className = "" }: { className?: string }) => (
    <svg viewBox="0 0 110 40" className={className} fill="currentColor">
         <path d="M30 20.3c0-0.7-0.1-1.5-0.2-2.2h-9.5v4.2h5.4c-0.2 1.3-1 2.4-2 3.1v2.6h3.2c1.9-1.8 3-4.4 3-7.7z" fill="#4285F4"/>
         <path d="M20.3 30.2c2.7 0 5-0.9 6.7-2.4l-3.2-2.6c-0.9 0.6-2.1 1-3.5 1-2.6 0-4.8-1.8-5.6-4.2h-3.4v2.7c1.7 3.3 5.1 5.5 9 5.5z" fill="#34A853"/>
         <path d="M14.7 22c-0.2-0.6-0.3-1.3-0.3-2s0.1-1.4 0.3-2v-2.7h-3.4c-0.7 1.4-1.1 2.9-1.1 4.7s0.4 3.3 1.1 4.7l3.4-2.7z" fill="#FBBC05"/>
         <path d="M20.3 14c1.5 0 2.8 0.5 3.8 1.5l2.9-2.9C25.3 11 23 10 20.3 10c-3.9 0-7.3 2.2-9 5.5l3.4 2.7c0.8-2.4 3-4.2 5.6-4.2z" fill="#EA4335"/>
         <text x="40" y="27" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="500" fontSize="22" fill="currentColor" letterSpacing="-0.5">Google</text>
    </svg>
);

// Product Icons
const IconPayments = () => (
  <div className="flex items-center gap-2 font-semibold">
    <div className="w-5 h-5 bg-[#635bff] rounded flex items-center justify-center text-white text-xs">P</div>
    <span>Payments</span>
  </div>
);
const IconConnect = () => (
  <div className="flex items-center gap-2 font-semibold">
    <div className="w-5 h-5 bg-[#00d4ff] rounded flex items-center justify-center text-white text-xs">C</div>
    <span>Connect</span>
  </div>
);
const IconBilling = () => (
  <div className="flex items-center gap-2 font-semibold">
    <div className="w-5 h-5 bg-[#00a255] rounded flex items-center justify-center text-white text-xs">B</div>
    <span>Billing</span>
  </div>
);

const IconTerminal = () => (
    <div className="flex items-center gap-2 font-semibold">
      <div className="w-5 h-5 bg-[#32325d] rounded flex items-center justify-center text-white text-xs">T</div>
      <span>Terminal</span>
    </div>
  );

const IconSigma = () => (
    <div className="flex items-center gap-2 font-semibold">
      <div className="w-5 h-5 bg-[#8d54d9] rounded flex items-center justify-center text-white text-xs">Ʃ</div>
      <span>Stripe Sigma</span>
    </div>
);

const COMPANY_DATA: Record<CompanyKey, CompanyData> = {
  amazon: {
    stats: [
      { 
        value: "5+", 
        label: "Amazon businesses on Stripe including Prime, Audible, and Amazon Pay." 
      },
      { 
        value: "50+", 
        label: "Payment methods available on Stripe" 
      }
    ],
    products: [
      { name: "Payments", icon: <IconPayments /> },
      { name: "Connect", icon: <IconConnect /> }
    ],
    cardData: {
      logo: <LogoAmazon className="h-6 text-white w-auto" />,
      text: "See how Amazon simplified cross-border payments with Stripe",
      bgColor: "bg-[#e3a034]",
      logoColor: "text-[#e3a034]",
      imageOverlay: "linear-gradient(135deg, rgba(227,160,52,0.9) 0%, rgba(200,140,40,0.8) 100%)"
    }
  },
  bmw: {
    stats: [
      { 
        value: "Millions", 
        label: "BMW owners using ConnectedDrive Store" 
      },
      { 
        value: "350+", 
        label: "US dealerships" 
      }
    ],
    products: [
        { name: "Payments", icon: <IconPayments /> },
        { name: "Connect", icon: <IconConnect /> }
    ],
    cardData: {
        logo: <LogoBMW className="h-8 text-white w-auto" />,
        text: "Learn why BMW chose Stripe to power e-commerce and payments",
        bgColor: "bg-[#425466]",
        logoColor: "text-[#425466]",
        imageOverlay: "linear-gradient(135deg, #2c3e50 0%, #4ca1af 100%)"
      }
  },
  maersk: {
    stats: [
       { 
         value: "130", 
         label: "Countries in logistics network" 
       },
       { 
         value: "$10+", 
         label: "Billion worth of goods moved around the world each year" 
       }
     ],
     products: [
       { name: "Payments", icon: <IconPayments /> },
       { name: "Connect", icon: <IconConnect /> }
     ],
     cardData: {
        logo: <LogoMaersk className="h-8 text-white w-auto" />,
        text: "See how Maersk tapped into new technology to make it easier to ship around the world",
        bgColor: "bg-[#32c5ff]",
        logoColor: "text-[#32c5ff]",
        imageOverlay: "linear-gradient(135deg, #00b4db 0%, #0083b0 100%)"
      }
  },
  twilio: {
    stats: [
       { 
         value: "99.9%", 
         label: "API reliability for millions of developers." 
       },
       { 
         value: "+5.5%", 
         label: "Uplift from Stripe's Global Payments Infrastructure" 
       },
       { 
         value: "+1%", 
         label: "Uplift from Adaptive Acceptance" 
       }
     ],
     products: [
       { name: "Payments", icon: <IconPayments /> },
       { name: "Stripe Sigma", icon: <IconSigma /> }
     ],
     cardData: {
        logo: <LogoTwilio className="h-8 text-white w-auto" />,
        text: "See how Twilio increased authorisation rates by 10% with Stripe",
        bgColor: "bg-[#f22f46]",
        logoColor: "text-[#f22f46]",
        imageOverlay: "linear-gradient(135deg, #f22f46 0%, #d1273b 100%)"
      }
  },
  shopify: {
    stats: [
       { 
         value: "$100B+", 
         label: "Processed on Stripe annually" 
       },
       { 
         value: "Millions", 
         label: "Of businesses powered by Shopify" 
       }
     ],
     products: [
        { name: "Payments", icon: <IconPayments /> },
        { name: "Terminal", icon: <IconTerminal /> }
     ],
     cardData: {
        logo: <LogoShopify className="h-8 text-white w-auto" />,
        text: "Shopify simplifies business operations with Stripe",
        bgColor: "bg-[#95bf47]",
        logoColor: "text-[#95bf47]",
        imageOverlay: "linear-gradient(135deg, #95bf47 0%, #5e8e3e 100%)"
      }
  },
  salesforce: {
    stats: [
       { 
         value: "World's #1", 
         label: "CRM platform used by millions" 
       },
       { 
         value: "150K+", 
         label: "Customers trust Salesforce" 
       }
     ],
     products: [
        { name: "Connect", icon: <IconConnect /> },
        { name: "Billing", icon: <IconBilling /> }
     ],
     cardData: {
        logo: <LogoSalesforce className="h-10 text-white w-auto" />,
        text: "Salesforce Commerce Cloud builds on Stripe",
        bgColor: "bg-[#00a1e0]",
        logoColor: "text-[#00a1e0]",
        imageOverlay: "linear-gradient(135deg, #00a1e0 0%, #0070d2 100%)"
      }
  },
  google: {
      stats: [
         { 
           value: "Billions", 
           label: "Users across Google products" 
         },
         { 
           value: "Global", 
           label: "Payment acceptance network" 
         }
       ],
       products: [
          { name: "Payments", icon: <IconPayments /> }
       ],
       cardData: {
          logo: <LogoGoogle className="h-8 text-white w-auto" />,
          text: "Google partners with Stripe to grow global internet economy",
          bgColor: "bg-[#4285F4]",
          logoColor: "text-[#4285F4]",
          imageOverlay: "linear-gradient(135deg, #4285F4 0%, #34A853 100%)" // using Google colors
        }
    },
    slack: {
        stats: [
           { 
             value: "750k+", 
             label: "Companies use Slack" 
           },
           { 
             value: "99.99%", 
             label: "Uptime guarantee" 
           }
         ],
         products: [
            { name: "Billing", icon: <IconBilling /> }
         ],
         cardData: {
            logo: <LogoSlack className="h-8 text-white w-auto" />,
            text: "Slack uses Stripe to power enterprise billing",
            bgColor: "bg-[#4A154B]",
            logoColor: "text-[#4A154B]",
            imageOverlay: "linear-gradient(135deg, #4A154B 0%, #E01E5A 100%)"
          }
      },
};

export function CustomerStories() {
  const [active, setActive] = useState<CompanyKey>('amazon');
  const data = COMPANY_DATA[active];

  return (
    <section className="relative py-24 bg-white">
      <div className="max-w-[1080px] mx-auto px-4 sm:px-6">
        
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row gap-16 mb-20 min-h-[400px]">
          
          {/* Left: Stats & Products */}
          <div className="flex-1 py-4 flex flex-col justify-between">
            <div className="space-y-12">
              {data.stats.map((stat, idx) => (
                <div key={idx} className="border-l-[3px] border-[#635bff] pl-6 animate-fadeIn">
                  <div className="text-2xl font-bold text-[#0a2540] mb-2">{stat.value}</div>
                  <p className="text-[#425466] leading-relaxed max-w-sm">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <h5 className="text-[#0a2540] font-semibold text-sm mb-4">Products used</h5>
              <div className="flex flex-wrap gap-4">
                {data.products.map((p, idx) => (
                  <div key={idx} className="bg-[#f6f9fc] rounded-full px-4 py-2 text-sm text-[#0a2540]">
                    {p.icon}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Feature Card */}
          <div className="flex-[1.5] relative group cursor-pointer perspective-1000">
             <div 
               className={`w-full h-full min-h-[360px] rounded-lg shadow-xl overflow-hidden relative transition-all duration-500 ease-in-out hover:-translate-y-2 hover:shadow-2xl ${data.cardData.bgColor}`}
             >
                <div className="absolute inset-0" style={{ background: data.cardData.imageOverlay }}></div>
                
                {/* Decorative Circles Overlay */}
                <div className="absolute -right-20 -top-20 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl"></div>
                <div className="absolute -left-20 -bottom-20 w-60 h-60 bg-black opacity-10 rounded-full blur-2xl"></div>

                <div className="relative z-10 p-8 sm:p-12 h-full flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div className="opacity-90">{data.cardData.logo}</div>
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white">
                      <FileText size={20} />
                    </div>
                  </div>
                  
                  <div className="mt-auto">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-4 drop-shadow-sm">
                      {data.cardData.text}
                    </h3>
                    <div className="inline-flex items-center text-white font-medium group-hover:underline decoration-2 underline-offset-4">
                      Read story <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
             </div>
          </div>
        </div>

        {/* Bottom Section: Logo Tabs */}
        <div className="border-t border-slate-100 pt-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 gap-y-12">
            {(Object.keys(COMPANY_DATA) as CompanyKey[]).map((company) => (
              <button
                key={company}
                onClick={() => setActive(company)}
                className={`group flex items-center justify-center p-4 transition-all duration-300 rounded-lg ${
                  active === company ? "opacity-100 grayscale-0 ring-2 ring-[#635bff]/10 bg-[#f6f9fc]" : "opacity-40 grayscale hover:opacity-70 hover:grayscale-0"
                }`}
              >
                  {/* Reuse Logos but styled for the bar */}
                  <div className={`h-8 w-auto transition-colors flex items-center justify-center ${active === company ? (COMPANY_DATA[company].cardData.logoColor || 'text-[#0a2540]') : 'text-[#425466]'}`}>
                     {company === 'amazon' && <LogoAmazon />}
                     {company === 'bmw' && <LogoBMW />}
                     {company === 'maersk' && <LogoMaersk />}
                     {company === 'twilio' && <LogoTwilio />}
                     {company === 'shopify' && <LogoShopify />}
                     {company === 'salesforce' && <LogoSalesforce />}
                     {company === 'google' && <LogoGoogle />}
                     {company === 'slack' && <LogoSlack />}
                  </div>
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
