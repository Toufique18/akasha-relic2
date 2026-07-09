"use client";

import { motion } from "framer-motion";

export const AboutWhyWeBuilt = () => {
  const pillars = [
    {
      title: "Preserve Human Stories",
      description: "We preserve memories, stories, and precious moments in their purest and most meaningful form.",
    },
    {
      title: "Create Digital Presence",
      description: "We transform lives into digital identities that can live, interact, and inspire forever.",
    },
    {
      title: "Connect Beyond Reality",
      description: "We build bridges between the physical and digital worlds to keep relationships alive.",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 scroll-mt-24 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        {/* Main Heading */}
        <p className="text-3xl sm:text-4xl md:text-6xl font-serif text-white mb-6 leading-tight">
          Why We Built <span className="text-[#A78BFA]">Akasha Relic Tech</span>
        </p>

        {/* Subheading */}
        <p className="max-w-2xl mx-auto text-gray-300 text-sm md:text-base leading-relaxed">
          Memories fade. Photos disorder. Stories become fragmented cross generations.<br className="hidden md:block" />
          We believe human legacy should not be limited by physical time.
        </p>
      </motion.div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {pillars.map((pillar, index) => (
          <motion.div
            key={pillar.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="bg-[#15162C] border border-white/5 hover:border-[#7C4AED]/30 rounded-2xl p-8 transition-all duration-300"
          >
            <h3 className="text-lg sm:text-xl font-medium text-white mb-3">
              {pillar.title}
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              {pillar.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};