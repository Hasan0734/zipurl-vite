import DashboardLayout from "../components/common/DashboardLayout";
import { useAuth } from "@/hooks/use-auth";
import { useNavigate } from "react-router";
import StatsCard from "@/components/common/StatsCard";
import { TrendingUp, Users2, UsersIcon } from "lucide-react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getUsersStats } from "@/lib/api-request";
import StatsCardSkeleton from "@/components/common/StatsCardSkeleton";
import ClicksTable from "@/components/clicks/ClicksTable";

const Clicks = () => {
  const navigate = useNavigate();
  const {user} = useAuth();
  const isAdmin = user?.role === "admin";

  if (!isAdmin) {
    navigate("/dashboard");
    return;
  }

  const { isLoading, data } = useQuery({
    queryKey: ["users-stats"],
    queryFn: async () => await getUsersStats(),
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
              title: "Total Users",
              label: "24% from last month",
              icon: TrendingUp,
              total: String(data.totalUsers),
            }}
          />
          <StatsCard
            stat={{
              title: "Active Users",
              label: `${data.todayCreated} Sign up today`,
              icon: UsersIcon,
              total: String(data.activeUsers),
            }}
          />
          <StatsCard
            stat={{
              title: "Verified Users",
              label: `${data.notVerified} not verified`,
              icon: Users2,
              total: String(data.verified),
            }}
          />
        </section>
      )}
      <ClicksTable/>

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
