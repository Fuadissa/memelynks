export async function uploadToCloudinary(file: File): Promise<string> {
  // Convert file to Base64
  const reader = new FileReader();
  const fileBase64 = await new Promise<string>((resolve, reject) => {
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  const base64Data = fileBase64.split(",")[1];

  // Send the Base64 file to the API route
  const response = await fetch("/api/upload", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ file: base64Data }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Error response:", errorData); // Log the error
    throw new Error(errorData.error || "Failed to upload image");
  }

  const responseData = await response.json();
  if (!responseData.secureUrl) {
    console.error("Unexpected response format:", responseData); // Log unexpected response
    throw new Error("Unexpected response format from the server.");
  }

  return responseData.secureUrl;
}
