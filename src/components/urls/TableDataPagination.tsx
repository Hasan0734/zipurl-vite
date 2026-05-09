import { getPaginationRange } from "@/lib/utils";
import {useSearchParams } from "react-router";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface TableDataPaginationProps {
  pageSize: number;
  currentPage: number;
  totalPage: number;
  totalData: number;
}
const TableDataPagination = ({
  pageSize,
  currentPage,
  totalPage,
  totalData,
}: TableDataPaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const start = (currentPage-1) * (pageSize);
  const end = start + pageSize;
  const paginationRange = getPaginationRange(currentPage, totalPage);

  const handleAddPage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page));
    setSearchParams(params);
  };

  const handlePageSize = (size: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("limit", size);
    setSearchParams(params);
  };

  return (
    <div className="flex items-center justify-between px-8 py-4 bg-primary/10">
      <p className="text-on-surface-variant text-xs">
        Showing {start} to {end} of {totalData} links
      </p>

      <div className="flex items-center gap-3">
        <div className="flex items-center space-x-2">
          <p className="text-xs">Rows per page</p>
          <Select value={String(pageSize)} onValueChange={handlePageSize}>
            <SelectTrigger className="h-8 w-17.5">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 25, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          variant={"ghost"}
          onClick={() => handleAddPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeftIcon data-icon="inline-start" />
          <span className="hidden sm:block">Previous</span>
        </Button>

        {paginationRange.map((page) => (
          <Button
            key={page}
            onClick={() =>
              typeof page === "number" ? handleAddPage(page) : ""
            }
            variant={page === currentPage ? "default" : "ghost"}
            className=""
          >
            {page}
          </Button>
        ))}
        <Button
          onClick={() => handleAddPage(currentPage + 1)}
          disabled={currentPage === totalPage}
          variant={"ghost"}
          size={"sm"}
        >
          <span className="hidden sm:block">Next</span>
          <ChevronRightIcon data-icon="inline-end" />
        </Button>
      </div>
    </div>
  );
};

export default TableDataPagination;
