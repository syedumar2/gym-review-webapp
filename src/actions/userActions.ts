"use server";

import { signOut } from "../../auth";
import { ApiResponse } from "@/types/api";
import { userService } from "../../services";
import { User } from "@/generated/prisma";



export async function handleSignOut() {
  await signOut();
}

type UserDataResponse = ApiResponse<User>;

export async function getUserData(id: string): Promise<UserDataResponse> {

  try {
    const res = await userService.getUserById(id);
    if (!res) {
      return {
        success: false,
        error: "No user data found for current user! "
      }
    }
    return {
      success: true,
      data: res,
      message: "User data retrieval successfull! "
    }
  } catch (error: any) {
    return {
      success: false,
      error: error?.message ?? "Something went wrong! "
    };
  }
}
