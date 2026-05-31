import { type ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { Edit2, TrashIcon } from "lucide-react";
import { format } from "date-fns";
import type { User } from "@/lib/types";
import { Badge } from "../ui/badge";
import { useState } from "react";

import { useAuth } from "@/hooks/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import CopyButton from "../ui/copy-button";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "user",
    header: "User",
    cell: ({ row }) => {
      const user = row.original as User;

      return (
        <div className="flex">
          <button className="rounded-full flex items-center gap-2">
            <Avatar>
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt={user.first_name}
              />
              <AvatarFallback>FA</AvatarFallback>
            </Avatar>
            {user.first_name + " " + user.last_name}
          </button>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <p className="max-w-40 overflow-hidden truncate ">
          {row.getValue("email")}
        </p>
        <CopyButton
          content={row.getValue("email")}
          variant={"ghost"}
          size={"sm"}
        />
      </div>
    ),
  },

  {
    accessorKey: "is_verified",
    header: "Verified",
    cell: ({ row }) => (
      <div>
        {row.getValue("is_verified") ? (
          <Badge variant={"default"}>Verified</Badge>
        ) : (
          <Badge variant={"destructive"}>Not Verified</Badge>
        )}
      </div>
    ),
  },
  {
    accessorKey: "two_factor_enabled",
    header: "2FA",
    cell: ({ row }) => (
      <div>
        {row.getValue("two_factor_enabled") ? (
          <Badge variant={"default"}>Enabled</Badge>
        ) : (
          <Badge variant={"destructive"}>Disabled</Badge>
        )}
      </div>
    ),
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <div>
          {row.getValue("status") === "active" ? (
            <Badge>Active</Badge>
          ) : row.getValue("status") === "pending" ? (
            <Badge variant={"secondary"}>Pending</Badge>
          ) : (
            <Badge variant={"destructive"}>Block</Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      return row.getValue("role") === "admin" ? (
        <Badge variant={"default"} className="capitalize">
          {row.getValue("role")}
        </Badge>
      ) : (
        <Badge variant={'outline'} className="capitalize">
           {row.getValue("role")}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => (
      <div className="text-muted-foreground">{format(row.getValue("createdAt"), "dd-MM-yyyy")}</div>
    ),
  },

  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const [isOpen, setIsOpen] = useState(false);

      const user = useAuth().user;
      const isUser = user?.role === "user";

      return (
        <div className="flex gap-2 justify-center">
          <Button
            onClick={() => setIsOpen(true)}
            variant={"outline"}
            size={"icon-sm"}
          >
            <Edit2 />
          </Button>

          <Button variant={"destructive"} size={"icon-sm"}>
            <TrashIcon />
          </Button>
        </div>
      );
    },
  },
];
