

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

// Import your actual logo
import Logo from "@/assets/banner/AKASHA-RELIC-TECH.svg";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your registration logic here
    console.log("Registering with:", formData);
  };

  return (
    <main className="min-h-screen w-full bg-[#020215] relative overflow-hidden flex items-center justify-center py-12 px-4 sm:px-6">
      
      {/* Background Purple Glow Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#7C4AED]/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Register Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-[440px] bg-[#15162C]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-8 sm:p-10 shadow-2xl"
      >
        {/* --- Logo Section --- */}
        <div className="flex flex-col items-center mb-8">
          
          {/* Actual Logo Image */}
          <div className="mb-4 relative w-40 h-14">
            <Image 
              src={Logo} 
              alt="Akasha Relic Tech" 
              fill
              className="object-contain"
            />
          </div>

          <h2 className="text-3xl font-serif text-white mb-2 text-center">
            Create Account
          </h2>
          <p className="text-gray-400 text-sm text-center leading-relaxed">
            Please provide your required information <br /> to create an account
          </p>
        </div>

        {/* --- Register Form --- */}
        <form onSubmit={handleRegister} className="space-y-4">
          
          {/* Name */}
          <div>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-[#0B0C1E]/50 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:border-[#7C4AED] focus:ring-1 focus:ring-[#7C4AED] transition-all"
            />
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Enter an email address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-[#0B0C1E]/50 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:border-[#7C4AED] focus:ring-1 focus:ring-[#7C4AED] transition-all"
            />
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              name="password"
              placeholder="Enter a password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full bg-[#0B0C1E]/50 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:border-[#7C4AED] focus:ring-1 focus:ring-[#7C4AED] transition-all"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Enter confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full bg-[#0B0C1E]/50 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:border-[#7C4AED] focus:ring-1 focus:ring-[#7C4AED] transition-all"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#7C4AED] hover:bg-[#6D39D2] text-white font-semibold py-3.5 rounded-xl text-sm transition-all shadow-[0_0_15px_rgba(124,74,237,0.2)] hover:shadow-[0_0_25px_rgba(124,74,237,0.4)]"
          >
            Create Account
          </button>
        </form>

        {/* --- Footer Legal Text --- */}
        <div className="mt-8 text-center">
          <p className="text-[10px] text-gray-500 leading-relaxed">
            You acknowledge that you read, and agree,<br />to our <Link href="/terms" className="text-white hover:underline">Terms of Service</Link> and our <Link href="/privacy" className="text-white hover:underline">Privacy Policy</Link>
          </p>
        </div>

      </motion.div>
    </main>
  );
}