// product / route.js

// post product -> add product

import { use } from "react";
import { db } from "../../../../db/actions";

import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(request) {
  console.log("POST request received");
  try {
    const data = await request.json();
    const user = data.user;
    const product = data.product;

    if (!user || !product) {
      return NextResponse.json(
        { status: 400, message: "Bad Request" },
        { status: 400 }
      );
    }
    const userId = mongoose.Types.ObjectId(user._id);
    console.log(" User ID: ", userId);

    const productData = {
      name: product.name,
      description: product.description,
      images: product.images,
      price: product.price,
      quantity: product.quantity,
      category: product.category,
      tags: product.tags,
      owner: userId,
    };

    // const result = await db.addUser(data);
    const result = await db.addProduct(productData);

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
