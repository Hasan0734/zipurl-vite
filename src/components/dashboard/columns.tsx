import { type ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { Copy, Edit, Edit2, Trash } from "lucide-react";
import { format } from "date-fns";
import type { UrlType } from "@/lib/types";
import { SHORT_URL } from "@/lib/utils";
import SecretText from "../SecretText";

export const columns: ColumnDef<UrlType>[] = [
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
    cell: ({ row }) => (
      <a
        href={SHORT_URL + row.getValue("short_code")}
        target="_blank"
        className="hover:text-primary hover:underline"
      >
        {row.getValue("short_code")}
      </a>
    ),
  },
    {
    accessorKey: "custom_alias",
    header: "Custom Alias",
    cell: ({ row }) => (
      <a
        href={SHORT_URL + row.getValue("custom_alias")}
        target="_blank"
        className="hover:text-primary hover:underline"
      >
        {row.getValue("custom_alias")}
      </a>
    ),
  },
  {
    accessorKey: "click_count",
    header: "Clicks",
  },
  {
    accessorKey: "password",
    header: "Password",
    cell: ({row}) => (
      <SecretText text={row.getValue("password")}/>
    )
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
