"use client";

import { AvatarResult } from "@/components/avatar-screen/AvatarResult";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function PetResultPage() {
  return (
    <Suspense fallback={<div className="text-white text-center pt-20">Loading Avatar...</div>}>
      <PetResultContent />
    </Suspense>
  );
}

function PetResultContent() {
  const searchParams = useSearchParams();
  const originalImage = searchParams.get("orig");
  const upscaledImage = searchParams.get("enhanced");

  return <AvatarResult type="pet" originalImage={originalImage} upscaledImage={upscaledImage} />;
}