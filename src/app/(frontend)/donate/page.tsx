"use client";

import { DonateHero } from "@/components/donate-screen/DonateHero";
import Application from "@/components/home-screen/application/Application";
import Subscribe from "@/components/home-screen/subscribe/subscribe";

export default function DonatePage() {
  return (
    <main className="w-full min-h-screen bg-[#020215]">
      <DonateHero />

      <Application />
      <Subscribe />
      
      {/* You can add more sections here later, such as:
          - <DonateImpactStats />
          - <DonateTiers /> 
          - <DonateFAQ />
      */}
    </main>
  );
}