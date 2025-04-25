// /api / cartorders / route.js

import { NextResponse } from "next/server";
import { db } from "../../../../db/actions";

export async function POST(request) {
    try {
        const data = await request.json();
        console.log("data received!", data);
        const result = await db.addCartOrder(data);
        return NextResponse.json({ status: 200, message: "success", result });
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