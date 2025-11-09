import { ApiResponse } from "@/types/api";
import { NextRequest, NextResponse } from "next/server";
import { userService } from "../../../../../services";
import { auth } from "../../../../../auth";

/**
 * This api retrieces lists of gym requests made by user
 * @param req 
 * @returns 
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const session = await auth();

    if (!session?.user)
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    const userId = session.user.id;

    const {
      page = 1,
      pageSize = 10,
      sort = [], // [{ field, order }]
    } = body;


    //TODO(MEDIUM): Update all authenticated actions to check for session on the api side instead of sending userId from client
    const result = await userService.getGymRequests(userId, page, pageSize, sort);

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
