import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function FeatureShowcase() {
  return (
    <section className="relative overflow-visible bg-white">
      {/* Main content */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-32">
        <div className="flex flex-col gap-20">
          
          {/* Text section */}
          <div className="relative">
            {/* Tag */}
            <p className="text-sm font-semibold text-indigo-600 mb-6">Unified platform</p>

            {/* Heading */}
            <h2 className="text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-slate-900 mb-8">
              A fully integrated<br />suite of financial<br />and payments<br />products
            </h2>

            {/* Body Text Grid - 2 columns */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 max-w-5xl">
              {/* Left Column */}
              <div className="space-y-6">
                <p className="text-base text-slate-600 leading-relaxed">
                  We bring together everything that's required to build websites and apps that accept payments and send payouts globally. Stripe's products power payments for{" "}
                  <Link href="#" className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors">
                    for online and in-person retailers
                  </Link>
                  ,{" "}
                  <Link href="#" className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors">
                    subscriptions businesses
                  </Link>
                  ,{" "}
                  <Link href="#" className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors">
                    software platforms and marketplaces
                  </Link>
                  , and everything in between.
                </p>

                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-full transition-all text-sm group"
                >
                  Start with payments
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Right Column */}
              <div>
                <p className="text-base text-slate-600 leading-relaxed">
                  We also help companies{" "}
                  <Link href="#" className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors">
                    beat fraud
                  </Link>
                  ,{" "}
                  <Link href="#" className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors">
                    send invoices
                  </Link>
                  ,{" "}
                  <Link href="#" className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors">
                    issue virtual and physical cards
                  </Link>
                  ,{" "}
                  <Link href="#" className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors">
                    reduce friction at checkout
                  </Link>
                  ,{" "}
                  <Link href="#" className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors">
                    get financing
                  </Link>
                  ,{" "}
                  <Link href="#" className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors">
                    manage business spend
                  </Link>
                  , and much more.
                </p>
              </div>
            </div>
          </div>

          {/* Images section - showcase cards */}
          <div className="relative w-full pt-12 mx-auto px-4">
            <div className="relative mx-auto max-w-7xl px-6 lg:px-8 h-[650px]">
              
              {/* Card 1 - Commutifi (top left) */}
              <div className="absolute left-10 -top-12 w-100 z-40">
                <Image
                  src="/images/card1.png"
                  alt="Commutifi card"
                  width={320}
                  height={280}
                  className="w-full h-auto"
                />
              </div>

              {/* Card 2 - Invoice (center) */}
              <div className="absolute right-78 -top-26 w-110 z-50">
                <Image
                  src="/images/card2.png"
                  alt="Invoice"
                  width={360}
                  height={300}
                  className="w-full h-auto"
                />
              </div>

              {/* Card 3 - Phone (top right) */}
              <div className="absolute right-16 -top-32 w-64 z-30">
                <Image
                  src="/images/card3.png"
                  alt="Phone terminal"
                  width={280}
                  height={400}
                  className="w-full h-auto"
                />
              </div>

              {/* Card 4 - Magazine (bottom left) */}
              <div className="absolute left-0 w-84 z-30 top-58">
                <Image
                  src="/images/card4.png"
                  alt="Increment magazine"
                  width={300}
                  height={380}
                  className="w-full h-auto"
                />
              </div>

              {/* Card 5 - Fraud & risk (bottom right) */}
              <div className="absolute right-0 top-48 w-full max-w-4xl z-40">
                <Image
                  src="/images/card5.png"
                  alt="Fraud and risk dashboard"
                  width={1440}
                  height={840}
                  className="w-full h-auto"
                />
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Wavy divider - dark section */}
      <div className="relative mt-20 lg:mt-32">
        <svg
          className="w-full h-24 lg:h-32"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path
            d="M 0,40 Q 360,100 720,40 T 1440,40 L 1440,120 L 0,120 Z"
            fill="#1e293b"
          />
        </svg>
      </div>

      {/* Dark section */}
      <div className="bg-slate-800 py-20" />
    </section>
  );
}
