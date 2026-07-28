"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";

export default function CheckoutCartPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
      
      {/* --- LEFT COLUMN: CART ITEMS --- */}
      <div className="lg:col-span-7">
        <div className="bg-[#15162C] border border-white/5 rounded-2xl p-6 flex items-center gap-4 hover:border-[#7C4AED]/30 transition-all duration-300">
          
          {/* Product Image */}
          <div className="w-28 h-28 shrink-0 bg-[#0B0C1E] rounded-xl overflow-hidden flex items-center justify-center p-2 border border-white/5">
            <Image 
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=300&auto=format&fit=crop" 
              alt="Big Sofa" 
              width={100} 
              height={100}
              className="object-contain w-full h-full"
            />
          </div>

          {/* Product Details */}
          <div className="flex-1 space-y-1">
            <h3 className="text-lg font-medium text-white">Big Sofa</h3>
            <p className="text-sm text-gray-400 line-clamp-2">
              A spacious and comfortable big sofa designed to bring style a...
            </p>
            <p className="text-xl text-[#7C4AED] font-bold mt-2">$12</p>
          </div>

          {/* Remove Button */}
          <button className="p-2 text-gray-400 hover:text-red-400 transition-colors">
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* --- RIGHT COLUMN: ORDER SUMMARY --- */}
      <div className="lg:col-span-5">
        <div className="bg-[#15162C] border border-white/5 rounded-2xl p-6 h-full">
          <h2 className="text-2xl font-medium text-white mb-6">Order Summary</h2>
          
          <div className="space-y-3 pb-6 border-b border-white/5">
            <div className="flex justify-between text-gray-300 text-sm">
              <span>Subtotal</span>
              <span className="text-[#7C4AED]">$248.00</span>
            </div>
            <div className="flex justify-between text-gray-300 text-sm">
              <span>Tax</span>
              <span className="text-[#7C4AED]">$9.00</span>
            </div>
          </div>

          <div className="flex justify-between text-white font-medium text-lg pt-6 mb-8">
            <span>Total</span>
            <span className="text-[#7C4AED]">$248.00</span>
          </div>

          <Link href="/feed/marketplace/checkout/payment">
            <button className="w-full bg-[#7C4AED] hover:bg-[#6D39D2] text-white font-medium py-3.5 rounded-xl transition-all shadow-[0_0_15px_rgba(124,74,237,0.2)] hover:shadow-[0_0_25px_rgba(124,74,237,0.4)]">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}