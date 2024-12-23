import { v2 as cloudinary } from "cloudinary";

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "",
  api_key: process.env.CLOUDINARY_API_KEY || "",
  api_secret: process.env.CLOUDINARY_API_SECRET || "",
});

// Custom type for Cloudinary upload response
interface CloudinaryUploadResponse {
  secure_url: string;
  public_id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // Allow additional properties if needed
}

export async function POST(req: Request) {
  try {
    const body = await req.json(); // Parsing the JSON body
    const { file } = body;

    if (!file) {
      return new Response(JSON.stringify({ error: "No file provided" }), {
        status: 400,
      });
    }

    console.log("Received file for upload:", file); // Log the incoming file

    // Upload the image to Cloudinary
    const result = await new Promise<CloudinaryUploadResponse>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ resource_type: "image" }, (error, result) => {
            if (error) reject(error);
            else resolve(result as CloudinaryUploadResponse); // Cast to our defined type
          })
          .end(Buffer.from(file, "base64"));
      }
    );

    console.log("Cloudinary upload result:", result); // Log the Cloudinary response

    // Return the secure URL of the uploaded image
    return new Response(JSON.stringify({ secureUrl: result.secure_url }), {
      status: 200,
    });
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    return new Response(JSON.stringify({ error: "Upload failed" }), {
      status: 500,
    });
  }
}
