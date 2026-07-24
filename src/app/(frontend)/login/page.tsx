"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Logo } from "@/components/navbar/components/Logo";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your login logic here
    console.log("Logging in with:", { email, password });
  };

  return (
    <main className="min-h-screen w-full bg-[#020215] relative overflow-hidden flex items-center justify-center py-12 px-4 sm:px-6">
      
      {/* Background Purple Glow Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#7C4AED]/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-[440px] bg-[#15162C]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-8 sm:p-10 shadow-2xl"
      >
        {/* --- Logo Section --- */}
        <div className="flex flex-col items-center mb-8">
          {/* Actual Logo Image */}
          <div className="mb-4">
            <Logo className="h-14 w-auto" />
          </div>

          <h2 className="text-3xl font-serif text-white mb-2 text-center">
            Welcome back!
          </h2>
          <p className="text-gray-400 text-sm text-center leading-relaxed">
            Already a account? Please enter your email & password to login
          </p>
        </div>

        {/* --- Login Form --- */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-[#0B0C1E]/50 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:border-[#7C4AED] focus:ring-1 focus:ring-[#7C4AED] transition-all"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-[#0B0C1E]/50 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:border-[#7C4AED] focus:ring-1 focus:ring-[#7C4AED] transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#7C4AED] hover:bg-[#6D39D2] text-white font-semibold py-3.5 rounded-xl text-sm transition-all shadow-[0_0_15px_rgba(124,74,237,0.2)] hover:shadow-[0_0_25px_rgba(124,74,237,0.4)]"
          >
            Log In
          </button>
        </form>

        {/* --- Forgot Password --- */}
        <div className="flex justify-center mt-4">
          <Link 
            href="/forgot-password" 
            className="text-sm text-[#A78BFA] hover:text-[#7C4AED] transition-colors"
          >
            Forgot Password?
          </Link>
        </div>

        {/* --- Divider --- */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/5"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-4 bg-[#15162C] text-gray-500">or</span>
          </div>
        </div>

        {/* --- Social & Create Account Buttons --- */}
        <div className="space-y-3">
          {/* Google Login Button */}
          <button className="w-full bg-[#2A2A3E] hover:bg-[#3A3A52] text-white text-sm font-medium py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue With Google
          </button>

          {/* Create Account Button */}
          <Link href="/register">
            <button className="w-full bg-transparent border border-[#7C4AED]/50 hover:border-[#7C4AED] hover:bg-[#7C4AED]/10 text-[#A78BFA] hover:text-white text-sm font-medium py-3.5 rounded-xl transition-all">
              Create Account
            </button>
          </Link>
        </div>

        {/* --- Footer Legal Text --- */}
        <div className="mt-8 text-center">
          <p className="text-[10px] text-gray-500 leading-relaxed">
            You acknowledge that you read, and agree, to our <Link href="/terms" className="text-white hover:underline">Terms of Service</Link> and our <Link href="/privacy" className="text-white hover:underline">Privacy Policy</Link>
          </p>
        </div>

      </motion.div>
    </main>
  );
}