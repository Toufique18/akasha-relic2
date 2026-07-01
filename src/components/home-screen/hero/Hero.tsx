"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import VrCoupleSvg from "@/assets/banner/young-woman-man-with-vr-glasses-1.svg";
import StatsCardSvg from "@/assets/banner/Frame6.svg";
import Frame1 from "@/assets/banner/Frame1.svg";
import Frame2 from "@/assets/banner/Frame2.svg";
import Frame3 from "@/assets/banner/Frame3.svg";
import Frame4 from "@/assets/banner/frame4.svg";
import glass from "@/assets/banner/glass.svg";

export const Hero = () => {
  return (
    <section className="relative w-full bg-[#020215] flex flex-col justify-between overflow-hidden pt-24 pb-0 px-4 sm:px-6 lg:px-8">
      {/* Pure CSS Glows & Mesh Gradient Background */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
        <div className="absolute w-[130%] left-[-15%] bottom-[0%] h-[180px] sm:h-[260px] bg-gradient-to-r from-[#F7A22B] via-[#1E77B9] via-[#D5DD3D] via-[#3FB14F] to-[#D81E61] opacity-95 blur-[90px] sm:blur-[130px] lg:blur-[160px] rounded-full transform rotate-[-2deg]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[80%] rounded-full bg-[#D5DD3D]/15 blur-[120px] sm:blur-[180px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[80%] rounded-full bg-[#3FB14F]/15 blur-[120px] sm:blur-[180px]" />
        <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-[#020215] via-[#020215]/30 to-transparent opacity-85" />
      </div>

      {/* Floating App Cards - Animated */}
      <div className="absolute inset-0 z-10 pointer-events-none select-none overflow-hidden">
        {/* Frame 1 - Pink Avatar Card (Top Left) */}
        <motion.div 
          className="absolute top-[18%] left-[8%] md:left-[12%] lg:left-[15%] w-14 sm:w-18 lg:w-22 h-auto hidden sm:block"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Image src={Frame1} alt="Avatar Card" className="w-full h-auto" />
        </motion.div>

        {/* Frame 3 - Green Gift Card (Bottom Left) */}
        <motion.div 
          className="absolute bottom-[35%] left-[6%] md:left-[10%] lg:left-[12%] w-14 sm:w-18 lg:w-22 h-auto hidden sm:block"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Image src={Frame3} alt="Gift Card" className="w-full h-auto" />
        </motion.div>

        {/* Frame 2 - Orange Clapper Card (Top Right) */}
        <motion.div 
          className="absolute top-[15%] right-[8%] md:right-[12%] lg:right-[15%] w-14 sm:w-18 lg:w-22 h-auto hidden sm:block"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Image src={Frame2} alt="Media Card" className="w-full h-auto" />
        </motion.div>

        {/* Frame 4 - Blue Photo Card (Center Right) */}
        <motion.div 
          className="absolute top-[40%] right-[10%] md:right-[15%] lg:right-[18%] w-14 sm:w-18 lg:w-22 h-auto hidden sm:block"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Image src={Frame4} alt="Photo Card" className="w-full h-auto" />
        </motion.div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-20 max-w-7xl mx-auto w-full flex flex-col items-center justify-start text-center flex-grow pt-8">
        {/* Main Title Heading */}
        <motion.h1 
          className="text-[48px] sm:text-5xl md:text-6xl lg:text-[72px] font-normal font-serif tracking-tight text-white leading-[1.25] sm:leading-[1.2] max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Stay Connected with Your <br className="hidden sm:inline" />
          <span className="text-[#C5FF41] italic">Loved Ones</span>{" "}
          <motion.span 
            className="inline-flex items-center justify-center bg-white rounded-xl p-1.5 mx-1.5 sm:mx-2 align-middle border border-white/20 h-9 w-9 sm:h-11 sm:w-11 md:h-14 md:w-14 shadow-lg"
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, delay: 0.5, type: "spring", stiffness: 200 }}
          >
            <Image src={glass} alt="Media Card" className="w-full h-auto object-contain" />
          </motion.span>{" "}
          in the <span className="text-[#C5FF41] italic">Digital World</span> 
        </motion.h1>

        {/* Action Buttons */}
        <motion.div 
          className="flex flex-wrap items-center justify-center gap-4 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link
            href="/memorials"
            className="px-6 py-3 rounded-xl bg-[#8B5CF6] hover:bg-[#7C4AED] text-white text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:scale-105 active:scale-95 cursor-pointer"
          >
            Explore Memorials
          </Link>
          <Link
            href="/avatar"
            className="px-6 py-3 rounded-xl border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 text-white/90 hover:text-white text-xs sm:text-sm font-semibold tracking-wide transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            Create an Avatar
          </Link>
        </motion.div>

        {/* Responsive Image Container & Absolute Positioned Cards */}
        <motion.div 
          className="relative w-full max-w-[750px] mt-12 sm:mt-16 flex flex-col items-center mb-0"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Main Couple VR Image */}
          <motion.div 
            className="w-full relative select-none pointer-events-none z-10 px-4"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={VrCoupleSvg}
              alt="People experiencing VR digital world connection"
              className="w-full h-auto max-h-[500px] object-contain drop-shadow-[0_0_30px_rgba(124,74,237,0.15)]"
              priority
            />
          </motion.div>

          {/* Left Glass Card */}
          <motion.div 
            className="mt-8 md:mt-0 md:absolute md:bottom-[20%] md:-left-[20%] lg:-left-[20%] w-full md:max-w-[340px] bg-black/55 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-left z-20 shadow-2xl"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ scale: 1.03, boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}
          >
            <p className="text-sm sm:text-base text-white/40 leading-relaxed font-normal">
              With our tech-enhanced memorial services and customizable avatars,
              we help ensure your loved ones&apos; legacies live on in meaningful ways 
            </p>
          </motion.div>

          {/* Right White Card */}
          <motion.div 
            className="mt-6 mb-2 md:mt-0 md:absolute md:bottom-[15%] md:-right-[20%] lg:-right-[30%] xl:-right-[38%] w-full md:max-w-[330px] z-20 shadow-2xl rounded-2xl overflow-hidden bg-white"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}
          >
            <Image
              src={StatsCardSvg}
              alt="1K+ Users Joined Daily stats card"
              className="w-full h-auto object-contain"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};