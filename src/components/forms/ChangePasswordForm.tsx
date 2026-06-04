import React, { useTransition } from "react";
import { FieldGroup } from "../ui/field";
import TextInput from "../TextInput";
import { useForm } from "@tanstack/react-form";
import { Lock } from "lucide-react";
import { DialogClose } from "../ui/dialog";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { ChangePassSchema } from "@/schema/user.schema";

const ChangePasswordForm = () => {
  const [isPending, startTransition] = useTransition();
  const form = useForm({
    defaultValues: {
      current_password: "",
      new_password: "",
      confirm_password: "",
    },
    validators: {
        onSubmit: ChangePassSchema
    },
    onSubmit: ({ value }) => {
      startTransition(async () => {});
    },
  });
  return (
    <form onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
    }} className="space-y-3">
      <FieldGroup>
        <TextInput
          label="Current Password"
          id="current_password"
          form={form}
          icon={Lock}
          placeholder="••••••••"
          type="password"
        />
        <TextInput
          label="New Password"
          id="new_password"
          form={form}
          icon={Lock}
          placeholder="••••••••"
          type="password"
        />
        <TextInput
          label="Confirm Password"
          id="confirm_password"
          form={form}
          icon={Lock}
          placeholder="••••••••"
          type="password"
        />
      </FieldGroup>
      <div className="flex items-center gap-4 justify-end">
        <DialogClose asChild>
          <Button type="button" variant={"outline"}>
            Cancel
          </Button>
        </DialogClose>
        <Button>{isPending && <Spinner />} Change</Button>
      </div>
    </form>
  );
};

export default ChangePasswordForm;
