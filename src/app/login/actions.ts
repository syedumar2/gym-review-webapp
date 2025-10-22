'use server'

import { LoginSchema } from "@/schemas/LoginSchema";
import { ApiResponse } from "@/types/api";

export const validateLogin = async (values: unknown): Promise<ApiResponse<null>> => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { success: false, error: "Invalid fields!" };
  }

  return { success: true };
};
