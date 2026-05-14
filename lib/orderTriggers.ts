import { Ban, Check, CheckCircle2, Lock, Rocket } from "lucide-react";

export type OrderTrigger =
  | "finance_approved"
  | "ops_approve"
  | "ops_reject"
  | "release"
  | "cancel";

export interface TriggerConfig {
  trigger: OrderTrigger;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  className: string;
  requiresNotes?: boolean;
  requiresReason?: boolean;
}

export const TRIGGER_CONFIG: Record<OrderTrigger, TriggerConfig> = {
  finance_approved: {
    trigger: "finance_approved",
    label: "Confirm Finance",
    icon: CheckCircle2,
    className:
      "w-full cursor-pointer h-10 bg-indigo-600 hover:bg-indigo-700 text-white text-[13px] font-semibold rounded-md flex items-center justify-center gap-2",
  },

  ops_approve: {
    trigger: "ops_approve",
    label: "Ops Approve",
    icon: CheckCircle2,
    requiresNotes: true,
    className:
      "w-full cursor-pointer h-10 bg-emerald-600 hover:bg-emerald-700 text-white text-[13px] font-semibold rounded-md flex items-center justify-center gap-2",
  },

  ops_reject: {
    trigger: "ops_reject",
    label: "Reject Order",
    icon: CheckCircle2,
    requiresReason: true,
    className:
      "w-full cursor-pointer h-10 bg-red-600 hover:bg-red-700 text-white text-[13px] font-semibold rounded-md flex items-center justify-center gap-2",
  },

  release: {
    trigger: "release",
    label: "Approve Design Freeze",
    icon: CheckCircle2,
    requiresNotes: true,
    className:
      "w-full cursor-pointer h-10 bg-emerald-600 hover:bg-emerald-700 text-white text-[13px] text-[13px] font-semibold rounded-md flex items-center justify-center gap-2",
  },

  cancel: {
    trigger: "cancel",
    label: "Cancel Order",
    icon: CheckCircle2,
    requiresReason: true,
    className:
      "w-full cursor-pointer h-10 bg-red-100 hover:bg-red-200 text-red-600 text-[13px] font-semibold rounded-md flex items-center justify-center gap-2",
  },
};
