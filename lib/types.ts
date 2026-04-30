import { BomItem } from "@/types/order";

export type OrderStatus = string;
export type ColumnId = string;

export interface AuditEntry {
  ts: string;
  event: string;
}

export interface Assignee {
  name: string;
  initials: string;
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
  shopify_order_id?:string
}