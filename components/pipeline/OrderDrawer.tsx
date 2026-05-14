"use client";

import { X, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import StatusPill from "./StatusPill";
import BomTable from "./BomTable";
import AuditTrail from "./AuditTrail";
import TriggerActions from "./TriggerActions";

import { Order } from "@/lib/types";
import { mapAuditLog } from "@/lib/mapper/orderMapper";
import { TriggerConfig } from "@/lib/orderTriggers";

import { useOrderAuditLog } from "@/hooks/useOrders";

import { ErrorMessage } from "../shared/ErrorMessage";
import { AuditTrailSkeleton } from "./AuditTrailSkeleton";

interface Props {
  order: Order | null;
  onClose: () => void;
  onAction: (order: Order, config: TriggerConfig) => void;
}

export default function OrderDrawer({ order, onClose, onAction }: Props) {
  const orderId = order?.id;

  const {
    data: auditData,
    isLoading,
    error,
    refetch,
  } = useOrderAuditLog({ orderId });

  if (!order) return null;

  return (
    <main>
      <AnimatePresence>
        {order && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 bg-black/25 z-40"
              onClick={onClose}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                damping: 30,
                stiffness: 300,
              }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-[520px] bg-white border-l border-gray-200 z-50 flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between gap-3 px-5 h-14 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <h2 className="font-mono text-[15px] font-semibold">
                    Order #{order.shopify_order_id}
                  </h2>

                  <StatusPill status={order.status} />
                </div>

                <button
                  onClick={onClose}
                  className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-slate-100 cursor-pointer"
                >
                  <X className="h-4 w-4" strokeWidth={1.75} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6">
                <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                  <MetaItem label="Customer" value={order.customer} />

                  <MetaItem
                    label="Order Value"
                    value={`£${order.value.toLocaleString()}`}
                  />

                  <MetaItem label="Configuration" value={order.config ?? "-"} />

                  <MetaItem label="Assigned To" value={order.assignee.name} />
                </div>

                <Section title="Bill of Materials">
                  <BomTable bom={order.bom} />
                </Section>

                {order.erpQuote && (
                  <Section title="ERP Status">
                    <div className="flex items-center justify-between bg-slate-50 border rounded-lg px-4 py-3">
                      <div>
                        <p className="text-[12px] font-medium">
                          Business Central
                        </p>

                        <p className="text-[12px] text-slate-500 font-mono mt-0.5">
                          Sales Quote Active (#{order.erpQuote})
                        </p>
                      </div>

                      <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
                    </div>
                  </Section>
                )}

                <Section title="Audit Trail">
                  {error ? (
                    <ErrorMessage
                      message={(error as Error).message}
                      onRetry={refetch}
                    />
                  ) : null}

                  {isLoading ? (
                    <AuditTrailSkeleton />
                  ) : (
                    <AuditTrail entries={mapAuditLog(auditData?.items ?? [])} />
                  )}
                </Section>
              </div>

              <div className="px-5 pb-5">
                <TriggerActions
                  orderId={order.id}
                  onAction={(config) => onAction(order, config)}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-2.5">
        {title}
      </p>

      {children}
    </div>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-1">
        {label}
      </p>

      <p className="text-[13px]">{value}</p>
    </div>
  );
}
