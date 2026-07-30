"use client";

import Link from "next/link";
import Image from "next/image";
import { Globe, User, Calendar, Sparkles, ShoppingBag, Box } from "lucide-react";
import { usePathname } from "next/navigation";
import Logo from "@/assets/banner/AKASHA-RELIC-TECH.svg";

export default function FeedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#020215] relative">

      {/* ====== SHARED USER DASHBOARD NAVBAR ====== */}
      <nav className="bg-[#0B0C1E]/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-50 px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-4">

        {/* Left: Brand Logo */}
        <Link href="/feed" className="flex items-center gap-2 shrink-0 cursor-pointer">
          <div className="relative w-28 h-8">
            <Image src={Logo} alt="Akasha Relic Tech" fill className="object-contain" />
          </div>
        </Link>

        {/* Center: Dashboard Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-gray-300 w-full sm:w-auto">
          <Link
            href="/feed"
            className={`flex items-center gap-1.5 transition-colors ${pathname === "/feed" ? "text-[#A78BFA]" : "hover:text-white"}`}
          >
            <Globe className="w-3.5 h-3.5" /> Explore Creation
          </Link>
          <Link
            href="/feed/my-stuff/memories"
            className={`flex items-center gap-1.5 transition-colors ${pathname.startsWith("/feed/my-stuff") ? "text-[#A78BFA]" : "hover:text-white"}`}
          >
            <User className="w-3.5 h-3.5" /> My Memories & Assets
          </Link>

          <Link href="#" className="hover:text-white flex items-center gap-1.5 transition-colors">
            <Sparkles className="w-3.5 h-3.5" /> Creation Station
          </Link>
          <Link
            href="/feed/marketplace"
            className={`flex items-center gap-1.5 transition-colors ${pathname === "/feed/marketplace" ? "text-[#A78BFA]" : "hover:text-white"}`}
          >
            <ShoppingBag className="w-3.5 h-3.5" /> Marketplace
          </Link>
          <Link href="#" className="hover:text-white flex items-center gap-1.5 transition-colors">
            <Box className="w-3.5 h-3.5" /> Join Metaverse
          </Link>
        </div>

        {/* Right: User Avatar */}
        <div className="w-8 h-8 rounded-full bg-[#7C4AED] flex items-center justify-center text-white text-xs font-bold cursor-pointer shrink-0 hover:bg-[#6D39D2] transition-colors">
          U
        </div>
      </nav>

      {/* ====== PAGE CONTENT ====== */}
      <div className="w-full relative">
        {children}
      </div>
    </div>
  );
}