"use server"

import { GymRequest } from "@/generated/prisma";
import { ApiResponse } from "@/types/api";
import { adminService } from "../../services";



export async function rejectGymRequest(
    gymData: GymRequest,
    adminId: string,
    reason: string
): Promise<ApiResponse<GymRequest | null>> {

    try {
        const result = await adminService.rejectGym(gymData, adminId, reason);
        return {
            success: true,
            data: result,
            message: 'Gym request rejected! '
        }
    } catch (error: any) {
        console.error('Error rejecting gym request:', error);

        return {
            success: false,
            data: null,
            message: error?.message || 'Failed to reject gym request.',
        };
    }
}