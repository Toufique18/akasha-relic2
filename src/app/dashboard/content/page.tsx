"use client";

import { motion } from "framer-motion";
import { Search, ChevronDown, Globe, User, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// --- Mock Data for Content Cards ---
// Replace these URLs with your actual asset imports if needed
const mockContent = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
    title: "I want to tell you something about my grandmother.",
    author: "Mason Clarke",
    isPublic: true,
    date: "22 Feb 2026",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop",
    title: "Some Advise for My Next Generation",
    author: "Mason Clarke",
    isPublic: true,
    date: "22 Feb 2026",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?q=80&w=600&auto=format&fit=crop",
    title: "A few words from my partner regarding myself.",
    author: "Mason Clarke",
    isPublic: true,
    date: "22 Feb 2026",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop",
    title: "A Memorial Day with My Dog",
    author: "Mason Clarke",
    isPublic: true,
    date: "22 Feb 2026",
  },
  // Duplicating to fill out the grid like the screenshot
  { id: 5, image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop", title: "Some Advise for My Next Generation", author: "Mason Clarke", isPublic: true, date: "22 Feb 2026" },
  { id: 6, image: "https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?q=80&w=600&auto=format&fit=crop", title: "A few words from my partner regarding myself.", author: "Mason Clarke", isPublic: true, date: "22 Feb 2026" },
  { id: 7, image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop", title: "A Memorial Day with My Dog", author: "Mason Clarke", isPublic: true, date: "22 Feb 2026" },
  { id: 8, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop", title: "I want to tell you something about my grandmother.", author: "Mason Clarke", isPublic: true, date: "22 Feb 2026" },
];

export default function ContentManagementPage() {
  return (
    <div className="space-y-6">
      
      {/* --- Top Card / Info Box --- */}
      <div className="bg-[#15162C] border border-white/5 rounded-2xl p-6 space-y-6">
        <h2 className="text-base font-medium text-white">All Uploaded Content</h2>

        {/* Filters Row */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search name or email address ..." 
              className="w-full bg-[#0B0C1E]/80 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-[#7C4AED] focus:ring-1 focus:ring-[#7C4AED]"
            />
          </div>
          
          <div className="flex items-center gap-2 bg-[#0B0C1E]/80 border border-white/10 rounded-xl px-4 py-2.5 cursor-pointer hover:border-[#7C4AED] transition-colors min-w-[140px]">
            <span className="text-sm text-white flex-1">All Content</span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </div>
        </div>
      </div>

      {/* --- Content Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockContent.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
            /* EXACT STYLING UPDATES: */
            className="bg-[#15162C] border-2 border-[#7C4AED] rounded-3xl p-3 overflow-hidden hover:border-[#A78BFA]/80 transition-all duration-300 flex flex-col sm:flex-row h-auto sm:h-[180px] group"
          >
            {/* Image Section - Fully rounded corners left side */}
            <div className="relative w-full sm:w-[180px] h-[140px] sm:h-full shrink-0 bg-[#1A1B31] overflow-hidden sm:rounded-l-3xl sm:rounded-r-none rounded-t-3xl sm:rounded-t-none p-2 sm:p-0">
              <div className="relative w-full h-full sm:rounded-l-2xl overflow-hidden">
                <Image 
                  src={item.image} 
                  alt={item.title} 
                  fill
                  className="object-cover transition-transform duration-500"
                />
                {/* Glowing Halo Effect added over the image */}
                <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_30px_rgba(255,215,0,0.4)]" />
              </div>
            </div>

            {/* Content Section - Right 2/3 */}
            <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between">
              
              {/* Top: Title & Author */}
              <div className="space-y-2">
                <h3 className="text-white text-base font-medium leading-snug line-clamp-2">
                  {item.title}
                </h3>
                {/* Author */}
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-white shrink-0" />
                  <span className="text-sm text-gray-300">{item.author}</span>
                </div>
              </div>

              {/* Bottom: Actions & Meta (Exactly aligned) */}
              <div className="flex flex-wrap items-center justify-between gap-3 mt-3">
                
                {/* Action Buttons - Sized & Colored exactly to screenshot */}
                <div className="flex items-center gap-2.5">
                  <button className="bg-[#EF4444] hover:bg-red-600 text-white text-[12px] font-medium px-5 py-1.5 rounded-xl transition-colors">
                    Delete
                  </button>
                  <button className="bg-[#8B5CF6] hover:bg-[#7C4AED] text-white text-[12px] font-medium px-5 py-1.5 rounded-xl transition-colors shadow-[0_0_10px_rgba(139,92,246,0.3)]">
                    Hide
                  </button>
                </div>

                {/* Meta Info (Public & Date) */}
                <div className="flex items-center gap-3 text-[11px] text-gray-400 shrink-0">
                  <div className="flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5" />
                    <span>Public</span>
                  </div>
                  <span className="w-[1px] h-3.5 bg-white/10" />
                  <div className="flex items-center gap-1.5">
                    {/* Added Clock icon to exactly mimic the screenshot's timestamp styling */}
                    <Clock className="w-3.5 h-3.5" /> 
                    <span>{item.date}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
}