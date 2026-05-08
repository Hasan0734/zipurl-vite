import { Spinner } from "../ui/spinner";
import { columns } from "../dashboard/columns";
import UrlHeader from "./UrlHeader";
import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getUrls } from "@/lib/request";
import { DataTable } from "./data-table";

const UrlTable = () => {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const { isLoading, data, isSuccess } = useQuery({
    queryKey: ["urls", pagination],
    queryFn: async () =>
      await getUrls(
        `limit=${pagination.pageSize}&page=${pagination.pageIndex + 1}&sort=-createdAt`,
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
      <UrlHeader total={data.total} />

      {isSuccess && (
        <div className="glass-panel overflow-hidden rounded-xl shadow-2xl">
          <DataTable
            pagination={pagination}
            setPagination={setPagination}
            data={data.urls}
            columns={columns}
            totalData={data.total}
            totalPage={data.page}
          />
        </div>
      )}
    </section>
  );
};

export default UrlTable;
