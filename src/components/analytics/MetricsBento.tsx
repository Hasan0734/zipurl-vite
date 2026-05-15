import { CircleGauge, MousePointerClick, Users } from "lucide-react";
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
            total="42,119"
            increment="+8.2%"
            isUpper
          />
          <MetricsCard
            icon={CircleGauge}
            title="Conversion Rate"
            total="4.6%"
            increment="-2.1%"
            isDown
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
