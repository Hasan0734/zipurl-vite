import { Spinner } from "../ui/spinner";
import { columns } from "../dashboard/columns";
import UrlHeader from "./UrlHeader";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getUrls } from "@/lib/request";
import { DataTable } from "./data-table";
import { useSearchParams } from "react-router";
import TableDataPagination from "./TableDataPagination";

const UrlTable = () => {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 10);
  const search = searchParams.get("search") || "";

  const { isLoading, data, isSuccess } = useQuery({
    queryKey: ["urls", page, limit, search],
    queryFn: async () =>
      await getUrls(
        `limit=${limit}&page=${page}&search=${search}&sort=-createdAt`,
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
          <DataTable data={data.urls} columns={columns} />
          <TableDataPagination
            pageSize={limit}
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
