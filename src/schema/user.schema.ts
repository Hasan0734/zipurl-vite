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


export const registerUserSchema = z.object({
    first_name: z.string().min(2, "First name too short.").max(50, "First name too long."),
    last_name: z.string().min(2, "First name too short.").max(50, "First name too long."),
    email: z
        .email("Please enter a valid email address")
        .trim()
        .max(255)
        .toLowerCase(),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/[0-9]/, { message: "Password must contain at least one number" })
        .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character" }),
    confirm_password: z.string(),
    agree_to_terms: z.boolean().refine((val) => val === true, {
        message: "You must agree to the terms and policy."
    })

}).refine((data) => data.password === data.confirm_password, {
    error: "Passwords don't match",
    path: ['confirm_password']
});




export type RegisterUserSchemaType = z.infer<typeof registerUserSchema>;


