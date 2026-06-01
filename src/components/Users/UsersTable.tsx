import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getUsers } from "@/lib/api-request";
import { useSearchParams } from "react-router";
import UsersHeader from "./UsersHeader";
import { columns } from "./columns";
import TableHeaderSkeleton from "../common/TableHeaderSkeleton";
import { DataTable } from "../common/data-table";
import { getCoreRowModel } from "@tanstack/react-table";
import TableDataPagination from "../common/TableDataPagination";

const UsersTable = () => {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 10);
  const search = searchParams.get("search") || "";

  const { isLoading, data } = useQuery({
    queryKey: ["users", page, limit, search],
    queryFn: async () => {
      const params = `limit=${limit}&page=${page}&search=${search}&sort=-createdAt`;
      return await getUsers(params);
    },
    placeholderData: keepPreviousData,
  });

  const tableConfig = {
    data: isLoading ? [] : data.users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  };

  return (
    <section className="space-y-6">
      {isLoading ? (
        <TableHeaderSkeleton />
      ) : (
        <UsersHeader total={isLoading ? 0 : data?.total} />
      )}

      <div className="glass-panel  overflow-hidden rounded-xl shadow-2xl">
        <DataTable
          columns={columns}
          tableConfig={tableConfig}
          isLoading={isLoading}
        />
        {!isLoading && (
          <TableDataPagination
            pageSize={data?.limit}
            currentPage={page}
            totalData={data?.total}
            totalPage={data?.page}
          />
        )}
      </div>
    </section>
  );
};

export default UsersTable;
