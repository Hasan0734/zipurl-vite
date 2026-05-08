import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import type { Table } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";


interface PaginationProps<TData> {
  table: Table<TData>
}


interface TablePaginationProps {
  data: {
    total: number;
  };
  table: Table<any>;
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
}


const TablePagination = ({ data, table, pagination }: TablePaginationProps) => {
  const start = pagination.pageIndex * pagination.pageSize + 1;
  const end = start - 1 + pagination.pageSize;


    const prev = !table.getCanPreviousPage();
    const next = !table.getCanNextPage()

  return (
    <div className="flex items-center justify-between px-8 py-4 bg-primary/10">
      <p className="text-on-surface-variant text-xs">
        Showing {start} to {end} of {data.total} links
      </p>
      <div className="flex items-center gap-3">
        <Button
          variant={"ghost"}
          onClick={() => table.previousPage()}
          disabled={prev}
        >
          <ChevronLeftIcon data-icon="inline-start" />
          <span className="hidden sm:block">Previous</span>
        </Button>

        <Button
          onClick={() => table.nextPage()}
          disabled={next}
          variant={"ghost"}
        >
          <span className="hidden sm:block">Next</span>
          <ChevronRightIcon data-icon="inline-end" />
        </Button>
      </div>
 
    </div>
  );
};

export default TablePagination;
     {/* <Pagination className="mx-0 w-auto justify-end">
        <PaginationContent>
          <PaginationItem></PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem></PaginationItem>
        </PaginationContent>
      </Pagination> */}