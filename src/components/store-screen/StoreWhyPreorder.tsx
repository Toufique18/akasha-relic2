"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import sunburstImage from "@/assets/store/picture.svg";

export const StoreWhyPreorder = () => {
  const steps = [
    {
      id: "01",
      title: "Browse Options",
      description: "Explore available plots, niches, and living spaces",
    },
    {
      id: "02",
      title: "Interactive Map",
      description: "Use our maze-style map to select specific locations",
    },
    {
      id: "03",
      title: "Reserve & Deposit",
      description: "Secure your selection with a deposit payment",
    },
    {
      id: "04",
      title: "Track Status",
      description: "Monitor your reservation and complete documentation",
    },
  ];

  return (
    <section className="w-full py-12 sm:py-16 lg:py-24 relative z-10 bg-[#040425]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Change grid to stack on mobile, 2 columns on large screens */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center">
          
          {/* Left Column - Text & Steps */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-xl lg:max-w-none"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-white mb-8 sm:mb-10 lg:mb-12">
              Why Pre-order?
            </h2>

            <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6">
              {steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="flex items-start gap-4 sm:gap-5 group"
                >
                  {/* Step Number Box - Shrink on mobile */}
                  <div className="flex-shrink-0 w-12 h-11 sm:w-14 sm:h-12 lg:w-16 lg:h-14 rounded-xl bg-[#161626] border border-white/10 flex items-center justify-center text-lg sm:text-xl lg:text-2xl font-medium text-white/90 group-hover:border-[#7C4AED]/50 transition-colors">
                    {step.id}
                  </div>

                  {/* Step Content */}
                  <div className="pt-0.5 sm:pt-1">
                    <h3 className="text-base sm:text-lg font-medium text-white mb-1">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Image & Quote */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex justify-center w-full mt-6 sm:mt-8 lg:mt-0"
          >
            {/* Image Container with slightly rounded corners */}
            <div className="relative w-full max-w-md lg:max-w-lg aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={sunburstImage}
                alt="Golden Sunburst Art Installation"
                fill
                className="object-cover"
              />
              
              {/* Overlay to darken the image slightly like the screenshot */}
              <div className="absolute inset-0 bg-black/10" />
            </div>

            {/* Quote Box - Responsive Staggered Overlay */}
            <div className="absolute sm:-bottom-6 lg:-bottom-8 left-1/2 sm:left-6 lg:left-10 -translate-x-1/2 sm:translate-x-0 w-[85%] sm:w-[260px] lg:max-w-sm p-3 sm:p-4 lg:p-5 rounded-xl bg-[#15162C]/95 backdrop-blur-md border-4 border-[#040425] shadow-xl">
              <p className="text-white text-xs sm:text-sm lg:text-base leading-relaxed italic">
                “Legacy is not what we leave for people, but what we leave in them.”
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};