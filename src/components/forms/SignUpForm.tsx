import { AtSign, Lock, User } from "lucide-react";
import { useState, useTransition } from "react";
import TextInput from "../TextInput";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { FieldGroup } from "../ui/field";
import { useForm } from "@tanstack/react-form";
import { useNavigate } from "react-router";
import api from "@/lib/api";
import { Spinner } from "../ui/spinner";
import {
  registerUserSchema,
  type RegisterUserSchemaType,
} from "@/schema/user.schema";
import { toast } from "sonner";

const defaultValues = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  confirm_password: "",
  agree_to_terms: false,
};

const userRegister = async (data: RegisterUserSchemaType) => {
  const { agree_to_terms, ...rest } = data;
  try {
    const res = await api.post("/auth/sign-up", { ...rest });
    return res.data;
  } catch (err: any) {
    return err.response.data;
  }
};

const SignUpForm = () => {
  const [isPending, startTransition] = useTransition();
  const navigate = useNavigate();
  const [message, setMessage] = useState();

  const form = useForm({
    defaultValues,
    validators: {
      // onSubmit: registerUserSchema,
      onChange: registerUserSchema,
    },
    onSubmitInvalid() {
      const firstInvalid = document.querySelector(
        '[aria-invalid="true"]',
      ) as HTMLElement;
      firstInvalid?.focus();
    },
    onSubmit: async ({ value }) => {
      startTransition(async () => {
        const res = await userRegister(value);

        console.log(res);

        if (!res.success) {
          toast.error(res.message);
          return;
        }
        toast.success(res.message, {
          duration: 500,
        });
        await new Promise((resolve) => setTimeout(() => resolve, 1000));
        navigate("/sign-in", { replace: true });
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
      <FieldGroup className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <TextInput
          label="First Name"
          id="first_name"
          icon={User}
          placeholder="Alex"
          form={form}
          className="col-span-2 md:col-span-1"
        />
        <TextInput
          label="Last Name"
          id="last_name"
          icon={User}
          placeholder="Revra"
          form={form}
          className="col-span-2 md:col-span-1"
        />
        <TextInput
          label="Email"
          name="email"
          id="email"
          icon={AtSign}
          placeholder="name@company.com"
          type="email"
          form={form}
          className="col-span-2"
        />

        <TextInput
          label="Password"
          name="password"
          id="password"
          icon={Lock}
          placeholder="••••••••"
          type="password"
          form={form}
          className="col-span-2"
        />
        <TextInput
          label="Confirm Password"
          name="confirm_password"
          id="confirm_password"
          icon={Lock}
          placeholder="••••••••"
          type="password"
          form={form}
          className="col-span-2"
        />
        <form.Field
          name="agree_to_terms"
          children={(field) => {
            // field.handleChange(e)
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <div className="flex items-start gap-3 px-1 col-span-2 ">
                <div className="flex h-5 items-center">
                  <Checkbox
                    id={field.name}
                    name={field.name}
                    checked={field.state.value}
                    onBlur={field.handleBlur}
                    aria-invalid={isInvalid}
                    onCheckedChange={(e) => field.handleChange(e as boolean)}
                  />
                </div>
                <label
                  className=" text-sm leading-tight"
                  htmlFor="agree_to_terms"
                >
                  I agree to the{" "}
                  <a
                    className="text-primary underline-offset-4 hover:underline"
                    href="#"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    className="text-primary underline-offset-4 hover:underline"
                    href="#"
                  >
                    Privacy Policy
                  </a>
                  .
                </label>
              </div>
            );
          }}
        />
      </FieldGroup>

      <Button size={"lg"} className="w-full h-11!" type="submit">
        {isPending && <Spinner />} Create account
      </Button>
    </form>
  );
};

export default SignUpForm;
