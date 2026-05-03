import { useForm } from "@tanstack/react-form";
import {
  Check,
  CheckCircle,
  CheckIcon,
  ChevronDown,
  ChevronsUpDown,
  ChevronUp,
  Edit2Icon,
  Link2Icon,
  LockIcon,
  type LucideIcon,
} from "lucide-react";
import { Field, FieldError, FieldGroup } from "../ui/field";
import { cn, urlFormOptions } from "@/lib/utils";
import {
  useState,
  useTransition,
  type Dispatch,
  type SetStateAction,
} from "react";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import LoginDialog from "../LoginDialog";
import { useAuth } from "@/hooks/use-auth";
import api from "@/lib/api";
import toast from "react-hot-toast";
import DatePicker from "../ui/date-picker";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";

interface HeroFormProps {
  setShortCode: Dispatch<SetStateAction<string>>;
  setCustomAlias: Dispatch<SetStateAction<string>>;
}

const HeroForm = ({ setShortCode, setCustomAlias }: HeroFormProps) => {
  const auth = useAuth();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setOpen] = useState(false);

  const form = useForm({
    ...urlFormOptions,
    onSubmit: async ({ value }) => {
      console.log(value);
      if (!auth.accessToken) {
        setOpen(true);
        return;
      }
      startTransition(async () => {
        try {
          const { data } = await api.post("/urls", value);

          if (!data?.success) {
            toast.error(data.message);
            return;
          }
          setShortCode(data.url.short_code);
          if (data.url?.custom_alias) setCustomAlias(data.url.custom_alias);
          toast.success(data.message);
          form.reset();
          return;
        } catch {
          toast.error("Something is wrong!")
        }
      });
    },
  });

  return (
    <div>
      <LoginDialog open={isOpen} setOpen={setOpen} />
      <form
        id="hero-form"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-3"
      >
        <FieldGroup className="grid grid-cols-1 gap-x-6 gap-y-3 md:grid-cols-6 items-start">
          <form.Field
            name="original_url"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field className="md:col-span-4">
                  <TextInput
                    isInvalid={isInvalid}
                    icon={Link2Icon}
                    field={field}
                    placeholder="Paste your long URL here..."
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              );
            }}
          />
          <form.Field
            name="custom_alias"
            validators={{
              onChangeAsyncDebounceMs: 500,
              onChangeAsync: async ({ value, fieldApi }) => {
                const originalUrlValid = fieldApi.form.getFieldMeta("original_url")?.isValid;
                const isValid = fieldApi.state.meta.isValid;
                const originalUrlValue = fieldApi.form.getFieldValue("original_url");
                 
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
                    message:
                      e.response.data.message[0] || "Error checking alias",
                  };
                }
              },
            }}
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              const hasValue =
                field.state.value && field.state.value.length >= 8;
              const isChecking = field.state.meta.isValidating && !isInvalid;
              const originalUrlValid =
                form.getFieldMeta("original_url")?.isValid;

              const originalUrlValue = form.getFieldValue("original_url");

              return (
                <Field className="md:col-span-2">
                  <TextInput
                    isInvalid={isInvalid}
                    icon={Edit2Icon}
                    field={field}
                    placeholder="Custom alias"
                    autoComplete="false"
                  />
                  {isChecking && (
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
      

          <Collapsible className="md:col-span-6 grid gap-3">
            <CollapsibleTrigger type="button" asChild>
              <Button
                type="button"
                className="text-muted-foreground w-fit"
                variant={"ghost"}
                size={"sm"}
              >
                More features <ChevronsUpDown />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="grid grid-cols-1 gap-x-6 gap-y-3 md:grid-cols-2">
              <form.Field
                name="password"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field className="md:col-span-1">
                      <TextInput
                        isInvalid={isInvalid}
                        icon={LockIcon}
                        field={field}
                        placeholder="••••••••"
                        type="password"
                        autoComplete="false"
                      />
                      <FieldError errors={field.state.meta.errors} />
                    </Field>
                  );
                }}
              />
              <form.Field
                name="expires_at"
                children={(field) => {
                  return (
                    <Field className="md:col-span-1">
                      <DatePicker
                        onSelect={(date: Date) => {
                          form.setFieldValue("expires_at", date);
                        }}
                        date={
                          (form.getFieldValue("expires_at") as Date) ||
                          undefined
                        }
                        triggerClass="h-16 border-0 bg-[#192540]! px-6"
                        iconClass="text-primary/50 "
                      />
                      <FieldError errors={field.state.meta.errors} />
                    </Field>
                  );
                }}
              />
            </CollapsibleContent>
          </Collapsible>
        </FieldGroup>
        <Button
          className="h-16 w-full rounded-md bg-primary text-lg font-bold transition-all hover:scale-[1.02] active:scale-95"
          type="submit"
        >
          {isPending && <Spinner />} Shorten URL
        </Button>
      </form>
    </div>
  );
};

export default HeroForm;

interface TextInputProps {
  field: any;
  icon: LucideIcon;
  isInvalid?: boolean;
  [key: string]: any;
}

const TextInput = ({ field, icon, isInvalid, ...props }: TextInputProps) => {
  const Icon = icon;
  return (
    <div className="relative ">
      <div className="pointer-events-none absolute inset-y-0 left-6 flex items-center text-primary/50">
        <Icon size={18} />
      </div>

      <input
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        aria-invalid={isInvalid}
        onChange={(e) => field.handleChange(e.target.value)}
        className={cn(
          "h-16 w-full rounded-md border-none bg-[#192540] pr-6 pl-14 text-white transition-all outline-none focus:ring-2 focus:ring-primary/40",
          {
            "ring-2 ring-destructive/40": isInvalid,
          },
        )}
        {...props}
      />
    </div>
  );
};
