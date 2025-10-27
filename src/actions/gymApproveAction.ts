"use server"

import { Gym, GymRequest } from "@/generated/prisma";
import { ApiResponse } from "@/types/api";
import { adminService } from "../../services";



export async function approveGymRequest(
    gymData: GymRequest,
    adminId: string,
): Promise<ApiResponse<Gym | null>> {

    try {
        const result = await adminService.approveGym(gymData, adminId);
        return {
            success: true,
            data: result,
            message: 'Gym request approved. Gym is now live! '
        }
    } catch (error: any) {
        console.error('Error approving gym request:', error);

        return {
            success: false,
            data: null,
            message: error?.message || 'Failed to approve gym request.',
        };
    }
}