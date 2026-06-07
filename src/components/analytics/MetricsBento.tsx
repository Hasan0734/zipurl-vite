import { Map, MousePointerClick, Users } from "lucide-react";
import MetricsCard from "./MetricsCard";
import type { UseQueryResult } from "@tanstack/react-query";
import MetricsCardSkeleton from "./MetricsCardSkeleton";

interface MetricsBentoProps {
  stats: UseQueryResult<any, Error>;
}

const MetricsBento = ({ stats }: MetricsBentoProps) => {
  return (
    <>
      {!stats.isLoading && (
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-3">
          <MetricsCard
            icon={MousePointerClick}
            title="Total Clicks"
            total={String(stats.data.totalClicks)}
            increment="+15.4%"
            isUpper
          />
          <MetricsCard
            icon={Users}
            title="Unique Visitors"
            total={stats.data.visitor}
            increment="+8.2%"
            isUpper
          />
          <MetricsCard
            icon={Map}
            title="Top Region"
            total={stats.data?.topRegion.city}
            increment={stats.data?.topRegion.count}
            isUpper
          />
        </div>
      )}

      {stats.isLoading && (
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-3">
        {Array.from({length: 3}).map((_,i) => <MetricsCardSkeleton key={i}/>)}
        </div>
      )}
    </>
  );
};

export default MetricsBento;
