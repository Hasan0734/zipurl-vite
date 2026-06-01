import { columns } from "../common/columns";
import UrlHeader from "./UrlHeader";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getUrls, getUrlsByAdmin } from "@/lib/api-request";
import { useSearchParams } from "react-router";
import { DataTable } from "../common/data-table";
import { useAuth } from "@/hooks/use-auth";
import { getCoreRowModel } from "@tanstack/react-table";
import  TableHeaderSkeleton from "../common/TableHeaderSkeleton";
import TableDataPagination from "../common/TableDataPagination";

const UrlTable = () => {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 10);
  const search = searchParams.get("search") || "";
  const auth = useAuth();
  const user = auth.user;
  const isAdmin = user?.role === "admin";
  const isUser = user?.role === "user";


  const { isLoading, data } = useQuery({
    queryKey: ["urls", page, limit, search],
    queryFn: async () => {
      const params = `limit=${limit}&page=${page}&search=${search}&sort=-createdAt`;
      if (user?.role === "admin") {
        return await getUrlsByAdmin(params + "&fields=-password");
      }

      return await getUrls(params);
    },
    placeholderData: keepPreviousData,
  });

  const tableConfig = {
    data: isLoading ? [] : data.urls,
    columns,
    state: {
      columnVisibility: {
        // analytics: isUser,
        password: isUser,
        owner_id: isAdmin,
      },
    },
    getCoreRowModel: getCoreRowModel(),
  };
  return (
    <section className="space-y-6">
      {isLoading ? <TableHeaderSkeleton /> : <UrlHeader total={data?.total} />}

      <div className="glass-panel  overflow-hidden rounded-xl shadow-2xl">
        <DataTable
          tableConfig={tableConfig}
          columns={columns}
          isLoading={isLoading}
        />
        {!isLoading && (
          <TableDataPagination
            pageSize={data.limit}
            currentPage={page}
            totalData={data.total}
            totalPage={data.page}
          />
        )}
      </div>
    </section>
  );
};

export default UrlTable;
