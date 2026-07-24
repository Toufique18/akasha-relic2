"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Star, StarHalf, Maximize2 } from "lucide-react";

// Mock Data for the specific asset
// In a real app, this would be fetched using the 'id' from the URL
const mockAsset = {
  id: 1,
  name: "Big Sofa",
  price: "$12",
  description: "A spacious and comfortable big sofa designed to bring style and relaxation to your living space.",
  rating: 4.5,
  tags: ["Sofa", "Big Size"],
  image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop",
};

// Helper component for the Star Rating
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-0.5 text-yellow-400">
      {[...Array(5)].map((_, i) => {
        const starValue = i + 1;
        if (rating >= starValue) return <Star key={i} className="w-4 h-4 fill-current" />;
        if (rating >= starValue - 0.5) return <StarHalf key={i} className="w-4 h-4 fill-current" />;
        return <Star key={i} className="w-4 h-4 text-gray-600" />;
      })}
    </div>
  );
};

export const AssetDetailView = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* --- Back Button --- */}
      <Link
        href="/dashboard/assets"
        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm w-fit"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back</span>
      </Link>

      {/* --- Main Card --- */}
      <div className="bg-[#15162C] border border-white/5 rounded-2xl overflow-hidden">
        
        {/* Image Section */}
        <div className="relative w-full aspect-video sm:aspect-[2.5/1] bg-[#0B0C1E] border-b border-white/5 flex items-center justify-center group">
          {/* "View" Button Overlay */}
          <button className="absolute top-5 right-5 flex items-center gap-1.5 text-white bg-black/40 backdrop-blur-sm hover:bg-black/60 px-3 py-1.5 rounded-lg text-xs transition-all z-10">
            <Maximize2 className="w-3.5 h-3.5" />
            View
          </button>

          {/* The Image */}
          <div className="relative w-[60%] h-[70%]">
            <Image 
              src={mockAsset.image} 
              alt={mockAsset.name} 
              fill
              className="object-contain transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>

        {/* Details Section */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Ratings & Action Buttons Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <StarRating rating={mockAsset.rating} />
            
            <div className="flex items-center gap-3">
              <button className="bg-[#7C4AED] hover:bg-[#6D39D2] text-white text-xs font-medium px-5 py-2 rounded-lg transition-colors shadow-[0_0_10px_rgba(124,74,237,0.2)]">
                Edit Asset
              </button>
              <button className="bg-[#EF4444] hover:bg-red-600 text-white text-xs font-medium px-5 py-2 rounded-lg transition-colors">
                Remove
              </button>
            </div>
          </div>

          {/* Price & Title */}
          <div>
            <p className="text-2xl text-[#7C4AED] font-bold mb-1">{mockAsset.price}</p>
            <h2 className="text-3xl font-medium text-white">{mockAsset.name}</h2>
          </div>

          {/* Description */}
          <p className="text-gray-400 text-sm leading-relaxed max-w-2xl">
            {mockAsset.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2.5 pt-2">
            {mockAsset.tags.map((tag) => (
              <span 
                key={tag} 
                className="px-4 py-1.5 rounded-full border border-white/10 text-gray-300 text-xs font-medium hover:border-[#7C4AED]/40 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>

        </div>
      </div>
    </motion.div>
  );
};