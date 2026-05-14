
import { BellDot } from "lucide-react";
import UserDropDown from "../UserDropDown";

import { cn } from "@/lib/utils";
import { SidebarTrigger } from "../ui/sidebar";

const DashboardHeader = () => {
  
  return (
    <nav
      className={cn(
        "sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-primary/10 px-6 backdrop-blur-md",
      )}
    >
      <div className="flex gap-3 items-center">
        <SidebarTrigger />

      </div>

      <div className="flex justify-end">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 border-r pr-6">
            <button className="relative">
              <BellDot size={24} />
              <span className="absolute top-px right-0.5 h-2 w-2 rounded-full border-2 bg-red-600"></span>
            </button>
          </div>
          <UserDropDown />
        </div>
      </div>
    </nav>
  );
};

export default DashboardHeader;
