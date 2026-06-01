import React from "react";
import MetricsBento from "./MetricsBento";
import ClickOverTime from "./ClickOverTime";
import TopCountries from "./TopCountries";
import DeviceDistribution from "./DeviceDistribution";
import LiveActivity from "./LiveActivity";
import { useQuery } from "@tanstack/react-query";
import { getAnalytics, getStatSummary } from "@/lib/api-request";

const UserAnalytics = () => {

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

export default UserAnalytics;
