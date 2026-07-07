"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface SuccessProps {
  orderId?: string;
  date?: string;
  productName?: string;
  totalPrice?: string;
}

export const GallerySuccess = ({ 
  orderId = "#ORD-254781", 
  date = "19-05-2026 06:01 PM", 
  productName = "Butterfly Transformation", 
  totalPrice = "$141.97" 
}: SuccessProps) => {
  return (
    <section className="w-full min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-lg bg-[#15162C] border border-white/5 rounded-2xl p-8 sm:p-10 shadow-2xl overflow-hidden"
      >
        {/* Subtle Inner Glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-[#7C4AED]/10 to-transparent rounded-2xl blur-xl -z-10 opacity-50" />

        {/* --- Success Icon --- */}
        <div className="flex justify-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
            className="w-20 h-20 rounded-full bg-[#22C55E] flex items-center justify-center shadow-[0_0_40px_rgba(34,197,94,0.4)]"
          >
            {/* Green Checkmark SVG */}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="white" 
              strokeWidth="4" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="w-10 h-10"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </motion.div>
        </div>

        {/* --- Headings --- */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-serif text-white mb-2">
            Order Placed Successfully
          </h2>
          <p className="text-gray-400 text-sm">
            Thank you for your purchase
          </p>
        </div>

        {/* --- Order Details --- */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-white mb-3">Order Details</h3>
          
          <div className="bg-[#0B0C1E]/80 border border-white/5 rounded-xl overflow-hidden divide-y divide-white/5">
            {/* Row 1 */}
            <div className="flex justify-between px-5 py-3.5">
              <span className="text-sm text-gray-400">Order ID</span>
              <span className="text-sm text-white font-medium">{orderId}</span>
            </div>
            
            {/* Row 2 */}
            <div className="flex justify-between px-5 py-3.5">
              <span className="text-sm text-gray-400">Purchase Date & Time</span>
              <span className="text-sm text-white">{date}</span>
            </div>
            
            {/* Row 3 */}
            <div className="flex justify-between px-5 py-3.5">
              <span className="text-sm text-gray-400">Product Summary</span>
              <span className="text-sm text-white">{productName}</span>
            </div>
            
            {/* Row 4 */}
            <div className="flex justify-between px-5 py-3.5">
              <span className="text-sm text-gray-400">Payment:</span>
              <span className="text-sm text-white font-medium">Card</span>
            </div>
            
            {/* Row 5 (Total) */}
            <div className="flex justify-between px-5 py-4 bg-[#7C4AED]/5">
              <span className="text-base font-medium text-white">Total</span>
              <span className="text-base font-bold text-white">{totalPrice}</span>
            </div>
          </div>
        </div>

        {/* --- Action Button --- */}
        <Link href="/memorials/gallery">
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: "0 0 25px rgba(124,74,237,0.4)" }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-[#7C4AED] hover:bg-[#6D39D2] text-white font-medium py-3.5 rounded-xl transition-all shadow-[0_0_15px_rgba(124,74,237,0.2)]"
          >
            Return to Dashboard
          </motion.button>
        </Link>
      </motion.div>
    </section>
  );
};