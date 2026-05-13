import { urlSchema } from "@/schema/url.schema";
import { formOptions } from "@tanstack/react-form";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import * as z from 'zod';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const SHORT_URL = import.meta.env.VITE_API_URL


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

      return { fields: fieldErrors };
    },

  },
  onSubmitInvalid() {
    const firstInvalid = document.querySelector(
      '[aria-invalid="true"]',
    ) as HTMLElement;
    firstInvalid?.focus();
  },
});


export function getPaginationRange(currentPage: number, totalPages: number) {
  const delta = 1;
  const range: number[] = [];
  const rangeWithDots = [];
  let l;

  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages - 1 || (i >= currentPage - delta && i <= currentPage + delta)) {
      range.push(i);
    }
  }

  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1)
      } else if (i - l !== 1) {
        rangeWithDots.push('...')
      }
    }
    rangeWithDots.push(i);
    l = i;
  }

  return rangeWithDots;

}