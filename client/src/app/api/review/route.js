// review route / api
import { db } from "../../../../db/actions";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const data = await request.json();
    // console.log("data received!");
    const result = await db.addReview(data);
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

export async function GET(request) {
  try {
    const params = request.nextUrl.searchParams.get("productId"); ;
    // console.log("params", params);
    const result = await db.getReviews(params);
    // console.log("reviews", reviews);
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
