import DashboardLayout from "../components/common/DashboardLayout";
import { useAuth } from "@/hooks/use-auth";
import { useNavigate } from "react-router";
import StatsCard from "@/components/common/StatsCard";
import { MonitorSmartphone, TrendingUp, UsersIcon } from "lucide-react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getClicksStats } from "@/lib/api-request";
import StatsCardSkeleton from "@/components/common/StatsCardSkeleton";
import ClicksTable from "@/components/clicks/ClicksTable";

const Clicks = () => {

  const { isLoading, data } = useQuery({
    queryKey: ["clicks-states"],
    queryFn: async () => await getClicksStats(),
    placeholderData: keepPreviousData,
  });


  return (
    <DashboardLayout>
      {isLoading ? (
        <SkeletonSection />
      ) : (
        <section className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <StatsCard
            stat={{
              title: "Total Clicks",
              label: "24% from last month",
              icon: TrendingUp,
              total: String(data.totalClicks || 0),
            }}
          />
          <StatsCard
            stat={{
              title: "Unique Visitor",
              label: `${data.todayVisitedCount || 0} today visited`,
              icon: UsersIcon,
              total: String(data.visitor || 0),
            }}
          />
          <StatsCard
            stat={{
              title: "Top device",
              label: `${data.topDevice.percentage}% of the visitors`,
              icon: MonitorSmartphone,
              total: String(data.topDevice.device),
            }}
          />
        </section>
      )}
      <ClicksTable />
    </DashboardLayout>
  );
};

export default Clicks;

const SkeletonSection = () => {
  return (
    <section className="grid grid-cols-1 gap-8 md:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <StatsCardSkeleton key={i} />
      ))}
    </section>
  );
};
