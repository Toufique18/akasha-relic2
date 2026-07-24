"use client";

import { AssetDetailView } from "@/components/admin-dashboard/AssetDetailView";
import { notFound } from "next/navigation";
import { use } from "react";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function AssetDetailPage({ params }: PageProps) {
  const { id } = use(params);
  // In a real app, you would fetch data here based on params.id
  // If the ID is invalid, trigger a 404
  if (parseInt(id) > 10) {
    notFound();
  }

  return (
    <main className="w-full min-h-screen bg-[#020215]">
      <AssetDetailView />
    </main>
  );
}