"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

import Logo from "@/assets/banner/AKASHA-RELIC-TECH.svg";

export const ForgotPasswordReset = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to reset password goes here
    console.log("Resetting password to:", password);
    // Redirect back to Login page on success
    router.push("/login");
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative z-10 w-full max-w-[440px] bg-[#15162C]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-8 sm:p-10 shadow-2xl"
    >
      {/* --- Logo Section --- */}
      <div className="flex flex-col items-center mb-8">
        <div className="mb-4 relative w-40 h-14">
          <Image src={Logo} alt="Akasha Relic Tech" fill className="object-contain" />
        </div>
        <h2 className="text-3xl font-serif text-white mb-2 text-center">Set New Password</h2>
        <p className="text-gray-400 text-sm text-center leading-relaxed">
          Your new password must be different to previously used passwords.
        </p>
      </div>

      {/* --- Form --- */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          placeholder="Create a new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full bg-[#0B0C1E]/50 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:border-[#7C4AED] focus:ring-1 focus:ring-[#7C4AED] transition-all"
        />
        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full bg-[#0B0C1E]/50 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:border-[#7C4AED] focus:ring-1 focus:ring-[#7C4AED] transition-all"
        />
        <button
          type="submit"
          className="w-full bg-[#7C4AED] hover:bg-[#6D39D2] text-white font-semibold py-3.5 rounded-xl text-sm transition-all shadow-[0_0_15px_rgba(124,74,237,0.2)] hover:shadow-[0_0_25px_rgba(124,74,237,0.4)]"
        >
          Confirm
        </button>
      </form>

      {/* --- Footer --- */}
      <div className="mt-8 text-center">
        <p className="text-[10px] text-gray-500 leading-relaxed">
          You acknowledge that you read, and agree, to our <Link href="/terms" className="text-white hover:underline">Terms of Service</Link> and our <Link href="/privacy" className="text-white hover:underline">Privacy Policy</Link>
        </p>
      </div>
    </motion.div>
  );
};