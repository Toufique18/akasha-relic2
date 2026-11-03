"use client";

import React, { use, useState, useEffect } from "react";
import { notFound } from "next/navigation";
import { GalleryDetail } from "@/components/gallery-screen/GalleryDetail";
import { MemorialItem, FALLBACK_MEMORIALS } from "@/components/gallery-screen/memorial.types";
import Application from "@/components/home-screen/application/Application";
import Subscribe from "@/components/home-screen/subscribe/subscribe";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function GalleryDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const rawId = resolvedParams.id;
  const numId = parseInt(rawId, 10);

  // Local lookup fallback
  const initialItem =
    FALLBACK_MEMORIALS.find((i) => i.id === rawId || (!isNaN(numId) && i.numeric_id === numId)) ||
    FALLBACK_MEMORIALS[0];

  const [item, setItem] = useState<MemorialItem>(initialItem);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/memorials/${rawId}`);
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.memorial) {
            setItem(data.memorial);
          }
        }
      } catch (err) {
        console.warn("Using local fallback memorial item:", err);
      }
    };
    fetchDetail();
  }, [rawId]);

  return (
    <main className="w-full min-h-screen bg-[#020215] relative overflow-hidden pb-16">
      {/* Background Spiritual Aura */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[350px] left-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10">
        <GalleryDetail item={item} />
        <div className="mt-16">
          <Application />
          <Subscribe />
        </div>
      </div>
    </main>
  );
}