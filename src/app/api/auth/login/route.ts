import { NextResponse } from "next/server";
import { createUser } from "../../../../../services";


export async function POST(req: Request) {
    const { name, email, password } = await req.json();
    try {
        const user = await createUser({ name, email, password, role: "user" });
        return NextResponse.json({
            id: user.id, email: user.email, name: user.name
        })
    } catch (error) {
        return NextResponse.json({ error: "User already exists or invalid data" }, { status: 400 });
    }
}