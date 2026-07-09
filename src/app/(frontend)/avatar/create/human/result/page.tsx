"use client";

import { AvatarResult } from "@/components/avatar-screen/AvatarResult";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

// Wrap in Suspense to handle client-side search params safely
export default function HumanResultPage() {
  return (
    <Suspense fallback={<div className="text-white text-center pt-20">Loading Avatar...</div>}>
      <ResultContent />
    </Suspense>
  );
}

function ResultContent() {
  const searchParams = useSearchParams();
  const originalImage = searchParams.get("orig");
  const upscaledImage = searchParams.get("enhanced");

  return <AvatarResult type="human" originalImage={originalImage} upscaledImage={upscaledImage} />;
}