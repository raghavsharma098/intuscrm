import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { GlobalScale } from "@/components/landing/GlobalScale";
import { DeveloperExperience } from "@/components/landing/DeveloperExperience";
import { CustomerStories } from "@/components/landing/CustomerStories";
import { LowCodeOptions } from "@/components/landing/LowCodeOptions";
import { ReadyToStart } from "@/components/landing/ReadyToStart";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />
      <Hero />
      <Features />
      <GlobalScale />
      <DeveloperExperience />
      <CustomerStories />
      <LowCodeOptions />
      <ReadyToStart />
      <Footer />
    </div>
  );
}
