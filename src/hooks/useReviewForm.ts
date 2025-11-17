"use client";
import { useState } from "react";
import { useForm, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Prisma } from "@/generated/prisma";
import { submitReview } from "@/actions/reviewActions";
import { ReviewFormSchema, ReviewFormInput } from "@/schemas/ReviewFormSchema";
import { useQueryClient } from "@tanstack/react-query";

export function useReviewForm(gymId: number, userId?: string, onSuccess?: () => void) {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<ReviewFormInput>({
    mode: "onTouched",
    resolver: zodResolver(ReviewFormSchema) as Resolver<ReviewFormInput>,
    defaultValues: {
      body: "",
      title: "",
    }
  });

  const onSubmit = async (
    data: ReviewFormInput,
    rating: number,
    images: any[]
  ) => {
    if (!userId) {
      toast.error("You must be logged in to submit a review.");
      return;
    }

    setLoading(true);
    try {
      const res = await submitReview({
        body: data.body,
        gymId,
        userId,
        rating,
        title: data.title,
        hasMedia: images.length > 0,
        images: images as unknown as Prisma.InputJsonValue,
      });

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

  return { ...form, loading, onSubmit };
}
