import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import { Button } from "../ui/button";
import ChangePasswordForm from "../forms/ChangePasswordForm";
import { useState } from "react";

const ChangePassword = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Button className="rounded-full px-4" variant={"outline"} size={"lg"}>
          Change
        </Button>
      </DialogTrigger>

      <DialogContent
        className="bg-background emerald-glow p-6 max-w-md!"
        showCloseButton={false}
      >
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription>Change your current password.</DialogDescription>
        </DialogHeader>
        <ChangePasswordForm setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default ChangePassword;
