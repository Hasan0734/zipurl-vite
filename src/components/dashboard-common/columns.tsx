import { type ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { Edit2, Trash } from "lucide-react";
import { format, isPast } from "date-fns";
import type { UrlType } from "@/lib/types";
import { SHORT_URL } from "@/lib/utils";
import SecretText from "../SecretText";
import CopyButton from "../ui/copy-button";
import { Badge } from "../ui/badge";
import { useState } from "react";
import EditUrlDialog from "./EditUrlDialog";

export const columns: ColumnDef<UrlType>[] = [
  {
    accessorKey: "original_url",
    header: "Original URL",
    cell: ({ row }) => (
      <div className="max-w-50 overflow-hidden truncate">
        {row.getValue("original_url")}
      </div>
    ),
  },
  {
    accessorKey: "short_code",
    header: "Short Code",
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <a
          href={SHORT_URL + row.getValue("short_code")}
          target="_blank"
          className="hover:text-primary hover:underline"
        >
          {row.getValue("short_code")}
        </a>
        <CopyButton
          content={SHORT_URL + row.getValue("short_code")}
          variant={"ghost"}
        />
      </div>
    ),
  },
  {
    accessorKey: "custom_alias",
    header: "Custom Alias",
    cell: ({ row }) =>
      row.getValue("custom_alias") ? (
        <div className="flex items-center gap-1">
          <a
            href={SHORT_URL + row.getValue("custom_alias")}
            target="_blank"
            className="hover:text-primary hover:underline"
          >
            {row.getValue("custom_alias")}
          </a>
          <CopyButton
            content={SHORT_URL + row.getValue("short_code")}
            variant={"ghost"}
          />
        </div>
      ) : (
        <span className="text-muted-foreground/50">N/A</span>
      ),
  },
  {
    accessorKey: "click_count",
    header: "Clicks",
  },
  {
    accessorKey: "password",
    header: "Password",
    cell: ({ row }) =>
      row.getValue("password") ? (
        <SecretText text={row.getValue("password")} />
      ) : (
        <span className="text-muted-foreground/50">N/A</span>
      ),
  },
  {
    accessorKey: "is_active",
    header: "Status",
    cell: ({ row }) => (
      <div>
        {row.getValue("is_active") ? (
          <Badge>Active</Badge>
        ) : (
          <Badge variant={"destructive"}>Inactive</Badge>
        )}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => (
      <div>{format(row.getValue("createdAt"), "dd-MM-yyyy")}</div>
    ),
  },
  {
    accessorKey: "expires_at",
    header: "Expire At",
    cell: ({ row }) => {
      const isExpired = isPast(new Date(row.getValue("expires_at")))

      return(
      <div>
        {row.getValue("expires_at") ? (
         <span className={isExpired ? "text-destructive" : ""}> {format(row.getValue("expires_at"), "dd-MM-yyyy")}</span>
        ) : (
          <span className="text-muted-foreground/50">N/A</span>
        )}
      </div>
    )},
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const [isOpen, setIsOpen] = useState(false);
      return (
        <div className="flex gap-2">
          <EditUrlDialog
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            data={row.original}
          />
          <Button
            onClick={() => setIsOpen(true)}
            variant={"outline"}
            size={"icon-sm"}
          >
            <Edit2 />
          </Button>
          <Button variant={"destructive"} size={"icon-sm"}>
            <Trash />
          </Button>
        </div>
      );
    },
  },
];
