"use client";

import { use } from "react";
import { MarketplaceDetailView } from "@/components/user-dashboard/MarketplaceDetailView";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function MarketplaceDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);

  // Optional: Validate ID here. 
  if (parseInt(resolvedParams.id) > 10) {
    notFound();
  }

  return <MarketplaceDetailView />;
}