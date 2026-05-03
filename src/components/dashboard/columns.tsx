import { type ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { Copy, Edit, Edit2, Trash } from "lucide-react";
import { format } from "date-fns";

export type DataLink = {
  id: number;
  original_url: string;
  short_url: string;
  clicks: number;
  created_at: string;
};

export const columns: ColumnDef<DataLink>[] = [
  {
    accessorKey: "original_url",
    header: "Original URL",
    cell: ({ row }) => (
      <div className="max-w-xs overflow-hidden truncate">
        {row.getValue("original_url")}
      </div>
    ),
  },
  {
    accessorKey: "short_code",
    header: "Short Code",
  },
  {
    accessorKey: "click_count",
    header: "Clicks",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => (
      <div>{format(row.getValue("createdAt"), "dd-MM-yyyy")}</div>
    ),
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: () => (
      <div className="flex gap-2">
        <Button variant={"outline"} size={"icon-sm"}>
          <Copy />
        </Button>
        <Button variant={"outline"} size={"icon-sm"}>
          <Edit2 />
        </Button>
        <Button variant={"destructive"} size={"icon-sm"}>
          <Trash />
        </Button>
      </div>
    ),
  },
];
