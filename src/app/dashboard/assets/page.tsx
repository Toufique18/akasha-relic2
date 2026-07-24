"use client";

import { motion } from "framer-motion";
import { Search, ChevronDown, Plus, Star, StarHalf } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// --- Mock Data for Asset Cards ---
const mockAssets = Array.from({ length: 8 }).map((_, i) => ({
    id: i + 1,
    name: "Big Sofa",
    description: "A spacious and comfortable big...",
    price: "$12",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=600&auto=format&fit=crop",
}));

// Helper component for the Star Rating
const StarRating = ({ rating }: { rating: number }) => {
    return (
        <div className="flex items-center gap-0.5 text-yellow-400">
            {[...Array(5)].map((_, i) => {
                const starValue = i + 1;
                if (rating >= starValue) return <Star key={i} className="w-3 h-3 fill-current" />;
                if (rating >= starValue - 0.5) return <StarHalf key={i} className="w-3 h-3 fill-current" />;
                return <Star key={i} className="w-3 h-3 text-gray-600" />;
            })}
        </div>
    );
};

export default function AssetsManagementPage() {
    return (
        <div className="space-y-6">

            {/* --- Top Card / Header --- */}
            <div className="bg-[#15162C] border border-white/5 rounded-2xl p-6 space-y-6">
                <h2 className="text-base font-medium text-white">All Assets</h2>

                {/* Filters & Actions Row */}
                <div className="flex flex-col sm:flex-row gap-4">

                    {/* Search Bar */}
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search name or email address ..."
                            className="w-full bg-[#0B0C1E]/80 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-[#7C4AED] focus:ring-1 focus:ring-[#7C4AED]"
                        />
                    </div>

                    {/* Dropdown Filter */}
                    <div className="flex items-center gap-2 bg-[#0B0C1E]/80 border border-white/10 rounded-xl px-4 py-2.5 cursor-pointer hover:border-[#7C4AED] transition-colors min-w-[120px]">
                        <span className="text-sm text-white flex-1">All Content</span>
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                    </div>

                    {/* Primary Action Button */}
                    <button className="flex items-center justify-center gap-2 bg-[#7C4AED] hover:bg-[#6D39D2] text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-all shadow-[0_0_15px_rgba(124,74,237,0.2)] hover:shadow-[0_0_25px_rgba(124,74,237,0.4)]">
                        <Plus className="w-4 h-4" />
                        Upload and Add Asset
                    </button>
                </div>
            </div>

            {/* --- Assets Grid --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockAssets.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.4 }}
                        className="bg-[#15162C] border-2 border-[#7C4AED] rounded-2xl overflow-hidden hover:border-[#A78BFA] transition-all duration-300 flex flex-row h-[180px] group"
                    >
                        {/* Image Section - Left */}
                        <div className="relative w-[160px] h-full shrink-0 bg-[#1A1B31] overflow-hidden flex items-center justify-center p-2">
                            <div className="relative w-full h-[90%] rounded-lg overflow-hidden bg-white">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-contain object-center transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                        </div>

                        {/* Content Section - Right */}
                        <div className="flex-1 p-4 flex flex-col justify-between">

                            {/* Top: Rating, Title, Description */}
                            <div className="space-y-1.5">
                                {/* Stars */}
                                <StarRating rating={item.rating} />

                                {/* Title */}
                                <h3 className="text-white text-base font-medium leading-snug">
                                    {item.name}
                                </h3>

                                {/* Description */}
                                <p className="text-gray-400 text-[11px] leading-relaxed line-clamp-1">
                                    {item.description}
                                </p>
                            </div>

                            {/* Bottom: Price & Actions */}
                            <div className="space-y-3 mt-1">

                                {/* Price */}
                                <div className="text-white text-lg font-bold">
                                    {item.price}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex items-center gap-2.5">
                                    <Link href={`/dashboard/assets/${item.id}`} className="flex-1"> {/* <-- Wrap in Link */}
                                        <button className="w-full bg-[#7C4AED] hover:bg-[#6D39D2] text-white text-[11px] font-medium py-1.5 rounded-lg transition-colors shadow-[0_0_10px_rgba(124,74,237,0.2)]">
                                            View Details
                                        </button>
                                    </Link>
                                    <button className="flex-1 bg-[#EF4444] hover:bg-red-600 text-white text-[11px] font-medium py-1.5 rounded-lg transition-colors">
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

        </div>
    );
}