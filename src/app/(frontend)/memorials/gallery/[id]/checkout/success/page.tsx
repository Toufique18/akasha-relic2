"use client";

import { GallerySuccess } from "@/components/gallery-screen/GallerySuccess";

export default function GallerySuccessPage() {
  return (
    <main className="w-full min-h-screen bg-[#020215] relative overflow-hidden">
      {/* Background Aura - Centered */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#7C4AED]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10">
        {/* 
           You can pass dynamic props here later if needed. 
           e.g., <GallerySuccess orderId="#1234" totalPrice="$99.00" />
        */}
        <GallerySuccess 
          orderId="#ORD-254781" 
          date="19-05-2026 06:01 PM" 
          productName="Butterfly Transformation" 
          totalPrice="$141.97"
        />
      </div>
    </main>
  );
}