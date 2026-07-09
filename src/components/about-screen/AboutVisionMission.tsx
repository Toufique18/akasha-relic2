"use client";

import { motion } from "framer-motion";
import { User, Images, IdCard, BrainCircuit, Infinity } from "lucide-react";

export const AboutVisionMission = () => {
  const journeySteps = [
    {
      icon: User,
      title: "Physical Life",
      description: "Every life beginning a beautiful journey",
    },
    {
      icon: Images,
      title: "Captured Memories",
      description: "Memories, stories and experience are captured",
    },
    {
      icon: IdCard,
      title: "Digital Identity",
      description: "A unique digital identity is created and archive",
    },
    {
      icon: BrainCircuit,
      title: "AI Understanding",
      description: "AI understanding patterns emotions and relationship",
    },
    {
      icon: Infinity,
      title: "Present Legacy",
      description: "Legacy continues to inspire to generations",
    },
  ];

  return (
    <section id="vision-mission" className="max-w-7xl mx-auto px-4 sm:px-6 py-20 scroll-mt-24 relative z-10">
      
      {/* --- Top Section: Digital Legacy Journey --- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <p className="text-3xl sm:text-4xl md:text-6xl font-serif text-white mb-12">
          Digital Legacy <span className="text-[#A78BFA]">Journey</span>
        </p>

        {/* Timeline Steps - Responsive Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-4">
          {journeySteps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center group"
            >
              {/* Purple Gradient Circle */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#A78BFA] to-[#7C4AED] flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(124,74,237,0.3)] group-hover:shadow-[0_0_30px_rgba(124,74,237,0.5)] transition-all duration-300">
                <step.icon className="w-7 h-7 text-white" strokeWidth={1.5} />
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">
                {step.title} 
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed max-w-[180px]">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* --- Bottom Section: Mission & Vision Cards --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        
        {/* Mission Card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="bg-[#15162C] border border-white/5 rounded-2xl p-10 lg:p-14 flex flex-col items-center justify-center text-center hover:border-[#7C4AED]/30 transition-all duration-300 h-full min-h-[300px]"
        >
          <p className="text-4xl sm:text-5xl font-serif text-white mb-4">Mission</p>
          <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-sm">
            To preserve Human memories through AI and immersive digital experiences.
          </p>
        </motion.div>

        {/* Vision Card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="bg-[#15162C] border border-white/5 rounded-2xl p-10 lg:p-14 flex flex-col items-center justify-center text-center hover:border-[#7C4AED]/30 transition-all duration-300 h-full min-h-[300px]"
        >
          <p className="text-4xl sm:text-5xl font-serif text-white mb-4">Vision</p>
          <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-sm">
            To create a future where no meaningful story disappears.
          </p>
        </motion.div>

      </div>
    </section>
  );
};