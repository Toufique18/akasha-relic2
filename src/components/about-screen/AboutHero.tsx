"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import vrWoman from "@/assets/banner/aboutbg.svg";

export const AboutHero = () => {
  return (
    <section className="w-full relative overflow-hidden flex items-center justify-center pt-10">
      
      {/* Background Gradient (Deep Purple to Dark Blue to Black) */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#2D1B69] via-[#0F0A3C] to-[#020215] pointer-events-none" />
      
      {/* Soft Cyan/Pink glow on the right side behind the character */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#6D39D2]/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* --- Left Column: Text & CTA --- */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col justify-center"
          >
            <p className="text-4xl md:text-5xl lg:text-7xl font-serif text-white  mb-2">
              Beyond Memory.
            </p>
            <p className="text-4xl md:text-5xl lg:text-7xl font-serif text-white  mb-2">
              Beyond Time.
            </p>
            <p className="text-4xl md:text-5xl lg:text-7xl font-serif text-[#9157FF]  mb-6">
              Beyond Reality.
            </p>

            <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-lg mb-10">
              We are building a future where human stories, identities, and connections continue living in a persistent digital world.
            </p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-fit"
            >
              <Link
                href="/store"
                className="block bg-[#7C4AED] hover:bg-[#6D39D2] text-white px-6 py-3.5 rounded-xl text-sm font-semibold transition-all shadow-[0_0_20px_rgba(124,74,237,0.3)]"
              >
                Create Your Legacy
              </Link>
            </motion.div>
          </motion.div>

          {/* --- Right Column: 3D VR Character --- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative flex justify-center lg:justify-end h-[400px] md:h-[600px] w-full"
          >
            <div className="relative w-full max-w-md lg:max-w-lg h-full">
              <Image
                src={vrWoman}
                alt="Woman wearing VR headset representing digital immortality"
                fill
                className="object-contain object-bottom drop-shadow-[0_0_40px_rgba(109,57,210,0.4)]"
                priority
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};