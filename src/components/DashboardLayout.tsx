import React from "react";
import DashboardHeader from "./dashboard/DashboardHeader";
import AsideBar from "./dashboard/AsideBar";

const DashboardLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div>
      <AsideBar/>

      <main className="ml-64 min-h-screen">
        <DashboardHeader />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
