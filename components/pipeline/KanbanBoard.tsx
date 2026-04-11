"use client";

import { useState } from "react";
import KanbanColumn from "./KanbanColumn";
import OrderDrawer from "./OrderDrawer";
import { initialOrders, columnConfig } from "@/lib/sampleData";
import { Order, ColumnId } from "@/lib/types";

export default function KanbanBoard() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const getColumnOrders = (columnId: ColumnId) =>
    orders.filter((o) => o.column === columnId);

  const handleApprove = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              column: "processing_erp",
              status: "FIRM_PLANNED_PO_TRIGGERED",
              auditTrail: [
                ...o.auditTrail,
                {
                  ts: new Date().toISOString().slice(0, 16).replace("T", " "),
                  event:
                    "Ops: Design Freeze APPROVED — Firm PO Triggered to ERP",
                },
              ],
            }
          : o,
      ),
    );

    setSelectedOrder(null);
  };

  return (
    <>
      <div className="flex gap-5 overflow-x-auto pb-4">
        {columnConfig.map((col) => (
          <KanbanColumn
            key={col.id}
            config={col}
            orders={getColumnOrders(col.id)}
            onCardClick={setSelectedOrder}
          />
        ))}
      </div>

      <OrderDrawer
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onApprove={handleApprove}
      />
    </>
  );
}
