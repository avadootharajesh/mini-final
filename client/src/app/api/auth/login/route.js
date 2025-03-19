import { NextResponse } from "next/server";
import { loginUser } from "@/app/api/auth/actions";

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    const result = await loginUser({ email, password });

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
