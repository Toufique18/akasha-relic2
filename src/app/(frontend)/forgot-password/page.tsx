"use client";

import { ForgotPasswordEmail } from "@/components/auth-screen/ForgotPasswordEmail";

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen w-full bg-[#020215] relative overflow-hidden flex items-center justify-center py-12 px-4 sm:px-6">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#7C4AED]/20 rounded-full blur-[120px] pointer-events-none" />
      <ForgotPasswordEmail />
    </main>
  );
}