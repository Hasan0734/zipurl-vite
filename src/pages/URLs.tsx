import StatSection from "@/components/dashboard/StatSection";
import DashboardLayout from "../components/dashboard-common/DashboardLayout";
import UrlTable from "@/components/urls/UrlTable";
import { useAuth } from "@/hooks/use-auth";
import AdminStaticsSection from "@/components/urls/AdminStaticsSection";
const URLs = () => {
  const user = useAuth().user;

  const isAdmin = user?.role === "admin";

  return (
    <DashboardLayout>
      {isAdmin && <AdminStaticsSection />}
      {!isAdmin && <StatSection />}
      <UrlTable />
    </DashboardLayout>
  );
};

export default URLs;
