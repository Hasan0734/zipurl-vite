import MetricsSectionSkeleton from "./MetricsSectionSkeleton";
import MetricsCard from "./MetricsCard";
import { getUsersAnalytics, getUsersStats } from "@/lib/api-request";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Users, Users2 } from "lucide-react";
import UsersBarChart from "./UsersBarChart";

const UsersAnalytics = () => {
  const stats = useQuery({
    queryKey: ["users-stats"],
    queryFn: async () => await getUsersStats(),
    placeholderData: keepPreviousData,
  });

  const analytics = useQuery({
    queryKey: ["users-analytics"],
    queryFn: async () => await getUsersAnalytics(),
  });

  console.log(analytics);

  return (
    <div className="space-y-6">
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

      {!analytics.isLoading && <UsersBarChart data={analytics.data} />}
    </div>
  );
};

export default UsersAnalytics;
