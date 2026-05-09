import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { DataTablePagination } from "../dashboard/TablePagination";
import { getPaginationRange } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pagination?: {
    pageIndex: number;
    pageSize: number;
  };
  setPagination: any;
  totalData: number;
  totalPage: number;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pagination,
  setPagination,
  totalData,
  totalPage,
}: DataTableProps<TData, TValue>) {
  console.log(totalPage);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: { pagination },
    onPaginationChange: setPagination,
    manualPagination: true,
    pageCount: totalPage ?? 0,
  });

  const start =
    table.getState().pagination.pageIndex *
      table.getState().pagination.pageSize +
    1;
  const end = start - 1 + table.getState().pagination.pageSize;
  const paginationRange = getPaginationRange(
    table.getState().pagination.pageIndex,
    totalPage,
  );


  return (
    <div className="overflow-hidden rounded-md ">
      <Table className="">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className="px-8 h-14 bg-primary/10"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                className=""
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="py-4! px-8 ">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between px-8 py-4 bg-primary/10">
        <p className="text-on-surface-variant text-xs">
          Showing {start} to {end} of {totalData} links
        </p>

        <div className="flex items-center gap-3">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger className="h-8 w-17.5">
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
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
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeftIcon data-icon="inline-start" />
            <span className="hidden sm:block">Previous</span>
          </Button>

          {paginationRange.map((page) => (
            <Button
              key={page}
              onClick={() =>
                typeof page === "number" ? table.setPageIndex(page) : ""
              }
              variant={
                page === table.getState().pagination.pageIndex
                  ? "default"
                  : "ghost"
              }
              className=""
            >
              {typeof page === "number" ? page + 1 : page}
            </Button>
          ))}
          <Button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            variant={"ghost"}
          >
            <span className="hidden sm:block">Next</span>
            <ChevronRightIcon data-icon="inline-end" />
          </Button>
        </div>
      </div>
    </div>
  );
}
