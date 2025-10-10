import {z} from "zod";


export const LoginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password too long"),
});

// Option B: stronger password (uncomment if you want complexity requirements)
// export const loginSchema = z.object({
//   email: z.string().min(1, "Email is required").email("Invalid email address"),
//   password: z
//     .string()
//     .min(8, "Password must be at least 8 characters")
//     .max(128, "Password too long")
//     .refine((pw) => /[a-z]/.test(pw), "Password must contain at least one lowercase letter")
//     .refine((pw) => /[A-Z]/.test(pw), "Password must contain at least one uppercase letter")
//     .refine((pw) => /[0-9]/.test(pw), "Password must contain at least one number")
//     .refine((pw) => /[!@#$%^&*(),.?":{}|<>]/.test(pw), "Password must contain at least one special character"),
// });

 export type LoginInput = z.infer<typeof LoginSchema>;