"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Frame1 from "@/assets/banner/Frame1.svg";
import Frame2 from "@/assets/banner/Frame2.svg";
import Frame3 from "@/assets/banner/Frame3.svg";
import Frame4 from "@/assets/banner/frame4.svg";

export default function Memory() {
    return (
        <section className="lg:py-20 py-10 px-6 sm:px-12 lg:px-24 relative overflow-hidden bg-[#FFFFFF]">
            {/* Floating App Cards - Animated */}
            <div className="absolute inset-0 z-10 pointer-events-none select-none overflow-hidden">
                {/* Frame 1 - Pink Avatar Card (Top Left) */}
                <motion.div 
                    className="absolute top-[18%] left-[8%] md:left-[12%] lg:left-[15%] w-14 sm:w-18 lg:w-22 h-auto hidden sm:block"
                    initial={{ opacity: 0, y: -30, rotate: -10 }}
                    animate={{ opacity: 1, y: 0, rotate: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                >
                    <Image src={Frame1} alt="Avatar Card" className="w-[72px] h-auto" />
                </motion.div>

                {/* Frame 3 - Green Gift Card (Bottom Left) */}
                <motion.div 
                    className="absolute bottom-[5%] left-[6%] md:left-[10%] lg:left-[15%] w-14 sm:w-18 lg:w-22 h-auto hidden sm:block"
                    initial={{ opacity: 0, x: -30, rotate: 10 }}
                    animate={{ opacity: 1, x: 0, rotate: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    whileHover={{ scale: 1.1, rotate: -5 }}
                >
                    <Image src={Frame3} alt="Gift Card" className="w-[72px] h-auto" />
                </motion.div>

                {/* Frame 2 - Orange Clapper Card (Top Right) */}
                <motion.div 
                    className="absolute top-[15%] right-[8%] md:right-[12%] lg:right-[18%] w-14 sm:w-18 lg:w-22 h-auto hidden sm:block"
                    initial={{ opacity: 0, y: -30, rotate: 10 }}
                    animate={{ opacity: 1, y: 0, rotate: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    whileHover={{ scale: 1.1, rotate: -5 }}
                >
                    <Image src={Frame2} alt="Media Card" className="w-[72px] h-auto" />
                </motion.div>

                {/* Frame 4 - Blue Photo Card (Center Right) */}
                <motion.div 
                    className="absolute bottom-[5%] right-[10%] md:right-[15%] lg:right-[28%] w-14 sm:w-18 lg:w-22 h-auto hidden sm:block"
                    initial={{ opacity: 0, x: 30, rotate: -10 }}
                    animate={{ opacity: 1, x: 0, rotate: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                >
                    <Image src={Frame4} alt="Photo Card" className="w-[72px] h-auto" />
                </motion.div>
            </div>

            {/* Main Content Area */}
            <div className="relative z-20 max-w-7xl mx-auto w-full flex flex-col items-center justify-start text-center flex-grow pt-8">
                <motion.div 
                    className="w-full mb-16 text-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                >
                    <motion.h2 
                        className="text-4xl sm:text-5xl lg:text-[64px] font-normal font-serif mb-4 inline-block text-[#282828]"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Memory fades. Digital presence{" "}
                        <motion.span 
                            className="text-[#C5FF41] italic font-serif inline-block"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            lasts forever.
                        </motion.span>
                    </motion.h2>
                    
                    <motion.p 
                        className='text-[#333333] text-sm leading-relaxed max-w-[65ch] mx-auto'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                    >
                        &ldquo;In the traditional world, our stories eventually become echoes. We are building
                        the infrastructure for permanence, ensuring your presence, wisdom, and
                        connections remain vibrant across centuries.&rdquo;
                    </motion.p>
                </motion.div> 
            </div>
        </section> 
    );
}