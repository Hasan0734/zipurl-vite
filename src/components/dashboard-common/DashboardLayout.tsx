import React from "react";
import DashboardHeader from "./DashboardHeader";
import AsideBar from "../dashboard/AsideBar";
import { SidebarInset, SidebarProvider } from "../ui/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AsideBar />
      <SidebarInset className="relative overflow-hidden">
        <DashboardHeader />
        <div className="space-y-12 py-10 px-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
