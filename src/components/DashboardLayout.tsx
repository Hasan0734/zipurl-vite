import React from "react";
import DashboardHeader from "./DashboardHeader";
import AsideBar from "./dashboard/AsideBar";
import { SidebarInset, SidebarProvider } from "./ui/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AsideBar />
      <SidebarInset className="relative overflow-hidden">
        <DashboardHeader />
       

        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
