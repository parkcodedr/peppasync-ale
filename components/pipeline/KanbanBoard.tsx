"use client";

import { useState } from "react";
import KanbanColumn from "./KanbanColumn";
import OrderDrawer from "./OrderDrawer";
import { Order } from "@/lib/types";
import { useOrders } from "@/hooks/useOrders";
import { formatStateLabel, getAgeHours, getStateColor } from "@/lib/utils";
import { ErrorMessage } from "../shared/ErrorMessage";
import { OrderCardSkeleton } from "./OrderCardSkeleton";

export default function KanbanBoard() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const { data, isLoading, error, refetch } = useOrders({
    page: 1,
    page_size: 50,
  });

  const orders: Order[] =
    data?.items.map((item) => ({
      id: item.id,
      customer: item.customer_name || "—",
      value: item.pipeline_value_pence / 100,
      status: item.state,
      column: item.state,
      ageHours: getAgeHours(item.created_at),
      config: item.configuration_data?.line_items?.[0]?.title ?? "No config",
      shopify_order_id: item.shopify_order_id,
      assignee: {
        name: item.ops_assigned_to ?? "Unassigned",
        initials: "--",
      },
      bom: item.configuration_data?.line_items ?? [],
      erpQuote: item.bc_quote_no ?? undefined,
      auditTrail: [],
    })) ?? [];

  const states = Array.from(new Set(orders.map((o) => o.status)));

  const columns = states.map((state) => ({
    id: state,
    title: formatStateLabel(state),
    dotColor: getStateColor(state),
  }));

  const getColumnOrders = (state: string) =>
    orders.filter((o) => o.status === state);

  const handleApprove = (orderId: string) => {
    console.log("Approve order:", orderId);
    setSelectedOrder(null);
  };

  if (isLoading) {
    return (
      <div className="grid gap-4 pb-4 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
        {Array.from({ length: 4 }).map((_, i) => (
          <OrderCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <ErrorMessage message={(error as Error).message} onRetry={refetch} />
    );
  }

  return (
    <>
      <div className="grid gap-4 pb-4 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
        {columns.map((col) => (
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
      />
    </>
  );
}
