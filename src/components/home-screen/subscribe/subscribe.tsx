"use client";

import vector from '@/assets/banner/Vector 1.svg';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Subscribe() {
  const vectorSrc = typeof vector === 'string' ? vector : vector.src;

  return (
    <section className="relative w-full lg:py-10 py-10 px-6 sm:px-12 lg:px-24 bg-[#11072B] overflow-hidden">
        {/* Background image using Next.js Image */}
        <motion.div 
            className="absolute inset-0 rounded-3xl overflow-hidden"
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2 }}
        >
            <Image
                src={vectorSrc}
                alt="Background"
                fill
                className="object-cover"
                priority
            />
        </motion.div>
        
        <div className="relative z-10 flex items-center justify-center px-4 py-20">
            <motion.div 
                className="max-w-2xl w-full mx-auto"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <div className="text-center">
                    <motion.h2 
                        className="text-4xl sm:text-5xl md:text-6xl font-normal text-white mb-4 font-serif"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        Start Your Digital{" "}
                        <motion.span 
                            className="text-[#C5FF41] italic font-serif inline-block"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                        >
                            Journey
                        </motion.span>
                    </motion.h2>
                    
                    <motion.p 
                        className="text-gray-300 text-base sm:text-lg mb-6 max-w-md mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        Join 50,000+ pioneers securing their legacies. Subscribe to our monthly newsletter for insights on digital preservation.
                    </motion.p>
                    
                    <motion.div 
                        className="mb-6 max-w-md mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                    >
                        <motion.div 
                            className="flex items-center gap-2"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                        >
                            <motion.input 
                                type="email" 
                                placeholder="Enter email address"
                                className="flex-1 px-4 sm:px-6 py-3 sm:py-4 rounded-full bg-white/20 backdrop-blur-md text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-[#C5FF41]"
                                whileFocus={{ 
                                    boxShadow: "0 0 20px rgba(197, 255, 65, 0.2)",
                                    borderColor: "#C5FF41"
                                }}
                            />
                            <motion.button 
                                className="px-4 sm:px-6 py-3 sm:py-4 rounded-full bg-[#9157FF]/80 backdrop-blur-md text-white hover:bg-[#9157FF]/90 tracking-wider transition-all duration-300 whitespace-nowrap"
                                whileHover={{ 
                                    scale: 1.05,
                                    backgroundColor: "rgba(145, 87, 255, 0.9)",
                                    boxShadow: "0 0 30px rgba(145, 87, 255, 0.3)"
                                }}
                                whileTap={{ scale: 0.95 }}
                            >
                                SUBSCRIBE
                            </motion.button>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    </section>
  );
}