"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { Logo } from "@/components/navbar/components/Logo";
import { useLoginMutation } from "@/features/auth/auth.api";
import { setToken, setUser } from "@/features/auth/store/auth.slice";
import { saveToken } from "@/utils/tokenHandler";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get("redirect");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    try {
      const response = await login({ email, password }).unwrap();
      const token = response?.data?.token;
      const user = response?.data?.user;

      if (token) {
        dispatch(setToken(token));
        saveToken(token);
        if (user) {
          dispatch(setUser(user));
        }

        toast.success(response?.message || "Logged in successfully!");

        // If user was redirected from a protected page, send them back there
        if (redirectTarget && redirectTarget.startsWith("/")) {
          router.push(redirectTarget);
        } else if (user?.role === "ADMIN") {
          router.push("/dashboard");
        } else {
          router.push("/feed");
        }
      }
    } catch (err: any) {
      const detail =
        err?.data?.detail ||
        err?.data?.message ||
        "Login failed. Please check your credentials.";
      setErrorMessage(detail);
      toast.error(detail);
    }
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
        <div className="mb-4">
          <Logo className="h-14 w-auto" />
        </div>

        <h2 className="text-3xl font-serif text-white mb-2 text-center">
          Welcome back!
        </h2>
        <p className="text-gray-400 text-sm text-center leading-relaxed">
          {redirectTarget ? (
            <span className="text-[#A78BFA] font-medium">
              Please log in to access this page
            </span>
          ) : (
            "Already have an account? Please enter your email & password to login"
          )}
        </p>
      </div>

      {/* --- Error Message Banner --- */}
      {errorMessage && (
        <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs text-center">
          {errorMessage}
        </div>
      )}

      {/* --- Login Form --- */}
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
            className="w-full bg-[#0B0C1E]/50 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:border-[#7C4AED] focus:ring-1 focus:ring-[#7C4AED] transition-all disabled:opacity-50"
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
            className="w-full bg-[#0B0C1E]/50 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:border-[#7C4AED] focus:ring-1 focus:ring-[#7C4AED] transition-all disabled:opacity-50"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#7C4AED] hover:bg-[#6D39D2] text-white font-semibold py-3.5 rounded-xl text-sm transition-all shadow-[0_0_15px_rgba(124,74,237,0.2)] hover:shadow-[0_0_25px_rgba(124,74,237,0.4)] disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Logging In...</span>
            </>
          ) : (
            "Log In"
          )}
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

      {/* --- Create Account Button --- */}
      <div className="space-y-3">
        <Link href="/register">
          <button className="w-full bg-transparent border border-[#7C4AED]/50 hover:border-[#7C4AED] hover:bg-[#7C4AED]/10 text-[#A78BFA] hover:text-white text-sm font-medium py-3.5 rounded-xl transition-all cursor-pointer">
            Create Account
          </button>
        </Link>
      </div>

      {/* --- Footer Legal Text --- */}
      <div className="mt-8 text-center">
        <p className="text-[10px] text-gray-500 leading-relaxed">
          You acknowledge that you read, and agree, to our{" "}
          <Link href="/terms" className="text-white hover:underline">
            Terms of Service
          </Link>{" "}
          and our{" "}
          <Link href="/privacy" className="text-white hover:underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </motion.div>
  );
}

export default function LoginPage() {
  return (
    <main className="min-h-screen w-full bg-[#020215] relative overflow-hidden flex items-center justify-center py-12 px-4 sm:px-6">
      {/* Background Purple Glow Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#7C4AED]/20 rounded-full blur-[120px] pointer-events-none" />

      <Suspense fallback={<div className="text-white text-sm">Loading...</div>}>
        <LoginForm />
      </Suspense>
    </main>
  );
}