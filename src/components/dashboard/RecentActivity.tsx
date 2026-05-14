
import { DataTable } from "../dashboard-common/data-table";
import { columns } from "../dashboard-common/columns";
import { useQuery } from "@tanstack/react-query";
import { getUrls } from "@/lib/api-request";
import { Spinner } from "../ui/spinner";

const RecentActivity = () => {
  const { isLoading, data, isSuccess } = useQuery({
    queryKey: ["recentUrl"],
    queryFn: async () => await getUrls("limit=10&sort=-createdAt"),
  });


  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <Spinner /> Loading
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <div>
        <h3 className="text-on-surface text-2xl font-bold">Recent Activity</h3>
        <p className="text-on-surface-variant text-sm">
          Managing {data.total} active redirects
        </p>
      </div>

      {isSuccess && (
        <div className="glass-panel overflow-hidden rounded-xl">
          <DataTable data={data.urls} columns={columns} />

        </div>
      )}
    </section>
  );
};

export default RecentActivity;
