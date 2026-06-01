import { keepPreviousData, useQuery } from "@tanstack/react-query";
import StatsCard from "../common/StatsCard";
import { LinkIcon, TrendingUp } from "lucide-react";
import StatsCardSkeleton from "../common/StatsCardSkeleton";
import { getAdminUrlStats } from "@/lib/api-request";

const AdminStaticsSection = () => {
  const { isLoading, data } = useQuery({
    queryKey: ["urls-stats"],
    queryFn: async () => await getAdminUrlStats(),
    placeholderData: keepPreviousData,
  });

  return isLoading ? (
    <SkeletonSection />
  ) : (
    <section className="grid grid-cols-1 gap-8 md:grid-cols-3">
      <StatsCard
        stat={{
          title: "Total Urls",
          label: "10% from last month",
          icon: TrendingUp,
          total: String(data.totalUrls),
        }}
      />
      <StatsCard
        stat={{
          title: "Active Urls",
          label: `${data.todayCreatedUrls} today created`,
          icon: LinkIcon,
          total: String(data.activeUrls),
        }}
      />
      <StatsCard
        stat={{
          title: "Total Clicks",
          label: "24% from last month",
          icon: TrendingUp,
          total: String(data.totalClicks),
        }}
      />
    </section>
  );
};

export default AdminStaticsSection;

const SkeletonSection = () => {
  return (
    <section className="grid grid-cols-1 gap-8 md:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <StatsCardSkeleton key={i} />
      ))}
    </section>
  );
};
