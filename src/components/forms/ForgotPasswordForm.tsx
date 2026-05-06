import { useForm } from "@tanstack/react-form";
import { AtSignIcon, LockIcon } from "lucide-react";
import React, { useTransition } from "react";
import { FieldGroup } from "../ui/field";
import TextInput from "../TextInput";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { passwordResetRequest } from "@/lib/request";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  email: z.email("Enter valid password.").toLowerCase(),
});

const ForgotPasswordForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    defaultValues: {
      email: "",
    },

    validators: {
      onChange: formSchema,
    },
    onSubmit: ({ value }) => {
      startTransition(async () => {
        const res = await passwordResetRequest(value.email);

        if (!res.success) {
          toast.error(res.message);
          return;
        }
        toast.success(res.message);
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
          icon={AtSignIcon}
          placeholder="name@company.com"
          type="email"
          form={form}
        />
      </FieldGroup>

      <Button
        disabled={isPending}
        size={"lg"}
        className="h-11! w-full"
        type="submit"
      >
        {isPending && <Spinner />} Request
      </Button>
    </form>
  );
};

export default ForgotPasswordForm;
