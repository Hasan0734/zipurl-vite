import { Spinner } from "../ui/spinner";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {  getUsers } from "@/lib/api-request";
import { useSearchParams } from "react-router";
import { useAuth } from "@/hooks/use-auth";
import TableDataPagination from "./TableDataPagination";
import UsersHeader from "./UsersHeader";
import { DataTable } from "./data-table";
import { columns } from "./columns";

const UsersTable = () => {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 10);
  const search = searchParams.get("search") || "";
  const { isLoading, data, isSuccess } = useQuery({
    queryKey: ["users", page, limit, search],
    queryFn: async () => {
      const params = `limit=${limit}&page=${page}&search=${search}&sort=-createdAt`;
      return await getUsers(params);
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
      <UsersHeader total={data?.total} />
      {isSuccess && (
        <div className="glass-panel  overflow-hidden rounded-xl shadow-2xl">
          <DataTable data={data.users} columns={columns} />
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

export default UsersTable;
