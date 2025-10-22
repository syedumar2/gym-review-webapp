"use server";

import { signOut } from "../../auth";
import { ApiResponse } from "@/types/api";
import { userService } from "../../services";
import { User } from "@/generated/prisma";
import { UserUpdateInput } from "@/schemas/UpdateUserDataScehma";



export async function handleSignOut() {
  await signOut({ redirectTo: "/login" });
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


export async function updateUserData(
  id: string,
  data: UserUpdateInput
): Promise<UserDataResponse> {
  try {
    const formattedData = {
      name: data.fullName,
      location: {
        set: {
          city: data.city,
          state: data.state,
        },
      },
      gender: data.gender as any, // replace 'Gender' with your actual enum type
      bio: data.bio,
    };

    const res = await userService.updateUser(id, formattedData);

    if (!res) {
      return {
        success: false,
        error: "No user data found for the current user.",
      };
    }

    return {
      success: true,
      data: res,
      message: "User data updated successfully.",
    };
  } catch (error: any) {
    return {
      success: false,
      error: error?.message ?? "Something went wrong while updating user data.",
    };
  }
}

