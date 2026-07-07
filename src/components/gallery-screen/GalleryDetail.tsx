"use client";

import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { ShoppingCart, ChevronRight, Minus, Plus } from "lucide-react";
import { useState } from "react";

// Define the type for the product item
interface GalleryItem {
    id: number;
    title: string;
    price: string;
    likes: number;
    image: StaticImageData; // StaticImageData
    category?: string;
    description?: string;
}

export const GalleryDetail = ({ item }: { item: GalleryItem }) => {
    const [quantity, setQuantity] = useState(1);

    // Calculate total price (strip "$" and convert to float)
    const priceValue = parseFloat(item.price.replace("$", ""));
    const totalPrice = (priceValue * quantity).toFixed(2);

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:py-12">

            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-400 mb-8 overflow-x-auto whitespace-nowrap scrollbar-hide">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <ChevronRight className="w-3 h-3" />
                <Link href="/memorials/gallery" className="hover:text-white transition-colors">Gallery</Link>
                <ChevronRight className="w-3 h-3" />
                <span className="text-white font-medium">{item.title}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

                {/* Left Column: Image */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative aspect-square w-full max-w-lg mx-auto lg:max-w-none rounded-2xl overflow-hidden bg-[#1A1B31] border border-white/5"
                >
                    <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </motion.div>

                {/* Right Column: Info & Actions */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="flex flex-col justify-start"
                >
                    <p className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white mb-2">
                        {item.title}
                    </p>
                    <p className="text-[#A78BFA] text-sm mb-6">
                        Category: <span className="text-white">Digital Art</span>
                    </p>

                    {/* Description */}
                    <div className="mb-8">
                        <h3 className="text-white font-medium text-lg mb-2">Description</h3>
                        <p className="text-gray-300 text-sm leading-relaxed max-w-lg">
                            A high-resolution digital artwork designed for collectors and digital art enthusiasts. Perfect for preserving memories and celebrating life.
                        </p>
                    </div>

                    {/* What's Included */}
                    <div className="mb-8">
                        <h3 className="text-white font-medium text-lg mb-3">What&apos;s Included</h3>
                        <ul className="space-y-2 text-sm text-gray-300 list-disc pl-5">
                            <li>High-resolution digital download</li>
                            <li>Blockchain certificate (coming soon)</li>
                            <li>Lifetime access to your collection</li>
                        </ul>
                    </div>

                    {/* Quantity & Total */}
                    <div className="flex flex-wrap items-center gap-6 mb-8 pt-6 border-t border-white/5">
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-300">Quantity:</span>
                            <div className="flex items-center bg-[#0B0C1E] border border-white/10 rounded-lg overflow-hidden">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="px-3 py-1.5 text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                                >
                                    <Minus className="w-3 h-3" />
                                </button>
                                <span className="w-10 text-center text-sm text-white bg-transparent">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="px-3 py-1.5 text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                                >
                                    <Plus className="w-3 h-3" />
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-300">Total:</span>
                            <span className="text-lg font-semibold text-white">${totalPrice}</span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button className="flex-1 flex items-center justify-center gap-2 border border-[#7C4AED]/50 text-[#7C4AED] hover:bg-[#7C4AED]/10 hover:border-[#7C4AED] px-6 py-3.5 rounded-xl text-sm font-medium transition-all">
                            <ShoppingCart className="w-4 h-4" />
                            Add to Cart
                        </button>
                        {/* <button className="flex-1 bg-[#7C4AED] hover:bg-[#6D39D2] text-white px-6 py-3.5 rounded-xl text-sm font-bold tracking-wide transition-all shadow-[0_0_20px_rgba(124,74,237,0.3)] hover:shadow-[0_0_30px_rgba(124,74,237,0.5)]">
              Buy Now
            </button> */}
                        <Link href={`/memorials/gallery/${item.id}/checkout`} className="flex-1">
                            <button className="w-full bg-[#7C4AED] hover:bg-[#6D39D2] text-white px-6 py-3.5 rounded-xl text-sm font-bold tracking-wide transition-all shadow-[0_0_20px_rgba(124,74,237,0.3)] hover:shadow-[0_0_30px_rgba(124,74,237,0.5)]">
                                Buy Now
                            </button>
                        </Link>
                    </div>

                </motion.div>
            </div>
        </section>
    );
};