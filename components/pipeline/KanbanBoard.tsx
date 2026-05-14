"use client";

import { useState } from "react";

import KanbanColumn from "./KanbanColumn";
import OrderDrawer from "./OrderDrawer";

import { Order } from "@/lib/types";

import { useApproveOrder, useOrders } from "@/hooks/useOrders";

import { formatStateLabel, getAgeHours, getStateColor } from "@/lib/utils";

import { ErrorMessage } from "../shared/ErrorMessage";
import { OrderCardSkeleton } from "./OrderCardSkeleton";

import { TriggerConfig } from "@/lib/orderTriggers";

import { useToast } from "../ui/Toast";

import { getErrorMessage } from "@/lib/error";

import ConfirmationModal from "../modal/ConfirmationModal";
import OrderActionModal from "../modal/OrderActionModal";

interface ActionPayload {
  trigger: string;
  notes?: string;
  reason?: string;
  finance_ref?: string;
}

export default function KanbanBoard() {
  const { notify } = useToast();

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const [activeOrder, setActiveOrder] = useState<Order | null>(null);

  const [actionConfig, setActionConfig] = useState<TriggerConfig | null>(null);

  const [showActionModal, setShowActionModal] = useState(false);

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [payload, setPayload] = useState<ActionPayload>({
    trigger: "",
  });

  const { mutateAsync: approveOrder, isPending } = useApproveOrder();

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

      finance_ref: item.v12_finance_ref ?? "",
    })) ?? [];

  const states = Array.from(new Set(orders.map((o) => o.status)));

  const columns = states.map((state) => ({
    id: state,
    title: formatStateLabel(state),
    dotColor: getStateColor(state),
  }));

  const getColumnOrders = (state: string) =>
    orders.filter((o) => o.status === state);

  const openAction = (order: Order, config: TriggerConfig) => {
    setActiveOrder(order);

    setActionConfig(config);

    if (!config.requiresNotes && !config.requiresReason) {
      setPayload({
        trigger: config.trigger,
        finance_ref: order.finance_ref,
      });

      setShowConfirmModal(true);

      return;
    }

    setShowActionModal(true);
  };

  const closeAll = () => {
    setActionConfig(null);

    setActiveOrder(null);

    setPayload({
      trigger: "",
    });

    setShowActionModal(false);

    setShowConfirmModal(false);
  };

  const handleActionContinue = (data: { notes?: string; reason?: string }) => {
    if (!actionConfig || !activeOrder) return;

    setPayload({
      trigger: actionConfig.trigger,
      notes: data.notes,
      reason: data.reason,
      finance_ref: activeOrder.finance_ref,
    });

    setShowActionModal(false);

    setShowConfirmModal(true);
  };

  const handleConfirm = async () => {
    if (!activeOrder?.id || !actionConfig) return;

    try {
      const response = await approveOrder({
        orderId: activeOrder.id,
        payload,
      });

      notify(response?.message ?? "Action completed successfully", "success");

      closeAll();

      refetch();
    } catch (err: unknown) {
      notify(getErrorMessage(err), "error");
    }
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
            onAction={openAction}
          />
        ))}
      </div>

      <OrderDrawer
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onAction={openAction}
      />

      <OrderActionModal
        isOpen={showActionModal}
        onClose={closeAll}
        onContinue={handleActionContinue}
        config={actionConfig}
      />

      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={closeAll}
        onConfirm={handleConfirm}
        title={actionConfig?.label ?? "Confirm Action"}
        description={`Are you sure you want to continue this action for Order #${activeOrder?.shopify_order_id}?`}
        confirmText="Continue"
        confirmVariant="primary"
        isloading={isPending}
      />
    </>
  );
}
