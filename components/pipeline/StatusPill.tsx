import { OrderStatus } from "@/lib/types";
import { formatStateLabel } from "@/lib/utils";

const statusStyles: Record<
  string,
  {
    label?: string;
    className: string;
  }
> = {
  DRAFT: {
    className: "bg-slate-100 text-slate-700 border-slate-200",
  },

  AWAITING_FINANCE: {
    className: "bg-amber-50 text-amber-700 border-amber-200",
  },

  AWAITING_OPS_APPROVAL: {
    className: "bg-indigo-50 text-indigo-700 border-indigo-200",
  },

  DESIGN_FREEZE: {
    className: "bg-indigo-100 text-indigo-500 border-indigo-200",
  },

  RELEASED_TO_ERP: {
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },

  CANCELLED: {
    className: "bg-red-50 text-red-700 border-red-200",
  },

  REJECTED: {
    className: "bg-rose-50 text-rose-700 border-rose-200",
  },

  COMPLETED: {
    className: "bg-green-50 text-green-700 border-green-200",
  },
};

export default function StatusPill({ status }: { status: OrderStatus }) {
  const config = statusStyles[status];

  const label = config?.label ?? formatStateLabel(status);

  const className =
    config?.className ?? "bg-gray-100 text-gray-700 border-gray-200";

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 text-[10px] font-semibold uppercase border rounded-full shrink-0 ${className}`}
    >
      {label}
    </span>
  );
}
