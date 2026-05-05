import { urlSchema } from "@/schema/url.schema";
import { formOptions } from "@tanstack/react-form";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import api from "./api";
import * as z from 'zod';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const SHORT_URL = import.meta.env.VITE_SHORT_URL


export const urlFormOptions = formOptions({
  defaultValues: {
    original_url: "",
    custom_alias: "" as string | undefined,
    password: "" as string | undefined,
    expires_at: undefined as Date | undefined,
  },

  validators: {

    onBlur: ({ value }) => {
      const result = urlSchema.safeParse(value);
      if (result.success) return undefined;
      const fieldErrors: Record<string, z.core.$ZodIssue> = {};
      result.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as string;
        fieldErrors[fieldName] = issue;
      });

      return { form: "hero-form", fields: fieldErrors };
    },

  },
  onSubmitInvalid() {
    const firstInvalid = document.querySelector(
      '[aria-invalid="true"]',
    ) as HTMLElement;
    firstInvalid?.focus();
  },
});