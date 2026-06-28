"use client";

import Image from "next/image";
import Link from "next/link";
import VrCoupleSvg from "@/assets/banner/young-woman-man-with-vr-glasses-1.svg";
import StatsCardSvg from "@/assets/banner/Frame6.svg";
import Frame1 from "@/assets/banner/Frame1.svg";
import Frame2 from "@/assets/banner/Frame2.svg";
import Frame3 from "@/assets/banner/Frame3.svg";
import Frame4 from "@/assets/banner/frame4.svg";
import glass from "@/assets/banner/glass.svg";

export const Hero = () => {
  return (
    <section className="relative w-full bg-[#020215] flex flex-col justify-between overflow-hidden pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      {/* Pure CSS Glows & Mesh Gradient Background (Recreating Vector 1.svg stops with full screen blend) */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
        {/* Recreated gradient path with increased thickness, opacity-95, and higher blur */}
        <div className="absolute w-[130%] left-[-15%] bottom-[5%] h-[180px] sm:h-[260px] bg-gradient-to-r from-[#F7A22B] via-[#1E77B9] via-[#D5DD3D] via-[#3FB14F] to-[#D81E61] opacity-95 blur-[90px] sm:blur-[130px] lg:blur-[160px] rounded-full transform rotate-[-2deg]" />
        
        {/* Additional saturated backing glows to amplify the ambient light behind the flanking cards */}
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[80%] rounded-full bg-[#D5DD3D]/15 blur-[120px] sm:blur-[180px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[80%] rounded-full bg-[#3FB14F]/15 blur-[120px] sm:blur-[180px]" />

        {/* Soft bottom ambient dark overlay to merge into deep black/navy background */}
        <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-[#020215] via-[#020215]/30 to-transparent opacity-85" />
      </div>

      {/* Floating App Cards - Configured to match the layout positions */}
      <div className="absolute inset-0 z-10 pointer-events-none select-none overflow-hidden">
        {/* Frame 1 - Pink Avatar Card (Top Left) */}
        <div className="absolute top-[18%] left-[8%] md:left-[12%] lg:left-[15%] w-14 sm:w-18 lg:w-22 h-auto hidden sm:block">
          <Image src={Frame1} alt="Avatar Card" className="w-full h-auto" />
        </div>

        {/* Frame 3 - Green Gift Card (Bottom Left) */}
        <div className="absolute bottom-[35%] left-[6%] md:left-[10%] lg:left-[12%] w-14 sm:w-18 lg:w-22 h-auto hidden sm:block">
          <Image src={Frame3} alt="Gift Card" className="w-full h-auto" />
        </div>

        {/* Frame 2 - Orange Clapper Card (Top Right) */}
        <div className="absolute top-[15%] right-[8%] md:right-[12%] lg:right-[15%] w-14 sm:w-18 lg:w-22 h-auto hidden sm:block">
          <Image src={Frame2} alt="Media Card" className="w-full h-auto" />
        </div>

        {/* Frame 4 - Blue Photo Card (Center Right) */}
        <div className="absolute top-[40%] right-[10%] md:right-[15%] lg:right-[18%] w-14 sm:w-18 lg:w-22 h-auto hidden sm:block">
          <Image src={Frame4} alt="Photo Card" className="w-full h-auto" />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-20 max-w-7xl mx-auto w-full flex flex-col items-center justify-start text-center flex-grow pt-8">
        {/* Main Title Heading */}
        <h1 className="text-[48px] sm:text-5xl md:text-6xl lg:text-[72px] font-normal tracking-tight text-white leading-[1.25] sm:leading-[1.2] max-w-5xl mx-auto font-serif">
          Stay Connected with Your <br className="hidden sm:inline" />
          <span className="text-[#C5FF41] italic font-serif">Loved Ones</span>{" "}
          <span className="inline-flex items-center justify-center bg-white rounded-xl p-1.5 mx-1.5 sm:mx-2 align-middle border border-white/20 h-9 w-9 sm:h-11 sm:w-11 md:h-14 md:w-14 shadow-lg">
            <Image src={glass} alt="Media Card" className="w-full h-auto object-contain" />
          </span>{" "}
          in the <span className="text-[#C5FF41] italic font-serif">Digital World</span>
        </h1>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
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
        </div>

        {/* Responsive Image Container & Absolute Positioned Cards */}
        <div className="relative w-full max-w-[750px] mt-12 sm:mt-16 flex flex-col items-center">
          {/* Main Couple VR Image */}
          <div className="w-full relative select-none pointer-events-none z-10 px-4">
            <Image
              src={VrCoupleSvg}
              alt="People experiencing VR digital world connection"
              className="w-full h-auto max-h-[500px] object-contain drop-shadow-[0_0_30px_rgba(124,74,237,0.15)]"
              priority
            />
          </div>

          {/* Left Glass Card - Visible on Desktop/Tablet absolute, stacked on Mobile */}
          <div className="mt-8 md:mt-0 md:absolute md:bottom-[8%] md:-left-[20%] lg:-left-[30%] xl:-left-[38%] w-full md:max-w-[340px] bg-black/55 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-left z-20 shadow-2xl">
            <p className="text-sm sm:text-base text-white/90 leading-relaxed font-normal">
              With our tech-enhanced memorial services and customizable avatars,
              we help ensure your loved ones&apos; legacies live on in meaningful ways
            </p>
          </div>

          {/* Right White Card - Visible on Desktop/Tablet absolute, stacked on Mobile */}
          <div className="mt-6 md:mt-0 md:absolute md:bottom-[15%] md:-right-[20%] lg:-right-[30%] xl:-right-[38%] w-full md:max-w-[330px] z-20 shadow-2xl rounded-2xl overflow-hidden bg-white">
            <Image
              src={StatsCardSvg}
              alt="1K+ Users Joined Daily stats card"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
