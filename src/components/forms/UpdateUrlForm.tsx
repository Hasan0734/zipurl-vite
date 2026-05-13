import { addNewUrl } from "@/lib/request";
import { urlFormOptions } from "@/lib/utils";
import { useForm } from "@tanstack/react-form";
import  {
  useTransition,
  type Dispatch,
  type SetStateAction,
} from "react";
import { toast } from "sonner";
import { Field, FieldError, FieldGroup } from "../ui/field";
import TextInput from "../TextInput";
import { Link2, LockIcon, Pen } from "lucide-react";
import DatePicker from "../ui/date-picker";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { DialogClose } from "../ui/dialog";
import { Spinner } from "../ui/spinner";
import { useQuery } from "@tanstack/react-query";

const UpdateUrlForm = ({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [isPending, startTransition] = useTransition();

  const { refetch } = useQuery({
    queryKey: ["urls"],
  });

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
          refetch();
          toast.success(res.message);
          setIsOpen(false);
          form.reset();
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
        <TextInput
          label="Custom Alias (Optional)"
          form={form}
          name="custom_alias"
          id={"custom_alias"}
          icon={Pen}
          placeholder={"my-link"}
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
          {isPending && <Spinner />}Add New
        </Button>
      </div>
    </form>
  );
};

export default UpdateUrlForm;
