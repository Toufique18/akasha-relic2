"use client";

import { UserDetailView } from "@/components/admin-dashboard/UserDetailView";
import { notFound } from "next/navigation";
import { use } from "react";

// Accept the dynamic ID from the URL
interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function UserDetailPage({ params }: PageProps) {
  const { id } = use(params);
  // In a real app, you would fetch user data here using the 'id'
  // For demo purposes, we just pass it down. 
  // If an invalid ID is hit, we can trigger a 404.
  if (parseInt(id) > 10) {
    notFound(); 
  }

  return (
    <main className="w-full min-h-screen bg-[#020215]">
      <UserDetailView />
    </main>
  );
}