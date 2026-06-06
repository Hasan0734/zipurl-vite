import { type ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import type { User } from "@/lib/types";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "country",
    header: "Country",
    cell: ({row}) => (<div className="max-w-40 overflow-hidden truncate">{row.getValue("country")}</div>)
  },
  {
    accessorKey: "city",
    header: "City",
  },

  {
    accessorKey: "device",
    header: "Device",
    cell: ({row}) => (<div className="capitalize">{row.getValue("device")}</div>)
  },
  {
    accessorKey: "os",
    header: "OS",
    cell: ({row}) => (<div className="capitalize">{row.getValue("os")}</div>)

  },

  {
    accessorKey: "browser",
    header: "Browser",

  },
  {
    accessorKey: "ip",
    header: "IP",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => (
      <div className="text-muted-foreground">
        {format(row.getValue("createdAt"), "dd-MM-yyyy")}
      </div>
    ),
  },
];
