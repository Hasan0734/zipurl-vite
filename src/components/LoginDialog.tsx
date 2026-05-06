import { useState, type Dispatch, type SetStateAction } from "react";
import { Dialog, DialogContent } from "./ui/dialog";
import SignInForm from "./forms/SignInForm";
import OtpForm from "./forms/OtpForm";

interface LoginDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const LoginDialog = ({ open, setOpen }: LoginDialogProps) => {
  const [email, setEmail] = useState("");
  const [requireOtp, setRequireOtp] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        showCloseButton={false}
        className="bg-background p-12 max-w-md! w-full emerald-glow"
        aria-describedby={undefined}
      >
        <>
          {!requireOtp ? (
            <>
              <header className="mb-10">
                <h1 className="mb-2 text-xl sm:text-3xl font-bold tracking-tight">
                  Welcome Back
                </h1>
                <p className="text-md text-muted-foreground">
                  {"Enter your credentials to access your account."}
                </p>
              </header>
              <SignInForm setRequireOtp={setRequireOtp} setEmail={setEmail} />
            </>
          ) : (
            <OtpForm email={email} />
          )}
        </>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
