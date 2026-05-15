import PastLink from "../components/forms/PastLinkForm";
import RecentActivity from "../components/dashboard/RecentActivity";
import DashboardLayout from "../components/dashboard-common/DashboardLayout";
import StatSection from "@/components/dashboard/StatSection";

const Dashboard = () => {

  return (
    <DashboardLayout>
      <PastLink />
      <RecentActivity />
        <StatSection />

    </DashboardLayout>
  );
};

export default Dashboard;
