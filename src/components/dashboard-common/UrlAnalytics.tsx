import type { UrlType } from "@/lib/types";
import MetricsBento from "../analytics/MetricsBento";
import { useQuery } from "@tanstack/react-query";
import { getAnalytics, getStatSummary } from "@/lib/api-request";
import ClickOverTime from "../analytics/ClickOverTime";
import TopCountries from "../analytics/TopCountries";
import DeviceDistribution from "../analytics/DeviceDistribution";
import LiveActivity from "../analytics/LiveActivity";

interface PropsType {
  data: UrlType | any;
}

const UrlAnalytics = ({ data }: PropsType) => {
  const stats = useQuery({
    queryKey: ["stats-summary"],
    queryFn: async () => await getStatSummary(),
  });

  const analytics = useQuery({
    queryKey: ["analytics"],
    queryFn: async () => await getAnalytics(),
  });

  return (
    <div>
      <MetricsBento stats={stats} />

      <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <ClickOverTime data={analytics.data} isLoading={analytics.isLoading} />
        <TopCountries
          isLoading={analytics.isLoading}
          topCountries={analytics.data?.topCountries}
        />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <DeviceDistribution
          isLoading={analytics.isLoading}
          devices={analytics.data?.devices}
        />
        <LiveActivity />
      </div>
    </div>
  );
};

export default UrlAnalytics;
