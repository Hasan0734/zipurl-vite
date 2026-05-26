import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";
import CountryMapDialog from "./CountryMapDialog";

const colors = [
  "bg-primary",
  "bg-blue-500",
  "bg-fuchsia-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-gray-500",
];

interface PropsType {
  data: any;
  isLoading: boolean;
}

const TopCountries = ({ data, isLoading }: PropsType) => {
  return (
    <div className="glass-panel border border-primary/20 flex flex-col rounded-3xl p-10">
      <h3 className="text-on-surface font-manrope mb-8 text-xl font-bold">
        Top Countries
      </h3>
      <div className="flex-1 space-y-6">
        {!isLoading &&
          data.topCountries
            .slice(0, 4)
            .map((item: any) => <CountryItem item={item} />)}
        {isLoading &&
          Array.from({ length: 4 }).map((_, index) => (
            <CountrySkeleton key={index++} />
          ))}
      </div>
      <CountryMapDialog />
    </div>
  );
};

export default TopCountries;

const CountryItem = ({ item }: any) => {
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="flex items-center gap-2 font-medium">
          <span className={cn("h-2 w-2 rounded-full", randomColor)}></span>
          {item.country}
        </span>
        <span className="">{item.percentage}%</span>
      </div>
      <div className="bg-gray-700/30 h-1.5 w-full overflow-hidden rounded-full">
        <div
          className={cn("h-full rounded-full", randomColor)}
          style={{ width: `${item.percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

const CountrySkeleton = () => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-sm">
        <div className="flex items-center gap-2">
          <Skeleton className="rounded-full size-3" />
          <Skeleton className="w-40 h-4 rounded-md" />
        </div>
        <Skeleton className="w-10 h-4" />
      </div>
      <Skeleton className="bg-gray-700/30 h-1.5 w-full overflow-hidden rounded-full">
        <Skeleton className="w-1/2 h-1.5" />
      </Skeleton>
    </div>
  );
};
