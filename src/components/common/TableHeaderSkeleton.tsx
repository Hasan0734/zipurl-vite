
import { Skeleton } from "../ui/skeleton";
const TableHeaderSkeleton = () => {
  return (
    <div className="flex items-end justify-between">
      <div className="space-y-2">
        <Skeleton className="w-40 h-8" />
        <Skeleton className="w-60 h-6" />
      </div>

      <div className="flex gap-2">
        <div>
          <Skeleton className="max-w-md sm:min-w-sm  h-9 rounded-full" />
        </div>
        <Skeleton className="rounded-full w-24 h-9" />
        <Skeleton className="rounded-full w-24 h-9" />

       
      </div>
    </div>
  );
};

export default TableHeaderSkeleton;
