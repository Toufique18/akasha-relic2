"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Heart, Sparkles, Video, Volume2, ChevronRight, User, Plus } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { MemorialItem } from "./memorial.types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

interface GalleryGridProps {
  items: MemorialItem[];
  onTributeSuccess?: (memorialId: string, type: "candle" | "flower", newCount: number) => void;
  onOpenCreateModal?: () => void;
}

export const GalleryGrid: React.FC<GalleryGridProps> = ({
  items,
  onTributeSuccess,
  onOpenCreateModal,
}) => {
  const [activeCandleAnim, setActiveCandleAnim] = useState<string | null>(null);
  const [activeFlowerAnim, setActiveFlowerAnim] = useState<string | null>(null);

  const handleQuickCandle = async (e: React.MouseEvent, memorial: MemorialItem) => {
    e.preventDefault();
    e.stopPropagation();

    setActiveCandleAnim(memorial.id);
    setTimeout(() => setActiveCandleAnim(null), 1200);

    const newCount = memorial.candlesCount + 1;
    if (onTributeSuccess) {
      onTributeSuccess(memorial.id, "candle", newCount);
    }
    toast.success(`Candle lit for ${memorial.name} 🕯️`);

    try {
      await fetch(`${API_BASE_URL}/memorials/${memorial.id}/tribute`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "candle" }),
      });
    } catch (err) {
      console.warn("Could not sync candle to cloud:", err);
    }
  };

  const handleQuickFlower = async (e: React.MouseEvent, memorial: MemorialItem) => {
    e.preventDefault();
    e.stopPropagation();

    setActiveFlowerAnim(memorial.id);
    setTimeout(() => setActiveFlowerAnim(null), 1200);

    const newCount = memorial.flowersCount + 1;
    if (onTributeSuccess) {
      onTributeSuccess(memorial.id, "flower", newCount);
    }
    toast.success(`White rose offered for ${memorial.name} 💐`);

    try {
      await fetch(`${API_BASE_URL}/memorials/${memorial.id}/tribute`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "flower" }),
      });
    } catch (err) {
      console.warn("Could not sync flower to cloud:", err);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 mx-auto flex items-center justify-center">
          <Flame className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-serif text-white">No Memorial Shrines Found</h3>
        <p className="text-sm text-gray-400">
          No memorials match your current search or filter. You can be the first to create one!
        </p>
        {onOpenCreateModal && (
          <button
            onClick={onOpenCreateModal}
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-black text-xs font-semibold rounded-xl inline-flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Create First Shrine
          </button>
        )}
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {items.map((item, index) => {
          const detailUrl = `/memorials/gallery/${item.numeric_id || item.id}`;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * index, duration: 0.5 }}
              className="group bg-[#111227] rounded-3xl overflow-hidden border border-white/10 hover:border-amber-500/40 transition-all duration-300 flex flex-col shadow-xl shadow-black/50 hover:shadow-amber-500/10"
            >
              {/* Image & Shrine Header */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#181938]">
                <img
                  src={item.photoUrl}
                  alt={item.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />

                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#111227] via-transparent to-black/40 pointer-events-none" />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
                  <div className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-medium text-amber-200 flex items-center gap-1.5 shadow-md">
                    <span>🕊️ In Eternal Peace</span>
                  </div>

                  {item.avatarVideoUrl && (
                    <div className="px-2.5 py-1 rounded-full bg-indigo-900/80 backdrop-blur-md border border-indigo-400/30 text-[10px] font-semibold text-indigo-200 flex items-center gap-1 shadow-md">
                      <Sparkles className="w-3 h-3 text-indigo-300 animate-spin" style={{ animationDuration: "4s" }} />
                      <span>3D Voice</span>
                    </div>
                  )}
                </div>

                {/* Floating flame animation on tribute */}
                <AnimatePresence>
                  {activeCandleAnim === item.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5, y: 20 }}
                      animate={{ opacity: 1, scale: 1.4, y: -40 }}
                      exit={{ opacity: 0, y: -80 }}
                      className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
                    >
                      <div className="px-4 py-2 rounded-2xl bg-amber-500/90 text-black text-xs font-bold flex items-center gap-2 shadow-2xl backdrop-blur-sm">
                        <Flame className="w-5 h-5 fill-current animate-bounce" />
                        <span>Candle Lit In Memory 🕯️</span>
                      </div>
                    </motion.div>
                  )}
                  {activeFlowerAnim === item.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5, y: 20 }}
                      animate={{ opacity: 1, scale: 1.4, y: -40 }}
                      exit={{ opacity: 0, y: -80 }}
                      className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
                    >
                      <div className="px-4 py-2 rounded-2xl bg-pink-500/90 text-white text-xs font-bold flex items-center gap-2 shadow-2xl backdrop-blur-sm">
                        <span>💐 White Rose Offered</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  {/* Lifespan & Place */}
                  <div className="flex items-center justify-between text-xs text-amber-400/90 mb-1.5 font-medium">
                    <span>
                      {item.birthDate || "Born"} — {item.deathDate || "Departed"}
                    </span>
                    {item.birthPlace && <span className="text-gray-400 text-[11px] truncate max-w-[130px]">{item.birthPlace}</span>}
                  </div>

                  {/* Name */}
                  <h3 className="text-xl font-serif text-white group-hover:text-amber-200 transition-colors mb-1 line-clamp-1">
                    {item.name}
                  </h3>

                  {/* Relationship */}
                  <p className="text-xs text-indigo-300 font-medium mb-3 line-clamp-1">
                    {item.relation}
                  </p>

                  {/* Epitaph Quote */}
                  <blockquote className="text-xs text-gray-300 italic border-l-2 border-amber-500/40 pl-3 py-0.5 mb-4 line-clamp-2">
                    &ldquo;{item.epitaph}&rdquo;
                  </blockquote>
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 border-t border-white/5 space-y-3">
                  {/* Tributes Counter & Quick Buttons */}
                  <div className="flex items-center justify-between gap-2">
                    <button
                      onClick={(e) => handleQuickCandle(e, item)}
                      title="Light a Candle in remembrance"
                      className="flex-1 py-2 px-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/25 border border-amber-500/20 text-amber-300 text-xs font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer group/btn"
                    >
                      <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400 group-hover/btn:scale-125 transition-transform" />
                      <span>{item.candlesCount}</span>
                    </button>

                    <button
                      onClick={(e) => handleQuickFlower(e, item)}
                      title="Offer a Flower in tribute"
                      className="flex-1 py-2 px-3 rounded-xl bg-pink-500/10 hover:bg-pink-500/25 border border-pink-500/20 text-pink-300 text-xs font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer group/btn"
                    >
                      <span className="text-sm group-hover/btn:scale-125 transition-transform">💐</span>
                      <span>{item.flowersCount}</span>
                    </button>

                    <Link
                      href={detailUrl}
                      className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/15 text-white text-xs font-medium flex items-center gap-1 transition-all"
                      title="Visit Full Memorial Sanctuary"
                    >
                      <span>Visit</span>
                      <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};