import AuthFormLayout from "@/components/auth-layout/AuthFormLayout";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { verifyEmail } from "@/lib/request";
import { CircleCheckIcon, CircleXIcon, FolderArchiveIcon } from "lucide-react";
import { useEffect, useRef, useState, useTransition } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const initialized = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/", { replace: true });
      return;
    }
  }, [token]);

  useEffect(() => {
    if (!token || initialized.current) {
      return;
    }
    initialized.current = true;
    startTransition(async () => {
      const res = await verifyEmail(token);
      if (res.success) {
        setStatus("success");
        return;
      }
      setStatus("error");
    });
  }, [token]);

  return (
    <AuthFormLayout>
      <div>
        {isPending && (
          <div className="flex flex-col items-center gap-4">
            <Spinner className="h-8 w-8 text-primary" />
            <p className="animate-pulse text-sm font-medium">
              Verifying your account...
            </p>
          </div>
        )}

        {!isPending && status === "success" && (
          <div className="space-y-4 text-center">
            <div className="flex justify-center text-green-500">
              <CircleCheckIcon size={32} />
            </div>
            <h1 className="text-2xl font-bold">Email Verified!</h1>
            <p className="text-muted-foreground">
              Your account is now fully active.
            </p>
            <Button className="" asChild>
              <Link to="/dashboard">Go to Dashboard</Link>
            </Button>
          </div>
        )}

        {!isPending && status === "error" && (
          <div className="space-y-4 text-center">
            <div className="flex justify-center text-destructive">
              <CircleXIcon size={32} />
            </div>
            <h1 className="text-2xl font-bold">Verification Failed</h1>
            <p className="text-muted-foreground">
              The link is invalid or has expired.
            </p>
            <Button variant={"outline"} asChild>
              <Link to={"/sign-in"}>Sign in</Link>
            </Button>
          </div>
        )}
      </div>
    </AuthFormLayout>
  );
};

export default VerifyEmail;
