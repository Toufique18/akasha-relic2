"use client";

import React from "react";
import { motion } from "framer-motion";
import { Flame, Sparkles, Plus, Trees, Heart } from "lucide-react";
import Link from "next/link";

interface GalleryHeroProps {
  onOpenCreateModal?: () => void;
}

export const GalleryHero: React.FC<GalleryHeroProps> = ({ onOpenCreateModal }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-8 sm:mb-12 px-4 sm:px-0 pt-6"
    >
      {/* Sacred pill badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-medium mb-4 backdrop-blur-md">
        <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400 animate-pulse" />
        <span>Eternal Ancestral Sanctuaries & Living Voices</span>
      </div>

      <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif font-light mb-4 text-white leading-tight sm:leading-snug">
        Digital Wall of <span className="text-[#D2DC3C] font-normal">Remembrance</span>
      </h1>
      <p className="text-gray-300 max-w-2xl mx-auto text-xs sm:text-sm md:text-base leading-relaxed px-2 sm:px-4 mb-6">
        Honoring our ancestors and departed loved ones. Preserve their timeless wisdom, voices, and heartfelt blessings forever with living 3D avatar relics.
      </p>

      {/* Action buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
        {onOpenCreateModal && (
          <button
            onClick={onOpenCreateModal}
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer group"
          >
            <Plus className="w-4 h-4 stroke-[2.5] group-hover:rotate-90 transition-transform" />
            Create Memorial Shrine
          </button>
        )}
        <Link
          href="/family-tree"
          className="px-5 py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-400/30 text-white font-medium text-xs sm:text-sm flex items-center gap-2 transition-all"
        >
          <Trees className="w-4 h-4 text-emerald-400" />
          View Ancestral Family Tree
        </Link>
      </div>
    </motion.div>
  );
};