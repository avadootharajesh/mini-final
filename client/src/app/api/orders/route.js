// /api / orders / route.js

import { NextResponse } from "next/server";
import { db } from "../../../../db/actions";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    // console.log("userId", userId);
    const result = await db.getOrders(userId);
    // console.log("result", result);
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

export async function POST(request) {
  try {
    const data = await request.json();
    console.log("data received!", data);
    const result = await db.addOrder(data);
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
