import AuthFormLayout from "@/components/auth-layout/AuthFormLayout";
import ResetPasswordForm from "@/components/forms/ResetPasswordForm";

import { Link } from "react-router";

const ResetPassword = () => {
  return (
    <AuthFormLayout
      title="Reset Password"
      description="Set new password. Please make sure your passwrod is strong."
      tags={[]}
      formAreaClass="max-w-md"
    >
      <>
        <ResetPasswordForm  />
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
