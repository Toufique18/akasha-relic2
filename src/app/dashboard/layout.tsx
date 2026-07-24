"use client";

import { AdminSidebar } from "@/components/admin-sidebar/AdminSidebar";
import { Bell } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#020215] flex">
      <AdminSidebar />
      <div className="flex-1 ml-[260px] flex flex-col min-h-screen">
        <header className="h-20 bg-[#0B0C1E] border-b border-white/5 flex items-center justify-between px-8 sticky top-0 z-40 backdrop-blur-sm">
          <h1 className="text-xl font-medium text-white hidden md:block">Dashboard</h1>
          <div className="flex items-center gap-4 ml-auto">
            <button className="w-10 h-10 rounded-full bg-[#1A1B31] border border-white/5 flex items-center justify-center hover:border-[#7C4AED] transition-colors relative">
              <Bell className="w-5 h-5 text-gray-400" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="w-10 h-10 rounded-full bg-[#7C4AED] border border-[#7C4AED] flex items-center justify-center text-white font-bold text-sm cursor-pointer">
              AD
            </div>
          </div>
        </header>
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}