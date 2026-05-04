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


const userInfo = z.object({
    first_name: z.string().min(2, "First name too short.").max(50, "First name too long."),
    last_name: z.string().min(2, "First name too short.").max(50, "First name too long."),
    email: z
        .email("Please enter a valid email address")
        .trim()
        .max(255)
        .toLowerCase()

});

const passwordSchema = z.object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirm_password: z.string(),
})
    .refine((data) => data.password === data.confirm_password, {
        message: "Passwords don't match",
        path: ["confirm_password"],
    });

export const registerUserSchema = userInfo.merge(passwordSchema);

export type RegisterUserSchemaType = z.infer<typeof registerUserSchema>;


