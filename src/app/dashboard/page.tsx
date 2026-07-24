"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardRootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/dashboard/user-management");
  }, [router]);

  return (
    <div className="min-h-screen bg-[#020215] flex items-center justify-center text-gray-400 text-sm">
      Redirecting to User Management...
    </div>
  );
}