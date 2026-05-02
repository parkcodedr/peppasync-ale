"use client";

import { useValidTriggers } from "@/hooks/useOrders";
import { TRIGGER_CONFIG } from "@/lib/orderTriggers";

interface Props {
  orderId?: string;
  onAction: (action: string) => void;
}

export default function TriggerActions({ orderId, onAction }: Props) {
  const { data, isLoading, error, refetch } = useValidTriggers(orderId);

  if (!orderId) return null;

  if (isLoading) {
    return (
      <div className="space-y-2">
        <div className="h-10 rounded-md bg-gray-200 animate-pulse" />
        <div className="h-9 rounded-md bg-gray-200 animate-pulse" />
      </div>
    );
  }

  if (error) {
    return (
      <button
        onClick={() => refetch()}
        className="text-xs text-red-500 hover:underline"
      >
        Retry actions
      </button>
    );
  }

  const triggers = data?.triggers ?? [];

  return (
    <div className="space-y-2">
      {triggers.map((trigger) => {
        const config = TRIGGER_CONFIG[trigger];
        if (!config) return null;

        const Icon = config.icon;

        return (
          <button
            key={trigger}
            onClick={() => onAction(config.action)}
            className={config.className}
          >
            <Icon className="h-3.5 w-3.5" />
            {config.label}
          </button>
        );
      })}
    </div>
  );
}