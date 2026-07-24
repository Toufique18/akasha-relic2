"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import Logo from "@/assets/banner/AKASHA-RELIC-TECH.svg";

export const ForgotPasswordVerify = () => {
  const router = useRouter();

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to verify OTP goes here
    console.log("Verifying OTP...");
    // Redirect to Set New Password page
    router.push("/forgot-password/reset");
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
        <h2 className="text-3xl font-serif text-white mb-2 text-center">Verification Code</h2>
        <p className="text-gray-400 text-sm text-center leading-relaxed">
          Please enter the code sent to<br />example123@gmail.com
        </p>
      </div>

      {/* --- OTP Form --- */}
      <form onSubmit={handleVerify} className="space-y-6">
        <div className="flex justify-between gap-2 sm:gap-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <input
              key={i}
              type="text"
              maxLength={1}
              className="w-full aspect-square bg-[#0B0C1E]/50 border border-white/10 rounded-xl text-center text-white text-lg focus:outline-none focus:border-[#7C4AED] focus:ring-1 focus:ring-[#7C4AED] transition-all"
            />
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-[#7C4AED] hover:bg-[#6D39D2] text-white font-semibold py-3.5 rounded-xl text-sm transition-all shadow-[0_0_15px_rgba(124,74,237,0.2)] hover:shadow-[0_0_25px_rgba(124,74,237,0.4)]"
        >
          Verify
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