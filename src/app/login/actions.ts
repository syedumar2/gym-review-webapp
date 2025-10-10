"use server"
import * as z from "zod";

import { LoginInput, LoginSchema } from "@/schemas/LoginSchema";
import { ApiResponse } from "@/types/api";
import { signIn } from "../../../auth"
import { DEFAULT_LOGIN_REDIRECT } from "../../../routes";
import { AuthError } from "next-auth";
export type LoginResponse = { success: boolean; message?: string; error?: string; }


export const login = async (values: LoginInput): Promise<ApiResponse<LoginResponse>> => {
    const validatedFields = LoginSchema.safeParse(values);
    if (!validatedFields.success) {
        return {
            success: false,
            error: "Invalid fields!"
        }
    }
    const { email, password } = validatedFields.data;
    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        })
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return {
                        success: false,
                        error: "Invalid Credentials! "
                    }
                default: return {
                    success: false,
                    error: "Something went wrong! "
                }
            }
        }
        throw error;


    }

    return {
        success: true,
        message: "Login successful!"
    };
}