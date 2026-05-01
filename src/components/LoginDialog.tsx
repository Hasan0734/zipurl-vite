import { useState, type Dispatch, type SetStateAction } from "react";
import SignInForm from "./forms/SignInForm";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";
import OtpForm from "./forms/OtpForm";
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
      >
        <SignInSection className="p-6!" />
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
