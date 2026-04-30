import { ColumnId } from "../types";
import {
  OrderAuditItem,
  AuditEntry,
  PipelineSummary,
  PipelineSummaryResponse,
} from "@/types/order";

export const mapStateToColumn = (state: string): ColumnId => {
  switch (state) {
    case "AWAITING_FINANCE":
      return "pending_finance";

    case "AWAITING_OPS":
    case "PENDING_DESIGN":
      return "pending_design";

    case "RELEASED_TO_ERP":
      return "processing_erp";

    default:
      return "pending_finance";
  }
};

export const mapAuditLog = (items: OrderAuditItem[]): AuditEntry[] => {
  return items.map((item) => ({
    id: item.id,
    orderId: item.order_id,
    actorType: item.actor_type,
    actorId: item.actor_id,
    eventType: item.event_type,
    fromState: item.from_state,
    toState: item.to_state,
    notes: item.notes,
    createdAt: item.created_at,
  }));
};

export const mapPipelineSummary = (
  data: PipelineSummaryResponse,
): PipelineSummary => {
  return {
    states: data.states.map((s) => ({
      state: s.state,
      count: s.count,
      totalValuePence: Number(s.total_value_pence),
      totalValue: Number(s.total_value_pence) / 100,
    })),
    totalValuePence: Number(data.total_value_pence),
    totalValue: Number(data.total_value_pence) / 100,
    totalValueDisplay: data.total_value_display,
  };
};
