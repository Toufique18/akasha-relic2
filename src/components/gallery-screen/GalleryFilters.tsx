"use client";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useState } from "react";

export const GalleryFilters = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const tabs = ["All Collections", "Digital Art", "Digital Art", "Digital Art"];
  const [activeTab, setActiveTab] = useState("All Collections");

  return (
    <section className="max-w-7xl mx-auto w-full px-4 sm:px-0">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="mb-8 sm:mb-12"
      >
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-6 sm:mb-8">
          <div className="relative">
            <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full bg-[#1A1B31]/80 border-none text-white pl-10 sm:pl-12 pr-4 py-3 sm:py-4 text-sm sm:text-base rounded-xl focus:ring-2 focus:ring-[#7C4AED] outline-none placeholder:text-gray-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Filter Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs md:text-sm text-gray-400">
          <div className="flex items-center gap-3 sm:gap-6 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-hide touch-pan-x">
            {tabs.map((tab, idx) => (
              <button
                key={tab + idx}
                onClick={() => setActiveTab(tab)}
                className={`transition-colors whitespace-nowrap text-xs sm:text-sm pb-1 shrink-0 ${
                  activeTab === tab
                    ? 'text-white font-semibold border-b-2 border-[#7C4AED]'
                    : 'text-gray-400 hover:text-white border-b-2 border-transparent'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors whitespace-nowrap">
            <span>Curated Selection</span>
            <span className="text-[10px]">▼</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};