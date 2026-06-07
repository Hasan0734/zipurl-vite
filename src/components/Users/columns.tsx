import { type ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import {  Trash2 } from "lucide-react";
import { format } from "date-fns";
import type { User } from "@/lib/types";
import { Badge } from "../ui/badge";
import { useTransition } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import CopyButton from "../ui/copy-button";
import ConfirmDialog from "@/components/common/ConfirmDialog.tsx";
import { Spinner } from "@/components/ui/spinner.tsx";
import {  deleteUserById } from "@/lib/api-request.ts";
import { toast } from "sonner";

import UserStatus from "./user-status";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "user",
    header: "User",
    cell: ({ row }) => {
      const user = row.original as User;

      return (
        <div className="flex ">
          <button className="rounded-full flex items-center gap-2">
            <Avatar>
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt={user.first_name}
              />
              <AvatarFallback>FA</AvatarFallback>
            </Avatar>
            <span className={"max-w-28 overflow-hidden truncate"}>
              {user.first_name + " " + user.last_name}
            </span>
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
    cell: ({ row }) => (
      <UserStatus userId={row.original._id} status={row.getValue("status")} />
    ),
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
        <Badge variant={"outline"} className="capitalize">
          {row.getValue("role")}
        </Badge>
      );
    },
  },
  {
    accessorKey: "totalLink",
    header: "Total Link",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("totalLink")}</div>
    ),
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

  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const [isPending, startTransition] = useTransition();
      // const [isOpen, setIsOpen] = useState(false);
      // const {user} = useAuth();
      // const isUser = user?.role === "user";

      const handleDeleteUser = () => {
        startTransition(async () => {
          const res = await deleteUserById(row.original?._id);
          if (!res?.success) {
            toast.error(res.message || "User delete failed.");
            return;
          }
          toast.success(res.message);
        });
      };

      return (
        <div className="flex gap-2 justify-center">
          {/* <Button
            onClick={() => setIsOpen(true)}
            variant={"outline"}
            size={"icon-sm"}
          >
            <Edit2 />
          </Button> */}
          <ConfirmDialog
            isPending={false}
            onConfirm={handleDeleteUser}
            message={
              " This action cannot be undone. This will permanently delete your account from our servers."
            }
            triggerBtn={
              <Button
                disabled={isPending}
                variant={"destructive"}
                size={"icon-sm"}
              >
                {isPending ? <Spinner /> : <Trash2 />}
              </Button>
            }
          />
        </div>
      );
    },
  },
];
