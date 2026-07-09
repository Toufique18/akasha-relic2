"use client";

import { AboutHero } from "@/components/about-screen/AboutHero";
import { AboutVisionMission } from "@/components/about-screen/AboutVisionMission";
import { AboutWhyWeBuilt } from "@/components/about-screen/AboutWhyWeBuilt";



export default function AboutPage() { 
  return (
    <main className="w-full min-h-screen bg-[#040425]">
      <AboutHero/>
      <AboutWhyWeBuilt/>
      <AboutVisionMission/>
    </main>
  );
} 