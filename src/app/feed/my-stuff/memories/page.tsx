"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { Globe, Lock, ChevronDown } from "lucide-react";

const allMemories = [
  { id: 1, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop", title: "I want to tell you somethi...", date: "22 Feb 2026", status: "Public" },
  { id: 2, image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop", title: "Some Advise for My Next...", date: "22 Feb 2026", status: "Public" },
  { id: 3, image: "https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?q=80&w=800&auto=format&fit=crop", title: "A few words from my part...", date: "22 Feb 2026", status: "Public" },
  { id: 4, image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop", title: "A Memorial Day with My D...", date: "22 Feb 2026", status: "Public" },
  { id: 5, image: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80&w=800&auto=format&fit=crop", title: "Private Family Memory", date: "21 Feb 2026", status: "Private" },
];

export default function MemoriesPage() {
  const [activeFilter, setActiveFilter] = useState<"All" | "Public" | "Private">("All");

  const filteredMemories = allMemories.filter((item) => {
    if (activeFilter === "All") return true;
    return item.status === activeFilter;
  });

  return (
    <div className="relative">
      {/* Pass filter props to layout for the tabs rendering */}
      <div className="hidden" data-filter-tabs='["All", "Public", "Private"]' data-active-filter={activeFilter} />

      {/* Manual Tabs Rendering (Since we want them inside the layout) */}
      {/* In a real app, you might use Context here. For simplicity, I will keep the layout clean and re-use Tabs inside pages */}
      
      <div className="flex items-center gap-2 mb-8">
          {["All", "Public", "Private"].map((tab) => (
            <button key={tab} onClick={() => setActiveFilter(tab as any)} className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${activeFilter === tab ? "bg-white text-[#020215] shadow-md" : "text-gray-400 hover:text-white"}`}>
              {tab}
            </button>
          ))}
        </div>

      <AnimatePresence mode="wait">
        {filteredMemories.length > 0 ? (
          <motion.div key={activeFilter} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredMemories.map((memory) => (
              <motion.div key={memory.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.2 }} className="group bg-[#15162C] border border-white/5 rounded-2xl overflow-hidden hover:border-[#7C4AED]/40 transition-all duration-300 cursor-pointer relative">
                <div className="relative aspect-square overflow-hidden bg-[#1A1B31]">
                  <Image src={memory.image} alt={memory.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-white text-[#020215] text-[10px] font-medium px-2.5 py-1 rounded-full shadow-lg">
                    {memory.status === "Public" ? <Globe className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                    {memory.status} <ChevronDown className="w-2.5 h-2.5 ml-0.5" />
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3 truncate pr-2">
                    <div className="w-6 h-6 rounded-full bg-white shrink-0" />
                    <span className="text-white text-sm font-medium truncate">{memory.title}</span>
                  </div>
                  <span className="text-gray-400 text-[10px] shrink-0 whitespace-nowrap">{memory.date}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-20 text-gray-400">
            <Lock className="w-12 h-12 mb-4 opacity-20" />
            <p className="text-sm">No {activeFilter.toLowerCase()} memories found.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}