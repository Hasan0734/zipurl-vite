import ClicksBarChart from "./ClicksBarChart";
import MetricsSectionSkeleton from "./MetricsSectionSkeleton";
import MetricsCard from "./MetricsCard";
import { Map, MousePointerClick, Users2 } from "lucide-react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getAdminUrlStats, getClicksAnalytics } from "@/lib/api-request";

const ClicksAnalytics = () => {
  const stats = useQuery({
    queryKey: ["urls-stats"],
    queryFn: async () => await getAdminUrlStats(),
    placeholderData: keepPreviousData,
  });

  const analytics = useQuery({
    queryKey: ["analytics"],
    queryFn: async () => await getClicksAnalytics(),
  });

  console.log(analytics.data);

  return (
    <div>
      {stats.isLoading ? (
        <MetricsSectionSkeleton />
      ) : (
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-3">
          <MetricsCard
            icon={MousePointerClick}
            title="Total Clicks"
            total={String(stats.data.totalClicks)}
            increment="+15.4%"
            isUpper
          />
          <MetricsCard
            icon={Users2}
            title="Unique Visitor"
            total={String(stats.data.visitor)}
            increment="+20.4%"
            isUpper
          />
          <MetricsCard
            icon={Map}
            title="Top Region"
            total={"London"}
            increment="42% of total traffic"
            isUpper
          />
        </div>
      )}

      {!analytics.isLoading && <ClicksBarChart data={analytics.data} />}
    </div>
  );
};

export default ClicksAnalytics;
