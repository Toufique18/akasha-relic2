"use client";
import { motion } from "framer-motion";

export const GalleryHero = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-10 sm:mb-12 md:mb-16 px-4 sm:px-0"
    >
      <p className="text-3xl sm:text-4xl md:text-6xl font-serif font-light mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent leading-tight sm:leading-snug">
        Digital Memorial <span className="text-[#D2DC3C]">Gallery</span>
      </p>
      <p className="text-gray-300 max-w-2xl mx-auto text-xs sm:text-sm md:text-base leading-relaxed px-2 sm:px-4">
        Explore our immersive NFT-style gallery featuring beautiful memorial art, floating frames, and interactive displays.
      </p>
    </motion.div>
  );
};