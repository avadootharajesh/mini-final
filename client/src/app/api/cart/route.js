// cart route / api

import { db } from "../../../../db/actions";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { userId, productId } = await request.json();
    const result = await db.addToCart(userId, productId);
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
    // in params
    const userId = request.nextUrl.searchParams.get("userId");
    const result = await db.getCart(userId);
    // console.log(result.cart);
    const products = [];
    result.cart.forEach((product) => products.push({
        ...product._doc,
        quantity: 1
    }));
    return NextResponse.json({
      status: 200,
      message: "success",
      data: products,
    });
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

export async function DELETE(request) {
  try {
    // params
    const userId = request.nextUrl.searchParams.get("userId");
    // empty whole cart
    const result = await db.emptyCart(userId);
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
