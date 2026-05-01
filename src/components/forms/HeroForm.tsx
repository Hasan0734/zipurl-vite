import { useForm } from "@tanstack/react-form";
import { AtSign, Edit2Icon, Link2Icon, type LucideIcon } from "lucide-react";
import { Field, FieldError, FieldGroup } from "../ui/field";
import * as z from "zod";
import { cn } from "@/lib/utils";
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

const urlSchema = z.object({
  original_url: z.url("Valid URL required."),
  custom_alias: z.string(),
});

interface HeroFormProps {
  setShortCode: Dispatch<SetStateAction<string>>;
  setCustomAlias: Dispatch<SetStateAction<string>>;
}

const HeroForm = ({ setShortCode, setCustomAlias }: HeroFormProps) => {
  const auth = useAuth();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setOpen] = useState(false);

  const form = useForm({
    defaultValues: {
      original_url: "",
      custom_alias: "",
    },
    validators: {
      onSubmit: urlSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
      if (!auth.accessToken) {
        setOpen(true);
        return;
      }
      startTransition(async () => {
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
      });
    },
  });

  console.log(auth);

  return (
    <div>
      <LoginDialog open={isOpen} setOpen={setOpen} />
      <form
        id="hero-form"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-6"
      >
        <FieldGroup className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <form.Field
            name="original_url"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field className="md:col-span-2">
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
            children={(field) => {
              return (
                <Field className="">
                  <TextInput
                    icon={Edit2Icon}
                    field={field}
                    placeholder="Custom alias"
                  />
                </Field>
              );
            }}
          />
        </FieldGroup>
        <Button
          className="h-16 w-full rounded-md bg-primary text-lg font-bold shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95"
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
        onChange={(e) => field.handleChange(e.target.value)}
        className={cn(
          "h-16 w-full rounded-md border-none bg-[#192540] pr-6 pl-14 text-white transition-all outline-none focus:ring-2 focus:ring-primary/40",
          {
            "ring-2 ring-destructive/40": isInvalid,
          },
        )}
        {...props}
        type="text"
      />
    </div>
  );
};
