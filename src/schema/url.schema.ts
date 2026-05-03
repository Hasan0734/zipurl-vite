import * as z from 'zod';


export const optionalPreprocess = <T extends z.ZodTypeAny>(schema: T) => {
    return z.preprocess(
        (val) => (val === "" ? undefined : val),
        schema.optional()
    );
};

export const urlSchema = z.object({
    original_url: z.string().url("Valid URL required."),
    custom_alias: optionalPreprocess(z.string().min(8, "Minimum 8 characters").max(20, "Maximum 20 characters")),
    password: optionalPreprocess(z.string().min(4, "Minimum 4 characters").max(20, "Maximum 20 characters")),
    expires_at: z.date().optional(),
});

export type UrlSchemaType = z.infer<typeof urlSchema>;

// z.preprocess(
//         (val) => (val === "" ? undefined : val),
//         z.string().min(4, "Minimum 4 characters").optional())