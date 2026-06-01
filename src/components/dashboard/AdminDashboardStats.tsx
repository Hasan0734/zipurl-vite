import { Link2, TrendingUp } from "lucide-react";
import StatsCard from "../common/StatsCard";
import { useQuery } from "@tanstack/react-query";
import { getAdminStatSummary } from "@/lib/api-request";
import StatsCardSkeleton from "../common/StatsCardSkeleton";

const AdminDashboardStats = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["getAdminStatSummary"],
    queryFn: async () => await getAdminStatSummary(),
  });

  return isLoading ? (
    <SkeletonSection />
  ) : (
    <section className="grid grid-cols-1 gap-8 md:grid-cols-4">
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
      <StatsCard
        stat={{
          title: "Unique Visitor link",
          label: "42% of total traffic",
          icon: TrendingUp,
          total: String(data.visitor),
        }}
      />
    </section>
  );
};

export default AdminDashboardStats;

const SkeletonSection = () => {
  return (
    <section className="grid grid-cols-1 gap-8 md:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <StatsCardSkeleton key={i} />
      ))}
    </section>
  );
};
