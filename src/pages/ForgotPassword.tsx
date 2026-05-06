
import ForgotPasswordForm from "@/components/forms/ForgotPasswordForm";
import { Link } from "react-router";
import AuthFormLayout from "@/components/auth-layout/AuthFormLayout";

const ForgotPassword = () => {
  return (
    <AuthFormLayout
      title="Forgot Password"
      description="Enter your credentials and we sent a email for reset your password."
      tags={[]}
    >
      <>
        <ForgotPasswordForm />
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

export default ForgotPassword;
