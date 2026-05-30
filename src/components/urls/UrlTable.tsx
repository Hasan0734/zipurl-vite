import { Spinner } from "../ui/spinner";
import { columns } from "../dashboard-common/columns";
import UrlHeader from "./UrlHeader";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getUrls, getUrlsByAdmin } from "@/lib/api-request";
// import { DataTable } from "./data-table";
import { useSearchParams } from "react-router";
import TableDataPagination from "./TableDataPagination";
import { DataTable } from "../dashboard-common/data-table";
import { useAuth } from "@/hooks/use-auth";

const UrlTable = () => {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 10);
  const search = searchParams.get("search") || "";
  const auth = useAuth();
  const user = auth.user;
  const { isLoading, data, isSuccess } = useQuery({
    queryKey: ["urls", page, limit, search],
    queryFn: async () => {
      const params = `limit=${limit}&page=${page}&search=${search}&sort=-createdAt`;
      if (user?.role === "admin") {
        return await getUrlsByAdmin(params + '&fields=-password,-original_url');
      }

      return await getUrls(params);
    },
    placeholderData: keepPreviousData,
  });

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <Spinner /> Loading..
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <UrlHeader total={data?.total} />
      {isSuccess && (
        <div className="glass-panel  overflow-hidden rounded-xl shadow-2xl">
          <DataTable data={data.urls} columns={columns} />
          <TableDataPagination
            pageSize={data.limit}
            currentPage={page}
            totalData={data.total}
            totalPage={data.page}
          />
        </div>
      )}
    </section>
  );
};

export default UrlTable;
