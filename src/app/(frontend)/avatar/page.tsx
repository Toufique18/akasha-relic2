"use client";

import { AvatarSelection } from "@/components/avatar-screen/AvatarSelection";

export default function AvatarPage() {
  return (
    <main className="w-full min-h-screen bg-[#020215] relative overflow-hidden">
      {/* Background Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-[#7C4AED]/10 rounded-full blur-[120px] pointer-events-none" />

      <AvatarSelection />
    </main>
  );
}