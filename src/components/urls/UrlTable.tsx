
import { Spinner } from "../ui/spinner";
import { DataTable } from "../dashboard/data-table";
import { columns } from "../dashboard/columns";
import TablePagination from "../dashboard/TablePagination";
import type { UrlType } from "@/lib/types";
import UrlHeader from "./UrlHeader";

interface UrlTableProps {
  isLoading: boolean;
  data: {
    urls: UrlType[];
    total: number;
  };
  isSuccess: boolean;
}

const UrlTable = ({ isLoading, data, isSuccess }: UrlTableProps) => {
  if (isLoading) {
    return (
      <div>
        <Spinner /> Loading
      </div>
    );
  }

  return (
    <section className="space-y-6">
     <UrlHeader/>

      {isSuccess && (
        <div className="glass-panel overflow-hidden rounded-xl shadow-2xl">
          <DataTable data={data.urls} columns={columns} />
          <TablePagination data={data} />
        </div>
      )}
    </section>
  );
};

export default UrlTable;
