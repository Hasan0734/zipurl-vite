import {
  ChartNoAxesCombined,
  FolderArchiveIcon,
  LayoutDashboard,
  Link2Icon,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, NavLink } from "react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "../ui/sidebar";

const AsideBar = () => {
  const items = [
    { title: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
    { title: "URLs", to: "/urls", icon: Link2Icon },
    { title: "Analytics", to: "/analytics", icon: ChartNoAxesCombined },
    { title: "Settings", to: "/settings", icon: Settings },
  ];

  return (
    <Sidebar  variant="inset">
      <SidebarContent>
        <SidebarHeader>
          <Link to={"/"} className="mb-10 flex items-center gap-3 px-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border text-primary">
              <FolderArchiveIcon />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tighter text-[#dee5ff]">
                ZipUrl
              </h1>
              <p className="font-['Inter'] text-[10px] font-bold tracking-widest text-primary/60 uppercase">
                URL Management
              </p>
            </div>
          </Link>
        </SidebarHeader>
        <div className="flex-1 space-y-2">
          {items.map((item) => (
            <NavLink
              key={item.title}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-4 rounded-xl  px-4 py-3   transition-all duration-300 hover:bg-[#192540]/50",
                  {
                    "border-r-4 border-primary/50 text-primary font-bold bg-[#192540]/50":
                      isActive,
                  },
                )
              }
              to={item.to}
            >
              <item.icon />
              <span className="font-['Inter'] text-sm tracking-tight">
                {item.title}
              </span>
            </NavLink>
          ))}
        </div>
      </SidebarContent>
    </Sidebar>
  );
};

export default AsideBar;
