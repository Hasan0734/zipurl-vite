import { useTransition } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Spinner } from "../ui/spinner";
import { ChevronDown } from "lucide-react";
import { changeUrlNsfw } from "@/lib/api-request";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const UrlNSFW = ({ value, urlId }: { value: boolean; urlId: string }) => {
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();

  const handleNSFW = (v: string) => {
    startTransition(async () => {
      const res = await changeUrlNsfw(urlId, v);
      if (!res.success) {
        toast.error(res.message || "Something wrong!");
      }
      toast.success(res.message);
      queryClient.invalidateQueries({ queryKey: ["urls"] });
      queryClient.invalidateQueries({ queryKey: ["recentUrl"] });
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={isPending} asChild>
        <div className="flex items-center gap-1">
          {isPending && <Spinner />}
          {String(value)}
          <ChevronDown size={14} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-20" align="start">
        <DropdownMenuGroup>
          <DropdownMenuRadioGroup
            value={String(value)}
            onValueChange={handleNSFW}
          >
            <DropdownMenuRadioItem value={"true"}>true</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="false">false</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UrlNSFW;
