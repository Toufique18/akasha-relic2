"use client";

import { notFound } from "next/navigation";
import { GalleryCheckout } from "@/components/gallery-screen/GalleryCheckout";

// Import gallery assets (Same as your GalleryGrid)
import g1 from "@/assets/gallery/g1.png";
import g2 from "@/assets/gallery/g2.png";
import g3 from "@/assets/gallery/g3.png";
import g4 from "@/assets/gallery/g4.png";
import g5 from "@/assets/gallery/g5.png";
import g6 from "@/assets/gallery/g6.png";

const galleryItems = [
  { id: 1, title: "Eternal Grace", price: "$99.00", likes: 142, image: g1 },
  { id: 2, title: "Golden Memories", price: "$149.00", likes: 98, image: g2 },
  { id: 3, title: "Serenity Aura", price: "$199.00", likes: 215, image: g3 },
  { id: 4, title: "Peaceful Passage", price: "$129.00", likes: 87, image: g4 },
  { id: 5, title: "Whispering Pines", price: "$89.00", likes: 164, image: g5 },
  { id: 6, title: "Sacred Horizon", price: "$179.00", likes: 112, image: g6 },
  { id: 7, title: "Loving Remembrance", price: "$99.00", likes: 130, image: g1 },
  { id: 8, title: "Wings of Peace", price: "$149.00", likes: 76, image: g2 },
  { id: 9, title: "Starlight Pathway", price: "$199.00", likes: 245, image: g3 },
  { id: 10, title: "Silent Meadow", price: "$129.00", likes: 93, image: g4 },
  { id: 11, title: "Heavenly Glow", price: "$89.00", likes: 180, image: g5 },
  { id: 12, title: "Infinite Sky", price: "$179.00", likes: 105, image: g6 },
];

import { use } from "react";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function GalleryCheckoutPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const itemId = parseInt(resolvedParams.id, 10);
  const item = galleryItems.find((i) => i.id === itemId);

  if (!item) {
    notFound();
  }

  return (
    <main className="w-full min-h-screen bg-[#020215] relative overflow-hidden">
      {/* Background Aura */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#7C4AED]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10">
        <GalleryCheckout item={item} />
      </div>
    </main>
  );
}