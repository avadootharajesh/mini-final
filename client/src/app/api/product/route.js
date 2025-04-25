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

    // console.log("data received ra baddy!")

    if (!user || !product) {
      return NextResponse.json(
        { status: 400, message: "Bad Request" },
        { status: 400 }
      );
    }
    const userId = new mongoose.Types.ObjectId(user._id);
    console.log(" User ID: ", userId);
    console.log("Product: ", product);

    const productData = {
      name: product.name,
      description: product.description,
      images: product.images,
      price: product.price,
      quantity: product.quantity,
      category: product.category,
      tags: product.tags.split(","),
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

export async function GET(request) {
  try {
    const result = await db.getProducts();
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
