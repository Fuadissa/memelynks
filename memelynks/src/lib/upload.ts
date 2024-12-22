"use server";

import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "", // Replace with your Cloudinary cloud name
  api_key: process.env.CLOUDINARY_API_KEY || "", // Replace with your Cloudinary API key
  api_secret: process.env.CLOUDINARY_API_SECRET || "", // Replace with your Cloudinary API secret
});

export async function uploadToCloudinary(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    // Convert File to Buffer using slice method
    const blobSlice = file.slice(0, file.size);
    const bufferReader = new Response(blobSlice).arrayBuffer();

    bufferReader
      .then((buffer) => {
        const reader = new Readable();
        reader.push(Buffer.from(buffer)); // push the buffer into the stream
        reader.push(null); // signal end of stream

        // Upload the buffer to Cloudinary using stream
        const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: "image" },
          (error, result) => {
            if (error) {
              reject(error);
            } else if (result && result.secure_url) {
              resolve(result.secure_url);
            } else {
              reject(new Error("Invalid upload result"));
            }
          }
        );

        reader.pipe(uploadStream);
      })
      .catch(reject);
  });
}

// export default cloudinary;
