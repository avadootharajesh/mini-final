import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dx0o34ckc",
  api_key: process.env.CLOUDINARY_API_KEY || "944247377554193",
  api_secret:
    process.env.CLOUDINARY_API_SECRET || "BUKc9458wGt5V7PGHcYEK4X5kww",
});

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};

export async function POST(req) {
  try {
    const { base64 } = await req.json();

    const uploadResponse = await cloudinary.uploader.upload(base64, {
      folder: "pet-store/products", // optional folder name
    });

    return new Response(JSON.stringify({ url: uploadResponse.secure_url }), {
      status: 200,
    });
  } catch (error) {
    console.error("Cloudinary Upload Failed:", error);
    return new Response(
      JSON.stringify({ error: "Failed to upload image to Cloudinary" }),
      { status: 500 }
    );
  }
}
