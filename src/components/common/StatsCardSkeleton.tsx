import { Skeleton } from "../ui/skeleton";


const StatsCardSkeleton = () => {
  return (
    <div className="glass-panel rounded-4xl p-8 space-y-3">
      <Skeleton className="w-1/2 h-4" />
      <Skeleton className="w-1/3 h-10"/>
      <div className="mt-4 flex items-center gap-2 text-sm font-bold ">
       <Skeleton className="size-6 rounded-full"/>
        <Skeleton className="w-full h-6 rounded-full"/>
      </div>
    </div>
  );
};

export default StatsCardSkeleton;
