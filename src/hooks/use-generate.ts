"use client";

import { useState } from "react";
import { parseGeminiJSON } from "@/lib/gemini/parse";
import type {
  DQGenerationResponse,
  QuickCreateResult,
} from "@/lib/types/project";

export function useGenerate<T>() {
  const [data, setData] = useState<T | null>(null);
  const [streamText, setStreamText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function generate(url: string, body: Record<string, unknown>) {
    setIsStreaming(true);
    setError(null);
    setStreamText("");
    setData(null);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`Generation failed: ${response.statusText}`);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No response body");

      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        accumulated += chunk;
        setStreamText(accumulated);
      }

      // Try to parse the complete response
      const parsed = parseGeminiJSON<T>(accumulated);
      setData(parsed);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Generation failed");
    } finally {
      setIsStreaming(false);
    }
  }

  function reset() {
    setData(null);
    setStreamText("");
    setError(null);
    setIsStreaming(false);
  }

  return { generate, data, streamText, isStreaming, error, reset };
}

export function useGenerateDQ() {
  return useGenerate<DQGenerationResponse>();
}

export function useGenerateLearningNarrative() {
  return useGenerate<Record<string, unknown>>();
}

export function useQuickCreate() {
  return useGenerate<QuickCreateResult>();
}
