"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Star, StarHalf, Maximize2, ShoppingBag, ShoppingCart, X } from "lucide-react";

// Reusable Star Rating
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

// Mock Data (In a real app, this would be passed via props)
const mockItem = {
    id: 1,
    name: "Big Sofa",
    price: "$12",
    rating: 4.5,
    description: "A spacious and comfortable big sofa designed to bring style and relaxation to your living space.",
    tags: ["Sofa", "Big Size"],
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop",
};

export const MarketplaceDetailView = () => {
    const [isFullscreen, setIsFullscreen] = useState(false);

    return (
        <div className="min-h-screen bg-[#020215] relative pb-10 overflow-hidden">

            {/* ====== FULLSCREEN OVERLAY ====== */}
            <AnimatePresence>
                {isFullscreen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
                        onClick={() => setIsFullscreen(false)}
                    >
                        <button
                            className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors p-2"
                            onClick={() => setIsFullscreen(false)}
                        >
                            <X className="w-8 h-8" />
                        </button>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", damping: 20 }}
                            className="relative w-full max-w-5xl aspect-video"
                        >
                            <Image
                                src={mockItem.image}
                                alt={mockItem.name}
                                fill
                                className="object-contain rounded-2xl"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-6">

                {/* ====== BACK BUTTON ====== */}
                <Link href="/feed/marketplace" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm mb-8">
                    <ArrowLeft className="w-4 h-4" /> Back
                </Link>

                {/* ====== 2-COLUMN GRID ====== */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

                    {/* --- Left: Image --- */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="relative w-full aspect-square rounded-[40px] border border-white/20 bg-[#0B0C1E] overflow-hidden group"
                    >
                        <Image
                            src={mockItem.image}
                            alt={mockItem.name}
                            fill
                            className="object-contain p-8"
                        />

                        {/* View Button */}
                        <button
                            onClick={() => setIsFullscreen(true)}
                            className="absolute top-6 right-6 flex items-center gap-1.5 text-white bg-black/40 hover:bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs transition-all z-10"
                        >
                            <Maximize2 className="w-3.5 h-3.5" />
                            View
                        </button>
                    </motion.div>

                    {/* --- Right: Details --- */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="flex flex-col justify-center space-y-6"
                    >

                        {/* Rating */}
                        <StarRating rating={mockItem.rating} />

                        {/* Title */}
                        <h1 className="text-4xl md:text-5xl font-medium text-white">
                            {mockItem.name}
                        </h1>

                        {/* Description */}
                        <p className="text-gray-400 text-base leading-relaxed max-w-lg">
                            {mockItem.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-3">
                            {mockItem.tags.map((tag) => (
                                <span key={tag} className="px-4 py-1.5 rounded-full border border-white/20 text-white text-sm hover:border-[#7C4AED] transition-colors cursor-pointer">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Price */}
                        <p className="text-4xl text-[#7C4AED] font-bold">
                            {mockItem.price}
                        </p>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4">

                            <Link href="/feed/marketplace/checkout/payment">
                                <button className="flex items-center justify-center gap-2 w-full sm:w-auto bg-[#7C4AED] hover:bg-[#6D39D2] text-white font-medium px-8 py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(124,74,237,0.3)] hover:shadow-[0_0_30px_rgba(124,74,237,0.5)]">
                                    <ShoppingBag className="w-4 h-4" />
                                    Pre-Order
                                </button>
                            </Link>

                            <Link href="/feed/marketplace/checkout">
                                <button className="flex items-center justify-center gap-2 w-full sm:w-auto bg-transparent border border-white/20 hover:border-white text-white font-medium px-8 py-3 rounded-xl transition-all">
                                    <ShoppingCart className="w-4 h-4" />
                                    Add to Cart
                                </button>
                            </Link>
                        </div>

                    </motion.div>
                </div>
            </div>
        </div>
    );
};