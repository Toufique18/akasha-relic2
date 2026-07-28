"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Determine title based on step
  const getTitle = () => {
    if (pathname.includes("/success")) return "";
    if (pathname.includes("/payment")) return "Payment Information";
    return "Shopping Cart";
  };

  return (
    <div className="min-h-screen bg-[#020215] relative pb-20">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-6">
        
        {/* Back Button - Hidden on Success page */}
        {!pathname.includes("/success") && (
          <Link href="/feed/marketplace" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm mb-6">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
        )}

        {/* Page Title */}
        {getTitle() && (
          <h1 className="text-3xl font-medium text-white mb-8">{getTitle()}</h1>
        )}

        {children}
      </div>
    </div>
  );
}