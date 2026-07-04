"use client";
import { motion } from "framer-motion";
import { Eye, MapPin } from "lucide-react";
import Image from "next/image";
import grave from "@/assets/store/picture2.svg";

// Mock Data (Replace this with an API fetch later)
const storeItems = Array.from({ length: 9 }).map((_, i) => ({
  id: i,
  title: "Lakeside Cemetery Plots",
  location: "Grace Memorial Chapel",
  peopleCount: 50,
  image: grave, 
}));

export const StoreGrid = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {storeItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * index, duration: 0.5 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="group bg-[#15162C] rounded-2xl overflow-hidden border border-white/5 hover:border-[#7C4AED]/30 transition-all duration-300"
          >
            {/* Image Area */}
            <div className="relative aspect-[4/3] overflow-hidden bg-[#1A1B31]">
              <div className="absolute inset-0" />
              <Image 
                src={item.image} 
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Content Area */}
            <div className="p-4 sm:p-5 relative">
              {/* Meta Row - Use flex-wrap on mobile */}
              <div className="flex flex-wrap items-center justify-between gap-1 text-[10px] text-gray-400 mb-2 sm:mb-3">
                <div className="flex items-center gap-1.5 truncate">
                  <MapPin className="w-3 h-3 shrink-0" />
                  <span className="truncate max-w-[120px] sm:max-w-full">{item.location}</span>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Eye className="w-3 h-3" />
                  <span>{item.peopleCount} People</span>
                </div>
              </div>

              {/* Title - Adjust text size on mobile */}
              <h3 className="text-base sm:text-lg font-medium text-white mb-3 sm:mb-4 truncate">
                {item.title}
              </h3>

              {/* Buttons - Better stacking on mobile */}
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
                <button className="w-full sm:flex-1 text-gray-400 text-white bg-white/5 hover:bg-white/10 px-3 sm:px-4 py-2 text-[10px] sm:text-xs rounded-lg transition-colors">
                  View Details
                </button>
                <button className="w-full sm:flex-1 bg-[#7C4AED] hover:bg-[#6D39D2] text-white px-3 sm:px-4 py-2 text-[10px] sm:text-xs rounded-lg shadow-[0_0_15px_rgba(124,74,237,0.3)] hover:shadow-[0_0_25px_rgba(124,74,237,0.5)] transition-all">
                  Pre-order Now
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};