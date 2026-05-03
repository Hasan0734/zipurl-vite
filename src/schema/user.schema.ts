import * as z from 'zod';

export const loginUserSchema = z.object({
    email: z
        .email("Please enter a valid email address")
        .trim()
        .max(255)
        .toLowerCase(),
    password: z.string("Password is required!").min(8, "Password is required!"),
});

export type LoginUserSchemaType = z.infer<typeof loginUserSchema>;


