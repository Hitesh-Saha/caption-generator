import { visionModel } from "../config/gemini";
import { getImageMimeType } from "../utils/image";

export async function generateCaption(imageBase64: string): Promise<string> {
  try {
    // Validate the base64 string
    if (!imageBase64.includes("base64,")) {
      throw new Error("Invalid image format");
    }

    // Remove the data URL prefix to get just the base64 data
    const [header, base64Data] = imageBase64.split("base64,");
    const mimeType = getImageMimeType(header) || "image/jpeg";

    // Create a FileData object for Gemini
    const imageData = {
      inlineData: {
        data: base64Data,
        mimeType,
      },
    };

    // Generate content using Gemini Vision
    const result = await visionModel.generateContent([
      "Generate atleast 5 creative and poetic caption for this image. Make it engaging and unique, focusing on the artistic elements and emotional impact. Include few emojis and hashtags. List the outputs in the following schema: ['caption1', 'caption2']",
      imageData,
    ]);

    const response = await result.response;
    if (!response.text()) {
      throw new Error("No caption generated");
    }

    return response.text();
  } catch (error) {
    console.error("Error generating caption:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to generate caption"
    );
  }
}
