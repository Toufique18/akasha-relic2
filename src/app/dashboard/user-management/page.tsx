"use client";

import { Search, ChevronDown, MoreVertical, Eye } from "lucide-react";
import Link from "next/link";

// Mock Data for the table
const users = Array.from({ length: 10 }).map((_, i) => ({
  id: i + 1,
  name: "Jon Manson",
  email: "example123@gmail.com",
  plan: "Basic Plus",
  date: "22 Jan 2025",
  status: i === 5 ? "Blocked" : "Active", // Make one row blocked for demo
}));

export default function UserManagementPage() {
  return (
    <div className="space-y-6">

      {/* --- Top Card / Info Box --- */}
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
        <div className="overflow-x-auto rounded-xl border border-white/5 bg-[#0B0C1E]/50">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#1A1B31]/50 border-b border-white/5">
              <tr>
                <th className="px-6 py-4 text-gray-400 font-medium">Name</th>
                <th className="px-6 py-4 text-gray-400 font-medium">Email Address</th>
                <th className="px-6 py-4 text-gray-400 font-medium">Active Plan</th>
                <th className="px-6 py-4 text-gray-400 font-medium">Join Date</th>
                <th className="px-6 py-4 text-gray-400 font-medium">User Status</th>
                <th className="px-6 py-4 text-gray-400 font-medium text-center">View Profile</th>
                <th className="px-6 py-4 text-gray-400 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 text-white font-medium">{user.name}</td>
                  <td className="px-6 py-4 text-gray-400">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className="inline-block px-3 py-1 rounded-full text-[10px] font-medium bg-[#1E3A8A]/30 text-blue-300 border border-blue-500/20">
                      {user.plan}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400">{user.date}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-medium ${user.status === "Active"
                        ? "bg-green-500/20 text-green-300 border border-green-500/20"
                        : "bg-red-500/20 text-red-300 border border-red-500/20"
                      }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Link href={`/dashboard/user-management/${user.id}`}> {/* <-- Add Link here */}
                      <button className="bg-[#7C4AED] hover:bg-[#6D39D2] text-white px-3 py-1.5 rounded-lg text-[10px] font-medium transition-colors inline-flex items-center gap-1">
                        <Eye className="w-3 h-3" /> View
                      </button>
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                    <button className={`px-3 py-1.5 rounded-lg text-[10px] font-medium transition-colors ${user.status === "Active"
                        ? "bg-red-500/20 text-red-300 hover:bg-red-500/30"
                        : "bg-green-500/20 text-green-300 hover:bg-green-500/30"
                      }`}>
                      {user.status === "Active" ? "Block" : "Unblock"}
                    </button>
                    <button className="px-3 py-1.5 rounded-lg text-[10px] font-medium bg-[#1A1B31] text-gray-400 hover:text-white transition-colors">
                      Delete
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-white">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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