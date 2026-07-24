"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ArrowLeft, ChevronDown, MessageCircle, MoreHorizontal } from "lucide-react";

// Mock Data for the User's Memories/Posts
const mockMemories = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    title: "I want to tell you somethi...",
    date: "22 Feb 2026",
    isPublic: true,
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
    title: "Some Advise for My Next...",
    date: "22 Feb 2026",
    isPublic: true,
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?q=80&w=800&auto=format&fit=crop",
    title: "A few words from my part...",
    date: "22 Feb 2026",
    isPublic: true,
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
    title: "A Memorial Day with My D...",
    date: "22 Feb 2026",
    isPublic: true,
  },
];

// Mock Activity Feed
const mockActivities = [
  { id: 1, action: "Create a 3d Avatar", time: "20 minutes ago" },
  { id: 2, action: "Publish a memorial Creation", time: "20 minutes ago" },
  { id: 3, action: "Purchase a asset", time: "20 minutes ago" },
];

export const UserDetailView = () => {
  const [activeTab, setActiveTab] = useState<"memories" | "assets">("memories");

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* --- Top Navigation & Header --- */}
      <div className="flex flex-col gap-6">
        <Link
          href="/dashboard/user-management"
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>User Profile</span>
        </Link>

        {/* Profile Header Card */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-transparent border-b border-white/5 pb-6">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="w-16 h-16 rounded-full bg-[#1A1B31] border border-white/10 overflow-hidden shrink-0">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop" 
                alt="User Avatar" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Name & Email */}
            <div>
              <h2 className="text-2xl font-medium text-white">Mason Clarke</h2>
              <p className="text-sm text-gray-400">example123@gmail.com</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button className="bg-red-500 hover:bg-red-600 text-white text-xs font-medium px-4 py-2 rounded-lg transition-colors">
              Block User
            </button>
            <button className="bg-[#2A2A3E] hover:bg-[#3A3A52] text-white text-xs font-medium px-4 py-2 rounded-lg transition-colors">
              Delete Account
            </button>
          </div>
        </div>
      </div>

      {/* --- 2-Column Layout --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- LEFT COLUMN: Memories & Assets (2/3 width) --- */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Tabs */}
          <div className="flex items-center gap-8 border-b border-white/5 pb-2">
            <button 
              onClick={() => setActiveTab("memories")}
              className={`text-sm font-medium pb-2 transition-colors ${activeTab === "memories" ? "text-[#7C4AED] border-b-2 border-[#7C4AED]" : "text-gray-400 hover:text-white"}`}
            >
              Creation Memories
            </button>
            <button 
              onClick={() => setActiveTab("assets")}
              className={`text-sm font-medium pb-2 transition-colors ${activeTab === "assets" ? "text-[#7C4AED] border-b-2 border-[#7C4AED]" : "text-gray-400 hover:text-white"}`}
            >
              Assets
            </button>
          </div>

          {/* Memories Grid */}
          {activeTab === "memories" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {mockMemories.map((memory) => (
                <motion.div 
                  key={memory.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[#15162C] border border-white/5 rounded-2xl overflow-hidden hover:border-[#7C4AED]/30 transition-all duration-300 group"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#1A1B31]">
                    <img 
                      src={memory.image} 
                      alt={memory.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Privacy Badge */}
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/60 backdrop-blur-sm text-white text-[10px] px-2.5 py-1 rounded-full border border-white/10">
                      <span className="w-1.5 h-1.5 bg-white rounded-full" />
                      {memory.isPublic ? "Public" : "Private"}
                      <ChevronDown className="w-3 h-3 ml-0.5" />
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-white" />
                      <span className="text-white text-sm font-medium truncate max-w-[120px]">{memory.title}</span>
                    </div>
                    <span className="text-gray-400 text-[10px]">{memory.date}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
          
          {/* Placeholder for Assets Tab */}
          {activeTab === "assets" && (
            <div className="bg-[#15162C] border border-white/5 rounded-2xl p-10 text-center text-gray-400 text-sm">
              No assets found for this user.
            </div>
          )}
        </div>

        {/* --- RIGHT COLUMN: All Activity (1/3 width) --- */}
        <div className="lg:col-span-1">
          <div className="bg-[#15162C] border border-white/5 rounded-2xl p-6 h-full min-h-[400px]">
            <h3 className="text-white text-base font-medium mb-6">All Activity</h3>
            
            <div className="space-y-6">
              {mockActivities.map((activity, index) => (
                <div key={activity.id} className="flex gap-4 relative pl-3">
                  {/* Vertical line connector */}
                  {index !== mockActivities.length - 1 && (
                    <div className="absolute left-3 top-4 bottom-[-30px] w-[1px] bg-white/10" />
                  )}
                  
                  {/* Dot */}
                  <div className="w-2 h-2 rounded-full bg-white shrink-0 mt-1.5" />
                  
                  {/* Content */}
                  <div>
                    <p className="text-sm text-white">{activity.action}</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
};