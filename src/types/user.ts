export interface User {
    id: string;
    name: string;
    username?: string;
    email: string;
    avatarUrl?: string;
    bio?: string;
    location?: UserAddress;
    gender?: "Male" | "Female" | "Other";

    role: "user" | "admin" | "gym_owner";

    reviewCount: number;
    gymRequestsCount: number;
    avgRatingGiven?: number;
    favorites?: string[];
    isVerified: boolean;
    lastLogin?: Date;

    createdAt: Date;
    updatedAt: Date;
}
export interface UserAddress {
    city: string;
    state: string;
    pincode: string;
}
