import { Spinner } from "../ui/spinner";
import { DataTable } from "../dashboard/data-table";
import { columns } from "../dashboard/columns";
import TablePagination from "../dashboard/TablePagination";
import type { UrlType } from "@/lib/types";
import UrlHeader from "./UrlHeader";
import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getUrls } from "@/lib/request";

interface UrlTableProps {
  isLoading: boolean;
  data: {
    urls: UrlType[];
    total: number;
  };
  isSuccess: boolean;
}

const UrlTable = () => {
  const [pagination, setPagination] = useState({ pageIndex: 1, pageSize: 10 });
  const { isLoading, data, isSuccess } = useQuery({
    queryKey: ["urls", pagination],
    queryFn: async () =>
      await getUrls(
        `limit=${pagination.pageSize}&page=${pagination.pageIndex}&sort=-createdAt`,
      ),
    placeholderData: keepPreviousData,
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
      <UrlHeader />

      {isSuccess && (
        <div className="glass-panel overflow-hidden rounded-xl shadow-2xl">
          <DataTable
            pagination={pagination}
            setPagination={setPagination}
            data={data.urls}
            columns={columns}
            totalData={data.total}
          />
        </div>
      )}
    </section>
  );
};

export default UrlTable;
