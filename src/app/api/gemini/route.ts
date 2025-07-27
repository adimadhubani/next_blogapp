import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Initialize the Gemini AI model with your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    // Parse the request body to get the user's prompt
    const { prompt } = await req.json();

    // Basic validation for the prompt
    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required." }, { status: 400 });
    }

    // Get the generative model (e.g., "gemini-pro" for text-based)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Generate content using the prompt
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text(); // Extract the text from the response

    // Return the generated text as a JSON response
    return NextResponse.json({ output: text });
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    // Return an error response if something goes wrong
    return NextResponse.json({ error: "Failed to generate content." }, { status: 500 });
  }
}