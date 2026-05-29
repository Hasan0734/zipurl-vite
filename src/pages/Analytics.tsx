import ClickOverTime from "@/components/analytics/ClickOverTime";
import DeviceDistribution from "@/components/analytics/DeviceDistribution";
import LiveActivity from "@/components/analytics/LiveActivity";
import MetricsBento from "@/components/analytics/MetricsBento";
import TopCountries from "@/components/analytics/TopCountries";
import DashboardLayout from "@/components/dashboard-common/DashboardLayout";
import { getAnalytics, getStatSummary } from "@/lib/api-request";
import { useQuery } from "@tanstack/react-query";

const Analytics = () => {
  const stats = useQuery({
    queryKey: ["stats-summary"],
    queryFn: async () => await getStatSummary(),
  });
  const analytics = useQuery({
    queryKey: ["analytics"],
    queryFn: async () => await getAnalytics(),
  });


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
      </div>
      <MetricsBento stats={stats} />

      <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <ClickOverTime data={analytics.data} isLoading={analytics.isLoading} />
        <TopCountries
          isLoading={analytics.isLoading}
          topCountries={analytics.data?.topCountries}
        />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <DeviceDistribution
          isLoading={analytics.isLoading}
          devices={analytics.data?.devices}
        />
        <LiveActivity />
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
