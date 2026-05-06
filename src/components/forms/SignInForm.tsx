import { AtSign, Lock } from "lucide-react";
import { Button } from "../ui/button";
import { FieldError, FieldGroup } from "../ui/field";
import { useForm } from "@tanstack/react-form";
import { useState, useTransition } from "react";
import { Spinner } from "../ui/spinner";
import TextInput from "../TextInput";
import { loginUserSchema } from "@/schema/user.schema";
import { Link, useLocation, useNavigate } from "react-router";
import { useAuth } from "@/hooks/use-auth";
import { resendVerifyEmail, userLogin } from "@/lib/request";
import { toast } from "sonner";

interface SigninFormProps {
  setRequireOtp: React.Dispatch<React.SetStateAction<boolean>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

const SignInForm = ({ setRequireOtp, setEmail }: SigninFormProps) => {
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();
  const [isResending, startResendTransition] = useTransition();
  const [message, setMessage] = useState("");
  const { setAccessToken, setUser } = useAuth();
  const location = useLocation();
  // const [resendEmail, setResendEmail] = useState(false);

  const from = location.state?.from?.pathname || "/";

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: loginUserSchema,
    },
    onSubmit: async ({ value }) => {
      startTransition(async () => {
        const data = await userLogin(value);

        if (data.statusCode === 403) {
          // setResendEmail(true);
          toast(data.message, {
            description:
              "Email verification is required. Check your email inbox or spam folder.",
            action: {
              label: "Resend",
              onClick: () => handleResendEmail(),
            },
            duration: 3000,
            classNames: {
              toast: "flex flex-col",
            },
          });

          return;
        }
        if (!data.success) {
          setMessage(data.message);
          return;
        }

        if (data.success && data?.twoFARequired) {
          setRequireOtp(true);
          setEmail(value.email);
          return;
        }

        setAccessToken(data.access_token);
        setUser(data.user);
        navigate(from, { replace: true });
        form.reset();
      });
    },
  });

  const handleResendEmail = () => {
    startResendTransition(async () => {
      const res = await resendVerifyEmail(form.getFieldValue("email"));
      if (!res.success) {
        toast.error(res.message);
        return;
      }
      toast.success(res.message);
    });
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-6"
      >
        <FieldGroup>
          <TextInput
            label="Email"
            name="email"
            id="email"
            icon={AtSign}
            placeholder="name@company.com"
            type="email"
            form={form}
          />

          <TextInput
            label="Password"
            name="password"
            id="password"
            icon={Lock}
            placeholder="••••••••"
            forgotPassword
            type="password"
            forgotPasswordPath="/forgot-password"
            form={form}
          />
        </FieldGroup>
        <div className="space-y-3">
          {message && <FieldError>{message}</FieldError>}
          {/* {resendEmail && (
          <Button
            type="button"
            disabled={isPending ? true : isResending}
            onClick={handleResendEmail}
            variant="outline"
            size="xs"
          >
            {isResending ? <Spinner /> : <RefreshCwIcon />}
            Resend Email
          </Button>
        )} */}
        </div>
        <Button
          disabled={isResending ? true : isPending}
          size={"lg"}
          className="h-11! w-full"
          type="submit"
        >
          {isPending && <Spinner />} Sign In
        </Button>
      </form>

      <div className="relative my-10">
        <div className="absolute inset-0 flex items-center">
          <div className="border-outline-variant/20 w-full border-t"></div>
        </div>
        <div className="relative flex justify-center text-xs tracking-widest uppercase">
          <span className="bg-[#0f1930] px-4">Or continue with</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Button
          variant={"outline"}
          className="w-fulll h-11! bg-background!"
          size={"lg"}
        >
          <span className="font-label text-sm font-semibold">Google</span>
        </Button>
        <Button
          variant={"outline"}
          className="w-fulll h-11! bg-background!"
          size={"lg"}
        >
          <span className="font-label text-sm font-semibold">Github</span>
        </Button>
      </div>
      <div className="mt-10 text-center">
        <p className="text-sm text-muted-foreground">
          You don't have account?
          <Link
            className="ml-1 font-bold text-primary underline-offset-4 hover:underline"
            to="/sign-up"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInForm;
