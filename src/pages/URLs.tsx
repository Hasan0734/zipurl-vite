import StatSection from "@/components/dashboard/StatSection";
import DashboardLayout from "../components/DashboardLayout";
import UrlTable from "@/components/urls/UrlTable";
const URLs = () => {
  return (
    <DashboardLayout>
        <StatSection />
        <UrlTable />
    </DashboardLayout>
  );
};

export default URLs;
