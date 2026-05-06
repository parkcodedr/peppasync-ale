"use client";

import { CheckCircle2 } from "lucide-react";
import { Order } from "@/lib/types";
import { ORDER_TYPES } from "@/constants";

interface Props {
  order: Order;
}

export default function OrderActions({ order }: Props) {
  const isFinanceCard = order.column === ORDER_TYPES.AWAITING_FINANCE;
  const isDesignFreezeCard = order.column === ORDER_TYPES.RELEASED_TO_ERP;

  const stopClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  //if (!isFinanceCard && !isDesignFreezeCard) return null;

  return (
    <div className="mt-3 space-y-2" onClick={stopClick}>
      {isFinanceCard && (
        <button
          type="button"
          className="w-full h-8 bg-indigo-600 hover:bg-indigo-700 text-white text-[12px] font-semibold rounded-md flex items-center justify-center gap-1.5 transition-colors"
        >
          <CheckCircle2 className="h-3 w-3" strokeWidth={2} />
          Confirm Finance
        </button>
      )}

      {isDesignFreezeCard && (
        <button
          type="button"
          className="w-full h-8 bg-emerald-600 hover:bg-emerald-700 text-white text-[12px] font-semibold rounded-md flex items-center justify-center gap-1.5 transition-colors"
        >
          <CheckCircle2 className="h-3 w-3" strokeWidth={2} />
          Approve Design Freeze
        </button>
      )}
    </div>
  );
}
