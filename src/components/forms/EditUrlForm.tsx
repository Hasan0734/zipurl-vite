import { checkCustomAlias, updateUrlById } from "@/lib/api-request";
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
import { useQueryClient } from "@tanstack/react-query";
import type { UrlType } from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";


const EditUrlForm = ({
  setIsOpen,
  prevData,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  prevData: UrlType;
}) => {
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();

  const form = useForm({
    ...urlFormOptions,
    defaultValues: {
      original_url: prevData.original_url,
      custom_alias: prevData.custom_alias as string | undefined,
      password: "" as string | undefined,
      expires_at: prevData.expires_at
        ? (new Date(prevData.expires_at) as Date | undefined)
        : undefined,
      is_active: prevData.is_active,
    },
    onSubmit: async ({ value }) => {
      startTransition(async () => {
        try {
          const res = await updateUrlById(value, prevData._id);

          if (!res?.success) {
            toast.error(res.message);
            return;
          }
          queryClient.invalidateQueries({ queryKey: ["recentUrl"] });
          queryClient.invalidateQueries({ queryKey: ["urls"] });

          toast.success(res.message);
          setIsOpen(false);
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
          readOnly
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

              const res = await checkCustomAlias({
                custom_alias: value,
                url_id: prevData._id,
              });
              if (!res.success) {
                return { message: res.message };
              }
              return undefined;
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

            console.log(field.state.meta);

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

        <form.Field
          name="is_active"
          children={(field) => {
            return (
              <Field>
                <Label>Status</Label>
                <Select
                  value={JSON.stringify(field.state.value)}
                  onValueChange={(v) => v && field.handleChange(JSON.parse(v))}
                >
                  <SelectTrigger className="w-full h-11!">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent className="bg-background">
                    <SelectGroup>
                      <SelectItem className="h-9" value={"true"}>
                        Active
                      </SelectItem>
                      <SelectItem className="h-9" value={"false"}>
                        Inactive
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
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
            Cancel
          </Button>
        </DialogClose>
        <Button className="h-11" size={"lg"} disabled={isPending}>
          {isPending && <Spinner />} Save
        </Button>
      </div>
    </form>
  );
};

export default EditUrlForm;
