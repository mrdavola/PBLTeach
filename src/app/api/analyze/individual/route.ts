import { getModel } from "@/lib/gemini/client";
import { getSystemPrompt } from "@/lib/gemini/prompts/system";
import { buildIndividualAnalysisPrompt } from "@/lib/gemini/prompts/analyze-individual";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.units || !body.subject || !body.gradeLevel) {
      return NextResponse.json(
        { error: "Missing units, subject, or gradeLevel" },
        { status: 400 }
      );
    }

    const model = getModel();
    const prompt =
      getSystemPrompt() +
      "\n\n" +
      buildIndividualAnalysisPrompt(body.units, body.subject, body.gradeLevel);

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
    console.error("Individual analysis error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Analysis failed",
      },
      { status: 500 }
    );
  }
}
