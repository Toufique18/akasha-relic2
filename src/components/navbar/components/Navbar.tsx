"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "./Logo";
import { DesktopMenu } from "./DesktopMenu";
import { MobileMenu } from "./MobileMenu";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="w-full border-none bg-[#121222] backdrop-blur-xl top-0 z-50 sticky">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="hover:opacity-80 transition-opacity flex items-center"
          >
            <Logo />
          </Link>

          {/* Desktop Navigation Links */}
          <DesktopMenu />

          {/* Desktop Action Buttons - Hidden on mobile/tablet */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/login"
              className="border border-[#7C4AED]/45 hover:border-[#7C4AED] hover:bg-[#7C4AED]/10 text-white/90 hover:text-white px-5 py-2 rounded-xl text-xs lg:text-sm font-semibold tracking-wide transition-all cursor-pointer"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="bg-[#7C4AED] hover:bg-[#6D39D2] text-white px-5 py-2.5 rounded-xl text-xs lg:text-sm font-bold tracking-wide transition-all shadow-[0_0_20px_rgba(124,74,237,0.3)] hover:scale-105 active:scale-95 cursor-pointer"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 lg:hidden">
            {/* Mobile Action Button - Get Started (filled, smaller version) */}
            <Link
              href="/register"
              className="bg-[#7C4AED] hover:bg-[#6D39D2] text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-[10px] sm:text-xs font-bold tracking-wide transition-all shadow-[0_0_15px_rgba(124,74,237,0.3)] hover:scale-105 active:scale-95"
            >
              Get Started
            </Link>

            {/* Hamburger Icon */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none z-50"
              aria-label="Toggle menu"
            >
              <span
                className={`block w-6 h-0.5 bg-white transition-all duration-300 ease-out ${
                  isMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-white transition-all duration-300 ease-out ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-white transition-all duration-300 ease-out ${
                  isMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};
