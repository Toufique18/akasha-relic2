"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import MobileSvg from "@/assets/home/mobile4.svg";
import AppStoreIcon from "@/assets/home/app.svg";
import PlayStoreIcon from "@/assets/home/play.svg";

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

export default function Application() {
    return (
        <section className="relative w-full bg-[#FFFFFF] overflow-hidden px-4 sm:px-6 lg:px-8">
            <motion.div 
                className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(circle_at_top_left,_rgba(197,255,65,0.18),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(124,74,237,0.14),_transparent_24%)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ duration: 1.5 }}
            />

            <div className="relative mx-auto max-w-7xl">
                <motion.div 
                    className="grid gap-8 sm:gap-10 md:gap-12 lg:grid-cols-[1.2fr_0.8fr] items-center"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    <motion.div 
                        className="space-y-4 sm:space-y-5 md:space-y-6 text-center lg:text-left order-2 lg:order-1"
                        variants={itemVariants}
                    >
                        <motion.h2 
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-normal text-black leading-tight"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            Manage Your{" "}
                            <motion.span 
                                className="text-[#C5FF41] italic inline-block"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                            >
                                Heritage
                            </motion.span>{" "}
                            on the Go
                        </motion.h2>
                        
                        <motion.p 
                            className="max-w-2xl text-sm sm:text-base md:text-lg text-black/80 leading-relaxed mx-auto lg:mx-0"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            Download our mobile app from the App Store or Google Play to track your reservations and manage your digital vault anywhere.
                        </motion.p>

                        <motion.div 
                            className="flex items-center justify-center gap-3 sm:gap-4 sm:flex-row lg:justify-start"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <motion.a
                                href="#"
                                className="inline-flex items-center transition-transform hover:scale-105 active:scale-95"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className="h-32 w-32 md:h-40 md:w-40 lg:h-44 lg:w-44 xl:h-48 xl:w-48 grid place-items-center overflow-hidden">
                                    <Image 
                                        src={AppStoreIcon} 
                                        alt="App Store icon" 
                                        className="h-full w-full object-contain"  
                                    />
                                </span>
                            </motion.a>
                            
                            <motion.a
                                href="#"
                                className="inline-flex items-center transition-transform hover:scale-105 active:scale-95"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className="h-32 w-32 md:h-40 md:w-40 lg:h-44 lg:w-44 xl:h-48 xl:w-48 grid place-items-center overflow-hidden">
                                    <Image 
                                        src={PlayStoreIcon} 
                                        alt="Google Play icon" 
                                        className="h-full w-full object-contain" 
                                    />
                                </span>
                            </motion.a>
                        </motion.div>
                    </motion.div>

                    <motion.div 
                        className="relative mx-auto w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px] lg:max-w-[420px] order-1 lg:order-2"
                        initial={{ opacity: 0, x: 50, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <motion.div 
                            className="relative h-full w-full overflow-hidden"
                            whileHover={{ scale: 1.03, rotate: 2 }}
                            transition={{ duration: 0.4 }}
                        >
                            <Image
                                src={MobileSvg}
                                alt="Mobile app preview"
                                className="h-full w-full object-contain"
                                priority
                            />
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}