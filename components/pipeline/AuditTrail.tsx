import { AuditEntry } from "@/lib/types";

export default function AuditTrail({ entries }: { entries: AuditEntry[] }) {
  return (
    <div className="bg-slate-50 border rounded-lg p-3 max-h-48 overflow-y-auto">
      {entries.map((entry, i) => (
        <div key={i} className="font-mono text-[11px] py-0.5">
          <span className="text-slate-400">[{entry.ts}]</span> {entry.event}
        </div>
      ))}
    </div>
  );
}
