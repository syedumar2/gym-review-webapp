import { z } from "zod";
import { isValidPhoneNumber } from "react-phone-number-input";
import { Amenity, CardioEquipment, FunctionalEquipment, GenderSegregation, GymType, MiscEquipment, Status, StrengthEquipment } from "@/generated/prisma/client";

export enum PlanType {
    MONTHLY = "Monthly",
    YEARLY = "Yearly",
    WEEKLY = "Weekly",
    DAILY = "Daily",

}

export const MembershipPlanSchema = z.object(
    {
        planName: z.string().min(1, "Plan name is required"),
        planType: z.enum(PlanType),
        price: z.coerce.number().min(0, "Price must be non-negative"),
        perks: z
            .array(z.string().min(1, "Feature cannot be empty"))
            .min(1, "At least one feature is required"),
    }
)

export const GymFormSchema = z.object({
    name: z.string().min(1, "Gym name is required"),
    type: z.enum(GymType),
    genderSegregation: z.enum(GenderSegregation),
    description: z.string().max(500),
    address: z.string().max(100),
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
    phone: z
        .string()
        .refine(isValidPhoneNumber, { message: "Invalid phone number" })
        .or(z.literal("")),
    morningStart: z.string().min(1, "Morning start time required"),
    morningEnd: z.string().min(1, "Morning end time required"),
    eveningStart: z.string().optional(),
    eveningEnd: z.string().optional(),
    amenities: z.array(z.enum(Amenity)).optional(),
    cardioEquipment: z.array(z.enum(CardioEquipment)).optional(),
    strengthEquipment: z.array(z.enum(StrengthEquipment)).optional(),
    functionalEquipment: z.array(z.enum(FunctionalEquipment)).optional(),
    miscEquipment: z.array(z.enum(MiscEquipment)).optional(),
    membershipPlans: z.array(MembershipPlanSchema).min(1, "At least one plan is required"),


});



export type MembershipPlanInput = z.infer<typeof MembershipPlanSchema>;
export type GymFormInput = z.infer<typeof GymFormSchema>;