import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    // return NextResponse.redirect(new URL("/login", req.url)); // test rem
  }

  try {
    // jwt.verify(token, process.env.JWT_SECRET); // test rem
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*"], // Protected routes
};
