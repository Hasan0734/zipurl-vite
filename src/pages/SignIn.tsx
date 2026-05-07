import {
  ChartNoAxesCombinedIcon,
  GaugeIcon,
  ShieldCogCornerIcon,
} from "lucide-react";
import AuthFormLayout from "@/components/auth-layout/AuthFormLayout";
import { useState } from "react";
import OtpForm from "@/components/forms/OtpForm";
import SignInForm from "@/components/forms/SignInForm";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [requireOtp, setRequireOtp] = useState(false);

  const title = requireOtp ? "Verify your login" : "Welcome Back";
  const description = requireOtp
    ? `Enter the verification code we sent to your email address: ${email}`
    : "Enter your credentials to access your account.";

  const tags = [
    { icon: ShieldCogCornerIcon, label: "End-to-End Encryption" },
    { icon: GaugeIcon, label: "Millisecond Latency" },
    { icon: ChartNoAxesCombinedIcon, label: "Real-time Analytics" },
  ];

  return (
    <AuthFormLayout
      title={title}
      description={description}
      tags={tags}
    >
      {!requireOtp ? (
        <SignInForm setRequireOtp={setRequireOtp} setEmail={setEmail} />
      ) : (
        <OtpForm email={email} />
      )}
    </AuthFormLayout>
  );
};

export default SignIn;
