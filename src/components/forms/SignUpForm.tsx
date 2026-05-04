import { ArrowRight, AtSign, Lock, ShieldCheck, User } from "lucide-react";
import React, { useState, useTransition } from "react";
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

const userRegister = async (data: RegisterUserSchemaType) => {
  try {
    const res = await api.post("/auth/sign-in", data);
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
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    validators: {
      onSubmit: registerUserSchema,
    },
    onSubmit: async ({ value }) => {
      startTransition(async () => {
        const data = await userRegister(value);

        if (!data.success) {
          setMessage(data.message);
          return;
        }
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
        <div className="flex items-start gap-3 px-1 col-span-2 ">
          <div className="flex h-5 items-center">
            <Checkbox name="terms" id="terms" />
          </div>
          <label className=" text-sm leading-tight" htmlFor="terms">
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
      </FieldGroup>

      <Button size={"lg"} className="w-full h-11!" type="submit">
        {isPending && <Spinner />} Create account
      </Button>
    </form>
  );
};

export default SignUpForm;
