import { email, z } from "zod"

const GenderEnum = z.enum([
    "Male", "Female", "Other"
]);
export const updateUserDataSchema = z
    .object({
        fullName: z
            .string()
            .min(1, "Full name is required")
            .max(50, "Full name must be less than 50 characters"),
        email: z
            .email({ message: "Please enter a valid email address." })
            .max(255),

        gender: z.string().refine(
            (val) => ["Male", "Female", "Other"].includes(val),
            { message: "Please select your gender" }
        ),

        city: z
            .string()
            .trim()
            .min(2, { message: "City name must be at least 2 characters." })
            .max(100)
            .optional()
        ,
        state: z
            .string()
            .trim()
            .min(2, { message: "State name must be at least 2 characters." })
            .max(100)
            .optional(),
        bio: z
            .string()
            .trim()
            .max(1000, { message: "Bio must be 1000 characters or fewer." })
            .optional()

    });

export type UserUpdateInput = z.infer<typeof updateUserDataSchema>;