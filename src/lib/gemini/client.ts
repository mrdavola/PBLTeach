import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

let genAI: GoogleGenerativeAI | null = null;

export function getGenAI() {
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set");
  }
  if (!genAI) {
    genAI = new GoogleGenerativeAI(apiKey);
  }
  return genAI;
}

export function getModel() {
  const ai = getGenAI();
  return ai.getGenerativeModel({
    model: "gemini-2.0-flash",
    generationConfig: {
      temperature: 0.7,
      topP: 0.95,
      responseMimeType: "application/json",
    },
  });
}
