"use client";

import Link from "next/link";
import Image from "next/image";
import { Globe, User, Sparkles, ShoppingBag, Box, LogOut, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/hook";
import { reset } from "@/features/auth/store/auth.slice";
import { clearToken } from "@/utils/tokenHandler";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Logo from "@/assets/banner/AKASHA-RELIC-TECH.svg";

export default function FeedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    clearToken();
    dispatch(reset());
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-[#020215] relative">
      {/* ====== SHARED USER DASHBOARD NAVBAR ====== */}
      <nav className="bg-[#0B0C1E]/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-50 px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left: Brand Logo (Links to Main Page) */}
        <Link
          href="/"
          className="flex items-center gap-2 shrink-0 cursor-pointer hover:opacity-85 transition-opacity"
          title="Back to Home Page"
        >
          <div className="relative w-28 h-8">
            <Image
              src={Logo}
              alt="Akasha Relic Tech"
              fill
              className="object-contain"
            />
          </div>
        </Link>

        {/* Center: Dashboard Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-gray-300 w-full sm:w-auto">
          <Link
            href="/feed"
            className={`flex items-center gap-1.5 transition-colors ${
              pathname === "/feed" ? "text-[#A78BFA]" : "hover:text-white"
            }`}
          >
            <Globe className="w-3.5 h-3.5" /> Explore Creation
          </Link>
          <Link
            href="/feed/my-stuff/memories"
            className={`flex items-center gap-1.5 transition-colors ${
              pathname.startsWith("/feed/my-stuff")
                ? "text-[#A78BFA]"
                : "hover:text-white"
            }`}
          >
            <User className="w-3.5 h-3.5" /> My Memories & Assets
          </Link>

          <Link
            href="#"
            className="hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" /> Creation Station
          </Link>
          <Link
            href="/feed/marketplace"
            className={`flex items-center gap-1.5 transition-colors ${
              pathname === "/feed/marketplace"
                ? "text-[#A78BFA]"
                : "hover:text-white"
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" /> Marketplace
          </Link>
          <Link
            href="#"
            className="hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <Box className="w-3.5 h-3.5" /> Join Metaverse
          </Link>
        </div>

        {/* Right: User Avatar & Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 bg-[#1A1B31]/80 hover:bg-[#252646] border border-white/5 hover:border-[#7C4AED]/40 text-white pl-1.5 pr-2.5 py-1 rounded-full text-xs font-medium transition-all cursor-pointer outline-none">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#7C4AED] to-[#A78BFA] flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-inner">
                {user?.firstName ? user.firstName.charAt(0).toUpperCase() : "U"}
              </div>
              <span className="hidden sm:inline-block max-w-[100px] truncate">
                {user?.firstName || "Account"}
              </span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-52 bg-[#12132A]/95 backdrop-blur-xl border border-white/10 text-white rounded-2xl p-2 shadow-2xl z-[100]"
          >
            <div className="px-3 py-2 bg-white/[0.03] rounded-xl mb-1 border border-white/5">
              <p className="text-sm font-semibold text-white truncate">
                {user?.firstName
                  ? `${user.firstName} ${user.lastName || ""}`
                  : "User"}
              </p>
              <p className="text-xs text-gray-400 truncate mt-0.5">
                {user?.email || ""}
              </p>
            </div>

            <DropdownMenuSeparator className="bg-white/5 my-1" />

            {/* Log Out */}
            <DropdownMenuItem
              onClick={handleLogout}
              className="flex items-center gap-2.5 px-3 py-2 text-xs rounded-xl text-red-400 hover:bg-red-500/15 hover:text-red-300 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4 text-red-400" />
              <span>Log Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>

      {/* ====== PAGE CONTENT ====== */}
      <div className="w-full relative">{children}</div>
    </div>
  );
}