"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';

const systems = [
    {
        title: "Avatar Management",
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
        title: "Cross-Reality Bridge",
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
        title: "Neural Collective",
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
    },
    {
        title: "Relic Academy",
        description: "Unlock advanced functionalities including predictive AI interactions and cross-platform asset mobility.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
        ),
    },
    {
        title: "Advanced Protocols",
        description: "Unlock advanced functionalities including predictive AI interactions and cross-platform asset mobility.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <path d="m13 2-9 10h8v10l9-10h-8z" />
            </svg>
        ),
    },
    {
        title: "Quantum Transactions",
        description: "Secure, instant value exchange across the metaverse using our encrypted Relic-Link ledger system.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <rect x="2" y="5" width="20" height="14" rx="2" />
                <line x1="2" y1="10" x2="22" y2="10" />
                <circle cx="12" cy="14.5" r="1.5" />
            </svg>
        ),
    }
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3
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

export default function System() {
    return (
        <section className="lg:py-20 py-10 px-6 sm:px-12 lg:px-24 relative overflow-hidden bg-[#040425]">
            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header Section */}
                <motion.div 
                    className="w-full mb-16 text-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    <motion.h2 
                        className="text-4xl sm:text-5xl font-normal font-serif mb-4 inline-block text-[#FFFFFF]"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        Platform Core <span className="text-[#C5FF41] italic font-serif">Modules</span>
                    </motion.h2>
                    <motion.p 
                        className='text-[#CACACA] text-sm leading-relaxed max-w-[65ch] mx-auto'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Harness the power of holographic data architecture to preserve and
                        manifest your digital existence across the metaverse.
                    </motion.p>
                </motion.div>

                {/* Grid Cards */}
                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
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

            {/* Background Decorative element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-20">
                <motion.div 
                    className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px]"
                    animate={{
                        scale: [1, 1.2, 1],
                        x: [0, 50, 0],
                        y: [0, -30, 0]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div 
                    className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px]"
                    animate={{
                        scale: [1, 1.3, 1],
                        x: [0, -50, 0],
                        y: [0, 30, 0]
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>
        </section>
    );
}