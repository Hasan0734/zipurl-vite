import { Eye, EyeOff, XIcon, type LucideIcon } from "lucide-react";
import { type InputHTMLAttributes, useState } from "react";
import { Field, FieldError, FieldLabel } from "./ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "./ui/input-group";
import { Link } from "react-router";
import { cn } from "@/lib/utils";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  icon?: LucideIcon;
  className?: string;
  forgotPassword?: boolean;
  form: any;
  placeholder?: string;
  type?: string;
  showClearBtn?: boolean;
  inputClass?: string;
  [key: string]: any;
}

const TextInput = ({
  label,
  id,
  icon: Icon,
  className,
  forgotPassword,
  form,
  placeholder,
  type,
  forgotPasswordPath,
  showClearBtn,
  inputClass,
  ...props
}: TextInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form.Field
      name={id}
      children={(field: any) => {
        const isInvalid =
          field.state.meta.isTouched && !field.state.meta.isValid;
        return (
          <Field className={className} data-invalid={isInvalid}>
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
              {forgotPassword && (
                <Link
                  tabIndex={-1}
                  className="text-xs font-semibold text-white transition-colors hover:text-primary"
                  to={forgotPasswordPath}
                >
                  Forgot password?
                </Link>
              )}
            </div>
            <InputGroup className={cn("h-11!", inputClass)} >
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
              />
              <InputGroupAddon align="inline-start">
                {Icon && <Icon size={18} />}
              </InputGroupAddon>
              {showClearBtn && field.state.value && (
                <InputGroupAddon align="inline-end">
                  <InputGroupButton
                    onClick={(e) => {
                      e.preventDefault();
                      field.setValue("");
                      form.removeField();
                    }}
                  >
                    <XIcon />
                  </InputGroupButton>
                </InputGroupAddon>
              )}
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
