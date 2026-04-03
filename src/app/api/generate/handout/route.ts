import { getModel } from "@/lib/gemini/client";
import { getSystemPrompt } from "@/lib/gemini/prompts/system";
import { buildHandoutPrompt } from "@/lib/gemini/prompts/handout";
import type { HandoutType } from "@/lib/gemini/prompts/handout";
import { NextResponse } from "next/server";

const VALID_TYPES: HandoutType[] = [
  "student-brief",
  "reflection-journal",
  "critique-protocol",
  "parent-letter",
  "milestone-tracker",
];

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.project || !body.type) {
      return NextResponse.json(
        { error: "Missing required fields: project, type" },
        { status: 400 }
      );
    }

    if (!VALID_TYPES.includes(body.type)) {
      return NextResponse.json(
        {
          error: `Invalid type: must be one of ${VALID_TYPES.join(", ")}`,
        },
        { status: 400 }
      );
    }

    const model = getModel();
    const systemPrompt = getSystemPrompt();
    const userPrompt = buildHandoutPrompt(body.project, body.type);

    const result = await model.generateContentStream({
      contents: [
        {
          role: "user",
          parts: [{ text: systemPrompt + "\n\n" + userPrompt }],
        },
      ],
    });

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text();
            controller.enqueue(encoder.encode(text));
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
    console.error("Handout generation error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Generation failed",
      },
      { status: 500 }
    );
  }
}
