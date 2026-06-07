import { type ColumnDef } from "@tanstack/react-table";
import { format, isPast } from "date-fns";
import type { UrlType } from "@/lib/types";
import { SHORT_URL } from "@/lib/utils";
import SecretText from "../SecretText";
import CopyButton from "../ui/copy-button";
import UrlAnalyticsDialog from "./UrlAnalyticsDialog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import UrlStatus from "./url-status";
import UrlAction from "./url-action";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useAuth } from "@/hooks/use-auth";
import { Badge } from "../ui/badge";

export const columns: ColumnDef<UrlType>[] = [
  {
    accessorKey: "owner_name",
    header: "Owner",
    cell: ({ row }) => {
      return (
        <div className="flex">
          <button className="rounded-full flex items-center gap-2">
            <Avatar>
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt={row.getValue("owner_name")}
              />
              <AvatarFallback>FA</AvatarFallback>
            </Avatar>
            <span className="max-w-28 overflow-hidden truncate">
              {" "}
              {row.getValue("owner_name")}
            </span>
          </button>
        </div>
      );
    },
  },
  {
    accessorKey: "original_url",
    header: "Original URL",
    cell: ({ row }) => (
      <div className="max-w-40 overflow-hidden truncate">
        <a
          href={row.getValue("original_url")}
          target="_blank"
          className="hover:text-primary hover:underline"
        >
          {row.getValue("original_url")}
        </a>
      </div>
    ),
  },
  {
    accessorKey: "short_code",
    header: "Short Code",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-1">
          {row.original.is_active ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="size-2 bg-primary rounded-full"></span>
              </TooltipTrigger>
              <TooltipContent>Url is active</TooltipContent>
            </Tooltip>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="size-2 bg-destructive rounded-full"></span>
              </TooltipTrigger>
              <TooltipContent>Url is inactive</TooltipContent>
            </Tooltip>
          )}

          <a
            href={SHORT_URL + row.getValue("short_code")}
            target="_blank"
            className="hover:text-primary hover:underline"
          >
            {row.getValue("short_code")}
          </a>
          <CopyButton
            size={"sm"}
            content={SHORT_URL + row.getValue("short_code")}
            variant={"ghost"}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "custom_alias",
    header: "Custom Alias",
    cell: ({ row }) =>
      row.getValue("custom_alias") ? (
        <div className="flex items-center gap-1">
          {row.getValue("is_active") ? (
            <span className="size-2 bg-primary rounded-full"></span>
          ) : (
            <span className="size-2 bg-destructive rounded-full"></span>
          )}
          <a
            href={SHORT_URL + row.getValue("custom_alias")}
            target="_blank"
            className="hover:text-primary hover:underline"
          >
            {row.getValue("custom_alias")}
          </a>
          <CopyButton
            size={"sm"}
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
    accessorKey: "analytics",
    header: "Analytics",
    cell: ({ row }) => <UrlAnalyticsDialog data={row.original} />,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const { user } = useAuth();
      const isUser = user?.role === "user";
      return isUser ? (
        <Badge
          variant={
            row.getValue("status") === "approved"
              ? "default"
              : row.getValue("status") === "pending"
                ? "secondary"
                : "destructive"
          }
          className="capitalize"
        >
          {row.getValue("status")}
        </Badge>
      ) : (
        <UrlStatus urlId={row.original._id} status={row.getValue("status")} />
      );
    },
  },

  {
    accessorKey: "expires_at",
    header: "Expire At",
    cell: ({ row }) => {
      const isExpired = isPast(new Date(row.getValue("expires_at")));

      return (
        <div>
          {row.getValue("expires_at") ? (
            <span className={isExpired ? "text-destructive" : ""}>
              {" "}
              {format(row.getValue("expires_at"), "dd-MM-yyyy")}
            </span>
          ) : (
            <span className="text-muted-foreground/50">N/A</span>
          )}
        </div>
      );
    },
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
    cell: ({ row }) => <UrlAction url={row.original} />,
  },
];
