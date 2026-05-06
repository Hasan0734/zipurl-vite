import AuthFormLayout from "@/components/auth-layout/AuthFormLayout";
import ResetPasswordForm from "@/components/forms/ResetPasswordForm";
import { useEffect } from "react";

import { Link, useNavigate, useSearchParams } from "react-router";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/", { replace: true });
      return;
    }
  }, [token]);

  return (
    <AuthFormLayout
      title="Reset Password"
      description="Set new password. Please make sure your passwrod is strong."
      tags={[]}
      formAreaClass="max-w-120"
    >
      <>
        <ResetPasswordForm token={token!} />
        <div className="mt-10 border-t pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Are you remember your password?
            <Link
              className="ml-1 font-bold text-primary hover:underline"
              to="/sign-in"
            >
              Sign in
            </Link>
          </p>
        </div>
      </>
    </AuthFormLayout>
  );
};

export default ResetPassword;
