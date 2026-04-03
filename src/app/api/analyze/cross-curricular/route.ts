import { getModel } from "@/lib/gemini/client";
import { getSystemPrompt } from "@/lib/gemini/prompts/system";
import { buildCrossCurricularPrompt } from "@/lib/gemini/prompts/analyze-cross-curricular";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.documents || !Array.isArray(body.documents) || body.documents.length < 2) {
      return NextResponse.json(
        { error: "Provide at least 2 documents for cross-curricular analysis" },
        { status: 400 }
      );
    }

    const model = getModel();
    const prompt =
      getSystemPrompt() +
      "\n\n" +
      buildCrossCurricularPrompt(body.documents);

    const result = await model.generateContentStream({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const chunk of result.stream) {
            controller.enqueue(encoder.encode(chunk.text()));
          }
        } catch (error) {
          controller.error(error);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error) {
    console.error("Cross-curricular analysis error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Analysis failed",
      },
      { status: 500 }
    );
  }
}
