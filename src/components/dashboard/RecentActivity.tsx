import { DataTable } from "../common/data-table";
import { columns } from "../common/url-columns";
import { useQuery } from "@tanstack/react-query";
import { getUrls, getUrlsByAdmin } from "@/lib/api-request";
import { useAuth } from "@/hooks/use-auth";
import { getCoreRowModel } from "@tanstack/react-table";
import { Skeleton } from "../ui/skeleton";

const RecentActivity = () => {
  const auth = useAuth();
  const user = auth.user;
  const isAdmin = user?.role === "admin";
  const isUser = user?.role === "user";
  const { isLoading, data, isSuccess } = useQuery({
    queryKey: ["recentUrl"],
    queryFn: async () => {
      const params = "limit=10&sort=-createdAt";
      if (isAdmin) {
        return await getUrlsByAdmin(params + "&fields=-password");
      }

      return await getUrls(params);
    },
  });

  const tableConfig = {
    data: isLoading ? [] : data.urls,
    columns,
    state: {
      columnVisibility: {
        analytics: isUser,
        password: isUser,
        owner_id: isAdmin,
      },
    },
    getCoreRowModel: getCoreRowModel(),
  };

  return (
    <section className="space-y-6">
      {isLoading ? (
        <div className="space-y-2">
          <Skeleton className="w-40 h-8" />
          <Skeleton className="w-60 h-6" />
        </div>
      ) : (
        <div>
          <h3 className="text-2xl font-bold">Recent Activity</h3>
          <p className=" text-sm">Managing recent active redirects</p>
        </div>
      )}

      {isSuccess && (
        <div className="glass-panel overflow-hidden rounded-xl">
          <DataTable
            columns={columns}
            tableConfig={tableConfig}
            isLoading={isLoading}
          />
        </div>
      )}
    </section>
  );
};

export default RecentActivity;
