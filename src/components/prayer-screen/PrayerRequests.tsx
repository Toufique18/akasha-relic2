"use client";

import { motion } from "framer-motion";

export const PrayerRequests = () => {
  return (
    <section className="w-full py-16 bg-[#0E0E27]">
        <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-3xl mx-auto bg-[#0E0E27] border border-white/10 rounded-2xl p-8 md:p-10 shadow-2xl relative"
    >
      {/* Subtle inner glow effect for the card */}
      <div className="absolute -inset-1 bg-gradient-to-r from-[#7C4AED]/20 to-transparent rounded-2xl blur-xl -z-10 opacity-50" />

      <h2 className="text-2xl md:text-3xl font-medium text-white mb-8">
        Request a Prayer
      </h2>

      <form className="space-y-6">
        {/* Row: Name & Title */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label 
              htmlFor="name" 
              className="text-sm font-medium text-gray-300 block"
            >
              Name / Memorial Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter name or memorial name"
              className="w-full bg-[#0E0E27]/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#7C4AED] focus:ring-1 focus:ring-[#7C4AED] transition-all"
            />
          </div>

          <div className="space-y-2">
            <label 
              htmlFor="title" 
              className="text-sm font-medium text-gray-300 block"
            >
              Prayer Title
            </label>
            <input
              id="title"
              type="text"
              placeholder="Give your a prayer title"
              className="w-full bg-[#0E0E27]/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#7C4AED] focus:ring-1 focus:ring-[#7C4AED] transition-all"
            />
          </div>
        </div>

        {/* Row: Message */}
        <div className="space-y-2">
          <label 
            htmlFor="message" 
            className="text-sm font-medium text-gray-300 block"
          >
            Prayer Message
          </label>
          <textarea
            id="message"
            rows={5}
            placeholder="Share your heartfelt message..."
            className="w-full bg-[#0E0E27]/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#7C4AED] focus:ring-1 focus:ring-[#7C4AED] transition-all resize-none"
          />
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.01, boxShadow: "0 0 30px rgba(124,74,237,0.4)" }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-[#7C4AED] hover:bg-[#6D39D2] text-white font-medium py-3.5 rounded-xl transition-all shadow-[0_0_15px_rgba(124,74,237,0.2)]"
        >
          Submit prayer request
        </motion.button>

      </form>
    </motion.div>
    </section>
    
  );
};