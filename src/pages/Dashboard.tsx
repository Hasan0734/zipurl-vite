import { Link2, TrendingUp, Map } from "lucide-react";
import PastLink from "../components/forms/PastLinkForm";
import RecentActivity from "../components/dashboard/RecentActivity";
import StatsCard from "../components/dashboard/StatsCard";
import DashboardLayout from "../components/DashboardLayout";
import StatSection from "@/components/dashboard/StatSection";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Impressions",
      label: "24% from last month",
      icon: TrendingUp,
      total: "1.2M",
    },
    {
      title: "Active Links",
      label: "12 created today",
      icon: Link2,
      total: "842",
    },
    {
      title: "Top Region",
      label: "42% of total traffic",
      icon: Map,
      total: "London",
    },
  ];
  return (
    <DashboardLayout>
      <PastLink />
      <RecentActivity />
      <StatSection />
    </DashboardLayout>
  );
};

export default Dashboard;
