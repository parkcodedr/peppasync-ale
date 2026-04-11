import { OrderStatus } from "@/lib/types";

const statusMap: Record<OrderStatus, { label: string; className: string }> = {
  AWAITING_FINANCE_APPROVAL: {
    label: "Awaiting Finance",
    className: "bg-amber-50 text-amber-700 border-amber-200",
  },
  AWAITING_OPS_APPROVAL: {
    label: "Awaiting Ops",
    className: "bg-indigo-50 text-indigo-700 border-indigo-200",
  },
  FIRM_PLANNED_PO_TRIGGERED: {
    label: "Firm PO Triggered",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  RECYCLE_REQUESTED: {
    label: "Recycle",
    className: "bg-rose-50 text-rose-700 border-rose-200",
  },
};

export default function StatusPill({ status }: { status: OrderStatus }) {
  const config = statusMap[status];

  return (
    <span
      className={`inline-flex px-2 py-0.5 text-[10px] font-semibold uppercase border rounded-full ${config.className}`}
    >
      {config.label}
    </span>
  );
}
