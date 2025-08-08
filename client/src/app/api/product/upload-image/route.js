import { v2 as cloudinary } from "cloudinary";
import { getServerSideProps } from "next/dist/build/templates/pages";

cloudinary.config({
  cloud_name: process.env.ECOMMERCE_CLOUDINARY_CLOUD_NAME ,
  api_key: process.env.ECOMMERCE_CLOUDINARY_API_KEY ,
  api_secret:
    process.env.ECOMMERCE_CLOUDINARY_API_SECRET,
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
    // console.log("POST request received");
    const { base64 } = await req.json();
    // console.log("Base64:", base64);

    const uploadResponse = await cloudinary.uploader.upload(base64, {
      folder: "pet-store/products", // optional folder name
    });

    // console.log("Cloudinary Upload Response:");

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

// serverSideProps
const props = getServerSideProps({
  async ({ params }) {
    return {
      props: {},
    };
  },
});
// These props are not used in this file, but are required for the server-side rendering of the page.
