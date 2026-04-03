import { getModel } from "@/lib/gemini/client";
import { getSystemPrompt } from "@/lib/gemini/prompts/system";
import { buildParsePrompt } from "@/lib/gemini/prompts/parse-scope-sequence";
import { extractText } from "@/lib/analyze/extract-text";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const subject = formData.get("subject") as string;
    const gradeLevel = formData.get("gradeLevel") as string;

    if (!file || !subject || !gradeLevel) {
      return NextResponse.json(
        { error: "Missing file, subject, or gradeLevel" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const rawText = await extractText(buffer, file.name);

    const model = getModel();
    const prompt =
      getSystemPrompt() + "\n\n" + buildParsePrompt(rawText, subject, gradeLevel);

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
    console.error("Document parsing error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Parsing failed",
      },
      { status: 500 }
    );
  }
}
