import { Order } from "@/lib/types";
import OrderCard from "./OrderCard";

interface Column {
  id: string;
  title: string;
  dotColor: string;
}

interface Props {
  config: Column;
  orders: Order[];
  onCardClick: (order: Order) => void;
}

export default function KanbanColumn({ config, orders, onCardClick }: Props) {
  return (
    <div className="flex flex-col min-w-[300px] flex-1">
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${config.dotColor}`} />

          <h3 className="text-[12px] font-semibold">{config.title}</h3>

          <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded-full font-medium">
            {orders.length}
          </span>
        </div>
      </div>

      <div
        className={`h-0.5 rounded-full mb-3 ${config.dotColor} opacity-30`}
      />

      <div className="space-y-2.5 flex-1">
        {orders.length === 0 && (
          <div className="border border-dashed rounded-lg p-4 text-center">
            <p className="text-[11px] text-muted-foreground">No orders</p>
          </div>
        )}

        {orders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            onClick={onCardClick}
            clickable
          />
        ))}
      </div>
    </div>
  );
}
