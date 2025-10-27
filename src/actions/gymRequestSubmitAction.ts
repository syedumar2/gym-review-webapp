"use server"

import { GymRequest, Prisma, Status } from "@/generated/prisma";
import { GymFormInput } from "@/schemas/GymRequestSchema";
import { ApiResponse } from "@/types/api";
import { userService } from "../../services";
import { ImageData } from "@/types/gym";


export async function submitGymRequest(
    data: GymFormInput,
    images: ImageData[],
    userId: string
): Promise<ApiResponse<GymRequest|null>> {
    try {
        const formattedData = {
            gymName: data.name,
            description: data.description,
            address: {
                address: data.address,
                city: data.city,
                state: data.state
            },
            gymType: data.type,
            genderSegregation: data.genderSegregation,
            phoneNumber: data.phone,
            timings: {
                morningStart: data.morningStart,
                morningEnd: data.morningEnd,
                eveningStart: data.eveningStart,
                eveningEnd: data.eveningEnd,
            },
            amenities: data.amenities,
            membershipPlans: data.membershipPlans as Prisma.InputJsonValue,
            cardioEquipment: data.cardioEquipment,
            strengthEquipment: data.strengthEquipment,
            functionalEquipment: data.functionalEquipment,
            miscEquipment: data.miscEquipment,
            images: images as unknown as Prisma.InputJsonValue,
            requestingUser: userId,
            status: Status.PENDING,
        };

        const createdGymRequest = await userService.createGymRequest(formattedData);

        return {
            success: true,
            data: createdGymRequest,
            message: 'Gym request submitted successfully.',
        };
    } catch (error: any) {
        console.error('Error submitting gym request:', error);

        return {
            success: false,
            data: null,
            message: error?.message || 'Failed to submit gym request.',
        };
    }
}
