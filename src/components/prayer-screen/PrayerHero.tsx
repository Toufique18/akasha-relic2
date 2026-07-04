"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import prayerImage from "@/assets/store/picture3.svg";

export const PrayerHero = () => {
  return (
    <section className="w-full relative overflow-hidden flex items-center justify-center">
      {/* Background Gradient Aura */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#2D1B69] via-[#020215] to-[#020215] pointer-events-none" />
      
      {/* Soft radial glow for the right side */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[800px] bg-[#6D39D2]/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Text & CTA */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col justify-center"
          >
            <p className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-2">
              Send Love, Light & Prayers
            </p>
            <p className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#A78BFA] mb-6">
              Beyond Time
            </p>

            <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-lg mb-10">
              Share prayer requests, memories, and heartfelt messages in connected digital sanctuary where stories and legacies continue living beyond physical presence.
            </p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-fit"
            >
              <Link
                href="/prayer/request"
                className="block bg-[#2A2A3E] hover:bg-[#3A3A52] text-white px-6 py-3 rounded-xl text-sm font-medium transition-all shadow-lg"
              >
                Request Prayer
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column: Glowing Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative flex justify-center lg:justify-end h-[400px] md:h-[600px] w-full"
          >
            <div className="relative w-full max-w-md lg:max-w-lg h-full">
              <Image
                src={prayerImage}
                alt="Glowing Digital Human Prayer Avatar"
                fill
                className="object-contain object-bottom drop-shadow-[0_0_30px_rgba(124,74,237,0.5)]"
                priority
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};