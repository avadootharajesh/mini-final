// cart/size route / api

import { db } from "../../../../../db/actions";
import { NextResponse } from "next/server";

// export async function POST(request) {}

export async function POST(request) {
    try {
        const { userId } = await request.json();
        const result = await db.getCartSize( userId );
        return NextResponse.json({ status: 200, message: "success", data: result });
    } catch (error) {
        return NextResponse.json(
            {
                status: 500,
                statusText: "Internal Server Error",
                message: error.message,
            },
            {
                status: 500,
            }
        );
    }
}