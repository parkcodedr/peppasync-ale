import Shimmer from "../shared/Shimmer";

export function AuditTrailSkeleton() {
  return (
    <div className="bg-slate-900 rounded-lg p-4 space-y-2 max-h-40 overflow-hidden">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          <Shimmer className="h-3 w-32 rounded" />
          <Shimmer className="h-3 w-40 rounded" />
          <Shimmer className="h-3 w-24 rounded hidden sm:block" />
        </div>
      ))}
    </div>
  );
}
