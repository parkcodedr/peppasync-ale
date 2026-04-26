"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarItems } from "@/lib/sidebar";
import clsx from "clsx";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: Props) {
  const pathname = usePathname();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={clsx(
          "fixed top-0 bottom-0 left-0 w-56 bg-white border-r border-gray-200 z-50 transform transition-transform duration-200",
          "lg:translate-x-0 lg:z-30",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        
        <div className="h-14 flex items-center px-5 border-b border-gray-200 text-black">
          <span className="text-[15px] font-semibold tracking-tight">
            Peppasync
          </span>
        </div>

        
        <nav className="flex-1 px-3 pt-4 space-y-1">
          {sidebarItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={clsx(
                  "flex items-center gap-2.5 px-2.5 py-2 rounded-md text-[13px] font-medium transition-colors",
                  isActive
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-600 hover:bg-slate-50",
                )}
              >
                <Icon className="h-4 w-4" strokeWidth={1.75} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
