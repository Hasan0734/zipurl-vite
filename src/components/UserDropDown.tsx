import {
  ChartNoAxesCombinedIcon,
  LayoutDashboardIcon,
  UserIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import SignOutBtn from "./dashboard/SignOutBtn";
import { useAuth } from "@/hooks/use-auth";
import { useNavigate } from "react-router";

const UserDropDown = () => {
  const auth = useAuth();
  const navigate = useNavigate()

  const items = [
    { label: "Dashboard", to: "/dashboard", icon: LayoutDashboardIcon },
    { label: "Analytics", to: "/analytics", icon: ChartNoAxesCombinedIcon },
    { label: "Profile", to: "/profile", icon: UserIcon },
  ];

  const user = auth.user;
  return (
    <div className="flex items-center gap-3">
      <div className="text-right space-y-1">
        <p className="text-on-surface text-sm leading-none font-semibold">
          {user?.first_name} {user?.last_name}
        </p>
        <p className="text-[10px] font-bold tracking-tighter text-secondary uppercase">
          Pro Member
        </p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="harry" />
              <AvatarFallback>LR</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40 bg-background">
          <DropdownMenuGroup>
            {items.map((item) => (
              <DropdownMenuItem onClick={() => navigate(item.to)}>
                <item.icon />
                {item.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <SignOutBtn />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserDropDown;
