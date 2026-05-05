import { Eye, EyeOff, type LucideIcon } from "lucide-react";
import { type InputHTMLAttributes, useState } from "react";
import { Field, FieldError, FieldLabel } from "./ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "./ui/input-group";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  icon: LucideIcon;
  className?: string;
  forgot_password?: boolean;
  form: any;
  placeholder: string;
  type?: string;
  [key: string]: any;
}

const TextInput = ({
  label,
  id,
  icon: Icon,
  className,
  forgot_password,
  form,
  placeholder,
  type,
  ...props
}: TextInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form.Field
      name={id}
      control={form.control}
      children={(field: any) => {
        const isInvalid =
          field.state.meta.isTouched && !field.state.meta.isValid;
        return (
          <Field className={className} data-invalid={isInvalid}>
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
              {forgot_password && (
                <a
                  tabIndex={-1}
                  className="text-xs font-semibold text-white transition-colors hover:text-primary"
                  href="/forgot-password"
                >
                  Forgot password?
                </a>
              )}
            </div>
            <InputGroup className="h-11!">
              <InputGroupInput
                aria-invalid={isInvalid}
                type={showPassword ? "text" : type}
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder={placeholder}
                {...props}
                className=""
              />
              <InputGroupAddon align="inline-start">
                <Icon size={18} />
              </InputGroupAddon>
              {type === "password" && (
                <InputGroupAddon align="inline-end">
                  <InputGroupButton
                    aria-label="Copy"
                    title="Copy"
                    size="icon-xs"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </InputGroupButton>
                </InputGroupAddon>
              )}
            </InputGroup>
            {isInvalid && <FieldError errors={field.state.meta.errors} />}
          </Field>
        );
      }}
    />
  );
};

export default TextInput;
