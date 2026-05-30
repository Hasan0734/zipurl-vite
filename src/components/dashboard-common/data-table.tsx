import React from "react";
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
import { useAuth } from "@/hooks/use-auth";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {

  const user = useAuth().user
  const isUser = user?.role === "user"
  const isAdmin = user?.role === "admin"

  const table = useReactTable({
    data,
    columns,
    state: {
      columnVisibility: {
        original_url: isUser,
        analytics: isUser,
        password: isUser,
        owner_id: isAdmin
      }
    },
    getCoreRowModel: getCoreRowModel(),
    
  });


  console.log(data)

  return (
    <Table className="">
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id} className="">
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id} className="px-8 h-14 bg-primary/10">
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
            <React.Fragment key={row.id}>
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
             
            </React.Fragment>
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
  );
}
