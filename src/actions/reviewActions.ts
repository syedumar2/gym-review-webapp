"use server"

import { Review } from "@/generated/prisma"
import { ApiResponse } from "@/types/api"
import { ReviewObjectCreationInput } from "@/types/review"
import { userService } from "../../services"

export async function submitReview(params: ReviewObjectCreationInput): Promise<ApiResponse<Review | null>> {
    try {
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

export async function editReview(reviewId: number, userId: string, data: ReviewObjectCreationInput): Promise<ApiResponse<Review | null>> {
    try {
        const updatedGymReview = await userService.editReview(reviewId, userId, data);
        return {
            success: true,
            data: updatedGymReview,
            message: 'Gym review edited successfully.',
        };

    } catch (error: any) {
        console.error('Error submitting gym review:', error.message);

        return {
            success: false,
            data: null,
            message: error?.message || 'Failed to edit gym review.',
        };
    }
};

export async function deleteReview(reviewId: number, userId: string): Promise<ApiResponse<Review | null>> {
    try {

        const deletedGymReview = await userService.deleteReview(userId, reviewId);
        return {
            success: true,
            data: deletedGymReview,
            message: 'Gym review edited successfully.',
        };
    } catch (error: any) {
        console.error('Error deleting gym review:', error.message);

        return {
            success: false,
            data: null,
            message: error?.message || 'Failed to delete gym review.',
        };
    }
};