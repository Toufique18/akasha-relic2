"use client";

import { StoreHero } from "@/components/store-screen/StoreHero";
import { StoreFilters } from "@/components/store-screen/StoreFilters";
import { StoreGrid } from "@/components/store-screen/StoreGrid";
import Application from "@/components/home-screen/application/Application";
import Subscribe from "@/components/home-screen/subscribe/subscribe";
import { StoreWhyPreorder } from "@/components/store-screen/StoreWhyPreorder";

export default function StorePage() {
  return (
    <main className="w-full min-h-screen bg-[#040425] relative overflow-hidden">
      {/* Background purple aura glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[#7C4AED]/10 rounded-full blur-[120px] pointer-events-none" />

      <div >
        {/* Layout Sections */}
        <StoreHero />
        <StoreFilters />
        <StoreGrid />
        <StoreWhyPreorder />
        <Application />
        <Subscribe />
      </div>
    </main>
  );
}