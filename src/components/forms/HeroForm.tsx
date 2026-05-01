import { useForm } from "@tanstack/react-form";
import { AtSign, Edit2Icon, Link2Icon } from "lucide-react";
import { Field, FieldGroup } from "../ui/field";
import TextInput from "../TextInput";

const HeroForm = () => {
  const form = useForm({
    defaultValues: {
      original_url: "",
      custom_alias: "",
    },
    onSubmit: async ({ value }) => {
      console.log(value);
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
      <FieldGroup className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <form.Field
          name="original_url"
          children={(field) => {
            return (
              <Field className="md:col-span-2">
                <div className="relative ">
                  <div className="pointer-events-none absolute inset-y-0 left-6 flex items-center text-primary/50">
                    <Link2Icon size={18} />
                  </div>
                  <input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="h-16 w-full rounded-md border-none bg-[#192540] pr-6 pl-14 text-white transition-all outline-none focus:ring-2 focus:ring-primary/40"
                    placeholder="Paste your long URL here..."
                    type="text"
                  />
                </div>
              </Field>
            );
          }}
        />

        <form.Field
          name="custom_alias"
          children={(field) => {
            return (
              <Field className="">
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-6 flex items-center text-primary/50">
                    <Edit2Icon size={18} />
                  </div>
                  <input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="h-16 w-full rounded-md border-none bg-[#192540] pr-6 pl-14 text-white transition-all outline-none focus:ring-2 focus:ring-primary/40"
                    placeholder="Custom alias"
                    type="text"
                  />
                </div>
              </Field>
            );
          }}
        />

        {/* <div className="relative md:col-span-2">
            <div className="pointer-events-none absolute inset-y-0 left-6 flex items-center text-primary/50">
              <Link2Icon size={18} />
            </div>
            <input
              className="h-16 w-full rounded-md border-none bg-[#192540] pr-6 pl-14 text-white transition-all focus:ring-2 focus:ring-secondary/40"
              placeholder="Paste your long URL here..."
              type="text"
            />
          </div> */}
      </FieldGroup>
      <button
        className="h-16 w-full rounded-md bg-primary text-lg font-bold shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95"
        type="button"
      >
        Shorten URL
      </button>
    </form>
  );
};

export default HeroForm;
