export type OrderStatus =
  | "AWAITING_FINANCE_APPROVAL"
  | "AWAITING_OPS_APPROVAL"
  | "FIRM_PLANNED_PO_TRIGGERED"
  | "RECYCLE_REQUESTED";

export type ColumnId = "pending_design" | "pending_finance" | "processing_erp";

export interface AuditEntry {
  ts: string;
  event: string;
}

export interface Assignee {
  name: string;
  initials: string;
}

export interface BomItem {
  itemNo: string;
  description: string;
  qty: number;
}

export interface Order {
  id: string;
  customer: string;
  value: number;
  ageHours: number;
  status: OrderStatus;
  column: ColumnId;
  assignee: Assignee;
  auditTrail: AuditEntry[];
  config?: string;
  bom: BomItem[];
  erpQuote?: string;
}

export interface ColumnConfig {
  id: ColumnId;
  title: string;
  dotColor: string;
}
