import TextInput from "../TextInput";
import { FieldGroup } from "../ui/field";
const ProfileForm = ({ editable, form }: { editable: boolean; form: any }) => {
  return (
    <form
      id="profile-form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="w-full"
    >
      <FieldGroup className="grid flex-1 grid-cols-2 gap-4">
        <TextInput
          label="First name"
          form={form}
          id={"first_name"}
          placeholder={"First name"}
          inputClass="border-secondary/50 has-disabled:opacity-100"
          readOnly={!editable}
          disabled={!editable}
        />
        <TextInput
          label="Last name"
          form={form}
          id={"last_name"}
          placeholder={"Last name"}
          inputClass="border-secondary/50 has-disabled:opacity-100"
          readOnly={!editable}
          disabled={!editable}
        />
        <TextInput
          className="col-span-2"
          label="Email address"
          form={form}
          id={"email"}
          placeholder={"john@example.com"}
          inputClass="border-secondary/50 has-disabled:opacity-100"
          readOnly
          disabled
        />
      </FieldGroup>
    </form>
  );
};

export default ProfileForm;
