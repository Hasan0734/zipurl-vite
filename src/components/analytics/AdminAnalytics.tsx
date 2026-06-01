import React from "react";
import MetricsBento from "./MetricsBento";
import ClickOverTime from "./ClickOverTime";
import TopCountries from "./TopCountries";
import DeviceDistribution from "./DeviceDistribution";
import LiveActivity from "./LiveActivity";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getAnalytics, getStatSummary, getUsersStats } from "@/lib/api-request";
import MetricsCard from "./MetricsCard";
import { MousePointerClick, Users, Users2 } from "lucide-react";
import MetricsCardSkeleton from "./MetricsCardSkeleton";

const AdminAnalytics = ({ selected }: { selected: string }) => {
  // const stats = useQuery({
  //   queryKey: ["stats-summary"],
  //   queryFn: async () => await getStatSummary(),
  // });
  const stats = useQuery({
    queryKey: ["users-stats"],
    queryFn: async () => await getUsersStats(),
    placeholderData: keepPreviousData,
  });

  return (
    <div>
      {stats.isLoading ? (
        <MetricsSectionSkeleton />
      ) : (
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-3">
          <MetricsCard
            icon={Users}
            title="Total Clicks"
            total={String(stats.data.totalUsers)}
            increment="+15.4%"
            isUpper
          />
          <MetricsCard
            icon={Users2}
            title="Active Users"
            total={String(stats.data.activeUsers)}
            increment="+20.4%"
            isUpper
          />
          <MetricsCard
            icon={Users}
            title="Verified Users"
            total={String(stats.data.verified)}
            increment="+2.4%"
            isUpper
          />
        </div>
      )}
    </div>
  );
};

export default AdminAnalytics;

const MetricsSectionSkeleton = () => {
  return (
    <section className="grid grid-cols-1 gap-8 md:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <MetricsCardSkeleton key={i} />
      ))}
    </section>
  );
};
