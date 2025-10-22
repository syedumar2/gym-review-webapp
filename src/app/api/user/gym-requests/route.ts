import { NextRequest, NextResponse } from "next/server";

import { ApiResponse } from "@/types/api";
import { getGymRequests } from "../../../../../services/userService";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const userId = searchParams.get("userId");
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "10");
    const sortField = searchParams.get("sortField") || undefined;
    const sortOrder = (searchParams.get("sortOrder") as "asc" | "desc") || undefined;

    if (!userId) {
      const errorResponse: ApiResponse = {
        success: false,
        error: "userId is required",
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    const result = await getGymRequests(userId, page, pageSize, sortField, sortOrder);

    const response: ApiResponse<typeof result> = {
      success: true,
      data: result,
    };

    return NextResponse.json(response);
  } catch (err) {
    console.error(err);

    const errorResponse: ApiResponse = {
      success: false,
      error: "Internal Server Error",
      message: (err as Error).message,
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}
