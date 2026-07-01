"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { Logo } from "./Logo";
import { DesktopMenu } from "./DesktopMenu";
import { MobileMenu } from "./MobileMenu";

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
                        className="hidden lg:flex items-center gap-4"
                        variants={buttonVariants}
                        initial="hidden"
                        animate="visible"
                    >
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