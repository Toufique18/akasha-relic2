"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, Flame, Plus, Sparkles, Filter } from "lucide-react";

interface GalleryFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  onOpenCreateModal?: () => void;
}

export const GalleryFilters: React.FC<GalleryFiltersProps> = ({
  searchTerm,
  onSearchChange,
  activeTab,
  onTabChange,
  sortBy,
  onSortChange,
  onOpenCreateModal,
}) => {
  const tabs = [
    { id: "all", label: "All Memorials" },
    { id: "family", label: "Family Legacies" },
    { id: "ancestor", label: "Ancestral Pioneers" },
    { id: "with_voice", label: "With 3D Living Voice" },
  ];

  return (
    <section className="max-w-7xl mx-auto w-full px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="mb-8 sm:mb-10"
      >
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-6">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-focus-within:text-amber-400 transition-colors" />
            <input
              type="text"
              placeholder="Search by loved one's name, relation, or wisdom quotes..."
              className="w-full bg-[#15162C]/90 border border-white/10 text-white pl-12 pr-4 py-3 sm:py-3.5 text-xs sm:text-sm rounded-2xl focus:border-amber-400/60 focus:ring-1 focus:ring-amber-400/40 outline-none placeholder:text-gray-500 shadow-xl shadow-black/40 transition-all"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={() => onSearchChange("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Filter Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs md:text-sm text-gray-400 border-b border-white/5 pb-3">
          {/* Tabs */}
          <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`transition-all whitespace-nowrap text-xs sm:text-sm px-3.5 py-1.5 rounded-xl font-medium shrink-0 cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-sm shadow-amber-500/10"
                    : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Right actions: Sorting & Create Button */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Filter className="w-3.5 h-3.5 text-amber-400" />
              <span>Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
                className="bg-[#15162C] border border-white/10 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-amber-400/50 cursor-pointer"
              >
                <option value="candles">Most Candles Lit 🕯️</option>
                <option value="recent">Recently Created ⏳</option>
                <option value="name">Name (A-Z)</option>
              </select>
            </div>

            {onOpenCreateModal && (
              <button
                onClick={onOpenCreateModal}
                className="sm:hidden px-3 py-1.5 rounded-xl bg-amber-500 text-black text-xs font-semibold flex items-center gap-1.5 shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Shrine
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
};