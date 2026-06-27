"use client";

import Link from "next/link";
import { NAV_LINKS } from "../navbar.constants";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  return (
    <div
      className={`fixed inset-0 bg-blue-950/95 backdrop-blur-xl z-40 transition-all duration-300 ease-in-out lg:hidden ${
        isOpen
          ? "opacity-100 visible"
          : "opacity-0 invisible pointer-events-none"
      }`}
    >
      <div className="flex flex-col items-center justify-center min-h-screen space-y-6 p-4">
        {/* Mobile Navigation Links */}
        <ul className="flex flex-col items-center gap-4 w-full max-w-xs">
          {NAV_LINKS.map((link, index) => (
            <li
              key={link.name}
              className="w-full text-center transform transition-all duration-300"
              style={{
                transitionDelay: isOpen ? `${index * 50}ms` : "0ms",
              }}
            >
              {link.children ? (
                <div className="flex flex-col items-center">
                  <span className="block text-lg sm:text-xl font-medium tracking-wide text-white/50 py-1">
                    {link.name}
                  </span>
                  <ul className="flex flex-col items-center gap-1.5 mt-1">
                    {link.children.map((child) => (
                      <li key={child.name}>
                        <Link
                          href={child.href}
                          onClick={onClose}
                          className="block text-sm sm:text-base font-medium tracking-wide text-white/90 hover:text-[#B594FF] transition-colors py-1"
                        >
                          {child.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <Link
                  href={link.href || "#"}
                  onClick={onClose}
                  className="block text-lg sm:text-xl font-medium tracking-wide text-white/90 hover:text-[#B594FF] transition-colors py-2 hover:scale-105 transform"
                >
                  {link.name}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile Action Buttons */}
        <div className="flex flex-col gap-3 w-full max-w-xs mt-6">
          <Link
            href="/register"
            onClick={onClose}
            className="w-full text-center bg-[#7C4AED] hover:bg-[#6D39D2] text-white py-3 rounded-xl text-sm sm:text-base font-bold tracking-wide transition-all shadow-[0_0_20px_rgba(124,74,237,0.3)] hover:scale-105 active:scale-95"
          >
            Get Started
          </Link>
          <Link
            href="/login"
            onClick={onClose}
            className="w-full text-center border border-[#7C4AED]/45 hover:border-[#7C4AED] hover:bg-[#7C4AED]/10 text-white py-3 rounded-xl text-sm sm:text-base font-semibold tracking-wide transition-all"
          >
            Sign in
          </Link>
        </div>

        {/* Close hint */}
        <p className="absolute bottom-8 text-white/40 text-xs tracking-wider">
          Tap outside or click menu to close
        </p>
      </div>
    </div>
  );
};
