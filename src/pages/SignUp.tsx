import AuthFormLayout from "@/components/auth-layout/AuthFormLayout";
import SignUpForm from "@/components/forms/SignUpForm";
import {
  GaugeIcon,
  ShieldCheckIcon,
  TrendingUpDownIcon,
} from "lucide-react";
import { Link } from "react-router";

const SignUp = () => {
  const tags = [
    {
      icon: ShieldCheckIcon,
      label: "AES-256",
    },
    {
      icon: GaugeIcon,
      label: "Global Edge",
    },
    {
      icon: TrendingUpDownIcon,
      label: "Real-time",
    },
  ];
  return (
    <AuthFormLayout
      title="Create a new account."
      description="Enter your credentials to full of access this platform."
      containerClass="max-w-2xl w-full"
      formAreaClass="max-w-2xl"
      tags={tags}
    >
      <>
        <SignUpForm />
        <div className="mt-10 border-t pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?
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

export default SignUp;
