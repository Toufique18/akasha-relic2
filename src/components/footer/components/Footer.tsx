"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import LogoSvg from "@/assets/banner/AKASHA-RELIC-TECH.svg";
import AkashaRelicWatermark from "@/assets/footer/AkashaRelic.svg";

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut"
        }
    }
};

export const Footer = () => {
    return (
        <footer className="relative bg-[#232154] pt-20 pb-6 px-6 md:px-12 lg:px-24 overflow-hidden border-t border-slate-700/30">
            <div className="max-w-7xl mx-auto relative z-10">
                {/* Main Footer Content */}
                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[350px_1fr_1fr_1fr] gap-8 mb-16"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    {/* Akasha Relic Section */}
                    <motion.div className="space-y-6" variants={itemVariants}>
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Link href="/" className="inline-block">
                                <Image
                                    src={LogoSvg}
                                    alt="Akasha Relic Tech"
                                    className="h-11 w-auto object-contain transition-opacity hover:opacity-85"
                                    priority
                                />
                            </Link>
                        </motion.div>

                        <div className="space-y-4 text-slate-300">
                            <motion.p 
                                className="flex items-center gap-3 hover:text-white transition-colors duration-300"
                                whileHover={{ x: 5 }}
                                transition={{ duration: 0.2 }}
                            >
                                <svg
                                    className="w-5 h-5 flex-shrink-0 text-slate-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.75}
                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                    />
                                </svg>
                                <span className="text-[15px] font-medium leading-relaxed">
                                    (405) 555-0128
                                </span>
                            </motion.p>

                            <motion.p 
                                className="flex items-center gap-3 hover:text-white transition-colors duration-300"
                                whileHover={{ x: 5 }}
                                transition={{ duration: 0.2 }}
                            >
                                <svg
                                    className="w-5 h-5 flex-shrink-0 text-slate-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.75}
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                </svg>
                                <span className="text-[15px] font-medium leading-relaxed">
                                    prinstin@example.com
                                </span>
                            </motion.p>

                            <motion.p 
                                className="flex items-start gap-3 hover:text-white transition-colors duration-300"
                                whileHover={{ x: 5 }}
                                transition={{ duration: 0.2 }}
                            >
                                <svg
                                    className="w-5 h-5 flex-shrink-0 text-slate-400 mt-0.5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.75}
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.75}
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                                <span className="text-[15px] font-medium leading-relaxed">
                                    3891 Ranchview Dr. Richardson, California 62639
                                </span>
                            </motion.p>
                        </div>
                    </motion.div>

                    {/* Product Section */}
                    <motion.div variants={itemVariants}>
                        <h3 className="text-lg font-semibold text-white mb-6 font-work-sans">
                            Product
                        </h3>
                        <ul className="space-y-3">
                            {["Updates", "Security", "Mobile App", "Chrome Extension", "iOS Patch"].map((item, index) => (
                                <motion.li 
                                    key={index}
                                    whileHover={{ x: 5 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Link
                                        href="#"
                                        className="text-slate-300 hover:text-white transition-colors duration-300 text-[15px] font-medium"
                                    >
                                        {item}
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Company Service Section */}
                    <motion.div variants={itemVariants}>
                        <h3 className="text-lg font-semibold text-white mb-6 font-work-sans">
                            Company Service
                        </h3>
                        <ul className="space-y-3">
                            {["About Us", "Careers", "Delivery Information", "Privacy Policy", "Terms & Conditions"].map((item, index) => (
                                <motion.li 
                                    key={index}
                                    whileHover={{ x: 5 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Link
                                        href="#"
                                        className="text-slate-300 hover:text-white transition-colors duration-300 text-[15px] font-medium"
                                    >
                                        {item}
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Support Section */}
                    <motion.div variants={itemVariants}>
                        <h3 className="text-lg font-semibold text-white mb-6 font-work-sans">
                            Support
                        </h3>
                        <ul className="space-y-3">
                            {["Help Center", "Talk To Support", "API Settings", "System Status"].map((item, index) => (
                                <motion.li 
                                    key={index}
                                    whileHover={{ x: 5 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Link
                                        href="#"
                                        className="text-slate-300 hover:text-white transition-colors duration-300 text-[15px] font-medium"
                                    >
                                        {item}
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                </motion.div>

                {/* Bottom Bar */}
                <motion.div 
                    className="pt-8 border-t border-slate-700/40 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 relative z-10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <p className="text-slate-400 text-sm text-center sm:text-left">
                        &copy; {new Date().getFullYear()} Akasha Relic. All rights reserved.
                    </p>
                    <div className="flex justify-center gap-6">
                        {/* Facebook */}
                        <motion.a
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-white transition-colors duration-200"
                            aria-label="Facebook"
                            whileHover={{ scale: 1.2, y: -2 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                            </svg>
                        </motion.a>

                        {/* Instagram */}
                        <motion.a
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-white transition-colors duration-200"
                            aria-label="Instagram"
                            whileHover={{ scale: 1.2, y: -2 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            </svg>
                        </motion.a>

                        {/* X (Twitter) */}
                        <motion.a
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-white transition-colors duration-200"
                            aria-label="X"
                            whileHover={{ scale: 1.2, y: -2 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </motion.a>
                    </div>
                </motion.div>
            </div>

            {/* Big brand watermark */}
            <motion.div 
                className="w-full overflow-hidden mt-16 select-none pointer-events-none relative z-0 flex justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.2 }}
            >
                <Image
                    src={AkashaRelicWatermark}
                    alt="akasharelic"
                    className="w-full max-w-[1200px] h-auto object-contain"
                    priority
                />
            </motion.div>
        </footer>
    );
};