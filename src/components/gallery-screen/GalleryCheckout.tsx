"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CreditCard, ChevronLeft, Minus, Plus } from "lucide-react";

interface GalleryItem {
    id: number;
    title: string;
    price: string;
    image: any; // StaticImageData
}

export const GalleryCheckout = ({ item }: { item: GalleryItem }) => {
    const [quantity, setQuantity] = useState(2); // Default matches screenshot
    const [coupon, setCoupon] = useState("");

    // Pricing calculations
    const basePrice = parseFloat(item.price.replace("$", ""));
    const subtotal = basePrice * quantity;

    // Example shipping/tax logic (Matches screenshot's $141.97 subtotal and $153.33 total)
    // We deduct $11.35 from the screenshot math, but let's just use a flat fee for the demo
    const taxAndFees = 11.35;
    const total = subtotal + taxAndFees;

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:py-12">

            {/* Back Button */}
            <Link
                href={`/memorials/gallery/${item.id}`}
                className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium mb-6"
            >
                <ChevronLeft className="w-4 h-4" />
                Back to Product
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">

                {/* --- Left Column: Payment Information --- */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-[#15162C] border border-white/5 rounded-2xl p-6 sm:p-8"
                >
                    <h2 className="text-2xl font-medium text-white mb-6">Checkout</h2>

                    <div className="flex items-center gap-3 mb-8">
                        <CreditCard className="w-5 h-5 text-gray-400" />
                        <h3 className="text-base font-medium text-white">Payment Information</h3>
                    </div>

                    <form className="space-y-6">
                        {/* Card Number */}
                        <div className="space-y-2">
                            <label className="text-sm text-gray-300 flex items-center gap-1">
                                Card Number <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="text"
                                defaultValue="4242 4242 4242 4242"
                                className="w-full bg-[#0B0C1E]/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#7C4AED] focus:ring-1 focus:ring-[#7C4AED] transition-all"
                            />
                        </div>

                        {/* Cardholder Name */}
                        <div className="space-y-2">
                            <label className="text-sm text-gray-300 flex items-center gap-1">
                                Cardholder Name <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="text"
                                defaultValue="akasharelictech"
                                className="w-full bg-[#0B0C1E]/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#7C4AED] focus:ring-1 focus:ring-[#7C4AED] transition-all"
                            />
                        </div>

                        {/* Expiry & CVV */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm text-gray-300 flex items-center gap-1">
                                    Expiry Date <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    defaultValue="MM/YY"
                                    className="w-full bg-[#0B0C1E]/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#7C4AED] focus:ring-1 focus:ring-[#7C4AED] transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-gray-300 flex items-center gap-1">
                                    CVV <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    defaultValue="123"
                                    className="w-full bg-[#0B0C1E]/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#7C4AED] focus:ring-1 focus:ring-[#7C4AED] transition-all"
                                />
                            </div>
                        </div>
                    </form>
                </motion.div>

                {/* --- Right Column: Order Summary --- */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="bg-[#15162C] border border-white/5 rounded-2xl p-6 sm:p-8"
                >
                    <h2 className="text-2xl font-medium text-white mb-6">Order Summary</h2>

                    {/* Product Preview Row */}
                    <div className="flex items-start gap-4 pb-6 border-b border-white/5 mb-6">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-[#1A1B31] flex-shrink-0">
                            <Image src={item.image} alt={item.title} fill className="object-cover" />
                        </div>
                        <div className="flex-1">
                            <h4 className="text-white font-medium text-sm mb-1">{item.title}</h4>
                            <div className="flex items-center gap-3">
                                <span className="text-sm text-gray-400">Qty: {quantity}</span>
                                <div className="flex items-center bg-[#0B0C1E]/50 rounded-md border border-white/5">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="px-2 py-1 text-gray-400 hover:text-white transition-colors"
                                    >
                                        <Minus className="w-3 h-3" />
                                    </button>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="px-2 py-1 text-gray-400 hover:text-white transition-colors"
                                    >
                                        <Plus className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <span className="text-white font-medium text-sm">${(basePrice * quantity).toFixed(2)}</span>
                    </div>

                    {/* Totals */}
                    <div className="space-y-4 mb-6">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Subtotal</span>
                            <span className="text-white font-medium">${subtotal.toFixed(2)}</span>
                        </div>

                        {/* Coupon Input */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Coupon Code"
                                value={coupon}
                                onChange={(e) => setCoupon(e.target.value)}
                                className="w-full bg-[#0B0C1E]/50 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-[#7C4AED] focus:ring-1 focus:ring-[#7C4AED] transition-all"
                            />
                        </div>

                        <div className="flex justify-between text-base pt-4 border-t border-white/5">
                            <span className="text-white font-medium">Total</span>
                            <span className="text-white font-bold text-lg">${total.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Place Order Button */}
                    {/* <button className="w-full bg-[#7C4AED] hover:bg-[#6D39D2] text-white font-medium py-3.5 rounded-xl transition-all shadow-[0_0_15px_rgba(124,74,237,0.2)] hover:shadow-[0_0_25px_rgba(124,74,237,0.4)] mb-4">
            Place Order
          </button> */}
                    <div className="flex flex-col gap-4">
                        <Link href={`/memorials/gallery/${item.id}/checkout/success`} className="w-full">
                            <button className="w-full bg-[#7C4AED] hover:bg-[#6D39D2] text-white font-medium py-3.5 rounded-xl transition-all shadow-[0_0_15px_rgba(124,74,237,0.2)] hover:shadow-[0_0_25px_rgba(124,74,237,0.4)]">
                                Place Order
                            </button>
                        </Link>
                        <p className="text-center text-[10px] sm:text-xs text-gray-400">
                            By placing your order, you agree to our <span className="text-white cursor-pointer hover:underline">Terms of Service</span>
                        </p>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};