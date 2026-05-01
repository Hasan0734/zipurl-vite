import {  type Dispatch, type SetStateAction } from "react";
import { Dialog, DialogContent } from "./ui/dialog";
import SignInSection from "./SignInSection";

interface LoginDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const LoginDialog = ({ open, setOpen }: LoginDialogProps) => {

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        showCloseButton={false}
        className="p-0 bg-transparent! ring-0"
        aria-describedby={undefined}
      >
        <SignInSection className="p-6!" />
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
