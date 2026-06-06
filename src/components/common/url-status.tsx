import  { useTransition } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Badge } from "../ui/badge";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import { changeUrlStatus } from "@/lib/api-request";

const UrlStatus = ({ status, urlId }: { status: string; urlId: string }) => {
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();

  const handleStatus = (value: string) => {
    startTransition(async () => {
      const res = await changeUrlStatus(urlId, value);
      if (!res.success) {
        toast.error(res.message || "Failed to change status");
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["urls"] });
      queryClient.invalidateQueries({ queryKey: ["recentUrl"] });
      toast.success(res.message);
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={isPending} asChild>
        <Badge
          variant={
            status === "approved"
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
          <DropdownMenuRadioGroup value={status} onValueChange={handleStatus}>
            <DropdownMenuRadioItem value="approved">
              Approved
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="pending">
              Pending
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="banned">Banned</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UrlStatus;
