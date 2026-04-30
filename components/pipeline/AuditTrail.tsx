import { AuditEntry } from "@/types/order";
import { format } from "date-fns";

export default function AuditTrail({ entries }: { entries: AuditEntry[] }) {
  return (
    <div className="bg-slate-900 rounded-lg p-4 max-h-52 overflow-y-auto">
      {entries.map((entry) => (
        <div key={entry.id} className="font-mono text-[11px] py-0.5">
          <span className="text-slate-400">
            [{format(new Date(entry.createdAt), "yyyy-MM-dd HH:mm")}]
          </span>{" "}
          <span className="text-emerald-400">
            {entry.eventType.replace(/_/g, " ")}
          </span>
          {entry.fromState && entry.toState && (
            <span className="text-emerald-400">
              {" "}
              ({entry.fromState} → {entry.toState})
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
