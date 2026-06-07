import MetricsSectionSkeleton from "./MetricsSectionSkeleton";
import MetricsCard from "./MetricsCard";
import {
  getStatSummary,
  getUrlsAnalytics,
} from "@/lib/api-request";
import {  useQuery } from "@tanstack/react-query";
import { Link, Link2, MousePointerClick,  } from "lucide-react";
import UrlsBarChart from "./UrlsBarChart";

const UrlsAnalytics = () => {
  const stats = useQuery({
    queryKey: ["stats-summary"],
    queryFn: async () => await getStatSummary(),
  });

  const analytics = useQuery({
    queryKey: ["urls-analytics"],
    queryFn: async () => await getUrlsAnalytics(),
  });


  return (
    <div className="space-y-6">
      {stats.isLoading ? (
        <MetricsSectionSkeleton />
      ) : (
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-3">
          <MetricsCard
            icon={Link2}
            title="Total Urls"
            total={String(stats.data.total)}
            increment="+15.4%"
            isUpper
          />
          <MetricsCard
            icon={Link}
            title="Active Urls"
            total={String(stats.data.activeLinks)}
            increment="+20.4%"
            isUpper
          />
          <MetricsCard
            icon={MousePointerClick}
            title="Visitor"
            total={String(stats.data.visitor)}
            increment="+2.4%"
            isUpper
          />
        </div>
      )}

      {!analytics.isLoading && <UrlsBarChart data={analytics.data} />}
    </div>
  );
};

export default UrlsAnalytics;
