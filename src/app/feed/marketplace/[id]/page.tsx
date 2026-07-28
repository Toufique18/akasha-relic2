"use client";

import { MarketplaceDetailView } from "@/components/user-dashboard/MarketplaceDetailView";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    id: string;
  };
}

export default function MarketplaceDetailPage({ params }: PageProps) {
  // Optional: Validate ID here. 
  if (parseInt(params.id) > 10) {
    notFound();
  }

  return <MarketplaceDetailView />;
}