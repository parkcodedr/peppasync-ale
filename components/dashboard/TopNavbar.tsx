"use client";

import { useExportOrdersCsv, usePipelineSummary } from "@/hooks/useOrders";
import { Search, Download, Menu } from "lucide-react";
import { useState } from "react";
import { PipelineValueSkeleton } from "../pipeline/PipelineValueSkeleton";
import { useToast } from "../ui/Toast";
import { getErrorMessage } from "@/lib/error";
import { useUserStore } from "@/store/useUserStore";
import { getInitials } from "@/lib/utils";

export default function TopNavbar({
  onMenuClick,
}: {
  onMenuClick: () => void;
}) {
  const [search, setSearch] = useState("");
  const { data, isLoading, error, refetch } = usePipelineSummary();
  const { mutateAsync: exportCsv, isPending: exporting } = useExportOrdersCsv();
  const { user } = useUserStore();

  const { notify } = useToast();

  const handleExport = async () => {
    try {
      await exportCsv();
      notify("CSV exported successfully", "success");
    } catch (err: unknown) {
      notify(getErrorMessage(err), "error");
    }
  };

  return (
    <header className="h-14 bg-white  border-b border-gray-200 flex items-center justify-between px-6 gap-4">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-md hover:bg-slate-100"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="relative hidden sm:block w-48 md:w-64">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Order ID..."
            className="w-full h-8 pl-8 pr-3 text-[13px] bg-slate-50 text-black border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 placeholder:text-gray-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-[10px] text-gray-400 uppercase tracking-wider">
            Pipeline Value
          </p>

          {isLoading ? (
            <PipelineValueSkeleton />
          ) : error ? (
            <button
              onClick={() => refetch()}
              className="text-xs text-red-500 hover:underline"
            >
              Retry
            </button>
          ) : (
            <p className="text-sm font-semibold text-black tabular-nums">
              {data?.totalValueDisplay}
            </p>
          )}
        </div>

        <button
          onClick={handleExport}
          disabled={exporting}
          className="inline-flex items-center gap-1.5 h-7 px-2.5 text-[11px] cursor-pointer font-medium text-slate-600 bg-slate-50 border border-gray-200 rounded-md hover:bg-slate-100 transition-colors disabled:opacity-50"
        >
          <Download className="h-3 w-3" strokeWidth={2} />
          {exporting ? "Exporting..." : "Export CSV"}
        </button>

        <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center overflow-hidden">
          {!user ? (
            <div className="w-full h-full animate-pulse bg-indigo-400" />
          ) : (
            <span className="text-[11px] font-medium text-white">
              {getInitials(user?.full_name)}
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
