"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// Placeholder images (Replace these with your actual imports if you have them)
// import humanImage from "@/assets/avatar/human-placeholder.jpg";
// import petImage from "@/assets/avatar/pet-placeholder.jpg";
const humanImage = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop";
const petImage = "https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80&w=600&auto=format&fit=crop";

export const AvatarSelection = () => {
  return (
    <section className="w-full min-h-[80vh] flex flex-col items-center justify-center py-16 px-4 sm:px-6 relative z-10">
      
      {/* --- Header --- */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 max-w-3xl"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white mb-4 flex flex-wrap items-center justify-center gap-3">
          Create Your <span className="text-[#D4AF37]">3D Avatar</span> 
          <span className="text-2xl sm:text-3xl">🖼️</span>
        </h1>
        <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
          Upload a photo to automatically generate your digital avatar. Supports humans and animals. Customize style, colors, shape, and save to your profile.
        </p>
      </motion.div>

      {/* --- Dashed Border Container --- */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full max-w-4xl bg-[#15162C]/30 border-2 border-dashed border-white/20 rounded-3xl p-8 sm:p-12 md:p-16"
      >
        <h2 className="text-center text-white text-xl sm:text-2xl font-serif mb-10">
          Select type of avatar
        </h2>

        {/* --- Selection Cards --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10 max-w-2xl mx-auto">
          
          {/* Human Option */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col items-center gap-4 group"
          >
            <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden border-2 border-transparent group-hover:border-[#7C4AED] transition-all duration-300 cursor-pointer bg-[#1A1B31]">
              <Image
                src={humanImage}
                alt="Human Avatar"
                width={400}
                height={300}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <Link href="/avatar/create/human" className="w-full">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(124,74,237,0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-[#7C4AED] hover:bg-[#6D39D2] text-white py-2.5 rounded-lg text-sm font-medium transition-all"
              >
                Continue with Human
              </motion.button>
            </Link>
          </motion.div>

          {/* Pet Option */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col items-center gap-4 group"
          >
            <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden border-2 border-transparent group-hover:border-[#7C4AED] transition-all duration-300 cursor-pointer bg-[#1A1B31]">
              <Image
                src={petImage}
                alt="Pet Avatar"
                width={400}
                height={300}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <Link href="/avatar/create/pet" className="w-full">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(124,74,237,0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-[#7C4AED] hover:bg-[#6D39D2] text-white py-2.5 rounded-lg text-sm font-medium transition-all"
              >
                Continue with Pet
              </motion.button>
            </Link>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
};