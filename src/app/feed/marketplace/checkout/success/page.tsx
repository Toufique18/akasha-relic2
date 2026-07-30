"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { BadgeCheck } from "lucide-react";

export default function CheckoutSuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center max-w-3xl mx-auto py-10">
      
      {/* Success Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="w-28 h-28 rounded-full bg-[#10B981] flex items-center justify-center mb-6 shadow-[0_0_60px_rgba(16,185,129,0.3)]"
      >
        <BadgeCheck className="w-16 h-16 text-white" />
      </motion.div>

      {/* Headings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-10"
      >
        <h1 className="text-3xl font-medium text-white mb-2">Purchase Confirmed!</h1>
        <p className="text-sm text-gray-400">Order Id : LGC-2026-YLAHA2RN</p>
      </motion.div>

      {/* Order Details Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="w-full bg-[#15162C] border border-white/5 rounded-2xl p-6"
      >
        <div className="flex items-center gap-4 pb-6 border-b border-white/5">
          <div className="w-20 h-20 shrink-0 bg-[#0B0C1E] rounded-xl overflow-hidden flex items-center justify-center p-2 border border-white/5">
            <Image 
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=300&auto=format&fit=crop" 
              alt="Big Sofa" 
              width={80} 
              height={80}
              className="object-contain w-full h-full"
            />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-medium text-white">Big Sofa</h3>
              <span className="text-[#7C4AED] font-medium">$28</span>
            </div>
            <p className="text-sm text-gray-400 line-clamp-1 mt-1">
              A spacious and comfortable big sofa designed to b...
            </p>
          </div>
        </div>

        <div className="space-y-3 pt-6">
          <div className="flex justify-between text-gray-300 text-sm">
            <span>Subtotal</span>
            <span className="text-[#7C4AED]">$28.00</span>
          </div>
          <div className="flex justify-between text-gray-300 text-sm">
            <span>Tax</span>
            <span className="text-[#7C4AED]">$9.00</span>
          </div>
          <div className="flex justify-between text-white font-medium text-lg pt-4 border-t border-white/5">
            <span>Total</span>
            <span className="text-[#7C4AED] font-bold">$37.00</span>
          </div>
        </div>
      </motion.div>

    </div>
  );
}