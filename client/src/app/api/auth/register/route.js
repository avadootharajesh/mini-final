import { NextResponse } from "next/server";
import { registerUser } from "@/app/api/auth/actions";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    const result = await registerUser({ name, email, password });

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
