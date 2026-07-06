"use client";

import { GalleryHero } from "@/components/gallery-screen/GalleryHero";
import { GalleryFilters } from "@/components/gallery-screen/GalleryFilters";
import { GalleryGrid } from "@/components/gallery-screen/GalleryGrid";
import Application from "@/components/home-screen/application/Application";
import Subscribe from "@/components/home-screen/subscribe/subscribe";

export default function MemorialGalleryPage() {
  return (
    <main className="w-full min-h-screen bg-[#020215] relative overflow-hidden">
      {/* Background Aura */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[#7C4AED]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10">
        <GalleryHero />
        <GalleryFilters />
        <GalleryGrid />
        <Application />
        <Subscribe />
      </div>
    </main>
  );
}