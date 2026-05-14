"use client";

import { useValidTriggers } from "@/hooks/useOrders";
import {
  OrderTrigger,
  TRIGGER_CONFIG,
  TriggerConfig,
} from "@/lib/orderTriggers";

interface Props {
  orderId: string;
  onAction: (config: TriggerConfig) => void;
}

export default function OrderActions({ orderId, onAction }: Props) {
  const { data, isLoading } = useValidTriggers(orderId);

  if (!orderId) return null;

  if (isLoading) {
    return (
      <div className="mt-3">
        <div className="h-8 rounded-md bg-gray-200 animate-pulse" />
      </div>
    );
  }

  const triggers = (data?.triggers ?? []) as OrderTrigger[];

  if (!triggers.length) return null;
  const primaryTrigger = triggers[0];
  const config = TRIGGER_CONFIG[primaryTrigger];

  if (!config) return null;
  const Icon = config.icon;

  const stopClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="mt-3" onClick={stopClick}>
      <button
        type="button"
        onClick={() => onAction(config)}
        className={config?.className}
      >
        <Icon className="h-3 w-3" />

        {config.label}
      </button>
    </div>
  );
}
