import { ColumnConfig, Order } from "./types";

export const columnConfig: ColumnConfig[] = [
  {
    id: "pending_finance",
    title: "Awaiting Finance / External",
    dotColor: "bg-amber-500",
  },
  {
    id: "pending_design",
    title: "Pending Design Freeze (Ops Action Required)",
    dotColor: "bg-indigo-500",
  },

  {
    id: "processing_erp",
    title: "Processing in ERP (Factory Floor)",
    dotColor: "bg-emerald-500",
  },
];

export const initialOrders: Order[] = [
  {
    id: "10232",
    customer: "Sainsbury's",
    value: 8900,
    ageHours: 12,
    status: "AWAITING_FINANCE_APPROVAL",
    column: "pending_finance",
    config: "Shelf Branding Kit",
    assignee: {
      name: "James Carter",
      initials: "JC",
    },
    bom: [
      { itemNo: "C-300", description: "PVC Sheet", qty: 10 },
      { itemNo: "D-410", description: "Adhesive Pack", qty: 5 },
    ],
    erpQuote: "SQ-77821",
    auditTrail: [
      {
        ts: "2026-04-09 14:02",
        event: "Order submitted",
      },
      {
        ts: "2026-04-09 15:10",
        event: "Finance review pending",
      },
    ],
  },
  {
    id: "10222",
    customer: "Sainsbury's",
    value: 9900,
    ageHours: 12,
    status: "AWAITING_FINANCE_APPROVAL",
    column: "pending_finance",
    config: "Shelf Branding Kit",
    assignee: {
      name: "James Carter",
      initials: "JC",
    },
    bom: [
      { itemNo: "C-300", description: "PVC Sheet", qty: 10 },
      { itemNo: "D-410", description: "Adhesive Pack", qty: 5 },
    ],
    erpQuote: "SQ-77821",
    auditTrail: [
      {
        ts: "2026-04-09 14:02",
        event: "Order submitted",
      },
      {
        ts: "2026-04-09 15:10",
        event: "Finance review pending",
      },
    ],
  },
  {
    id: "10231",
    customer: "Tesco Stores Ltd",
    value: 12500,
    ageHours: 6,
    status: "AWAITING_OPS_APPROVAL",
    column: "pending_design",
    config: "Retail Display Unit - Custom",
    assignee: {
      name: "Olivia Parker",
      initials: "OP",
    },
    bom: [
      { itemNo: "A-100", description: "Steel Frame", qty: 2 },
      { itemNo: "B-210", description: "Acrylic Panels", qty: 6 },
    ],
    erpQuote: undefined,
    auditTrail: [
      {
        ts: "2026-04-10 09:12",
        event: "Order created in middleware",
      },
      {
        ts: "2026-04-10 09:30",
        event: "Moved to Ops Pipeline",
      },
    ],
  },

  {
    id: "10233",
    customer: "ASDA",
    value: 15400,
    ageHours: 3,
    status: "FIRM_PLANNED_PO_TRIGGERED",
    column: "processing_erp",
    config: "Point of Sale Stand",
    assignee: {
      name: "Michael Lee",
      initials: "ML",
    },
    bom: [
      { itemNo: "E-500", description: "Aluminium Base", qty: 3 },
      { itemNo: "F-610", description: "Printed Panels", qty: 8 },
    ],
    erpQuote: "SQ-77845",
    auditTrail: [
      {
        ts: "2026-04-10 08:00",
        event: "Approved by Ops",
      },
      {
        ts: "2026-04-10 08:05",
        event: "PO triggered to ERP",
      },
    ],
  },
];
