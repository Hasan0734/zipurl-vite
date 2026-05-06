import { useForm } from "@tanstack/react-form";
import { LockIcon } from "lucide-react";
import { useTransition } from "react";
import { FieldGroup } from "../ui/field";
import TextInput from "../TextInput";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { passwordResetRequest, resetPassword } from "@/lib/request";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  email: z.email("Enter valid password.").toLowerCase(),
});

const ResetPasswordForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    defaultValues: {
      passsword: "",
      confirm_password: ''
    },

    validators: {
      onChange: formSchema,
    },
    onSubmit: ({ value }) => {
      startTransition(async () => {
        const res = await resetPassword();

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
          label="Password"
          name="password"
          id="password"
          icon={LockIcon}
          placeholder="••••••••"
          forgotPassword
          type="password"
          forgotPasswordPath="/forgot-password"
          form={form}
        />

        <TextInput
          label="Confirm Password"
          name="confirm_password"
          id="confirm_password"
          icon={LockIcon}
          placeholder="••••••••"
          type="password"
          form={form}
          className="col-span-2"
          autoComplete="true"
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

export default ResetPasswordForm;
