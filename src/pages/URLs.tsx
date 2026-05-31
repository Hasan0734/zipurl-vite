import StatSection from "@/components/dashboard/StatSection";
import DashboardLayout from "../components/dashboard-common/DashboardLayout";
import UrlTable from "@/components/urls/UrlTable";
import StatsCard from "@/components/dashboard/StatsCard";
import { TrendingUp } from "lucide-react";
const URLs = () => {
  return (
    <DashboardLayout>
      <section className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <StatsCard
          stat={{
            title: "Total Clicks",
            label: "24% from last month",
            icon: TrendingUp,
            total: String(0),
          }}
        />
      </section>
      <StatSection />
      <UrlTable />
    </DashboardLayout>
  );
};

export default URLs;
