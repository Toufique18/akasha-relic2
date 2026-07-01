"use client";

import Image from "next/image";
import React from "react";
import { motion, Variants } from "framer-motion";
import parties from "@/assets/home/parties.svg";

const systems = [
    {
        title: "01. INITIALIZATION",
        description: "Synthesize your digital twin with hyper-realistic fidelity. Manage neural imprints and visual manifestations.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <circle cx="12" cy="8" r="5" />
                <path d="M20 21a8 8 0 0 0-16 0" />
                <circle cx="12" cy="8" r="1" />
            </svg>
        ),
        active: true
    },
    {
        title: "02. AVATAR SYNTHESIS",
        description: "Immersive VR/AR integration allows seamless transitions between physical and digital planes of existence.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <path d="M3 7V5a2 2 0 0 1 2-2h2" />
                <path d="M17 3h2a2 2 0 0 1 2 2v2" />
                <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
                <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
                <rect x="7" y="7" width="10" height="10" rx="2" />
            </svg>
        ),
    },
    {
        title: "03. PORTAL ACCESS",
        description: "Connect with a global network of Relic users in decentralized community hubs and shared social voids.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <circle cx="12" cy="12" r="3" />
                <circle cx="19" cy="5" r="2" />
                <circle cx="5" cy="19" r="2" />
                <circle cx="19" cy="19" r="2" />
                <circle cx="5" cy="5" r="2" />
                <line x1="12" y1="12" x2="19" y2="5" />
                <line x1="12" y1="12" x2="5" y2="19" />
                <line x1="12" y1="12" x2="19" y2="19" />
                <line x1="12" y1="12" x2="5" y2="5" />
            </svg>
        ),
    }
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2
        }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut"
        }
    }
};

export default function Chronicles() {
    return (
        <section className="lg:py-24 py-12 px-6 sm:px-12 lg:px-24 relative overflow-hidden bg-[#040425]">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-12 relative z-10 w-full">
                {/* Left Side: Title */}
                <motion.div 
                    className="flex-1 min-w-[250px]"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                >
                    <h2 className="text-[48px] md:text-[56px] lg:text-[64px] font-normal font-serif text-white tracking-tight">
                        Chronicles <br />
                        of the <br />
                        <motion.span 
                            className="text-[#C5FF41] italic font-serif inline-block"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            &nbsp;&nbsp;&nbsp;&nbsp;Metaverse
                        </motion.span>
                    </h2>
                </motion.div>

                {/* Center: Description */}
                <motion.div 
                    className="flex-1 min-w-[320px]"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <p className="text-[#CACACA] text-xl font-normal max-w-[320px] font-inter">
                        The starting point for every operator. Initialize your presence and
                        begin the journey through the digital void.
                    </p>
                </motion.div>

                {/* Right Side: Interactive Video Player Card */}
                <motion.div 
                    className="flex-1 min-w-[320px] w-full flex justify-end"
                    initial={{ opacity: 0, x: 50, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    whileHover={{ scale: 1.02 }}
                >
                    <div className="relative w-full max-w-[460px] aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 shadow-2xl group cursor-pointer bg-white/5">
                        <Image
                            src={parties}
                            alt="Metaverse Training"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            priority
                        />
                        {/* Play Button Overlay */}
                        <motion.div 
                            className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-all duration-300"
                            whileHover={{ backgroundColor: "rgba(0,0,0,0.4)" }}
                        >
                            <motion.div 
                                className="w-16 h-16 rounded-full bg-[#C5FF41]/90 flex items-center justify-center shadow-2xl"
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.2 }}
                            >
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-[#040425] ml-1">
                                    <polygon points="5,3 19,12 5,21" />
                                </svg>
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            <div className="max-w-7xl mx-auto">
                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-20"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    {systems.map((system, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ 
                                scale: 1.03,
                                borderColor: "rgba(59, 130, 246, 0.5)",
                                boxShadow: "0 20px 60px rgba(59, 130, 246, 0.15)"
                            }}
                            className={`p-8 rounded-2xl transition-all duration-300 group bg-white/10 backdrop-blur-2xl border border-white/10 hover:border-blue-500`}
                        >
                            <motion.div 
                                className="w-12 h-12 rounded-xl bg-white/5 backdrop-blur-xl border border-white/5 flex items-center justify-center mb-6 text-white"
                                whileHover={{ scale: 1.2, rotate: 10 }}
                                transition={{ duration: 0.3 }}
                            >
                                {system.icon}
                            </motion.div>

                            <motion.h3 
                                className="text-xl font-bold mb-4 tracking-tight text-[#FFFFFF] font-space-grotesk"
                                whileHover={{ color: "#C5FF41" }}
                                transition={{ duration: 0.3 }}
                            >
                                {system.title}
                            </motion.h3>

                            <p className="text-[#FFFFFF] text-sm leading-relaxed">
                                {system.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}