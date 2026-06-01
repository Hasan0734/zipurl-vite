import type { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import EditUrlForm from "../forms/EditUrlForm";
import type { UrlType } from "@/lib/types";

interface EditUrlDialogProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  data: UrlType
}

const EditUrlDialog = ({ isOpen, setIsOpen, data }: EditUrlDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        showCloseButton={false}
        className="bg-background p-10 max-w-md! w-full emerald-glow"
      >
        <DialogHeader>
          <DialogTitle>Update this url</DialogTitle>
          <DialogDescription>
           Edit your url details here.
          </DialogDescription>
        </DialogHeader>
        <EditUrlForm prevData={data} setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default EditUrlDialog;
