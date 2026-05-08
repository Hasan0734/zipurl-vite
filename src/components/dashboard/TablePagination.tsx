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

interface TablePaginationProps {
  data: {
    total: number;
  };
  limit: number;
  table: Table<any>;
}

const TablePagination = ({ data, limit = 10, table }: TablePaginationProps) => {
  return (
    <div className="flex items-center justify-between px-8 py-4 bg-primary/10">
      <p className="text-on-surface-variant text-xs">
        Showing 1 to {limit} of {data.total} links
      </p>
      <Pagination className="mx-0 w-auto justify-end">
        <PaginationContent>
          <PaginationItem>
            <Button
              variant={"ghost"}
              asChild
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <PaginationPrevious />
            </Button>
          </PaginationItem>
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
          <PaginationItem>
            <Button
            variant={'ghost'}
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              asChild
            >
              <PaginationNext />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default TablePagination;
