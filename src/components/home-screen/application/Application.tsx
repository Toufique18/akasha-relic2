"use client";

import Image from "next/image";
import MobileSvg from "@/assets/home/mobile.svg";
import AppStoreIcon from "@/assets/home/app.svg";
import PlayStoreIcon from "@/assets/home/play.svg";

export default function Application() {
  return (
    <section className="relative w-full bg-[#FFFFFF] overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(circle_at_top_left,_rgba(197,255,65,0.18),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(124,74,237,0.14),_transparent_24%)]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-center">
          <div className="space-y-6 text-center lg:text-left">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal text-black leading-tight">
              Manage Your <span className="text-[#C5FF41] italic">Heritage</span> on the Go
            </h2>
            <p className="max-w-2xl text-base sm:text-lg text-black leading-relaxed">
              Download our mobile app from the App Store or Google Play to track your reservations and manage your digital vault anywhere.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
              <a
                href="#"
                className="inline-flex items-center"
              >
                <span className="h-48 w-48 grid place-items-center text-lg overflow-hidden">
                  <Image src={AppStoreIcon} alt="App Store icon" className="h-full w-full object-contain" />
                </span>
                {/* <span className="text-left leading-tight">
                  <span className="block text-[10px] uppercase text-slate-400">Download on the</span>
                  <span className="block text-sm font-semibold">App Store</span>
                </span> */}
              </a>
              <a
                href="#"
                className="inline-flex items-center "
              >
                <span className="h-48 w-48 rounded-xl bg-white grid place-items-center text-lg overflow-hidden">
                  <Image src={PlayStoreIcon} alt="Google Play icon" className="h-full w-full object-contain" />
                </span>
                {/* <span className="text-left leading-tight">
                  <span className="block text-[10px] uppercase text-slate-400">Get it on</span>
                  <span className="block text-sm font-semibold">Google Play</span>
                </span> */}
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[420px]">
           
              <div className="relative h-full w-full overflow-hidden">
                <Image
                  src={MobileSvg}
                  alt="Mobile app preview"
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
