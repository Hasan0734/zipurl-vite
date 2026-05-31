import { Link2, TrendingUp, Map } from "lucide-react";
import StatsCard from "./StatsCard";
import { useQuery } from "@tanstack/react-query";
import { getAdminStatSummary } from "@/lib/api-request";
import StatsCardSkeleton from "./StatsCardSkeleton";

const AdminDashboardStats = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["getAdminStatSummary"],
    queryFn: async () => await getAdminStatSummary(),
  });

  console.log(data);
  return isLoading ? (
    <SkeletonSection />
  ) : (
    <section className="grid grid-cols-1 gap-8 md:grid-cols-3">
      <StatsCard
        stat={{
          title: "Total users",
          label: "24% from last month",
          icon: TrendingUp,
          total: String(data.totalUser),
        }}
      />
      <StatsCard
        stat={{
          title: "Total Urls",
          label: `${data.todayCreatedUrls} created today`,
          icon: Link2,
          total: String(data.totalUrls),
        }}
      />
      <StatsCard
        stat={{
          title: "Total clicks",
          label: "42% of total traffic",
          icon: TrendingUp,
          total: String(data.totalClicks),
        }}
      />
    </section>
  );
};

export default AdminDashboardStats;

const SkeletonSection = () => {
  return (
    <section className="grid grid-cols-1 gap-8 md:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <StatsCardSkeleton key={i} />
      ))}
    </section>
  );
};
