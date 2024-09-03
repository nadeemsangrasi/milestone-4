// src/app/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as Blob;

    if (!file) {
      return NextResponse.json(
        { success: false, message: "No file uploaded" },
        { status: 400 }
      );
    }

    // Convert Blob to Buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    const uploadResponse = await new Promise((resolve, reject) => {
      cloudinary.v2.uploader
        .upload_stream((error, result) => {
          if (error) reject(error);
          else resolve(result);
        })
        .end(buffer);
    });

    return NextResponse.json({
      success: true,
      url: (uploadResponse as any).secure_url,
    });
  } catch (error) {
    console.error("Upload failed:", error);
    return NextResponse.json(
      { success: false, message: "Upload failed" },
      { status: 500 }
    );
  }
}
