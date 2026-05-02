"use client";

import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import TopNavbar from "@/components/dashboard/TopNavbar";
import AppLoader from "@/components/shared/AppLoader";
import { useUserProfile } from "@/hooks/useUser";
import ErrorPage from "@/components/shared/ErrorPage";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoading, isError, refetch } = useUserProfile();

  if (isLoading) return <AppLoader />;

  if (isError) {
    return (
      <ErrorPage
        title="Unable to load dashboard"
        message="There was a problem fetching your profile."
        onRetry={refetch}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <div className="lg:ml-56 flex flex-col min-h-screen">
        <TopNavbar onMenuClick={() => setIsOpen(true)} />
        <main className="px-4 sm:px-6 lg:px-10 py-6 flex-1 bg-[#f8fafc] text-black">
          {children}
        </main>
      </div>
    </div>
  );
}
