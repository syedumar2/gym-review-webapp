"use server"

import { ApiResponse } from "@/types/api";
import { userService } from "../../../services";




type SignupPayload = {
    fullName: string;
    email: string;
    password: string;
}
export async function registerUser(payload: SignupPayload): Promise<ApiResponse<{ id: string; email: string }>> {
    const { fullName, email, password } = payload;

    if (!fullName || !email || !password) {
        return { success: false, error: "Missing required fields" };
    }


    const existingUser = await userService.getUserByEmail(email);
    if (existingUser) {
        return {
            success: false,
            error: "Email already in use! "
        }
    }
    //hashing is done by the service
    const user = await userService.createUser({
        name: fullName,
        email,
        password
    })

    return {
        success: true,
        message: "User registered successfully",
    };
}   