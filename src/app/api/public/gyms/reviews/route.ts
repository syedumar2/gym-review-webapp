import { NextRequest, NextResponse } from "next/server";
import { publicService } from "../../../../../../services";
import { ApiResponse } from "@/types/api";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const {
            gymId,
            page,
            pageSize = 10,
            search,
            sort = [],
            filters
        } = body;
        const result = await publicService.getAllReviews(gymId, page, pageSize, search, sort, filters);
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
