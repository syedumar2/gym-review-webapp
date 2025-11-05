import { ApiResponse } from "@/types/api";
import { NextRequest, NextResponse } from "next/server";
import { publicService } from "../../../../../services";



export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const {
            page = 1,
            pageSize = 10,
            search,
            sort = [],
            filters
        } = body;
        const result = await publicService.getAllGyms(page, pageSize, search, sort,filters);
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