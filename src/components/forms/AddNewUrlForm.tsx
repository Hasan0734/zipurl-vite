import { addNewUrl } from "@/lib/api-request";
import { urlFormOptions } from "@/lib/utils";
import { useForm } from "@tanstack/react-form";
import { useTransition, type Dispatch, type SetStateAction } from "react";
import { toast } from "sonner";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import TextInput from "../TextInput";
import { CheckIcon, Link2, LockIcon, Pen } from "lucide-react";
import DatePicker from "../ui/date-picker";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { DialogClose } from "../ui/dialog";
import { Spinner } from "../ui/spinner";
import { useSearchParams } from "react-router";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import api from "@/lib/api";
import { useQueryClient } from "@tanstack/react-query";

const AddNewUrlForm = ({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [isPending, startTransition] = useTransition();
  const [searchParams, setSearchParams] = useSearchParams();


  const queryClient = useQueryClient()

  const form = useForm({
    ...urlFormOptions,
    onSubmit: async ({ value }) => {
      startTransition(async () => {
        try {
          const res = await addNewUrl(value);

          if (!res?.success) {
            toast.error(res.message);
            return;
          }
          const params = new URLSearchParams(searchParams);
          params.set("page", "1");
          setSearchParams(params, { replace: true });
          queryClient.invalidateQueries({ queryKey: ["recentUrl"] });
          queryClient.invalidateQueries({ queryKey: ["urls"] });
          queryClient.invalidateQueries({ queryKey: ["stats-summary"] });

          toast.success(res.message);
          setIsOpen(false);
          // form.reset();
          return;
        } catch {
          toast.error("Something is wrong!");
        }
      });
    },
  });
  return (
    <form
      id="add-newUrl-form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-6"
    >
      <FieldGroup>
        <TextInput
          label="Enter url"
          form={form}
          name="original_url"
          id={"original_url"}
          icon={Link2}
          placeholder="Paste your long URL here..."
        />
        {/* <TextInput
          label="Custom Alias (Optional)"
          form={form}
          name="custom_alias"
          id={"custom_alias"}
          icon={Pen}
          placeholder={"my-link"}
        /> */}

        <form.Field
          validators={{
            onChangeAsyncDebounceMs: 500,
            onChangeAsync: async ({ value, fieldApi }) => {
              const originalUrlValid =
                fieldApi.form.getFieldMeta("original_url")?.isValid;
              const isValid = fieldApi.state.meta.isValid;
              const originalUrlValue =
                fieldApi.form.getFieldValue("original_url");

              if (
                !value ||
                value.length <= 8 ||
                !originalUrlValid ||
                !isValid ||
                !originalUrlValue
              ) {
                return undefined;
              }

              try {
                const res = await api.post("/urls/check/custom-alias", {
                  custom_alias: value,
                });

                if (!res.data.success) {
                  return {
                    message: res.data.message,
                  };
                }

                return undefined;
              } catch (e: any) {
                return {
                  message: e.response.data.message[0] || "Error checking alias",
                };
              }
            },
          }}
          name="custom_alias"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            const hasValue = field.state.value && field.state.value.length >= 8;
            const isChecking = field.state.meta.isValidating && !isInvalid;
            const originalUrlValid = form.getFieldMeta("original_url")?.isValid;

            const originalUrlValue = form.getFieldValue("original_url");

            return (
              <Field>
                <FieldLabel htmlFor={field.name}>
                  Custom Alias (Optional)
                </FieldLabel>
                <InputGroup className="h-11!">
                  <InputGroupInput
                    aria-invalid={isInvalid}
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder={"my-link"}
                  />
                  <InputGroupAddon align="inline-start">
                    <Pen size={18} />
                  </InputGroupAddon>
                </InputGroup>
                {hasValue && isChecking && (
                  <div className="flex gap-1 items-center text-center text-sm text-muted-foreground">
                    <Spinner />
                    <p>Checking...</p>
                  </div>
                )}
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
                {!isChecking &&
                  !isInvalid &&
                  hasValue &&
                  originalUrlValue &&
                  originalUrlValid && (
                    <div className="flex gap-1 text-primary items-center text-sm">
                      <CheckIcon size={16} />
                      <span>Alias is availble!</span>
                    </div>
                  )}
              </Field>
            );
          }}
        />
        <TextInput
          label="Password (Optional)"
          form={form}
          name="password"
          id={"password"}
          icon={LockIcon}
          placeholder={"••••••••"}
        />

        <form.Field
          name="expires_at"
          children={(field) => {
            return (
              <Field className="md:col-span-1">
                <Label>Expire (Optional)</Label>
                <DatePicker
                  onSelect={(date: Date) => {
                    form.setFieldValue("expires_at", date);
                  }}
                  date={(form.getFieldValue("expires_at") as Date) || undefined}
                  triggerClass="h-11"
                />
                <FieldError errors={field.state.meta.errors} />
              </Field>
            );
          }}
        />
      </FieldGroup>

      <div className="grid grid-cols-2 gap-3">
        <DialogClose asChild>
          <Button
            className="h-11"
            size={"lg"}
            variant={"outline"}
            disabled={isPending}
          >
            Close
          </Button>
        </DialogClose>
        <Button className="h-11" size={"lg"} disabled={isPending}>
          {isPending && <Spinner />} Add New
        </Button>
      </div>
    </form>
  );
};

export default AddNewUrlForm;
