import { AtSign, Lock } from "lucide-react";
import { Button } from "../ui/button";
import { FieldError, FieldGroup } from "../ui/field";
import { useForm } from "@tanstack/react-form";
import { useState, useTransition } from "react";
import { Spinner } from "../ui/spinner";
import TextInput from "../TextInput";
import {
  loginUserSchema,
  type LoginUserSchemaType,
} from "@/schema/user.schema";
import api from "@/lib/api";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "@/hooks/use-auth";

interface SigninFormProps {
  setRequireOtp: React.Dispatch<React.SetStateAction<boolean>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

const userLogin = async (data: LoginUserSchemaType) => {
  const res = await api.post("/auth/sign-in", data);
  return res.data;
};

const SignInForm = ({ setRequireOtp, setEmail }: SigninFormProps) => {
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState("");
  const { setAccessToken, setUser } = useAuth();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/dashboard";

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

  return (
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
          forgot_password
          type="password"
          form={form}
        />
      </FieldGroup>
      {message && <FieldError>{message}</FieldError>}
      <Button
        disabled={isPending}
        size={"lg"}
        className="h-11! w-full"
        type="submit"
      >
        {isPending && <Spinner />} Sign In
      </Button>
    </form>
  );
};

export default SignInForm;
