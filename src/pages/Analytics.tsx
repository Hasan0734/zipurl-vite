import AdminAnalytics from "@/components/analytics/AdminAnalytics";
import UserAnalytics from "@/components/analytics/UserAnalytics";
import DashboardLayout from "@/components/common/DashboardLayout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";

const Analytics = () => {
  const user = useAuth().user;
  const isAdmin = user?.role === "admin";

  const [selected, setSelected] = useState("users");

  return (
    <DashboardLayout>
      <div className="mb-12 flex items-end justify-between">
        <div>
          <span className="mb-2 block text-xs font-bold tracking-[0.2em] text-primary uppercase">
            Performance Overview
          </span>
          <h2 className="font-manrope text-4xl font-extrabold tracking-tight">
            Data Intelligence
          </h2>
        </div>
        {/* <div className="flex gap-3">
          <Button variant={"outline"} className="rounded-full" size={"lg"}>
            <Calendar />
            Last 30 Days
          </Button>
          <Button variant={"outline"} className="rounded-full" size={"lg"}>
            <Download />
            Export PDF
          </Button>
        </div> */}
       {isAdmin && <Select
          defaultValue="users"
          value={selected}
          onValueChange={(e) => setSelected(e)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-background">
            <SelectItem value="users">Users</SelectItem>
            <SelectItem value="urls">Urls</SelectItem>
            <SelectItem value="clicks">clicks</SelectItem>
          </SelectContent>
        </Select>}
      </div>

      {isAdmin ? <AdminAnalytics selected={selected} /> : <UserAnalytics />}
    </DashboardLayout>
  );
};

export default Analytics;
