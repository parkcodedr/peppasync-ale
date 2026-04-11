"use client";

import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import TopNavbar from "@/components/dashboard/TopNavbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />

      {/* Content */}
      <div className="lg:ml-56 flex flex-col min-h-screen">
        <TopNavbar onMenuClick={() => setIsOpen(true)} />

        <main className="px-4 sm:px-6 lg:px-10 py-6 flex-1 bg-[#f8fafc] text-black">
          {children}
        </main>
      </div>
    </div>
  );
}
