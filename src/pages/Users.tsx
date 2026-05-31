import StatSection from "@/components/dashboard/StatSection";
import DashboardLayout from "../components/dashboard-common/DashboardLayout";
import { useAuth } from "@/hooks/use-auth";
import { useNavigate } from "react-router";
import UsersTable from "@/components/Users/UsersTable";
const Users = () => {
  const navigate = useNavigate();
  const user = useAuth().user;
  const isAdmin = user?.role === "admin";

  if (!isAdmin) {
    navigate("/dashboard");
  }

  return (
    <DashboardLayout>
      <StatSection />
      <UsersTable />
    </DashboardLayout>
  );
};

export default Users;
