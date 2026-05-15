import { Link2, TrendingUp, Map } from "lucide-react";
import StatsCard from "./StatsCard";
import { useQuery } from "@tanstack/react-query";
import { getStatSummary } from "@/lib/api-request";
import StatsCardSkeleton from "./StatsCardSkeleton";

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
          title: "Total Impressions",
          label: "24% from last month",
          icon: TrendingUp,
          total: "1.2M",
        }}
      />
      <StatsCard
        stat={{
          title: "Active Links",
          label: `${data.todayCreated} created today`,
          icon: Link2,
          total: String(data.activeLinks),
        }}
      />
      <StatsCard
        stat={{
          title: "Top Region",
          label: "42% of total traffic",
          icon: Map,
          total: "London",
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
