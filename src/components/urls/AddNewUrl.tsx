import { type Dispatch, type SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
 
} from "../ui/dialog";
import AddNewUrlForm from "../forms/AddNewUrlForm";

interface DialogProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const AddNewUrl = ({ isOpen, setIsOpen }: DialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent showCloseButton={false} className="bg-background p-10 max-w-md! w-full emerald-glow">
        <DialogHeader>
          <DialogTitle>Add a New url</DialogTitle>
          <DialogDescription>
            Enter your long url here and get short url with extra fetures.
          </DialogDescription>
        </DialogHeader>
        <AddNewUrlForm setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default AddNewUrl;
