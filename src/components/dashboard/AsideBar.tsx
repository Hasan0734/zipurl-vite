import {
  ChartNoAxesCombined,
  LayoutDashboard,
  Link2,
  Plus,
  Settings,
} from "lucide-react"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import { NavLink } from "react-router"

const AsideBar = () => {


  const items = [
    { title: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
    { title: "Analytics", to: "/analytics", icon: ChartNoAxesCombined },
    { title: "Settings", to: "/settings", icon: Settings },
  ]


  return (
    <aside className="fixed top-0 left-0 z-50 flex h-screen w-64 flex-col bg-[#091328]/60 px-6 py-8  backdrop-blur-3xl">
      <div className="mb-10 flex items-center gap-3 px-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
          <Link2 />
        </div>
        <div>
          <h1 className="text-2xl font-black tracking-tighter text-[#dee5ff]">
            ZipUrl
          </h1>
          <p className="font-['Inter'] text-[10px] font-bold tracking-widest text-primary/60 uppercase">
            Link Management
          </p>
        </div>
      </div>
      <nav className="flex-1 space-y-2">
        {items.map((item) => (
          <NavLink
            key={item.title}
            className={({isActive}) => cn("flex items-center gap-4 rounded-xl  px-4 py-3   transition-all duration-300 hover:bg-[#192540]/50",   {
                "border-r-4 border-primary/50 text-primary font-bold bg-[#192540]/50": isActive
          } )}
            to={item.to}
          
          >
            <item.icon />
            <span className="font-['Inter'] text-sm tracking-tight">
              {item.title}
            </span>
          </NavLink>
        ))}
       
      </nav>
      <div className="mt-auto">
        <Button className="w-full" size={"lg"}>
          <Plus />
          Create Link
        </Button>
      </div>
    </aside>
  )
}

export default AsideBar
