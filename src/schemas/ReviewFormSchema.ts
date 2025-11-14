import z from "zod";

export const ReviewFormSchema = z.object(
    {
        title: z.string()
            .min(5, "Title should be at least 5 characters")
            .max(60, "Title should be at most 60 characters")
            .optional(),
        body: z
            .string()
            .min(30, "Review must be at least 30 characters long")
            .max(700, "Review must be under 700 characters"),




    });
export type ReviewFormInput = z.infer<typeof ReviewFormSchema>;
