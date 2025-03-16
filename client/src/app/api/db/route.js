import { db } from "../../../../db/actions";

import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const data = await request.json();

    await db.addUserWithUID(data);

    const user = await db.getUser(data.uid);

    return NextResponse.json({ status: 200, message: "success", user: user });
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
