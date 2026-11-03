"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { Logo } from "./Logo";
import { DesktopMenu } from "./DesktopMenu";
import { MobileMenu } from "./MobileMenu";
import { useAppSelector } from "@/redux/hook";
import { useDispatch } from "react-redux";
import { reset } from "@/features/auth/store/auth.slice";
import { clearToken } from "@/utils/tokenHandler";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  LayoutDashboard,
  LogOut,
} from "lucide-react";

const navVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
};

const logoVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.5,
            delay: 0.1,
            ease: "easeOut"
        }
    }
};

const buttonVariants: Variants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            delay: 0.2,
            ease: "easeOut"
        }
    }
};

const hamburgerVariants: Variants = {
    hidden: { opacity: 0, rotate: -90 },
    visible: {
        opacity: 1,
        rotate: 0,
        transition: {
            duration: 0.4,
            delay: 0.2,
            ease: "easeOut"
        }
    }
};

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { token, user } = useAppSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleLogout = () => {
        clearToken();
        dispatch(reset());
        window.location.href = "/";
    };

    return (
        <>
            <motion.nav 
                className="w-full border-none bg-[#121222] backdrop-blur-xl top-0 z-50 sticky"
                initial="hidden"
                animate="visible"
                variants={navVariants}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
                    {/* Logo */}
                    <motion.div
                        variants={logoVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Link
                            href="/"
                            className="hover:opacity-80 transition-opacity flex items-center"
                        >
                            <Logo />
                        </Link>
                    </motion.div>

                    {/* Desktop Navigation Links */}
                    <DesktopMenu />

                    {/* Desktop Action Buttons - Hidden on mobile/tablet */}
                    <motion.div 
                        className="hidden lg:flex items-center gap-3"
                        variants={buttonVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {token ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="flex items-center gap-2 bg-[#15162C]/90 hover:bg-[#1E1F3D] border border-white/10 hover:border-[#7C4AED]/60 text-white pl-2 pr-3.5 py-1.5 rounded-full text-xs lg:text-sm font-medium transition-all shadow-[0_0_15px_rgba(124,74,237,0.15)] cursor-pointer outline-none">
                                        <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#7C4AED] to-[#A78BFA] flex items-center justify-center text-white font-bold text-xs shadow-inner">
                                            {user?.firstName ? user.firstName.charAt(0).toUpperCase() : "U"}
                                        </div>
                                        <span className="max-w-[120px] truncate">
                                            {user?.firstName ? `Hi, ${user.firstName}` : "Account"}
                                        </span>
                                        <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                                    </button>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent
                                    align="end"
                                    className="w-56 bg-[#12132A]/95 backdrop-blur-xl border border-white/10 text-white rounded-2xl p-2 shadow-2xl z-[100]"
                                >
                                    {/* User Info Header */}
                                    <div className="px-3 py-2 bg-white/[0.03] rounded-xl mb-1 border border-white/5">
                                        <p className="text-sm font-semibold text-white truncate">
                                            {user?.firstName ? `${user.firstName} ${user.lastName || ""}` : "Akasha User"}
                                        </p>
                                        <p className="text-xs text-gray-400 truncate mt-0.5">
                                            {user?.email || ""}
                                        </p>
                                    </div>

                                    <DropdownMenuSeparator className="bg-white/5 my-1" />

                                    {/* User Dashboard */}
                                    <DropdownMenuItem asChild>
                                        <Link
                                            href={user?.role === "ADMIN" ? "/dashboard" : "/feed"}
                                            className="flex items-center gap-2.5 px-3 py-2 text-xs rounded-xl hover:bg-[#7C4AED]/20 hover:text-white transition-colors cursor-pointer text-gray-200"
                                        >
                                            <LayoutDashboard className="w-4 h-4 text-[#A78BFA]" />
                                            <span>User Dashboard</span>
                                        </Link>
                                    </DropdownMenuItem>

                                    <DropdownMenuSeparator className="bg-white/5 my-1" />

                                    {/* Logout */}
                                    <DropdownMenuItem
                                        onClick={handleLogout}
                                        className="flex items-center gap-2.5 px-3 py-2 text-xs rounded-xl text-red-400 hover:bg-red-500/15 hover:text-red-300 transition-colors cursor-pointer"
                                    >
                                        <LogOut className="w-4 h-4 text-red-400" />
                                        <span>Log Out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Link
                                        href="/login"
                                        className="border border-[#7C4AED]/45 hover:border-[#7C4AED] hover:bg-[#7C4AED]/10 text-white/90 hover:text-white px-5 py-2 rounded-xl text-xs lg:text-sm font-semibold tracking-wide transition-all cursor-pointer"
                                    >
                                        Sign in
                                    </Link>
                                </motion.div>
                                <motion.div
                                    whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(124,74,237,0.5)" }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Link
                                        href="/register"
                                        className="bg-[#7C4AED] hover:bg-[#6D39D2] text-white px-5 py-2.5 rounded-xl text-xs lg:text-sm font-bold tracking-wide transition-all shadow-[0_0_20px_rgba(124,74,237,0.3)] hover:scale-105 active:scale-95 cursor-pointer"
                                    >
                                        Get Started
                                    </Link>
                                </motion.div>
                            </>
                        )}
                    </motion.div>

                    {/* Mobile Menu Button */}
                    <motion.div 
                        className="flex items-center gap-3 lg:hidden"
                        variants={hamburgerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {/* Mobile Action Button - Get Started (filled, smaller version) */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link
                                href="/register"
                                className="bg-[#7C4AED] hover:bg-[#6D39D2] text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-[10px] sm:text-xs font-bold tracking-wide transition-all shadow-[0_0_15px_rgba(124,74,237,0.3)] hover:scale-105 active:scale-95"
                            >
                                Get Started
                            </Link>
                        </motion.div>

                        {/* Hamburger Icon */}
                        <motion.button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none z-50"
                            aria-label="Toggle menu"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <motion.span
                                className={`block w-6 h-0.5 bg-white transition-all duration-300 ease-out`}
                                animate={{
                                    rotate: isMenuOpen ? 45 : 0,
                                    translateY: isMenuOpen ? 8 : 0
                                }}
                                transition={{ duration: 0.3 }}
                            />
                            <motion.span
                                className={`block w-6 h-0.5 bg-white transition-all duration-300 ease-out`}
                                animate={{
                                    opacity: isMenuOpen ? 0 : 1
                                }}
                                transition={{ duration: 0.3 }}
                            />
                            <motion.span
                                className={`block w-6 h-0.5 bg-white transition-all duration-300 ease-out`}
                                animate={{
                                    rotate: isMenuOpen ? -45 : 0,
                                    translateY: isMenuOpen ? -8 : 0
                                }}
                                transition={{ duration: 0.3 }}
                            />
                        </motion.button>
                    </motion.div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </>
    );
};