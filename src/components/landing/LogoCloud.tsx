"use client";

import Image from "next/image";

const logos = [
  { name: "OpenAI", url: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg" },
  { name: "Amazon", url: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
  { name: "Google", url: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { name: "Anthropic", url: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { name: "Marriott", url: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { name: "Shopify", url: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg" },
  { name: "Airbnb", url: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg" },
  { name: "URBN", url: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
];

export function LogoCloud() {
  return (
    <section className="relative bg-white">
      {/* top subtle divider */}
      <div className="absolute inset-x-0 top-0 h-px bg-slate-200/60"></div>

      <div className="mx-auto max-w-[1200px] px-6 lg:px-8 py-16 lg:py-20">
        {/* 4 columns with faint vertical separators on lg */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-14 sm:grid-cols-3 lg:grid-cols-4">
          {logos.map((logo, i) => (
            <div
              key={logo.name}
              className="relative flex items-center justify-center h-16 lg:h-20"
            >
              {/* vertical separator for lg screens except first col */}
              <div
                className="hidden lg:block absolute left-0 top-0 h-full w-px bg-slate-200/40"
                aria-hidden
                style={{ display: i % 4 === 0 ? "none" : undefined }}
              />

              <Image
                src={logo.url}
                alt={logo.name}
                width={150}
                height={50}
                className="object-contain opacity-90 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>

      {/* bottom subtle band like screenshot */}
      <div className="h-8 bg-slate-50/60"></div>
    </section>
  );
}
