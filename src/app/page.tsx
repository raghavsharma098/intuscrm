import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { LogoCloud } from "@/components/landing/LogoCloud";
import { GlobalScale } from "@/components/landing/GlobalScale";
import { Footer } from "@/components/landing/Footer";
import { ModularSolutions } from "@/components/landing/ModularSolutions";
import { FeatureShowcase } from "@/components/landing/FeatureShowcase";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />
      <Hero />
      <LogoCloud />
        <ModularSolutions />      <FeatureShowcase />        <Features />
      <GlobalScale />
      <Footer />
    </div>
  );
}
