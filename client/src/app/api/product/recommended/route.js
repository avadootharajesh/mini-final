import { NextResponse } from "next/server";
import Product from "@/../db/schema/product.schema";
import { connectToDatabase } from "@/../db/dbConfig";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const name = searchParams.get("name");
  const description = searchParams.get("description");
  const category = searchParams.get("category");
  const tagsString = searchParams.get("tags"); // now just one string
  const productId = searchParams.get("productId");

  const queryConditions = [];

  if (name) queryConditions.push({ name: new RegExp(name, "i") });
  if (description) queryConditions.push({ description: new RegExp(description, "i") });
  if (category) queryConditions.push({ category: new RegExp(category, "i") });

  if (tagsString) {
    const tags = tagsString.split(",").map((tag) => tag.trim());
    tags.forEach((tag) => {
      if (tag) {
        queryConditions.push({
          tags: { $regex: new RegExp(`\\b${tag}\\b`, "i") },
        });
      }
    });
  }

  console.log("queryConditions", queryConditions);

  try {
    await connectToDatabase();

    let recommended = [];

    if (queryConditions.length > 0) {
      recommended = await Product.find({
        $or: queryConditions,
        _id: { $ne: productId },
      }).populate("owner");
    }

    if (recommended.length === 0 && productId) {
      const fallback = await Product.findOne({ _id: productId }).populate("owner");
      if (fallback) recommended = [fallback];
    }

    return NextResponse.json({ status: 200, recommended });
  } catch (error) {
    return NextResponse.json(
      {
        status: 500,
        statusText: "Internal Server Error",
        message: error.message,
      },
      { status: 500 }
    );
  }
}
