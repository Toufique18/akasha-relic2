"use client";

import { motion } from "framer-motion";
import { Search, ChevronDown, MoreVertical, Eye } from "lucide-react";
import Link from "next/link";

// --- Mock Data for Orders ---
const mockOrders = Array.from({ length: 8 }).map((_, i) => ({
  id: "LGC-2026-YLAHA2RN",
  customer: "example123@gmail.com",
  product: "Big Sofa",
  date: "22/02/26",
  amount: "$16",
  status: i % 3 === 1 ? "Failed" : "Paid", // Randomly assign Failed status
}));

export default function OrderManagementPage() {
  return (
    <div className="space-y-6">
      
      {/* --- Top Card / Info Box --- */}
      <div className="bg-[#15162C] border border-white/5 rounded-2xl p-6 space-y-6">
        <h2 className="text-base font-medium text-white">Order Information</h2>

        {/* Filters Row */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search name or email address ..." 
              className="w-full bg-[#0B0C1E]/80 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-[#7C4AED] focus:ring-1 focus:ring-[#7C4AED]"
            />
          </div>
          
          <div className="flex items-center gap-2 bg-[#0B0C1E]/80 border border-white/10 rounded-xl px-4 py-2.5 cursor-pointer hover:border-[#7C4AED] transition-colors min-w-[140px]">
            <span className="text-sm text-white flex-1">All User</span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </div>
        </div>

        {/* --- Data Table --- */}
        <div className="overflow-hidden rounded-xl border border-white/5 bg-[#0B0C1E]/50">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left text-sm">
              <thead className="bg-transparent border-b border-white/5">
                <tr>
                  <th className="px-5 py-4 text-gray-400 font-medium whitespace-nowrap">Order ID</th>
                  <th className="px-5 py-4 text-gray-400 font-medium whitespace-nowrap">Customer Email Address</th>
                  <th className="px-5 py-4 text-gray-400 font-medium whitespace-nowrap">Product Name</th>
                  <th className="px-5 py-4 text-gray-400 font-medium whitespace-nowrap">Date</th>
                  <th className="px-5 py-4 text-gray-400 font-medium whitespace-nowrap">Amount</th>
                  <th className="px-5 py-4 text-gray-400 font-medium whitespace-nowrap">Payment Status</th>
                  <th className="px-5 py-4 text-gray-400 font-medium text-center whitespace-nowrap">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {mockOrders.map((order, index) => (
                  <motion.tr 
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03, duration: 0.3 }}
                    className="hover:bg-white/5 transition-colors group"
                  >
                    <td className="px-5 py-4 text-white font-medium whitespace-nowrap text-xs">
                      {order.id}
                    </td>
                    <td className="px-5 py-4 text-gray-400 text-xs whitespace-nowrap">
                      {order.customer}
                    </td>
                    <td className="px-5 py-4 text-gray-300 text-xs whitespace-nowrap">
                      {order.product}
                    </td>
                    <td className="px-5 py-4 text-gray-400 text-xs whitespace-nowrap">
                      {order.date}
                    </td>
                    <td className="px-5 py-4 text-gray-300 text-xs whitespace-nowrap">
                      {order.amount}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span 
                        className={`inline-block px-3 py-1 rounded-full text-[10px] font-medium ${
                          order.status === "Paid" 
                            ? "bg-green-500/20 text-green-300 border border-green-500/20" 
                            : "bg-red-500/20 text-red-300 border border-red-500/20"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-2">
                        <button className="bg-[#7C4AED] hover:bg-[#6D39D2] text-white px-3 py-1.5 rounded-lg text-[10px] font-medium transition-colors inline-flex items-center gap-1 shadow-[0_0_10px_rgba(124,74,237,0.15)]">
                          <Eye className="w-3 h-3" /> View
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-white transition-colors">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- Pagination --- */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-xs text-gray-400">
          <span>Showing 1 to 24 of 1250 entries</span>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-lg bg-[#1A1B31] border border-white/5 hover:border-[#7C4AED] hover:text-white transition-colors flex items-center justify-center text-gray-500">1</button>
            <button className="w-8 h-8 rounded-lg border border-white/5 hover:border-[#7C4AED] hover:text-white transition-colors flex items-center justify-center text-gray-500 hover:bg-[#1A1B31]">2</button>
            <button className="w-8 h-8 rounded-lg border border-white/5 hover:border-[#7C4AED] hover:text-white transition-colors flex items-center justify-center text-gray-500 hover:bg-[#1A1B31]">3</button>
            <span className="px-1">...</span>
            <button className="w-8 h-8 rounded-lg border border-white/5 hover:border-[#7C4AED] hover:text-white transition-colors flex items-center justify-center text-gray-500 hover:bg-[#1A1B31]">10</button>
            <button className="w-8 h-8 rounded-lg border border-white/5 hover:border-[#7C4AED] hover:text-white transition-colors flex items-center justify-center text-gray-500 hover:bg-[#1A1B31]">
              <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}