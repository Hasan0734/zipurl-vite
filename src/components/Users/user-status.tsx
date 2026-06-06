import { useTransition } from "react";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useQueryClient } from "@tanstack/react-query";
import { changeUserStatus } from "@/lib/api-request";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import { ChevronDown } from "lucide-react";

const UserStatus = ({ status, userId }: { status: string; userId: string }) => {
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();

  const handleStatus = (value: string) => {
    startTransition(async () => {
      const res = await changeUserStatus(userId, value);

      if (!res.success) {
        toast.error(res.message || "Failed to change status");
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success(res.message);
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={isPending} asChild>
        <Badge
          variant={
            status === "active"
              ? "default"
              : status === "pending"
                ? "secondary"
                : "destructive"
          }
          className="capitalize"
        >
          {isPending && <Spinner />} {status} <ChevronDown />
        </Badge>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="start">
        <DropdownMenuGroup>
          <DropdownMenuRadioGroup
            value={status}
            onValueChange={handleStatus}
          >
            <DropdownMenuRadioItem value="active">Active</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="pending">
              Pending
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="block">Block</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserStatus;
