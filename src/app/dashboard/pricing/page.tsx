"use client";

import { motion } from "framer-motion";
import { Search, ChevronDown, MoreVertical, Eye, Plus, Pencil, Trash2 } from "lucide-react";

// --- Mock Data for Subscription Plans ---
const plans = [
  {
    name: "Free",
    price: "$0",
    description: "50 credits (One-time welcome bonus)",
    color: "text-white",
    bgColor: "bg-[#15162C]",
  },
  {
    name: "Basic Plus",
    price: "$14",
    description: "500 credits",
    color: "text-white",
    bgColor: "bg-[#15162C]",
  },
  {
    name: "Advance Plus",
    price: "$20",
    description: "1200 credits",
    color: "text-white",
    bgColor: "bg-[#15162C]",
  },
];

// --- Mock Data for User Subscription Table ---
const mockUsers = [
  { id: "LGC-2026-YLAHA2RN", email: "example123@gmail.com", plan: "Free", date: "22/02/26", amount: "$16", status: "Paid" },
  { id: "LGC-2026-YLAHA2RN", email: "example123@gmail.com", plan: "Basic Plus", date: "22/02/26", amount: "$16", status: "Paid" },
  { id: "LGC-2026-YLAHA2RN", email: "example123@gmail.com", plan: "Advance Plus", date: "22/02/26", amount: "$16", status: "Paid" },
  { id: "LGC-2026-YLAHA2RN", email: "example123@gmail.com", plan: "Basic Plus", date: "22/02/26", amount: "$16", status: "Failed" },
];

export default function PricingPlanPage() {
  return (
    <div className="space-y-8">
      
      {/* ================= TOP SECTION: PLAN MANAGEMENT ================= */}
      <div className="bg-[#15162C] border border-white/5 rounded-2xl p-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-base font-medium text-white">Subscription Plan Management</h2>
          <button className="flex items-center justify-center gap-2 bg-[#7C4AED] hover:bg-[#6D39D2] text-white text-sm font-medium px-4 py-2 rounded-xl transition-all shadow-[0_0_15px_rgba(124,74,237,0.2)] hover:shadow-[0_0_25px_rgba(124,74,237,0.4)]">
            <Plus className="w-4 h-4" />
            Add Plan
          </button>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className={`${plan.bgColor} border border-white/5 rounded-xl p-6 flex flex-col justify-between min-h-[180px] hover:border-[#7C4AED]/30 transition-all duration-300`}
            >
              <div>
                <h3 className="text-lg font-medium text-white mb-1">{plan.name}</h3>
                <p className="text-3xl font-bold text-white mb-2">{plan.price}</p>
                <p className="text-xs text-gray-400">{plan.description}</p>
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/5">
                <button className="flex-1 flex items-center justify-center gap-1.5 bg-[#1A1B31] hover:bg-white/5 text-gray-300 text-[11px] py-1.5 rounded-lg transition-colors border border-white/5">
                  <Pencil className="w-3 h-3" />
                  Edit Plan
                </button>
                <button className="flex-1 flex items-center justify-center gap-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-[11px] py-1.5 rounded-lg transition-colors">
                  <Trash2 className="w-3 h-3" />
                  Delete Plan
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ================= BOTTOM SECTION: USER INFORMATION ================= */}
      <div className="bg-[#15162C] border border-white/5 rounded-2xl p-6 space-y-6">
        <h2 className="text-base font-medium text-white">User Information</h2>

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
                  <th className="px-5 py-4 text-gray-400 font-medium whitespace-nowrap">Transaction ID</th>
                  <th className="px-5 py-4 text-gray-400 font-medium whitespace-nowrap">Customer Email Address</th>
                  <th className="px-5 py-4 text-gray-400 font-medium whitespace-nowrap">Plan Name</th>
                  <th className="px-5 py-4 text-gray-400 font-medium whitespace-nowrap">Date</th>
                  <th className="px-5 py-4 text-gray-400 font-medium whitespace-nowrap">Amount</th>
                  <th className="px-5 py-4 text-gray-400 font-medium whitespace-nowrap">Payment Status</th>
                  <th className="px-5 py-4 text-gray-400 font-medium text-center whitespace-nowrap">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {mockUsers.map((user, index) => (
                  <motion.tr 
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03, duration: 0.3 }}
                    className="hover:bg-white/5 transition-colors group"
                  >
                    <td className="px-5 py-4 text-white font-medium whitespace-nowrap text-xs">{user.id}</td>
                    <td className="px-5 py-4 text-gray-400 text-xs whitespace-nowrap">{user.email}</td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-medium border border-white/10 ${
                        user.plan === "Free" ? "bg-gray-500/20 text-gray-300" :
                        user.plan === "Basic Plus" ? "bg-blue-500/20 text-blue-300" :
                        "bg-purple-500/20 text-purple-300"
                      }`}>
                        {user.plan}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-gray-400 text-xs whitespace-nowrap">{user.date}</td>
                    <td className="px-5 py-4 text-gray-300 text-xs whitespace-nowrap">{user.amount}</td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-medium ${
                        user.status === "Paid" 
                          ? "bg-green-500/20 text-green-300 border border-green-500/20" 
                          : "bg-red-500/20 text-red-300 border border-red-500/20"
                      }`}>
                        {user.status}
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