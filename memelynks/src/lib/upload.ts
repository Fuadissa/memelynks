export async function uploadToCloudinary(file: File): Promise<string> {
  // Convert the file to Base64
  const reader = new FileReader();
  const fileBase64 = await new Promise<string>((resolve, reject) => {
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file); // Convert the file to Base64
  });

  // const base64Data = fileBase64.split(",")[1]; // Remove the data URI prefix

  // Send the Base64 file to the API route
  const response = await fetch("/api/upload", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ file: fileBase64 }), // Send the Base64 encoded file
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Error response:", errorData); // Log the error response
    throw new Error(errorData.error || "Failed to upload image");
  }

  const responseData = await response.json();
  if (!responseData.secureUrl) {
    console.error("Unexpected response format:", responseData); // Log unexpected response
    throw new Error("Unexpected response format from the server.");
  }

  return responseData.secureUrl; // Return the secure URL of the uploaded image
}
