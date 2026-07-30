"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";

// --- Mock Data for the Feed Grid ---
const memoryPosts = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?q=80&w=800&auto=format&fit=crop",
    title: "A few words from my part...",
    date: "22 Feb 2026",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
    title: "A Memorial Day with My D...",
    date: "22 Feb 2026",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
    title: "Some Advise for My Next...",
    date: "22 Feb 2026",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    title: "I want to tell you somethi...",
    date: "22 Feb 2026",
  },
];

export default function UserFeedPage() {
  return (
    <div className="relative pb-20 pt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* --- Hero Banner --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative w-full bg-[#15162C]/50 border-2 border-dashed border-white/10 rounded-3xl p-8 md:p-12 text-center overflow-hidden"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white mb-4 flex flex-wrap items-center justify-center gap-2">
            Create Your <span className="text-[#D4AF37]">3D Avatar & Memories</span>
            <span className="text-2xl md:text-3xl">🖼️</span>
          </h1>
          <p className="text-gray-300 text-sm max-w-2xl mx-auto leading-relaxed mb-8">
            Upload a photo to automatically generate your digital avatar. Supports humans and animals. Customize style, colors, shape, and save to your profile.
          </p>
          <Link href="/avatar/create/human">
            <button className="bg-[#7C4AED] hover:bg-[#6D39D2] text-white font-medium px-8 py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(124,74,237,0.3)] hover:shadow-[0_0_30px_rgba(124,74,237,0.5)]">
              Create Avatar & Memories
            </button>
          </Link>
        </motion.div>

        {/* --- Feed Section Header --- */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-xl font-medium text-white">Explore Metaverse & People Memories Creation</h2>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search" 
              className="w-full bg-[#1A1B31]/80 border border-white/5 rounded-full pl-9 pr-4 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-[#7C4AED]"
            />
          </div>
        </div>

        {/* --- Memories Grid --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {memoryPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              className="group bg-[#15162C] border border-white/5 rounded-2xl overflow-hidden hover:border-[#7C4AED]/40 transition-all duration-300 cursor-pointer"
            >
              <div className="relative aspect-square overflow-hidden bg-[#1A1B31]">
                <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3 truncate pr-2">
                  <div className="w-6 h-6 rounded-full bg-white shrink-0" />
                  <span className="text-white text-xs font-medium truncate">{post.title}</span>
                </div>
                <span className="text-gray-400 text-[10px] shrink-0">{post.date}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}