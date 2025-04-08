import { v2 as cloudinary } from "cloudinary";
// import formidable from "formidable";
// import fs from "fs";

import { NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: false,
  },
};

cloudinary.config({
  cloud_name: "dx0o34ckc",
  api_key: "944247377554193",
  api_secret: process.env.CLOUDINARY_SECRET || "BUKc9458wGt5V7PGHcYEK4X5kww",
});

export async function POST(req) {
  try {
    const data = req.body;
    console.log("Received POST request");
    console.log(data);
    return NextResponse.json({ status: 200, message: "success" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500, message: error.message });
  }
}

// export default async function handler(req, res) {
//   console.log("Received POST request");
//   if (req.method === "POST") {
//     console.log("Received POST request --->");
//   }
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method not allowed" });
//   }
//   console.log("Received POST request");
//   const form = new formidable.IncomingForm();
//   form.uploadDir = "./public/uploads";
//   form.keepExtensions = true;

//   form.parse(req, async (err, fields, files) => {
//     if (err) return res.status(500).json({ error: err.message });

//     const fileArray = Array.isArray(files.files) ? files.files : [files.files];

//     try {
//       const uploadedUrls = await Promise.all(
//         fileArray.map((file) =>
//           cloudinary.uploader.upload(file.filepath, {
//             folder: "petstore_images",
//           })
//         )
//       );

//       const urls = uploadedUrls.map((result) => result.secure_url);

//       res.status(200).json({ success: true, urls });
//     } catch (uploadError) {
//       console.error(uploadError);
//       res.status(500).json({ success: false, error: uploadError.message });
//     }
//   });
// }
