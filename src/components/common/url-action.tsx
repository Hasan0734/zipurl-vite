import React, { useState, useTransition } from "react";
import EditUrlDialog from "./EditUrlDialog";
import { Button } from "../ui/button";
import { Edit2, Trash2 } from "lucide-react";
import ConfirmDialog from "./ConfirmDialog";
import { useAuth } from "@/hooks/use-auth";
import { useQueryClient } from "@tanstack/react-query";
import { deleteUrlById } from "@/lib/api-request";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import type { UrlType } from "@/lib/types";

const UrlAction = ({ url }: { url: UrlType }) => {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const handleDelete = () => {
    startTransition(async () => {
      const res = await deleteUrlById(url._id);

      if (!res.success) {
        toast.error(res.message || "Something wrong!");
        return;
      }
      toast.success(res.message);
      queryClient.invalidateQueries({ queryKey: ["urls"] });
      queryClient.invalidateQueries({queryKey: ["urls-stats"]})
      queryClient.invalidateQueries({ queryKey: ["recentUrl"] });
    });
  };

  return (
    <div className="flex gap-2 justify-center">
      {user?._id === url.owner_id && (
        <>
          <EditUrlDialog isOpen={isOpen} setIsOpen={setIsOpen} data={url} />
          <Button
            onClick={() => setIsOpen(true)}
            variant={"outline"}
            size={"icon-sm"}
          >
            <Edit2 />
          </Button>
        </>
      )}

      {/* <DeleteUrl id={row.original._id} /> */}
      <ConfirmDialog
        isPending={false}
        onConfirm={handleDelete}
        message={
          "This action cannot be undone. This will permanently delete your url from our servers."
        }
        triggerBtn={
          <Button disabled={isPending} variant={"destructive"} size={"icon-sm"}>
            {isPending ? <Spinner /> : <Trash2 />}
          </Button>
        }
      />
    </div>
  );
};

export default UrlAction;
