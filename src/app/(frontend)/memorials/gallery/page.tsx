"use client";

import React, { useState, useEffect, useMemo } from "react";
import { GalleryHero } from "@/components/gallery-screen/GalleryHero";
import { GalleryFilters } from "@/components/gallery-screen/GalleryFilters";
import { GalleryGrid } from "@/components/gallery-screen/GalleryGrid";
import { CreateMemorialModal } from "@/components/gallery-screen/CreateMemorialModal";
import { MemorialItem, FALLBACK_MEMORIALS } from "@/components/gallery-screen/memorial.types";
import Application from "@/components/home-screen/application/Application";
import Subscribe from "@/components/home-screen/subscribe/subscribe";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export default function MemorialGalleryPage() {
  const [memorials, setMemorials] = useState<MemorialItem[]>(FALLBACK_MEMORIALS);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [sortBy, setSortBy] = useState("candles");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Fetch memorials from backend
  useEffect(() => {
    const fetchMemorials = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/memorials`);
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.memorials) && data.memorials.length > 0) {
            setMemorials(data.memorials);
          }
        }
      } catch (err) {
        console.warn("Using fallback local memorials data:", err);
      }
    };
    fetchMemorials();
  }, []);

  // Filter and sort items
  const filteredMemorials = useMemo(() => {
    return memorials
      .filter((item) => {
        // Tab filter
        if (activeTab === "family" && item.category !== "family") return false;
        if (activeTab === "ancestor" && item.category !== "ancestor") return false;
        if (activeTab === "with_voice" && !item.avatarVideoUrl) return false;

        // Search term filter
        if (searchTerm.trim()) {
          const query = searchTerm.toLowerCase();
          const matchName = item.name.toLowerCase().includes(query);
          const matchRel = (item.relation || "").toLowerCase().includes(query);
          const matchBio = (item.bio || "").toLowerCase().includes(query);
          const matchEpitaph = (item.epitaph || "").toLowerCase().includes(query);
          const matchPlace = (item.birthPlace || "").toLowerCase().includes(query);
          return matchName || matchRel || matchBio || matchEpitaph || matchPlace;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "candles") return b.candlesCount - a.candlesCount;
        if (sortBy === "name") return a.name.localeCompare(b.name);
        if (sortBy === "recent") {
          const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
          const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
          return dateB - dateA;
        }
        return 0;
      });
  }, [memorials, activeTab, searchTerm, sortBy]);

  const handleTributeSuccess = (memorialId: string, type: "candle" | "flower", newCount: number) => {
    setMemorials((prev) =>
      prev.map((m) => {
        if (m.id === memorialId) {
          return type === "candle"
            ? { ...m, candlesCount: newCount }
            : { ...m, flowersCount: newCount };
        }
        return m;
      })
    );
  };

  const handleMemorialCreated = (newMemorial: MemorialItem) => {
    setMemorials((prev) => [newMemorial, ...prev]);
  };

  return (
    <main className="w-full min-h-screen bg-[#020215] relative overflow-hidden pb-16">
      {/* Background Spiritual Auras */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[400px] right-0 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10">
        <GalleryHero onOpenCreateModal={() => setIsCreateModalOpen(true)} />

        <GalleryFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onOpenCreateModal={() => setIsCreateModalOpen(true)}
        />

        <GalleryGrid
          items={filteredMemorials}
          onTributeSuccess={handleTributeSuccess}
          onOpenCreateModal={() => setIsCreateModalOpen(true)}
        />

        <div className="mt-20">
          <Application />
          <Subscribe />
        </div>
      </div>

      <CreateMemorialModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onMemorialCreated={handleMemorialCreated}
      />
    </main>
  );
}