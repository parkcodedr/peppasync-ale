import { Order } from "@/lib/types";
import StatusPill from "./StatusPill";

interface Props {
  order: Order;
  onClick: (order: Order) => void;
  clickable?: boolean;
}

export default function OrderCard({ order, onClick, clickable }: Props) {
  return (
    <button
      onClick={() => clickable && onClick(order)}
      className={`w-full text-left bg-white border border-gray-200 rounded-lg p-3.5 transition ${
        clickable
          ? "hover:border-indigo-300 hover:shadow-sm cursor-pointer"
          : "cursor-default"
      }`}
    >
     
      <div className="flex justify-between mb-2.5">
        <span className="font-mono text-[13px] font-semibold">#{order.id}</span>

        <span className="text-[10px] bg-slate-50 px-1.5 py-0.5 rounded border border-gray-200">
          Time in state {order.ageHours}h
        </span>
      </div>

      
      <p className="text-[13px] font-medium truncate">{order.customer}</p>

      <p className="text-sm font-semibold mb-3">
        £{order.value.toLocaleString()}
      </p>

     
      <div className="flex justify-between pt-2.5 border-t border-gray-200">
        <StatusPill status={order.status} />

        <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center">
          <span className="text-[9px] font-semibold">
            {order.assignee.initials}
          </span>
        </div>
      </div>
    </button>
  );
}
