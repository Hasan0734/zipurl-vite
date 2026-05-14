import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { deleteUrlById } from "@/lib/api-request";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import  { Spinner } from "../ui/spinner";
import { useTransition } from "react";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";

const DeleteUrl = ({id}: {id:string}) => {
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const res = await deleteUrlById(id);

      if (!res.success) {
        toast.error(res.message || "Something wrong!");
        return;
      }
      toast.success(res.message);
      queryClient.invalidateQueries({ queryKey: ["urls"] });
      queryClient.invalidateQueries({ queryKey: ["recentUrl"] });
    });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button disabled={isPending} variant={"destructive"} size={"icon-sm"}>
          {isPending ? <Spinner /> : <Trash />}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            variant={"destructive"}
            disabled={isPending}
          >
            {isPending && <Spinner />} Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteUrl;
