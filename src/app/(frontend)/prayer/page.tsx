"use client";

import Application from "@/components/home-screen/application/Application";
import { PrayerHero } from "@/components/prayer-screen/PrayerHero";
import { PrayerRequests } from "@/components/prayer-screen/PrayerRequests";
import { QuoteSection } from "@/components/prayer-screen/QuoteSection";

export default function PrayerPage() { 
  return (
    <main className="w-full min-h-screen bg-[#040425]">
      <PrayerHero />
      <PrayerRequests />
      <Application />
      <QuoteSection />
    </main>
  );
} 