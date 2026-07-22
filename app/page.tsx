import { FeatureCards } from "@/components/FeatureCards";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { Interior } from "@/components/Interior";
import { Navbar } from "@/components/Navbar";
import { Performance } from "@/components/Performance";
import { Showcase } from "@/components/Showcase";
import { TestDriveCta } from "@/components/TestDriveCta";
import { UnitPricing } from "@/components/UnitPricing";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Showcase />
      <FeatureCards />
      <UnitPricing />
      <Performance />
      <Interior />
      <Gallery />
      <TestDriveCta />
      <Footer />
    </main>
  );
}
