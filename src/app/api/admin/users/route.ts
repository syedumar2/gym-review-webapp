import { NextRequest, NextResponse } from "next/server";

import { ApiResponse } from "@/types/api";
import { adminService } from "../../../../../services";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const {
            page = 1,
            pageSize = 10,
            sort = [], // [{ field, order }]
        } = body;

        const result = await adminService.getAllUsers(page, pageSize, sort);
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