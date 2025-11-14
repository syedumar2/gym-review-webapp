"use server"

import { Review } from "@/generated/prisma"
import { ApiResponse } from "@/types/api"
import { ReviewObjectCreationInput } from "@/types/review"
import { userService } from "../../services"

export async function submitReview(params: ReviewObjectCreationInput): Promise<ApiResponse<Review | null>> {
    try {
        console.log("params are",params)
        const createdGymReview = await userService.addReview(params);
      
        return {
            success: true,
            data: createdGymReview,
            message: 'Gym review submitted successfully.',
        };
    } catch (error: any) {
        console.error('Error submitting gym review:', error.message);

        return {
            success: false,
            data: null,
            message: error?.message || 'Failed to submit gym review.',
        };
    }
} 