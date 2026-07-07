"use client";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import Image from "next/image";

// Import gallery assets
import g1 from "@/assets/gallery/g1.png";
import g2 from "@/assets/gallery/g2.png";
import g3 from "@/assets/gallery/g3.png";
import g4 from "@/assets/gallery/g4.png";
import g5 from "@/assets/gallery/g5.png";
import g6 from "@/assets/gallery/g6.png";
import Link from "next/link";

const galleryItems = [
  { id: 1, title: "Eternal Grace", price: "$99.00", likes: 142, image: g1 },
  { id: 2, title: "Golden Memories", price: "$149.00", likes: 98, image: g2 },
  { id: 3, title: "Serenity Aura", price: "$199.00", likes: 215, image: g3 },
  { id: 4, title: "Peaceful Passage", price: "$129.00", likes: 87, image: g4 },
  { id: 5, title: "Whispering Pines", price: "$89.00", likes: 164, image: g5 },
  { id: 6, title: "Sacred Horizon", price: "$179.00", likes: 112, image: g6 },
  { id: 7, title: "Loving Remembrance", price: "$99.00", likes: 130, image: g1 },
  { id: 8, title: "Wings of Peace", price: "$149.00", likes: 76, image: g2 },
  { id: 9, title: "Starlight Pathway", price: "$199.00", likes: 245, image: g3 },
  { id: 10, title: "Silent Meadow", price: "$129.00", likes: 93, image: g4 },
  { id: 11, title: "Heavenly Glow", price: "$89.00", likes: 180, image: g5 },
  { id: 12, title: "Infinite Sky", price: "$179.00", likes: 105, image: g6 },
];

export const GalleryGrid = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-3 sm:px-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {galleryItems.map((item, index) => (
          <Link key={item.id} href={`/memorials/gallery/${item.id}`}>
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * index, duration: 0.5 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="group bg-[#15162C] rounded-2xl overflow-hidden border border-white/5 hover:border-[#7C4AED]/30 transition-all duration-300"
          >
            {/* Image Area */}
            <div className="relative aspect-square overflow-hidden bg-[#1A1B31]">
              {/* Action Icons */}
              <div className="absolute top-3 left-3 z-20 flex gap-2">
                <div className="bg-black/60 backdrop-blur-sm rounded-full p-1.5 text-white hover:text-[#7C4AED] transition-colors cursor-pointer">
                  <Heart className="w-4 h-4" />
                </div>
              </div>
              {/* <div className="absolute top-3 right-3 z-20">
                <div className="bg-black/60 backdrop-blur-sm rounded-full p-1.5 text-white cursor-pointer">
                  <MoreHorizontal className="w-4 h-4" />
                </div>
              </div> */}

              {/* Image */}
              <Image 
                src={item.image} 
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              
              {/* Buy Now Overlay (Appears on Hover) */}
              <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-center">
                <button className="w-full bg-[#9F7AEA] hover:bg-[#8B5CF6] text-white text-xs font-semibold py-2.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_15px_rgba(124,74,237,0.3)]">
                  Add To Cart
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-4 sm:p-5">
              <p className="text-base sm:text-base font-medium text-white mb-1 truncate">{item.title}</p>
              <div className="flex items-center justify-between">
                <p className="text-base sm:text-base text-white font-normal">{item.price}</p>
                <div className="flex items-center gap-1 text-[10px] text-gray-400">
                  <Heart className="w-3 h-3" />
                  <span>{item.likes}</span>
                </div>
              </div>
            </div>
          </motion.div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex flex-wrap items-center justify-between gap-4 mt-12 text-xs text-gray-400"
      >
        <span>Page 1 of 10</span>
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 rounded-lg border border-white/10 hover:border-[#7C4AED] hover:text-white transition-colors flex items-center justify-center bg-[#1A1B31]">1</button>
          <button className="w-8 h-8 rounded-lg border border-white/10 hover:border-[#7C4AED] hover:text-white transition-colors flex items-center justify-center hover:bg-[#1A1B31]">2</button>
          <button className="w-8 h-8 rounded-lg border border-white/10 hover:border-[#7C4AED] hover:text-white transition-colors flex items-center justify-center hover:bg-[#1A1B31]">3</button>
          <span className="px-1">...</span>
          <button className="w-8 h-8 rounded-lg border border-white/10 hover:border-[#7C4AED] hover:text-white transition-colors flex items-center justify-center hover:bg-[#1A1B31]">10</button>
        </div>
        <div className="flex items-center gap-2">
          <span>50 / Page</span>
          <span className="text-[10px]">▼</span>
        </div>
      </motion.div>
    </section>
  );
};