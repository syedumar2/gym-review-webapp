import { editReview } from "@/actions/reviewActions";
import { Prisma } from "@/generated/prisma";
import { ReviewFormInput, ReviewFormSchema } from "@/schemas/ReviewFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Resolver, useForm } from "react-hook-form";
import { toast } from "sonner";



export function useEditReviewForm(userId: string, reviewId: number, gymId: number, onSuccess?: () => void) {

    const [loading, setLoading] = useState(false);
    const queryClient = useQueryClient();

    const form = useForm<ReviewFormInput>({
        mode: "onTouched",
        resolver: zodResolver(ReviewFormSchema) as Resolver<ReviewFormInput>,
    });

    const onSubmit = async (
        data: ReviewFormInput,
        rating: number,
        images: any[]) => {
        if (!reviewId) {
            toast.error("No review selected! ")
            return;
        }
        setLoading(true);
        try {
            //editReview action
            console.log("The images passed are", images)
            const res = await editReview(reviewId, userId, {
                body: data.body,
                gymId,
                userId,
                rating,
                title: data.title,
                hasMedia: images.length > 0,
                images: images as unknown as Prisma.InputJsonValue,
            })
            if (!res?.success) {
                toast.error(res?.message || "Something went wrong.");
                return;
            }

            toast.success(res.message || "Review submitted!");
            queryClient.invalidateQueries({ queryKey: ["reviews"], refetchType: "active" });
            form.reset();
            if (onSuccess) onSuccess();
        } catch (err: any) {
            toast.error(err?.message || "Unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return { ...form, loading, onSubmit }

}