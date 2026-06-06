import { Link2, TrendingUp } from "lucide-react";
import StatsCard from "../common/StatsCard";
import { useQuery } from "@tanstack/react-query";
import { getStatSummary } from "@/lib/api-request";
import StatsCardSkeleton from "../common/StatsCardSkeleton";

const StatSection = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["stats-summary"],
    queryFn: async () => await getStatSummary(),
  });

  return isLoading ? (
    <SkeletonSection />
  ) : (
    <section className="grid grid-cols-1 gap-8 md:grid-cols-3">
      <StatsCard
        stat={{
          title: "Total Links",
          label: `${data.todayCreated || 0} created today`,
          icon: Link2,
          total: String(data.total || 0),
        }}
      />

      <StatsCard
        stat={{
          title: "Active Links",
          label: `${data.expiredLinks || 0} Expired links`,
          icon: Link2,
          total: String(data.activeLinks || 0),
        }}
      />

      <StatsCard
        stat={{
          title: "Total Clicks",
          label: "24% from last month",
          icon: TrendingUp,
          total: String(data.totalClicks || 0),
        }}
      />
    </section>
  );
};

export default StatSection;

const SkeletonSection = () => {
  return (
    <section className="grid grid-cols-1 gap-8 md:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <StatsCardSkeleton key={i} />
      ))}
    </section>
  );
};
