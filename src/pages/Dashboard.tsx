import PastLink from "../components/forms/PastLinkForm";
import RecentActivity from "../components/dashboard/RecentActivity";
import DashboardLayout from "../components/common/DashboardLayout";
// import StatSection from "@/components/dashboard/StatSection";
import { useAuth } from "@/hooks/use-auth";
import AdminDashboardStats from "@/components/dashboard/AdminDashboardStats";

const Dashboard = () => {
  const user = useAuth().user;
  const isAdmin = user?.role === "admin";
  return (
    <DashboardLayout>
      <PastLink />
      {isAdmin && <AdminDashboardStats />}
      <RecentActivity />
    </DashboardLayout>
  );
};

export default Dashboard;
