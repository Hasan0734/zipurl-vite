import PastLink from "../components/forms/PastLinkForm";
import RecentActivity from "../components/dashboard/RecentActivity";
import DashboardLayout from "../components/dashboard-common/DashboardLayout";
import StatSection from "@/components/dashboard/StatSection";
import { useAuth } from "@/hooks/use-auth";
import AdminDashboardStats from "@/components/dashboard/AdminDashboardStats";

const Dashboard = () => {
  const user = useAuth().user;
  const isAdmin = user?.role === "admin";
  return (
    <DashboardLayout>
      <PastLink />
      {isAdmin ? <AdminDashboardStats /> : <StatSection />}
      <RecentActivity />
    </DashboardLayout>
  );
};

export default Dashboard;
