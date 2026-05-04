import { RefreshCwIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import * as z from "zod";

import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useForm } from "@tanstack/react-form";
import { useState, useTransition } from "react";
import { Spinner } from "../ui/spinner";
import api from "@/lib/api";
import { toast } from "sonner";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "@/hooks/use-auth";

const otpSchema = z.object({
  otp: z.string("OTP is required.").min(6, "OTP minimum 6 digits."),
});

interface OtpFormProps {
  email: string;
}

interface OtpDataType extends OtpFormProps {
  otp: string;
}
const verifyOtp = async (data: OtpDataType) => {
  try {
    const res = await api.post("/auth/verify-otp", data);
    return res.data;
  } catch (err: any) {
    return err.response.data;
  }
};

const resendOtp = async (email: string) => {
  try {
    const res = await api.post("/auth/resend-otp", { email });
    return res.data;
  } catch (err: any) {
    return err.response.data;
  }
};

const OtpForm = ({ email }: OtpFormProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isPending, startTransition] = useTransition();
  const [isResending, startResendTransition] = useTransition();
  const { setAccessToken, setUser } = useAuth();

  const from = location.state?.from?.pathname || "/";

  const [message, setMessage] = useState("");
  const form: any = useForm({
    defaultValues: {
      otp: "",
    },
    validators: {
      onSubmit: otpSchema,
    },
    onSubmit: async ({ value }) => {
      startTransition(async () => {
        const data = await verifyOtp({ email, ...value });

        if (!data.success) {
          setMessage(data.message || "Failed to veriify OTP");
          return;
        }
        setAccessToken(data.access_token);
        setUser(data.user);
        toast.success(data.message, { duration: 500 });
        await new Promise((resolve) => setTimeout(resolve, 1000));
        navigate(from, { replace: true });
      });
    },
  });

  const handleResendOtp = async () => {
    startResendTransition(async () => {
      const res = await resendOtp(email);
      if (!res.success) {
        setMessage(res.message || "OTP resend failed");
        return;
      }
      toast.success(res.message);
    });
  };

  return (
    <Card className="glass-card emerald-glow rounded-[2rem] bg-background!">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <CardHeader>
          <CardTitle>Verify your login</CardTitle>
          <CardDescription>
            Enter the verification code we sent to your email address:{" "}
            <span className="font-medium">{email}</span>.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form.Field
            name="otp"
            control={form.control}
            children={(field: any) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field className="pb-2">
                  <div className="flex items-center justify-between">
                    <FieldLabel htmlFor={field.name}>
                      Verification code
                    </FieldLabel>
                    <Button
                      type="button"
                      disabled={isResending}
                      onClick={handleResendOtp}
                      variant="outline"
                      size="xs"
                    >
                      {isResending ? <Spinner /> : <RefreshCwIcon />}
                      Resend Code
                    </Button>
                  </div>
                  <InputOTP
                    onChange={(value) => field.handleChange(value)}
                    maxLength={6}
                    id={field.name}
                    name={field.name}
                    pattern={REGEXP_ONLY_DIGITS}
                    containerClassName="justify-center"
                  >
                    <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator className="mx-2" />
                    <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}

                  {message && <FieldError>{message}</FieldError>}
                </Field>
              );
            }}
          />
        </CardContent>
        <CardFooter>
          <Field>
            <Button
              disabled={isPending}
              size={"lg"}
              type="submit"
              className="h-11! w-full"
            >
              {isPending && <Spinner />} Verify
            </Button>
            <div className="text-sm text-muted-foreground">
              Having trouble signing in?{" "}
              <a
                href="#"
                className="underline underline-offset-4 transition-colors hover:text-primary"
              >
                Contact support
              </a>
            </div>
          </Field>
        </CardFooter>
      </form>
    </Card>
  );
};

export default OtpForm;
