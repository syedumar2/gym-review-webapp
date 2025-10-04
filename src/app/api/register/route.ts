import { NextResponse } from "next/server";
import { createUser } from "../../../../services";
import { getUserByEmail } from "../../../../services/userService";
import type { ApiResponse } from "@/types/api";
export type SignupResponse = ApiResponse<{ id: string; email: string }>;
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, email, password } = body;

    if (!fullName || !email || !password) {
      const res: ApiResponse = { success: false, error: "Missing required fields" };
      return NextResponse.json(res, { status: 400 });
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser !== null) {
      const res: ApiResponse = { success: false, error: "User with email already exists" };
      return NextResponse.json(res, { status: 400 });
    }

    const user = await createUser({
      name: fullName.trim(),
      email: email.trim().toLowerCase(),
      password,
    });

    const res: ApiResponse<{ id: string; email: string }> = {
      success: true,
      message: "User registered successfully",
      data: { id: user.id, email: user.email },
    };

    return NextResponse.json(res, { status: 200 });
  } catch (err: any) {
    console.error(err);
    const res: ApiResponse = { success: false, error: err.message || "Something went wrong" };
    return NextResponse.json(res, { status: 500 });
  }
}
