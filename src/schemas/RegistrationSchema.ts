import { z } from "zod";

export const registrationSchema = z
    .object({
        fullName: z
            .string()
            .min(1, "Full name is required")
            .max(50, "Full name must be less than 50 characters"),
        email: z
            .string()
            .min(1, "Email is required")
            .email("Invalid email address"),
        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .max(128, "Password is too long"),
        confirmPassword: z.string().min(1, "Please confirm your password"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords do not match",
    });

export type RegistrationInput = z.infer<typeof registrationSchema>;
