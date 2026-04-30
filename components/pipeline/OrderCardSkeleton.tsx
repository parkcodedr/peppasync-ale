import Shimmer from "../shared/Shimmer";

export function OrderCardSkeleton() {
  return (
    <div className="w-full text-left bg-white border border-gray-200 rounded-lg p-3.5 space-y-3">
      <div className="flex justify-between items-center">
        <Shimmer className="h-4 w-20" />
        <Shimmer className="h-3.5 w-28 rounded-md" />
      </div>
      <Shimmer className="h-4 w-3/4" />
      <Shimmer className="h-5 w-1/3" />

      <div className="flex justify-between pt-2.5 border-t border-gray-200 items-center">
        <Shimmer className="h-5 w-20 rounded-full" />

        <Shimmer className="h-6 w-6 rounded-full" />
      </div>
    </div>
  );
}
