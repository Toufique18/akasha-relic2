"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export const DonateHero = () => {
  return (
    <section className="w-full relative overflow-hidden flex items-center justify-center min-h-[60vh] lg:min-h-[80vh] py-20 lg:py-32">
      
      {/* Dark Purple Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2D1B69] via-[#1A1140] to-[#020215] pointer-events-none" />
      
      {/* Subtle Purple Radial Glow behind the text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#7C4AED]/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Main Heading */}
          <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-tight mb-6">
            Preserve Memories Across <br className="hidden sm:block" />
            <span className="text-white">Time & Beyond</span>
          </p>

          {/* Subtitle */}
          <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            Your contribution helps families create AI memorial spaces, preserve stories, and build lasting digital legacies.
          </p>

          {/* Donate Button */}
          <motion.div
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(124,74,237,0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="w-fit mx-auto"
          >
            <Link
              href="/donate/payment" // Assuming you'll add a payment page here later
              className="block bg-[#7C4AED] hover:bg-[#6D39D2] text-white px-8 py-3.5 rounded-xl text-sm font-semibold tracking-wide transition-all shadow-[0_0_20px_rgba(124,74,237,0.3)]"
            >
              Donate
            </Link>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};