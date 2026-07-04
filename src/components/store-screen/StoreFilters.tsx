"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown } from "lucide-react";
import { useState } from "react";

// Reusable Dropdown Component
const FilterDropdown = ({ 
  label, 
  options, 
  activeOption, 
  setActiveOption 
}: { 
  label: string; 
  options: string[]; 
  activeOption: string; 
  setActiveOption: (val: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 hover:text-white transition-colors whitespace-nowrap text-gray-400 text-xs sm:text-sm"
      >
        <span className="text-white font-medium">{activeOption}</span>
        <ChevronDown className={`w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-36 sm:w-40 bg-[#1A1B31] border border-white/10 rounded-xl shadow-xl overflow-hidden"
          >
            <div className="py-1.5">
              {options.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setActiveOption(option);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3 sm:px-4 py-2.5 text-xs sm:text-sm transition-colors ${
                    activeOption === option 
                      ? 'text-white bg-[#7C4AED]/20' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const StoreFilters = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Tabs State
  const tabs = ["All Collections", "Physical Vaults", "Digital Assets"];
  const [activeTab, setActiveTab] = useState("All Collections");

  // Sort By State
  const sortOptions = ["Sort By", "Price: Low to High", "Price: High to Low", "Newest"];
  const [activeSort, setActiveSort] = useState("Sort By");

  return (
    <section className="max-w-7xl mx-auto w-full px-4 sm:px-0">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="mb-8 sm:mb-12"
      >
        {/* Search Bar - Responsive padding & size */}
        <div className="max-w-2xl mx-auto mb-6 sm:mb-8">
          <div className="relative">
            <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search assets..." 
              className="w-full bg-[#1A1B31]/80 border-none text-white pl-10 sm:pl-12 pr-4 py-3 sm:py-4 text-sm sm:text-base rounded-xl focus:ring-2 focus:ring-[#7C4AED] outline-none placeholder:text-gray-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Filter Navigation Row - Responsive wrapping */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs md:text-sm text-gray-400">
          
          {/* Left: Tabs - Allows scrolling on small screens */}
          <div className="flex items-center gap-3 sm:gap-6 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-hide touch-pan-x">
            {tabs.map((tab) => (
              <button
                key={tab}
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
            
            {/* Sort By Dropdown */}
            <FilterDropdown 
              label="Sort By"
              options={sortOptions}
              activeOption={activeSort}
              setActiveOption={setActiveSort}
            />
          </div>

          {/* Right: Curated Selection Dropdown - Pushes to right on desktop */}
          <div className="flex items-center w-full sm:w-auto justify-start sm:justify-end mt-1 sm:mt-0">
            <FilterDropdown 
              label=""
              options={["Curated Selection", "Trending", "Top Rated"]}
              activeOption="Curated Selection"
              setActiveOption={(val) => console.log("Selected curated:", val)}
            />
          </div>

        </div>
      </motion.div>
    </section>
  );
};