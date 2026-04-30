"use client";

import { cn } from "@/lib/utils";

export default function Shimmer({ className }: { className?: string }) {
  return (
    <div
      className={cn("relative overflow-hidden bg-slate-200 rounded", className)}
    >
      <div className="absolute inset-0 animate-pulse bg-linear-to-r from-transparent via-white/40 to-transparent" />
    </div>
  );
}
