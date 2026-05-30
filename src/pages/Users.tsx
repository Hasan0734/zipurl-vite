import StatSection from "@/components/dashboard/StatSection";
import DashboardLayout from "../components/dashboard-common/DashboardLayout";
import UrlTable from "@/components/urls/UrlTable";
import { useAuth } from "@/hooks/use-auth";
import { redirect, useNavigate } from "react-router";
const Users = () => {
  const navigate = useNavigate()
  const user = useAuth().user;
  const isAdmin = user?.role === "admin"

  if(!isAdmin){
    console.log(isAdmin)
     navigate("/dashboard");
  }

  return (
    <DashboardLayout>
      <StatSection />
      <UrlTable />
    </DashboardLayout>
  );
};

export default Users;
