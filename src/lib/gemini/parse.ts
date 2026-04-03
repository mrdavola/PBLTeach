// Safe JSON parser for Gemini responses
export function parseGeminiJSON<T>(text: string): T {
  // Gemini sometimes wraps JSON in markdown code blocks
  const cleaned = text
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();
  return JSON.parse(cleaned) as T;
}

// Streaming chunk accumulator
export function createStreamAccumulator() {
  let buffer = "";
  return {
    add(chunk: string) {
      buffer += chunk;
      return buffer;
    },
    tryParse<T>(): T | null {
      try {
        return parseGeminiJSON<T>(buffer);
      } catch {
        return null;
      }
    },
    getBuffer() {
      return buffer;
    },
    reset() {
      buffer = "";
    },
  };
}
