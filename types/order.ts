export interface OrdersResponse {
  items: OrderItem[];
  total: number;
  page: number;
  page_size: number;
  pages: number;
}

export interface OrderItem {
  id: string;
  external_ref: string;
  channel: string;
  state: string;
  configuration_id: string;
  configuration_data: Record<string, unknown>;
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
  from_state: string;
  to_state: string;
  payload: Record<string, unknown>;
  notes: string;
  created_at: string;
}

export interface ValidateTriggersResponse {
  [key: string]: unknown;
}

export interface ApproveOrderPayload {
  notes: string;
}

export interface RejectOrderPayload {
  reason: string;
}

export interface ReleaseOrderPayload {
  notes: string;
}
