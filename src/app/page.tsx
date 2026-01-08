import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { LogoCloud } from "@/components/landing/LogoCloud";
import { ModularSolutions } from "@/components/landing/ModularSolutions";
import { DeveloperExperience } from "@/components/landing/DeveloperExperience";
import { CustomerStories } from "@/components/landing/CustomerStories";
import { LowCodeOptions } from "@/components/landing/LowCodeOptions";
import { ReadyToStart } from "@/components/landing/ReadyToStart";
import { Footer } from "@/components/landing/Footer";
import { FeatureShowcase } from "@/components/landing/FeatureShowcase";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />
      <Hero />
      <LogoCloud />
      <ModularSolutions />
      <FeatureShowcase />
      <DeveloperExperience />
      <CustomerStories />
      <LowCodeOptions />
      <ReadyToStart />
      <Footer />
    </div>
  );
}
