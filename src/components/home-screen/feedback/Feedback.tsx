"use client";

import * as React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

import Avatar1 from "@/assets/home/Avatar1.svg";
import Avatar2 from "@/assets/home/Avatar2.svg";
import Avatar3 from "@/assets/home/Avatar3.svg";
import Avatar4 from "@/assets/home/Avatar4.svg";

const feedbackData = [
  {
    id: 1,
    name: "David",
    country: "USA",
    rating: 5,
    text: "Changing my thoughts has allowed me to change my life.",
    avatar: Avatar1,
  },
  {
    id: 2,
    name: "Keri",
    country: "Italy",
    rating: 5,
    text: "Headspace provides me with ... a connection to myself, and a disconnection from negative thoughts, feelings, and sensations.",
    avatar: Avatar2,
  },
  {
    id: 3,
    name: "Jaime",
    country: "Spain",
    rating: 5,
    text: "A happy workforce leads to a happy work environment.",
    avatar: Avatar3,
  },
  {
    id: 4,
    name: "Alex",
    country: "Canada",
    rating: 5,
    text: "This app completely transformed my morning routine. I feel more focused and calm.",
    avatar: Avatar4,
  },
  {
    id: 5,
    name: "Maya",
    country: "UK",
    rating: 5,
    text: "The guided meditations are incredibly soothing. I've never slept better.",
    avatar: Avatar1,
  },
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

export default function Feedback() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    
    setActiveIndex(api.selectedScrollSnap());
    
    api.on("select", () => {
      setActiveIndex(api.selectedScrollSnap());
    });

    const intervalId = setInterval(() => {
      if (api) {
        const nextIndex = (api.selectedScrollSnap() + 1) % feedbackData.length;
        api.scrollTo(nextIndex);
      }
    }, 4000);

    return () => clearInterval(intervalId);
  }, [api]);

  return (
    <section className="relative w-full bg-[#020215] py-12 sm:py-16 md:py-20 lg:py-28 overflow-hidden px-3 sm:px-4 md:px-6 lg:px-8">
      {/* Subtle background glow */}
      <motion.div 
        className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(circle_at_top_left,_rgba(124,74,237,0.12),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(197,255,65,0.08),_transparent_28%)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1.5 }}
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <motion.div 
          className="text-left mb-10 sm:mb-12 md:mb-16 lg:mb-20 px-2 sm:px-4 md:px-8 lg:px-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif text-white font-normal tracking-wide leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            What customers are{" "}
            <motion.span 
              className="text-[#C5FF41] italic font-serif inline-block"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              saying
            </motion.span>
          </motion.h2>
          <motion.p 
            className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-slate-400 font-sans max-w-3xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            A quick snapshot of real customer feedback, highlighting experiences,
            opinions, and satisfaction levels to help users make informed decisions.
          </motion.p>
        </motion.div>

        {/* Carousel */}
        <motion.div 
          className="w-full relative px-1 sm:px-2 md:px-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            setApi={setApi}
            className="w-full"
          >
            <CarouselContent className="-ml-2 sm:-ml-3 md:-ml-4 lg:-ml-6 xl:-ml-8 py-6 sm:py-8 md:py-10">
              {feedbackData.map((feedback, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <CarouselItem
                    key={feedback.id}
                    className="pl-2 sm:pl-3 md:pl-4 lg:pl-6 xl:pl-8 basis-[90%] sm:basis-[70%] md:basis-[55%] lg:basis-[45%] xl:basis-[35%]"
                  >
                    <motion.div
                      variants={itemVariants}
                      whileHover={{ scale: isActive ? 1.02 : 1.01 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div
                        className={`w-full h-[220px] sm:h-[240px] md:h-[260px] lg:h-[280px] p-[1.5px] rounded-[20px] sm:rounded-[22px] md:rounded-[24px] transition-all duration-700 ${
                          isActive
                            ? "bg-gradient-to-br from-[#3b82f6] via-[#6366f1] to-[#C5FF41] scale-[1.02] sm:scale-[1.04] md:scale-105 shadow-[0_20px_50px_rgba(99,102,241,0.15)]"
                            : "bg-transparent scale-[0.95] sm:scale-[0.97] opacity-40 hover:opacity-60"
                        }`}
                      >
                        <div
                          className={`w-full h-full rounded-[18.5px] sm:rounded-[20.5px] md:rounded-[22.5px] flex flex-row overflow-hidden transition-colors duration-700 ${
                            isActive
                              ? "bg-gradient-to-br from-[#181a3d] via-[#10142b] to-[#1e2a26]"
                              : "bg-[#11142a] border border-[#212549]"
                          }`}
                        >
                          {/* Left Column: Quote and Profile */}
                          <div className="w-[30%] sm:w-[32%] md:w-[35%] flex flex-col justify-between p-3 sm:p-4 md:p-5 lg:p-6 pr-1 sm:pr-2">
                            <div>
                              <motion.span 
                                className="text-white/80 font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl select-none leading-none block -mt-2"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                              >
                                “
                              </motion.span>
                            </div>
                            <div className="flex items-center gap-2 sm:gap-3">
                              <motion.div 
                                className="relative w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full overflow-hidden border border-white/10 shrink-0"
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.3 }}
                              >
                                <Image
                                  src={feedback.avatar}
                                  alt={feedback.name}
                                  fill
                                  className="object-cover"
                                />
                              </motion.div>
                              <div className="flex flex-col text-left min-w-0">
                                <span className="text-white font-medium text-[10px] sm:text-xs md:text-sm leading-tight truncate">
                                  {feedback.name}
                                </span>
                                <span className="text-slate-400 text-[8px] sm:text-[10px] md:text-xs leading-tight mt-0.5 truncate">
                                  {feedback.country}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Right Column: Dark Inner Content Box */}
                          <div className="w-[70%] sm:w-[68%] md:w-[65%] p-2 sm:p-2.5 md:p-3">
                            <div className="bg-[#070815] rounded-[14px] sm:rounded-[16px] md:rounded-[18px] p-3 sm:p-4 md:p-5 lg:p-6 h-full flex flex-col justify-center">
                              {/* Stars */}
                              <motion.div 
                                className="flex gap-0.5 sm:gap-1 mb-2 sm:mb-3 md:mb-4"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.4, delay: 0.3 }}
                              >
                                {[...Array(feedback.rating)].map((_, i) => (
                                  <svg
                                    key={i}
                                    className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-[#FFA800] fill-current"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </motion.div>
                              {/* Review Text */}
                              <motion.p 
                                className="text-[10px] sm:text-xs md:text-sm lg:text-base text-slate-200 font-sans font-light leading-relaxed text-left line-clamp-4 sm:line-clamp-5"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.4, delay: 0.4 }}
                              >
                                {feedback.text}
                              </motion.p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
        </motion.div>

        {/* Dot Indicators */}
        {/* <motion.div 
          className="flex justify-center items-center gap-2 mt-6 sm:mt-8 md:mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {feedbackData.map((_, idx) => (
            <motion.button
              key={idx}
              onClick={() => api?.scrollTo(idx)}
              className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                idx === activeIndex
                  ? "w-6 sm:w-8 bg-[#C5FF41]"
                  : "w-1.5 sm:w-2 bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.2 }}
            />
          ))}
        </motion.div> */}
      </div>
    </section>
  );
}