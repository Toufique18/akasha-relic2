"use client";
import { motion } from "framer-motion";

export const StoreHero = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-10 sm:mb-12 md:mb-16 px-4 sm:px-0"
    >
      <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif font-light mb-3 sm:mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent leading-tight sm:leading-snug">
        Secure Your <span className="text-[#D4AF37]">Legacy</span>
      </h1>
      <p className="text-gray-300 max-w-2xl mx-auto text-xs sm:text-sm md:text-base leading-relaxed px-2 sm:px-4">
        Eternal Heritage is proud to announce a limited pre-order release of our most exclusive memorial architectures and digital vaults. Secure your place in history with priority selection and foundational pricing.
      </p>
    </motion.div>
  );
};