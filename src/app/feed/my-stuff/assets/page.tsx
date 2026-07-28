"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const allAssets = [
  { id: 1, name: "My Avatar", category: "Avatar", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop" },
  { id: 2, name: "My Pet", category: "Avatar", image: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80&w=300&auto=format&fit=crop" },
  { id: 3, name: "Blue T-Shirt", category: "Clothing", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=300&auto=format&fit=crop" },
  { id: 4, name: "Red T-Shirt", category: "Clothing", image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=300&auto=format&fit=crop" },
  { id: 5, name: "Sunglasses", category: "Accessories", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=300&auto=format&fit=crop" },
  { id: 6, name: "Smart Watch", category: "Electronics", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=300&auto=format&fit=crop" },
];

export default function AssetsPage() {
  const categories = ["All", ...Array.from(new Set(allAssets.map((a) => a.category)))];
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredAssets = allAssets.filter((item) => {
    if (activeCategory === "All") return true;
    return item.category === activeCategory;
  });

  return (
    <div className="relative">
      
      <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide max-w-full">
        {categories.map((category) => (
          <button key={category} onClick={() => setActiveCategory(category)} className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${activeCategory === category ? "bg-white text-[#020215] shadow-md" : "text-gray-400 hover:text-white"}`}>
            {category}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {filteredAssets.length > 0 ? (
          <motion.div key={activeCategory} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {filteredAssets.map((asset) => (
              <motion.div key={asset.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.2 }} className="group flex flex-col items-center gap-3 cursor-pointer">
                <div className="relative w-full aspect-square rounded-[30px] border border-white/20 bg-[#0B0C1E] overflow-hidden hover:border-[#7C4AED] transition-all duration-300 flex items-center justify-center p-4">
                  <Image src={asset.image} alt={asset.name} fill className="object-contain group-hover:scale-105 transition-transform duration-500" />
                </div>
                <span className="text-xs text-white font-medium text-center">{asset.name}</span>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-20 text-gray-400">
            <p className="text-sm">No assets found in this category.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}