"use client";

import { MoveLeft } from "lucide-react";
import Link from "next/link";

interface Props {
  title?: string;
  subtitle?: string;
  showSkip?: boolean;
}

export default function OnboardingHeader({
  title = "Peppasync",
  subtitle = "Integration Setup",
  showSkip = true,
}: Props) {
  return (
    <header className="h-14 flex items-center justify-between px-6 border-b border-gray-200 bg-white">
      <div className="flex items-center gap-2 text-[14px]">
        <span className="font-semibold text-gray-900 tracking-tight">
          {title}
        </span>
        <span className="text-gray-300">|</span>
        <span className="text-gray-500 font-medium">{subtitle}</span>
      </div>
      {showSkip && (
        <Link
          href="/"
          className="text-[12px] font-medium text-slate-400 hover:text-slate-700 transition-colors flex gap-1 items-center"
        >
           <MoveLeft strokeWidth={0.6} /> Skip for now
        </Link>
      )}
    </header>
  );
}
