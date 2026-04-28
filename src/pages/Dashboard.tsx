import { Link2, TrendingUp, Map } from "lucide-react";
import PastLink from "../components/dashboard/PastLink";
import RecentActivity from "../components/dashboard/RecentActivity";
import StatsCard from "../components/dashboard/StatsCard";
import DashboardLayout from "../components/DashboardLayout";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-12 p-12">
        <PastLink />

        <RecentActivity />

        <section className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <StatsCard
            title="Total Impressions"
            label="24% from last month"
            icon={TrendingUp}
            total="1.2M"
          />
          <StatsCard
            title="Active Links"
            label="12 created today"
            icon={Link2}
            total="842"
          />

          <StatsCard
            title="Top Region"
            label="42% of total traffic"
            icon={Map}
            total="London"
          />
        </section>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
