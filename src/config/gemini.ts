import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API with your API key
// In production, use environment variables (e.g., import.meta.env.VITE_GEMINI_API_KEY)
export const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

// Get the vision model
export const visionModel = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash", 
});