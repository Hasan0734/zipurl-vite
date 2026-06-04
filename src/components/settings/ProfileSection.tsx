import { Camera, CheckIcon, User } from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import ProfileForm from "../forms/ProfileForm";
import { useState, useTransition } from "react";
import { useForm } from "@tanstack/react-form";
import { Spinner } from "../ui/spinner";
import { updateProfile } from "@/lib/api-request";
import { updateUserSchema } from "@/schema/user.schema";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";

const ProfileSection = () => {
  const [editable, setEditable] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);

  const { user, setUser, setAccessToken } = useAuth();

  const form = useForm({
    defaultValues: {
      first_name: user?.first_name,
      last_name: user?.last_name,
      email: user?.email,
    },
    validators: {
      onSubmit: updateUserSchema,
    },
    onSubmit: ({ value }) => {
      startTransition(async () => {
        const res = await updateProfile(value);

        if (res.success) {
          setIsSuccess(true);
          setAccessToken(res.access_token);
          setUser(res.user);
          toast.success(res.message);
          await new Promise((resolve) => setTimeout(resolve, 500));
          setEditable(false);
          setIsSuccess(false);
          
          return;
        }
        await new Promise((resolve) => setTimeout(resolve, 500));
        setEditable(false);
        setIsSuccess(false);
        toast.error(res.message || "Something wrong!");
      });
    },
  });

  return (
    <section className="glass-panel  border border-primary/20 rounded-3xl p-8">
      <div className="mb-8 flex items-center justify-between">
        <h3 className="font-headline flex items-center gap-3 text-xl font-bold">
          <User className="text-primary" />
          Profile Identity
        </h3>
        <Button
          onClick={() => {
            if (!editable) {
              setEditable(true);
              return;
            }
            form.handleSubmit();
          }}
          className="rounded-full px-4"
          variant={editable ? "default" : "outline"}
        >
          {editable ? (
            <>
              {isPending && !isSuccess && <Spinner />}{" "}
              {isSuccess && <CheckIcon />} Save
            </>
          ) : (
            "Edit"
          )}
        </Button>
      </div>
      <div className="flex items-center gap-8">
        <div className="group relative">
          <div className="to-secondary absolute -inset-1 rounded-full bg-linear-to-tr from-primary opacity-25 blur transition duration-500 group-hover:opacity-50"></div>

          <Avatar className="size-24 border-4 object-cover relative">
            <AvatarImage src="https://github.com/shadcn.png" alt="harry" />
            <AvatarFallback>LR</AvatarFallback>
          </Avatar>
          <div className=" absolute right-0 bottom-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-4 bg-primary shadow-lg">
            <Camera size={16} />
          </div>
        </div>
        <ProfileForm editable={editable} form={form} />
      </div>
    </section>
  );
};

export default ProfileSection;
