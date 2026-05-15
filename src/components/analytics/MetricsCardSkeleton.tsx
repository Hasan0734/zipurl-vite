import { Skeleton } from "../ui/skeleton";

const MetricsCardSkeleton = () => {
  return (
    <div className="glass-panel flex min-h-45 flex-col justify-between rounded-3xl border border-primary/20 p-8 space-y-2">
      <div className="flex items-start justify-between">
        <Skeleton className="w-6 h-6 rounded-full" />
        <Skeleton className="w-15 h-6 rounded-full" />
      </div>
      <div className="space-y-3">
        <Skeleton className="w-full h-5" />
        <Skeleton className="w-1/3 h-10" />
      </div>
    </div>
  );
};

export default MetricsCardSkeleton;
