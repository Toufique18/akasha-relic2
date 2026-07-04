"use client";

import vectorSrc from '@/assets/banner/Vector 1.svg';
import Image from 'next/image';
import { motion } from 'framer-motion';

export const QuoteSection = () => {
  return (
    <section className="w-full py-24 lg:py-32 relative overflow-hidden">
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
      
      {/* Background Gradient - Matches the blue/purple fade in your screenshot */}
      {/* <div className="absolute inset-0 bg-gradient-to-r from-[#0E2A47] via-[#020215] to-[#2D1B69] pointer-events-none" /> */}
      
      {/* Additional subtle radial glow in the center to illuminate the text */}
      {/* <div className="absolute inset-0 bg-[#020215]/40 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-white/5 rounded-full blur-[80px] pointer-events-none" /> */}

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center font-serif">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Main Quote */}
          <p className="text-2xl md:text-3xl lg:text-6xl font-serif text-white">
            People may leave the physical world, <br />
            but their stories can continue <span className="text-[#A78BFA]">inspiring</span> <br />
            <span className="text-[#A78BFA]">future generations.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};