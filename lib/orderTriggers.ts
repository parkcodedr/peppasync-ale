
import { Lock, RotateCcw } from "lucide-react";
import { ORDER_ACTIONS, ActionType } from "@/types/order";

export interface TriggerConfig {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  className: string;
  action: ActionType;
}

export const TRIGGER_CONFIG = {
  finance_approved: {
    label: "Approve & Trigger Design Freeze",
    icon: Lock,
    className:
      "w-full cursor-pointer h-10 bg-indigo-600 hover:bg-indigo-700 text-white text-[13px] font-semibold rounded-md flex items-center justify-center gap-2",
    action: ORDER_ACTIONS.APPROVE,
  },

  cancel: {
    label: "Reject / Revision",
    icon: RotateCcw,
    className:
      "w-full cursor-pointer h-9 text-slate-500 hover:text-slate-800 text-[13px] font-medium flex items-center justify-center gap-1.5",
    action: ORDER_ACTIONS.REJECT,
  },
} satisfies Record<string, TriggerConfig>;