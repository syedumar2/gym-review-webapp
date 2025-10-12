import { $Enums } from "@/generated/prisma";
import { JsonValue } from "@/generated/prisma/runtime/library";

export interface User {
    name: string;
    id: string;
    email: string;
    image: string | null;
    password: string | null;
    bio: string | null;
    location: UserLocation;
    gender: $Enums.Gender | null;
    role: $Enums.Role;
    emailVerified: Date | null;
    reviewCount: number;
    gymRequestsCount: number;
    avgRatingGiven: number | null;
    favorites: string[];
    isVerified: boolean;
    lastLogin: Date | null;
    createdAt: Date;
    updatedAt: Date;
}

interface UserLocation {
    set: {
        city: string;
        state: string;
    };
}