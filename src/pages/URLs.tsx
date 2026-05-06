import { Link2, TrendingUp, Map } from "lucide-react";
import StatsCard from "../components/dashboard/StatsCard";
import DashboardLayout from "../components/DashboardLayout";
import UrlTable from "@/components/urls/UrlTable";
import { useQuery } from "@tanstack/react-query";
import { getUrls } from "@/lib/request";

const URLs = () => {
  const { isLoading, data, isSuccess } = useQuery({
    queryKey: ["urls"],
    queryFn: async () => await getUrls("limit=10&sort=desc"),
  });

  return (
    <DashboardLayout>
      <div className="space-y-12 p-12">
        <section className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <StatsCard
            title="Total Impressions"
            label="24% from last month"
            icon={TrendingUp}
            total="1.2M"
          />
          <StatsCard
            title="Active Links"
            label="12 created today"
            icon={Link2}
            total="842"
          />

          <StatsCard
            title="Top Region"
            label="42% of total traffic"
            icon={Map}
            total="London"
          />
        </section>

        <UrlTable isLoading={isLoading} data={data} isSuccess={isSuccess}/>
      </div>
    </DashboardLayout>
  );
};

export default URLs;
