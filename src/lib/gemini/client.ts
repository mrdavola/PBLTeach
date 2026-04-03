import { GoogleGenerativeAI } from "@google/generative-ai";

let genAI: GoogleGenerativeAI | null = null;

export function getGeminiApiKey(env: NodeJS.ProcessEnv = process.env) {
  return (
    env.GEMINI_API_KEY ||
    env.GOOGLE_GENERATIVE_AI_API_KEY ||
    env.GOOGLE_API_KEY ||
    ""
  );
}

export function getGeminiModelName(env: NodeJS.ProcessEnv = process.env) {
  return env.GEMINI_MODEL || "gemini-2.5-flash";
}

export function getGenAI() {
  const apiKey = getGeminiApiKey();
  if (!apiKey) {
    throw new Error(
      "Gemini API key is not configured. Set GEMINI_API_KEY in the server environment."
    );
  }
  if (!genAI) {
    genAI = new GoogleGenerativeAI(apiKey);
  }
  return genAI;
}

export function getModel() {
  const ai = getGenAI();
  return ai.getGenerativeModel({
    model: getGeminiModelName(),
    generationConfig: {
      temperature: 0.7,
      topP: 0.95,
      responseMimeType: "application/json",
    },
  });
}
