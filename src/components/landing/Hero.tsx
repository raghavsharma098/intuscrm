import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import Image from "next/image";

export function Hero() {
  return (
    <div className="relative w-full bg-white overflow-hidden min-h-screen">
      {/* 
        STRIPE PASTEL GRADIENT WITH DIAGONAL SLANT
        Soft Lavender Left → Peachy Pink Center → Light Cyan Right
      */}
      <div className="absolute inset-0 w-full h-[640px] overflow-hidden">
        {/* Diagonal slant from bottom-left to top-right */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 100% 55%, 0 85%)',
            background:
              'radial-gradient(1200px 600px at -8% 8%, rgba(186,163,255,0.9) 0%, rgba(186,163,255,0) 60%),\
               radial-gradient(900px 500px at 62% 18%, rgba(255,164,211,0.9) 0%, rgba(255,164,211,0) 60%),\
               radial-gradient(900px 500px at 100% -5%, rgba(255,175,115,0.9) 0%, rgba(255,175,115,0) 55%),\
               radial-gradient(1000px 600px at 55% 70%, rgba(149,216,255,0.9) 0%, rgba(149,216,255,0) 60%),\
               linear-gradient(180deg, #d8c8ff 0%, #ffd2df 45%, #cef2ff 100%)'
          }}
        />
      </div>

      {/* CONTENT CONTAINER */}
      <div className="relative z-20 max-w-[1400px] ml-auto pl-8 pr-0 pt-24 pb-32">
        {/* Preview Badge */}
        <div className="mb-12">
          <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-sm font-semibold px-4 py-2 rounded-full">
            Preview
          </span>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-center">
          
          {/* LEFT: TEXT CONTENT */}
          <div className="lg:col-span-6 relative z-20">
            <h1 className="text-[72px] lg:text-[88px] font-[800] tracking-[-0.04em] leading-[0.95] mb-8">
              <span className="block text-[#0a2540]">Unified business</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#3245ff] to-[#48c9ff]">communications</span>
              <span className="block text-[#0a2540]">platform for</span>
              <span className="block text-[#0a2540]">enterprises</span>
            </h1>
            
            <p className="text-[17px] text-[#425466] leading-[1.6] max-w-[520px] font-normal mb-10 opacity-90">
              One dashboard to send messages, manage conversations, track leads, create invoices, and handle support. Connect with customers through SMS, WhatsApp, and Email—all from a single platform built for business growth.
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              <Link 
                href="/dashboard" 
                className="bg-[#0a2540] hover:bg-[#1a365d] text-white font-semibold rounded-full px-7 py-3 transition-all flex items-center gap-2 group text-[15px] shadow-lg"
              >
                Start now
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link 
                href="#" 
                className="text-[#0a2540] font-semibold hover:text-[#425466] transition-colors flex items-center gap-2 group text-[15px]"
              >
                Contact sales
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

        </div>
        {/* ABSOLUTE HERO IMAGE ANCHORED TO VIEWPORT RIGHT */}
        <div className="pointer-events-none hidden lg:block absolute right-0 top-24 h-[650px] w-[min(52vw,980px)] z-10">
          <Image
            src="/images/herocomp.png"
            alt="Intus One Dashboard and Communications Interface"
            fill
            className="object-contain object-right"
            priority
          />
        </div>
      </div>
    </div>
  );
}
