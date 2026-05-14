import { TRIGGER_CONFIG } from "@/lib/orderTriggers";

export interface OrdersResponse {
  items: OrderItem[];
  total: number;
  page: number;
  page_size: number;
  pages: number;
}

export interface LineItem {
  price: string;
  title: string;
  quantity: number;
  product_id: number;
}

export interface ConfigurationData {
  line_items?: LineItem[];
  [key: string]: unknown;
}

export interface OrderItem {
  id: string;
  external_ref: string;
  channel: string;
  state: string;
  configuration_id: string;
  configuration_data: ConfigurationData;
  customer_email: string;
  customer_name: string;
  pipeline_value_pence: number;
  currency: string;
  shopify_order_id: string;
  v12_finance_ref: string;
  bc_quote_id: string;
  bc_quote_no: string;
  bc_order_id: string;
  bc_order_no: string;
  bc_production_order_no: string;
  ops_assigned_to: string;
  ops_notes: string;
  ops_reject_reason: string;
  created_at: string;
  updated_at: string;
}

export interface OrderAuditLogResponse {
  items: OrderAuditItem[];
  total: number;
  page: number;
  page_size: number;
  pages: number;
}

export interface OrderAuditItem {
  id: number;
  order_id: string;
  actor_type: string;
  actor_id: string;
  event_type: string;
  from_state: string | null;
  to_state: string | null;
  payload: Record<string, unknown> | null;
  notes: string | null;
  created_at: string;
}

export interface ValidateTriggersResponse {
  [key: string]: unknown;
}

export interface ApproveOrderPayload {
  trigger: string;
  finance_ref?: string;
  reason?: string;
  notes?: string;
}

export interface RejectOrderPayload {
  reason: string;
}

export interface ReleaseOrderPayload {
  notes: string;
}

export interface AuditEntry {
  id: number;
  orderId: string;
  actorType: string;
  actorId: string;
  eventType: string;
  fromState: string | null;
  toState: string | null;
  notes: string | null;
  createdAt: string;
}

export type ActionType =
  (typeof ORDER_ACTIONS)[keyof typeof ORDER_ACTIONS] | null;

export const ORDER_ACTIONS = {
  APPROVE: "APPROVE",
  REJECT: "REJECT",
  CANCEL: "CANCEL",
} as const;

export interface PipelineState {
  state: string;
  count: number;
  totalValuePence: number;
  totalValue: number;
}

export interface PipelineSummary {
  states: PipelineState[];
  totalValuePence: number;
  totalValue: number;
  totalValueDisplay: string;
}

export interface PipelineStateResponse {
  state: string;
  count: number;
  total_value_pence: string;
}

export interface PipelineSummaryResponse {
  states: PipelineStateResponse[];
  total_value_pence: string;
  total_value_display: string;
}

export interface BomItem {
  product_id: number;
  title: string;
  quantity: number;
  price: string;
}


export type TriggerKey = keyof typeof TRIGGER_CONFIG;

export interface ValidTriggersResponse {
  triggers: TriggerKey[];
}