"use client";

import { DonatePaymentForm } from "@/components/donate-screen/DonatePaymentForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function DonatePaymentPage() {
  return (
    <main className="w-full min-h-screen bg-[#020215] relative overflow-hidden">
      
      {/* Background glow matching the global theme */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[#7C4AED]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pt-6 pb-20">
        {/* Back Button */}
        <div className="mb-6">
          <Link 
            href="/donate" 
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Donate
          </Link>
        </div>

        {/* The Payment Form */}
        <DonatePaymentForm />
      </div>
    </main>
  );
}